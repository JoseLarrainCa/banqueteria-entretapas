import { useEffect, useRef } from 'react';
import heroImage from '@/assets/hero-banquet.jpg';
import weddingImage from '@/assets/wedding-catering.jpg';
import corporateImage from '@/assets/corporate-catering.jpg';
import socialImage from '@/assets/social-events.jpg';
import gourmetImage from '@/assets/gourmet-dish.jpg';

const Gallery = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const images = [
    { src: heroImage, alt: 'Elegante banquete', className: 'md:col-span-2 md:row-span-2' },
    { src: weddingImage, alt: 'Boda elegante', className: '' },
    { src: gourmetImage, alt: 'Plato gourmet', className: '' },
    { src: corporateImage, alt: 'Evento corporativo', className: 'md:col-span-2' },
    { src: socialImage, alt: 'Evento social', className: '' },
  ];

  return (
    <section
      ref={sectionRef}
      id="galeria"
      className="section-padding bg-background"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <p className="section-subtitle">Nuestra Galería</p>
          <h2 className="section-title text-foreground">
            Momentos Capturados
          </h2>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className={`reveal img-zoom aspect-square ${image.className}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
