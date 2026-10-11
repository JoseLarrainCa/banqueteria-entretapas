// Worker de Entre Tapas Gourmet: sirve la página (assets compilados por Vite) y la copia de
// los leads a la base de la flota. No hay base propia ni panel: la página es solo página.
//
//   /api/lead    POST  copia del formulario -> leads-flota + aviso por correo (ver ./lead)
//   /api/salud   GET   {ok:true}
//   *.mp4        GET   el video, cortado por Range (206): Safari de iPhone no reproduce sin eso
//   todo lo demás -> assets (la SPA; cualquier ruta sin archivo devuelve index.html)

import { Hono } from "hono";
import { respuestaCanonica } from "../src/lib/host-canonico";
import { atenderAvisoDeLead } from "./lead/ruta-lead";

export interface Env {
  ASSETS: Fetcher;
  /** Base compartida de leads de toda la flota (binding `leads_flota`). */
  leads_flota?: D1Database;
  /** Llave de Resend (`wrangler secret put RESEND_API_KEY`). */
  RESEND_API_KEY?: string;
  /** Casillas que reciben el aviso, separadas por coma. Sin esto va solo a jose@try-omnis.cl. */
  MAIL_TO?: string;
}

const app = new Hono<{ Bindings: Env }>();

// El www y el http redirigen con 301 al dominio canónico (si no, Google ve dos sitios iguales).
app.use("*", async (c, next) => {
  const redireccion = respuestaCanonica(c.req.raw);
  if (redireccion) return redireccion;
  await next();
});

// La dirección *.workers.dev es el respaldo, no el sitio: nunca se indexa.
app.use("*", async (c, next) => {
  await next();
  const url = new URL(c.req.url);
  const res = new Response(c.res.body, c.res);
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  if (url.pathname.startsWith("/api/") || url.hostname.endsWith(".workers.dev")) {
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  c.res = res;
});

app.all("/api/lead", async (c) => (await atenderAvisoDeLead(c.req.raw, c.env)) ?? c.json({ error: "No existe" }, 404));
app.get("/api/salud", (c) => c.json({ ok: true }));

/**
 * El asset store ignora `Range` y devuelve el .mp4 entero con 200; Safari de iPhone exige 206
 * y sin eso solo muestra la portada (medido en Pro Parcelas, 2026-09-23).
 */
export function cortarRango(rango: string | null, total: number): { inicio: number; fin: number } | null | "fuera" {
  if (!rango) return null;
  const m = /^bytes=(\d*)-(\d*)$/.exec(rango.trim());
  if (!m || (m[1] === "" && m[2] === "")) return null;
  let inicio: number;
  let fin: number;
  if (m[1] === "") {
    inicio = Math.max(0, total - Number(m[2]));
    fin = total - 1;
  } else {
    inicio = Number(m[1]);
    fin = m[2] === "" ? total - 1 : Math.min(Number(m[2]), total - 1);
  }
  if (inicio >= total || inicio > fin) return "fuera";
  return { inicio, fin };
}

app.get("*", async (c) => {
  const res = await c.env.ASSETS.fetch(c.req.raw);
  const url = new URL(c.req.url);
  if (!url.pathname.endsWith(".mp4") || res.status !== 200) return res;
  // Un HEAD trae el cuerpo vacío: no hay nada que cortar.
  if (c.req.method === "HEAD") return res;

  const cuerpo = await res.arrayBuffer();
  const total = cuerpo.byteLength;
  const tramo = cortarRango(c.req.header("range") ?? null, total);
  const cabeceras = new Headers(res.headers);
  cabeceras.set("Accept-Ranges", "bytes");
  cabeceras.set("Content-Type", "video/mp4");
  if (tramo === null) {
    cabeceras.set("Content-Length", String(total));
    return new Response(cuerpo, { status: 200, headers: cabeceras });
  }
  if (tramo === "fuera") {
    cabeceras.set("Content-Range", `bytes */${total}`);
    return new Response(null, { status: 416, headers: cabeceras });
  }
  cabeceras.set("Content-Range", `bytes ${tramo.inicio}-${tramo.fin}/${total}`);
  cabeceras.set("Content-Length", String(tramo.fin - tramo.inicio + 1));
  return new Response(cuerpo.slice(tramo.inicio, tramo.fin + 1), { status: 206, headers: cabeceras });
});

app.all("*", (c) => c.env.ASSETS.fetch(c.req.raw));

export default app;
