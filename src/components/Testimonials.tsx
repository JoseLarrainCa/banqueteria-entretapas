import { useState, useEffect, useCallback } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: "Desde el primer contacto hasta el último detalle del evento, el equipo fue excepcional. Nuestra boda fue perfecta gracias a su dedicación y profesionalismo.",
    name: "María & Carlos",
    event: "Boda en Jardines del Valle",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"
  },
  {
    id: 2,
    quote: "La calidad de la comida y el servicio superaron todas nuestras expectativas. Nuestros invitados siguen hablando de lo increíble que estuvo el banquete.",
    name: "Ana Rodríguez",
    event: "Evento Corporativo Anual",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
  },
  {
    id: 3,
    quote: "Profesionales de principio a fin. La atención al detalle y la creatividad en cada platillo hicieron de nuestra celebración algo único e inolvidable.",
    name: "Fernando & Lucia",
    event: "Aniversario 25 años",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80"
  },
  {
    id: 4,
    quote: "Un equipo que realmente entiende lo que significa un servicio de excelencia. Cada detalle fue cuidado con esmero y dedicación.",
    name: "Roberto Méndez",
    event: "Gala Empresarial",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating]);

  const goToPrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, goToNext]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <section 
      className="bg-primary section-padding overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="section-subtitle text-primary-foreground/70">Testimonios</p>
          <h2 className="section-title text-primary-foreground italic">
            Nuestros Clientes Felices
          </h2>
          <p className="mt-4 text-primary-foreground/80 max-w-2xl mx-auto font-light">
            La comida es nuestro lenguaje de amor, pero las palabras de nuestros clientes 
            nos llenan de alegría. Descubre lo que dicen sobre nosotros.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`absolute inset-0 transition-all duration-600 ease-out ${
                    index === currentIndex 
                      ? 'opacity-100 translate-x-0' 
                      : index < currentIndex 
                        ? 'opacity-0 -translate-x-full' 
                        : 'opacity-0 translate-x-full'
                  }`}
                >
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Content */}
            <div className="relative min-h-[280px] md:min-h-[320px] flex flex-col justify-center">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`transition-all duration-500 ease-out ${
                    index === currentIndex 
                      ? 'opacity-100 translate-y-0 relative' 
                      : 'opacity-0 translate-y-8 absolute inset-0 pointer-events-none'
                  }`}
                >
                  <blockquote className="text-xl md:text-2xl lg:text-3xl text-primary-foreground font-light leading-relaxed mb-8 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <p className="text-primary-foreground text-sm uppercase tracking-[0.2em] font-medium mb-1">
                      {testimonial.name}
                    </p>
                    <p className="text-primary-foreground/70 text-sm">
                      {testimonial.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12 md:mt-16">
            {/* Progress Indicators */}
            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true);
                      setCurrentIndex(index);
                      setTimeout(() => setIsAnimating(false), 600);
                    }
                  }}
                  className={`h-0.5 transition-all duration-500 ${
                    index === currentIndex 
                      ? 'w-12 bg-primary-foreground' 
                      : 'w-6 bg-primary-foreground/30 hover:bg-primary-foreground/50'
                  }`}
                  aria-label={`Ir al testimonio ${index + 1}`}
                />
              ))}
            </div>

            {/* Arrow Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={goToPrev}
                className="group flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-300"
                disabled={isAnimating}
              >
                <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
              </button>
              
              <span className="text-primary-foreground/50 text-xs uppercase tracking-[0.2em]">
                Siguiente
              </span>
              
              <button
                onClick={goToNext}
                className="group flex items-center gap-3 text-primary-foreground transition-colors duration-300"
                disabled={isAnimating}
              >
                <span className="w-12 h-12 rounded-full border border-primary-foreground/30 flex items-center justify-center transition-all duration-300 group-hover:bg-primary-foreground group-hover:text-primary">
                  <ArrowRight className="w-5 h-5" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
