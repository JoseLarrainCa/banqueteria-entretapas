import { useEffect, useRef } from 'react';
import weddingImage from '@/assets/wedding-catering.jpg';
import corporateImage from '@/assets/corporate-catering.jpg';
import socialImage from '@/assets/social-events.jpg';

interface ServiceCardProps {
  image: string;
  title: string;
  subtitle: string;
  description: string;
  delay: number;
}

const ServiceCard = ({ image, title, subtitle, description, delay }: ServiceCardProps) => {
  return (
    <div
      className="reveal group cursor-pointer"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="img-zoom mb-6">
        <img
          src={image}
          alt={title}
          className="w-full aspect-[4/5] object-cover"
        />
      </div>
      <p className="section-subtitle">{subtitle}</p>
      <h3 className="heading-serif text-2xl md:text-3xl text-foreground mb-3 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
      <a
        href="#contacto"
        className="inline-block mt-4 text-xs uppercase tracking-[0.2em] font-medium text-foreground underline-animate"
      >
        Más Información
      </a>
    </div>
  );
};

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => {
                el.classList.add('active');
              }, i * 200);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      image: weddingImage,
      title: 'Bodas Inolvidables',
      subtitle: 'Celebraciones',
      description:
        'Transformamos su día especial en una experiencia mágica con menús exquisitos y una presentación impecable que sus invitados recordarán siempre.',
    },
    {
      image: corporateImage,
      title: 'Eventos Corporativos',
      subtitle: 'Negocios',
      description:
        'Impresione a sus clientes y colaboradores con un servicio de catering profesional que refleja la excelencia de su empresa.',
    },
    {
      image: socialImage,
      title: 'Eventos Sociales',
      subtitle: 'Celebraciones Especiales',
      description:
        'Aniversarios, cumpleaños y reuniones familiares merecen lo mejor. Creamos momentos especiales con atención a cada detalle.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="section-padding bg-secondary/30"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <p className="section-subtitle">Nuestros Servicios</p>
          <h2 className="section-title text-foreground">
            Experiencias Extraordinarias
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              {...service}
              delay={index * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
