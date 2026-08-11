import { useEffect, useRef } from 'react';
import Banderines from './Banderines';

const WHATSAPP_PHONE = '56969078445';

const platos = [
  {
    nombre: 'Empanadas de Pino',
    detalle: 'Masa artesanal, pino jugoso, aceituna y huevo. Horneadas al momento.',
  },
  {
    nombre: 'Anticuchos Gourmet',
    detalle: 'Brochetas a la parrilla con marinado de la casa y pebre fresco.',
  },
  {
    nombre: 'Choripán de Autor',
    detalle: 'Pan artesanal, chorizo premium y pebre chileno recién preparado.',
  },
  {
    nombre: 'Pastel de Choclo',
    detalle: 'Receta tradicional en pailas individuales, con albahaca fresca.',
  },
  {
    nombre: 'Terremoto & Chicha',
    detalle: 'Barra dieciochera con terremotos, chicha y mote con huesillo.',
  },
  {
    nombre: 'Mesa de Tapas Chilenas',
    detalle: 'Selección de quesos, pebre, sopaipillas y embutidos nacionales.',
  },
];

const Menu18 = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('active'), i * 120);
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
    'Hola, quiero cotizar el menú de Fiestas Patrias (18 de septiembre) para mi evento.'
  )}`;

  return (
    <section ref={sectionRef} id="menu-18" className="relative section-padding bg-secondary">
      <Banderines className="absolute top-0 left-0 right-0" />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 reveal">
          <p className="section-subtitle">Especial 18 de Septiembre</p>
          <h2 className="section-title">Menú Fiestas Patrias</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-light">
            Sabores chilenos de siempre, con la elegancia y el servicio de Entre Tapas Gourmet.
            Ideal para asados de empresa, celebraciones familiares y fondas privadas.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {platos.map((plato) => (
            <article
              key={plato.nombre}
              className="reveal bg-card border-t-2 border-chile-red p-8 shadow-sm transition-transform duration-500 hover:-translate-y-1"
            >
              <h3 className="heading-serif text-2xl mb-3">{plato.nombre}</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                {plato.detalle}
              </p>
            </article>
          ))}
        </div>

        <div className="reveal mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 text-xs uppercase tracking-[0.2em] font-medium bg-whatsapp text-cream transition-all duration-300 hover:opacity-90"
          >
            Cotizar por WhatsApp
          </a>
          <a href="#contacto" className="btn-outline">
            Enviar solicitud
          </a>
        </div>
      </div>
    </section>
  );
};

export default Menu18;
