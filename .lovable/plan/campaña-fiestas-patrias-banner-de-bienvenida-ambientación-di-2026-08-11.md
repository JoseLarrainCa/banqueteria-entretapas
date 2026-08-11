# Campaña Fiestas Patrias — Banner de bienvenida + ambientación dieciochera

## 1. Modal de bienvenida "Cotiza tu 18"

Al entrar a la página de inicio aparece un modal centrado (fondo oscurecido, aparición suave):

- Arriba, el banner subido "FIESTAS PATRIAS — Reserva tu evento gourmet" como imagen.
- Título "Cotiza tu 18" y una línea corta invitando a reservar cupo.
- Formulario compacto: Nombre, Teléfono (obligatorio), Email, Fecha del evento, N° de invitados, Mensaje opcional.
- Botón principal "Enviar cotización" y botón secundario verde "Escríbenos por WhatsApp" que abre WhatsApp al +56 9 6907 8445 con mensaje ya armado: "Hola, quiero cotizar mi celebración de Fiestas Patrias (18 de septiembre). Mi nombre es…".
- Cierre con la X o clic afuera; se recuerda en el navegador para no reaparecer en cada recarga durante el mismo día.
- Los envíos van al mismo destino de correo que los otros formularios, con etiqueta "Cotización Fiestas Patrias" para identificar el origen del lead.

## 2. Ambientación dieciochera (manteniendo la estética actual)

- Guirnalda de banderines chilenos (rojo/blanco/azul) discreta bajo la barra de navegación, en SVG liviano, sin tapar el logo.
- Franja anunciadora sobre el hero: "Fiestas Patrias — Cupos limitados · Cotiza tu 18" con enlace al formulario.
- Nueva sección "Menú 18 de Septiembre" en la página de inicio con especialidades dieciocheras (empanadas, anticuchos, choripán, terremoto, pastel de choclo) en tarjetas al estilo actual, más botón de WhatsApp con mensaje armado.
- Botón "Cotiza tu 18" en la barra de navegación (escritorio y móvil).
- Acentos rojo y azul chilenos añadidos como tokens de diseño, usados solo en detalles (banderines, badges, franja) para no romper la paleta crema/oliva/dorado.
- Botón flotante de WhatsApp: se mantiene, con el mensaje actualizado a la temporada del 18.

## 3. SEO

Título y descripción de la página actualizados a la campaña de Fiestas Patrias (catering 18 de septiembre en Santiago), incluyendo og/twitter.

## Detalles técnicos

- El banner subido se registra vía Lovable Assets y se importa como pointer JSON (no se copia el binario al repo).
- Nuevos componentes: FiestasPatriasModal.tsx, FiestasPatriasStrip.tsx, Banderines.tsx, Menu18.tsx; montados en src/pages/Index.tsx.
- El formulario reutiliza el patrón de StationContactForm.tsx (mismo endpoint Formspree, campo formType, tracking de conversión gtag existente).
- Colores nuevos como variables HSL en index.css + tailwind.config.ts (--chile-red, --chile-blue); sin colores hardcodeados en componentes.
- Animaciones con las clases reveal/fade existentes; respeta prefers-reduced-motion.
