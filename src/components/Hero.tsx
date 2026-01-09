import { useEffect, useRef } from 'react';
import heroImage from '@/assets/hero-banquet.jpg';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        const parallax = heroRef.current.querySelector('.parallax-bg') as HTMLElement;
        if (parallax) {
          parallax.style.transform = `translateY(${scrolled * 0.4}px)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div className="parallax-bg absolute inset-0 w-full h-[120%] -top-[10%]">
        <img
          src={heroImage}
          alt="Elegant banquet table setting"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="text-cream/90 text-xs uppercase tracking-[0.4em] mb-6 animate-fade-up">
          Bienvenidos a Entre Tapas
        </p>
        <h2 className="heading-display text-cream text-5xl md:text-7xl lg:text-8xl font-light leading-tight animate-fade-up">
          Experiencia
          <br />
          Gourmet
        </h2>
        <p className="text-cream/80 mt-8 max-w-xl mx-auto text-base md:text-lg font-light leading-relaxed animate-fade-in-delay">
          Creamos experiencias culinarias únicas con sabores auténticos
          para los momentos más especiales de tu vida.
        </p>
        <div className="mt-10 animate-fade-in-delay-2">
          <a href="#contacto" className="btn-hero">
            Solicitar Cotización
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-fade-in-delay-3">
        <div className="w-px h-16 bg-cream/30 relative overflow-hidden">
          <div className="w-full h-8 bg-cream/80 absolute animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
