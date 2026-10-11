# Entre Tapas Gourmet — operación

Banquetería y catering en Santiago (entretapasgourmet.cl). Solo página: sin base propia ni panel.

## ⏩ Retomar aquí (2026-10-11)

- **La copia en Cloudflare está viva:** https://entretapas.omnis-apps.workers.dev (con `noindex`).
  Rama `eject/cloudflare`. Worker `entretapas`, cuenta Omnis `4348d418…`.
- **El dominio sigue en Lovable** (A `185.158.133.1` en el apex y el www). No se cambia hasta que
  José dé el visto bueno.
- Falta para el cambio de dominio: ver «Cambio de dominio» abajo.

## Qué hace el Worker

- Sirve la SPA (`dist/`) con `run_worker_first = true`.
- Host canónico: el **apex** (`entretapasgourmet.cl`); el `www` redirige con 301. Así lo hacía
  Lovable (www → apex con 302), pero las etiquetas `canonical`, `og:url`, el sitemap y el JSON-LD
  apuntaban al `www`: se corrigieron al apex en esta migración.
- Los `.mp4` de la galería se sirven cortados por `Range` (206): Safari de iPhone no los
  reproduce si llegan enteros con 200.
- `POST /api/lead`: copia de cada formulario a `leads-flota` + aviso por Resend a
  `jose@try-omnis.cl`. **Formspree (`mzddgpno`) sigue siendo el camino principal** y no se tocó:
  es lo que le llega al negocio y de donde sale el export. La copia solo acepta celulares
  chilenos (9 dígitos que empiezan en 9); un fijo llega igual por Formspree.

## Cambio de dominio (pendiente, con visto bueno de José)

1. Registros viejos para volver atrás: `entretapasgourmet.cl A 185.158.133.1` y
   `www.entretapasgourmet.cl A 185.158.133.1`.
2. Agregar a `wrangler.toml` las `[[routes]]` de `entretapasgourmet.cl` y `www.entretapasgourmet.cl`
   con `custom_domain = true`, borrar los A de Lovable y desplegar en el mismo comando
   (token en `~/.omnis/cloudflare-dns.token`). Ver skill `migrar-lovable`, Fase 4.
3. Verificar que la zona `entretapasgourmet.cl` esté en la cuenta de Cloudflare de Omnis — **sin
   verificar** a la fecha.

## Desplegar

```bash
npm run test && npm run typecheck && CLOUDFLARE_ACCOUNT_ID=4348d418d61283075685bc8bd4caeaae npm run cf:deploy
```
