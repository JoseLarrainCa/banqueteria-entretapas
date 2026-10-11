// Datos de marca que usa el Worker (host canónico). Escrito a mano: Entretapas no usa
// scripts/marca.mjs porque su <head>, favicon y tarjeta social ya venían bien hechos.
export const brand = {
  nombre: "Entre Tapas Gourmet",
  dominioCanonico: "https://entretapasgourmet.cl",
  urlRespaldo: "https://entretapas.omnis-apps.workers.dev",
  redirigirHosts: ["www.entretapasgourmet.cl"],
} as const;
