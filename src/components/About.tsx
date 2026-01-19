import { useEffect, useRef } from 'react';
import gourmetDish from '@/assets/gourmet-dish.jpg';
const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.reveal').forEach((el, i) => {
            setTimeout(() => {
              el.classList.add('active');
            }, i * 150);
          });
        }
      });
    }, {
      threshold: 0.2
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);
  return <section ref={sectionRef} id="nosotros" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <div className="reveal order-2 lg:order-1">
            <div className="img-zoom">
              <img src={gourmetDish} alt="Plato gourmet" className="w-full aspect-square object-cover" />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <div className="reveal">
              <p className="section-subtitle">Sobre Nosotros</p>
              <h2 className="section-title text-foreground">
                Banquetería de
                <br />
                Excelencia
              </h2>
            </div>

            <div className="reveal space-y-4">
              <p className="text-muted-foreground leading-relaxed">Entre Tapas Gourmet es más que un servicio de catering; somos creadores de experiencias culinarias excepcionales. Con más de 15 años de trayectoria, nos hemos consolidado como referentes en la organización de eventos de alta gama.</p>
              <p className="text-muted-foreground leading-relaxed">
                Cada evento es único, y por eso diseñamos menús personalizados
                que reflejan su visión y superan sus expectativas. Desde bodas
                íntimas hasta grandes celebraciones corporativas, nos
                comprometemos a ofrecer un servicio impecable.
              </p>
            </div>

            <div className="reveal pt-4">
              <a href="#servicios" className="btn-outline">
                Descubrir Más
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default About;