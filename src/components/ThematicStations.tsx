import { useEffect, useRef, useState } from 'react';
import { ChefHat, Utensils, Users, Truck, Sparkles, Check, ChevronLeft, ChevronRight } from 'lucide-react';

// Station images
import burgerStation1 from '@/assets/stations/burger-station-1.jpeg';
import burgerStation2 from '@/assets/stations/burger-station-2.jpg';
import pizzaHornoImg from '@/assets/stations/pizza-horno.jpeg';
import pizzaChampiImg from '@/assets/stations/pizza-champi.jpeg';
import tacosImg from '@/assets/stations/tacos.jpeg';
import bowlSalmonImg from '@/assets/stations/bowl-salmon.jpeg';
import bowlVeggieImg from '@/assets/stations/bowl-veggie.jpeg';

type Category = 'clasicas' | 'street' | 'fresca';

interface Station {
  name: string;
  description: string;
  image: string;
  price?: string;
}

interface CategoryData {
  title: string;
  subtitle: string;
  price: string;
  stations: Station[];
  gradient: string;
}

const ThematicStations = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<Category>('clasicas');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Reset slide when category changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [activeCategory]);

  const categories: Record<Category, CategoryData> = {
    clasicas: {
      title: 'Clásicas Gourmet',
      subtitle: 'Los favoritos de siempre, elevados a otro nivel',
      price: '$14.990',
      gradient: 'from-amber-900/80 to-orange-900/60',
      stations: [
        { 
          name: 'Hamburguesas Gourmet', 
          description: 'Hamburguesas artesanales con ingredientes premium, pan brioche casero y salsas especiales',
          image: burgerStation1
        },
        { 
          name: 'Pizzas Artesanales', 
          description: 'Pizzas al horno de leña con masa madre fermentada 48hrs y toppings selectos',
          image: pizzaHornoImg
        },
        { 
          name: 'Tacos y Fajitas', 
          description: 'Auténtica cocina mexicana con tortillas hechas al momento y guacamole fresco',
          image: tacosImg,
          price: '$20.000'
        },
      ],
    },
    street: {
      title: 'Street Food Premium',
      subtitle: 'Lo mejor de la comida callejera del mundo',
      price: '$15.990',
      gradient: 'from-slate-900/80 to-zinc-800/60',
      stations: [
        { 
          name: 'Hot Dogs Gourmet', 
          description: 'Hot dogs con salchichas artesanales y toppings creativos internacionales',
          image: burgerStation2
        },
        { 
          name: 'Pizzas Premium', 
          description: 'Pizzas napoletanas con ingredientes importados y masa perfectamente fermentada',
          image: pizzaChampiImg
        },
        { 
          name: 'Arepas / Bao / Panes del Mundo', 
          description: 'Fusión internacional de panes rellenos con sabores únicos',
          image: tacosImg
        },
      ],
    },
    fresca: {
      title: 'Fresca & Light',
      subtitle: 'Opciones saludables sin sacrificar el sabor',
      price: '$14.990',
      gradient: 'from-emerald-900/80 to-teal-800/60',
      stations: [
        { 
          name: 'Ensaladas Gourmet', 
          description: 'Ensaladas frescas con aderezos artesanales y proteínas premium',
          image: bowlVeggieImg
        },
        { 
          name: 'Bowls Nutritivos', 
          description: 'Bowls balanceados con superfoods, granos y proteínas de calidad',
          image: bowlSalmonImg
        },
        { 
          name: 'Veggie & Plant Based', 
          description: 'Opciones 100% vegetales creativas para todos los gustos',
          image: bowlVeggieImg
        },
      ],
    },
  };

  const inclusions = [
    { icon: ChefHat, text: 'Chef a cargo y atención personalizada en mesón' },
    { icon: Utensils, text: 'Producción gastronómica con productos de excelente calidad' },
    { icon: Sparkles, text: 'Mesón estilo carro gourmet con decoración temática' },
    { icon: Users, text: 'Mobiliario y decoración acorde a tu evento' },
    { icon: Truck, text: 'Montaje, desmontaje y coordinación completa' },
  ];

  const currentCategory = categories[activeCategory];
  const totalSlides = currentCategory.stations.length;

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <section
      ref={sectionRef}
      id="estaciones"
      className="py-16 md:py-24 bg-secondary/30"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-12 reveal">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-xs uppercase tracking-[0.3em] font-medium rounded-full mb-6">
            Experiencia Única
          </span>
          <h2 className="heading-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            Estaciones Temáticas
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Carros gourmet con productos de excelente calidad, preparados en el momento por nuestro chef
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 reveal">
          {(Object.keys(categories) as Category[]).map((key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`px-6 py-3 text-xs uppercase tracking-[0.15em] font-medium transition-all duration-500 border rounded-full ${
                activeCategory === key
                  ? 'bg-foreground text-background border-foreground shadow-lg scale-105'
                  : 'bg-transparent text-foreground border-foreground/30 hover:border-foreground hover:scale-105'
              }`}
            >
              {categories[key].title}
            </button>
          ))}
        </div>

        {/* Main Carousel Section */}
        <div className="reveal">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            {/* Hero Image Carousel */}
            <div className="relative h-[500px] md:h-[600px]">
              {currentCategory.stations.map((station, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    index === currentSlide 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-0 scale-105'
                  }`}
                >
                  <img
                    src={station.image}
                    alt={`Estación de ${station.name} - Catering temático Entre Tapas`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width={800}
                    height={600}
                  />
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${currentCategory.gradient}`} />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                    <div className={`transition-all duration-500 delay-200 ${
                      index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    }`}>
                      <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs uppercase tracking-wider rounded-full mb-4">
                        {currentCategory.title}
                      </span>
                      <h3 className="heading-serif text-3xl md:text-5xl text-white mb-3">
                        {station.name}
                      </h3>
                      <p className="text-white/90 text-base md:text-lg max-w-xl leading-relaxed mb-6">
                        {station.description}
                      </p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-white/60 text-sm uppercase tracking-wider">Desde</span>
                        <span className="heading-serif text-4xl md:text-5xl text-white">
                          {station.price || currentCategory.price}
                        </span>
                        <span className="text-white/60 text-sm">P/P</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all duration-300 hover:scale-110"
                aria-label="Anterior"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all duration-300 hover:scale-110"
                aria-label="Siguiente"
              >
                <ChevronRight size={24} />
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {currentCategory.stations.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'w-8 bg-white' 
                        : 'w-2 bg-white/50 hover:bg-white/70'
                    }`}
                    aria-label={`Ir a slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Station Thumbnails */}
        <div className="grid grid-cols-3 gap-4 mt-6 reveal">
          {currentCategory.stations.map((station, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`relative overflow-hidden rounded-xl aspect-[4/3] transition-all duration-300 ${
                index === currentSlide 
                  ? 'ring-4 ring-primary ring-offset-2 ring-offset-background scale-105' 
                  : 'opacity-70 hover:opacity-100 hover:scale-105'
              }`}
            >
              <img
                src={station.image}
                alt={`Miniatura ${station.name} - Estación temática`}
                className="w-full h-full object-cover"
                loading="lazy"
                width={300}
                height={225}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute bottom-2 left-2 right-2 text-white text-xs md:text-sm font-medium text-center">
                {station.name}
              </span>
            </button>
          ))}
        </div>

        {/* What's Included */}
        <div className="mt-16 reveal">
          <h3 className="heading-serif text-2xl md:text-3xl text-foreground text-center mb-8">
            ¿Qué incluye cada estación?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {inclusions.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-5 bg-background rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center">
                  <item.icon size={22} className="text-primary" />
                </div>
                <p className="text-foreground text-sm leading-relaxed pt-2.5">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground text-sm italic mt-6">
            * Los valores pueden variar según personalización y requerimientos específicos del evento
          </p>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 reveal">
          <a
            href="#contacto-estaciones"
            className="inline-flex items-center gap-3 px-10 py-4 bg-foreground text-background text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:bg-foreground/90 hover:scale-105 rounded-full shadow-lg"
          >
            <Check size={18} />
            Cotizar Estación
          </a>
        </div>
      </div>
    </section>
  );
};

export default ThematicStations;
