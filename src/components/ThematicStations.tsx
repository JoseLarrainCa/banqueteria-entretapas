import { useEffect, useRef, useState } from 'react';
import { ChefHat, Utensils, Users, Truck, Sparkles, Check } from 'lucide-react';

type Category = 'clasicas' | 'street' | 'fresca';

interface Station {
  name: string;
  description: string;
}

const ThematicStations = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<Category>('clasicas');

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

  const categories = {
    clasicas: {
      title: 'Clásicas Gourmet',
      price: '$14.990',
      stations: [
        { name: 'Hamburguesas Gourmet', description: 'Hamburguesas artesanales con ingredientes premium' },
        { name: 'Pizzas Artesanales', description: 'Pizzas al horno con masa madre y toppings selectos' },
        { name: 'Tacos y Fajitas', description: 'Auténtica cocina mexicana con tortillas hechas al momento' },
      ],
    },
    street: {
      title: 'Street Food Premium',
      price: '$15.990',
      stations: [
        { name: 'Hot Dogs Gourmet', description: 'Hot dogs con salchichas artesanales y toppings creativos' },
        { name: 'Sándwiches Premium', description: 'Sándwiches con pan artesanal y rellenos gourmet' },
        { name: 'Arepas / Bao / Panes del Mundo', description: 'Fusión internacional de panes rellenos' },
      ],
    },
    fresca: {
      title: 'Fresca Light',
      price: '$14.990',
      stations: [
        { name: 'Ensaladas Gourmet', description: 'Ensaladas frescas con aderezos artesanales' },
        { name: 'Bowls', description: 'Bowls nutritivos con proteínas y vegetales' },
        { name: 'Veggie / Plant Based', description: 'Opciones 100% vegetales para todos los gustos' },
      ],
    },
  };

  const inclusions = [
    { icon: ChefHat, text: 'Chef a cargo y atención en mesón' },
    { icon: Utensils, text: 'Producción gastronómica con productos de excelente calidad' },
    { icon: Sparkles, text: 'Mesón estilo carro gourmet con decoración temática' },
    { icon: Users, text: 'Mobiliario y decoración acorde al evento' },
    { icon: Truck, text: 'Montaje, desmontaje y coordinación completa' },
  ];

  return (
    <section
      ref={sectionRef}
      id="estaciones"
      className="py-24 md:py-32 bg-secondary/30"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-xs uppercase tracking-[0.3em] font-medium rounded-full mb-6">
            Nuevo
          </span>
          <h2 className="heading-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Estaciones Temáticas
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Estaciones gastronómicas estilo carro gourmet, con productos de excelente calidad 
            preparados en el momento por nuestro chef
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 reveal">
          {(Object.keys(categories) as Category[]).map((key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`px-6 py-3 text-sm uppercase tracking-[0.15em] font-medium transition-all duration-300 border ${
                activeCategory === key
                  ? 'bg-foreground text-background border-foreground'
                  : 'bg-transparent text-foreground border-foreground/30 hover:border-foreground'
              }`}
            >
              {categories[key].title}
            </button>
          ))}
        </div>

        {/* Active Category Content */}
        <div className="reveal">
          <div className="bg-background rounded-lg shadow-lg p-8 md:p-12 mb-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-8 border-b border-border">
              <div>
                <h3 className="heading-serif text-3xl md:text-4xl text-foreground mb-2">
                  {categories[activeCategory].title}
                </h3>
                <p className="text-muted-foreground">Elige entre nuestras opciones gourmet</p>
              </div>
              <div className="mt-4 md:mt-0">
                <span className="text-sm text-muted-foreground uppercase tracking-wider">Desde</span>
                <p className="heading-serif text-4xl md:text-5xl text-primary">
                  {categories[activeCategory].price}
                  <span className="text-lg text-muted-foreground ml-1">P/P</span>
                </p>
              </div>
            </div>

            {/* Stations Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {categories[activeCategory].stations.map((station, index) => (
                <div
                  key={index}
                  className="p-6 border border-border rounded-lg hover:border-primary/50 hover:shadow-md transition-all duration-300"
                >
                  <h4 className="heading-serif text-xl text-foreground mb-2">
                    {station.name}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {station.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* What's Included */}
        <div className="reveal">
          <h3 className="heading-serif text-2xl md:text-3xl text-foreground text-center mb-8">
            ¿Qué incluye cada estación?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {inclusions.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 bg-background rounded-lg"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <item.icon size={20} className="text-primary" />
                </div>
                <p className="text-foreground text-sm leading-relaxed pt-2">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground text-sm italic">
            * Los valores pueden variar según personalización y requerimientos específicos del evento
          </p>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 reveal">
          <a
            href="#contacto"
            className="inline-flex items-center gap-3 px-10 py-4 bg-foreground text-background text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:bg-foreground/90"
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
