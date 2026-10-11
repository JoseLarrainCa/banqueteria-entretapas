/**
 * Envía el formulario de contacto al Worker (POST /api/lead), que lo guarda en la base de
 * leads de la flota y le avisa por correo a Omnis.
 *
 * Acá el formulario ES el camino principal (no hay WhatsApp de por medio), así que SÍ se
 * espera la respuesta: si falla, la persona tiene que enterarse y tener otra salida.
 */

export const RUTA_LEAD = "/api/lead";

export interface DatosLead {
  nombre: string;
  telefono: string;
  correo: string;
  servicio?: string;
  region?: string;
  comuna?: string;
  direccion?: string;
  mensaje?: string;
  /** Campo trampa para robots: tiene que ir vacío. */
  website?: string;
}

export async function enviarLead(datos: DatosLead, origen: string): Promise<boolean> {
  try {
    const res = await fetch(RUTA_LEAD, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ datos, origen }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Entretapas: Formspree sigue siendo el camino principal (es el que le llega al negocio y del
 * que sale el export). Esto manda una COPIA a la base de leads de la flota, sin esperarla, para
 * que el monitor de los lunes la vea. Si falla, la persona no se entera: Formspree ya la tiene.
 */
export function copiarLeadAFlota(datos: DatosLead, origen: string): void {
  try {
    void fetch(RUTA_LEAD, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ datos, origen }),
      keepalive: true,
    }).catch(() => undefined);
  } catch {
    // Nada: la copia nunca puede romper el envío principal.
  }
}

/** Junta los campos propios de cada formulario en el mensaje del aviso. */
export function mensajeConDetalles(partes: Record<string, string | undefined>): string {
  return Object.entries(partes)
    .filter(([, v]) => v && v.trim() !== "")
    .map(([k, v]) => `${k}: ${v!.trim()}`)
    .join("\n");
}
