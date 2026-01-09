import { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import cateringVideo from '@/assets/catering-video.mp4';

// Import gallery images
import entretapas1 from '@/assets/gallery/entretapas1.jpeg';
import entretapas2 from '@/assets/gallery/entretapas2.jpeg';
import entretapas3 from '@/assets/gallery/entretapas3.jpeg';
import entretapas4 from '@/assets/gallery/entretapas4.jpeg';
import entretapas5 from '@/assets/gallery/entretapas5.jpeg';
import entretapas6 from '@/assets/gallery/entretapas6.jpeg';
import entretapas7 from '@/assets/gallery/entretapas7.jpeg';
import entretapas8 from '@/assets/gallery/entretapas8.jpeg';
import entretapas9 from '@/assets/gallery/entretapas9.jpeg';

const Gallery = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => {
                el.classList.add('active');
              }, i * 100);
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

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const galleryImages = [
    { src: entretapas4, alt: 'Ceviche gourmet', label: 'Ceviche' },
    { src: entretapas3, alt: 'Filete con papas', label: 'Carnes' },
    { src: entretapas5, alt: 'Brochetas de verduras', label: 'Vegetariano' },
    { src: entretapas9, alt: 'Camarones al ajillo', label: 'Mariscos' },
  ];

  const bottomImages = [
    { src: entretapas7, alt: 'Mesa de quesos y fiambres', label: 'Picoteo' },
    { src: entretapas6, alt: 'Postre de chocolate con fresas', label: 'Postres' },
    { src: entretapas8, alt: 'Mariscos frescos', label: 'Del Mar' },
  ];

  return (
    <section
      ref={sectionRef}
      id="galeria"
      className="section-padding bg-secondary/30"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <p className="section-subtitle">Nuestra Galería</p>
          <h2 className="section-title text-foreground">
            Momentos Capturados
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            Cada evento es una obra de arte culinaria. Descubre la elegancia y dedicación 
            que ponemos en cada detalle.
          </p>
        </div>

        {/* Main Gallery Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Video Section - Left Side */}
          <div className="reveal relative group rounded-2xl overflow-hidden shadow-2xl">
            <video
              ref={videoRef}
              src={cateringVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover min-h-[400px] lg:min-h-[500px]"
            />
            {/* Video Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
            
            {/* Play/Pause Button */}
            <button
              onClick={toggleVideo}
              className="absolute bottom-6 left-6 flex items-center gap-3 bg-background/90 backdrop-blur-sm 
                         px-5 py-3 rounded-full text-foreground font-medium transition-all duration-300
                         hover:bg-background hover:scale-105 group-hover:opacity-100"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-5 h-5" />
                  <span className="text-sm tracking-wide">Pausar</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  <span className="text-sm tracking-wide">Reproducir</span>
                </>
              )}
            </button>

            {/* Video Label */}
            <div className="absolute top-6 left-6 bg-primary/90 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-primary-foreground text-sm font-medium tracking-wide">
                Nuestro Servicio en Acción
              </span>
            </div>
          </div>

          {/* Images Grid - Right Side */}
          <div className="grid grid-cols-2 gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="reveal relative group rounded-xl overflow-hidden shadow-lg 
                           aspect-square cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 
                             group-hover:scale-110"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent 
                                opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full 
                                group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-background font-display text-lg">{image.label}</span>
                  <div className="w-8 h-0.5 bg-primary mt-2 scale-x-0 group-hover:scale-x-100 
                                  transition-transform duration-500 delay-100 origin-left" />
                </div>

                {/* Corner Accent */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-background/50 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row - 3 Images */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {bottomImages.map((image, index) => (
            <div
              key={index}
              className="reveal relative group rounded-xl overflow-hidden shadow-lg 
                         aspect-[4/3] cursor-pointer"
              style={{ animationDelay: `${(index + 4) * 100}ms` }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 
                           group-hover:scale-110"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent 
                              opacity-0 group-hover:opacity-100 transition-all duration-500" />
              
              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full 
                              group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-background font-display text-lg">{image.label}</span>
                <div className="w-8 h-0.5 bg-primary mt-2 scale-x-0 group-hover:scale-x-100 
                                transition-transform duration-500 delay-100 origin-left" />
              </div>
            </div>
          ))}
        </div>

        {/* Featured Large Image - Event Setup */}
        <div className="mt-6 reveal">
          <div className="relative group rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={entretapas1}
              alt="Montaje de evento"
              className="w-full h-[300px] lg:h-[400px] object-cover transition-transform duration-700 
                         group-hover:scale-105"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/30 to-transparent" />
            
            {/* Content */}
            <div className="absolute inset-0 flex items-center p-8 lg:p-12">
              <div className="max-w-lg">
                <span className="text-primary font-medium tracking-widest text-sm uppercase">
                  Experiencia Premium
                </span>
                <h3 className="text-background font-display text-3xl lg:text-4xl mt-3 mb-4">
                  Elegancia en Cada Detalle
                </h3>
                <p className="text-background/80 text-sm lg:text-base leading-relaxed">
                  Desde la selección de ingredientes hasta la presentación final, 
                  cada elemento está cuidadosamente diseñado para crear momentos inolvidables.
                </p>
                <div className="flex gap-4 mt-6">
                  <div className="text-center">
                    <span className="text-primary font-display text-2xl lg:text-3xl">500+</span>
                    <p className="text-background/70 text-xs mt-1">Eventos</p>
                  </div>
                  <div className="w-px bg-background/30" />
                  <div className="text-center">
                    <span className="text-primary font-display text-2xl lg:text-3xl">10</span>
                    <p className="text-background/70 text-xs mt-1">Años</p>
                  </div>
                  <div className="w-px bg-background/30" />
                  <div className="text-center">
                    <span className="text-primary font-display text-2xl lg:text-3xl">100%</span>
                    <p className="text-background/70 text-xs mt-1">Satisfacción</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Second Large Image - Event with People */}
        <div className="mt-6 reveal">
          <div className="relative group rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={entretapas2}
              alt="Evento corporativo"
              className="w-full h-[300px] lg:h-[350px] object-cover transition-transform duration-700 
                         group-hover:scale-105"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-l from-foreground/70 via-foreground/30 to-transparent" />
            
            {/* Content - Right aligned */}
            <div className="absolute inset-0 flex items-center justify-end p-8 lg:p-12">
              <div className="max-w-lg text-right">
                <span className="text-primary font-medium tracking-widest text-sm uppercase">
                  Eventos Corporativos
                </span>
                <h3 className="text-background font-display text-3xl lg:text-4xl mt-3 mb-4">
                  Servicio Profesional
                </h3>
                <p className="text-background/80 text-sm lg:text-base leading-relaxed">
                  Coffee breaks, almuerzos ejecutivos y cócteles corporativos 
                  con la más alta calidad y atención al detalle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;