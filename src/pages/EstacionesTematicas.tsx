import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThematicStations from '@/components/ThematicStations';
import Footer from '@/components/Footer';

const EstacionesTematicas = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md shadow-sm py-4">
        <nav className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm uppercase tracking-[0.15em] font-medium">Volver al Inicio</span>
          </Link>
          <a
            href="#contacto-estaciones"
            className="px-6 py-2.5 text-xs uppercase tracking-[0.15em] font-medium border border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
          >
            Cotizar Estación
          </a>
        </nav>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-20" />

      {/* Thematic Stations Content */}
      <ThematicStations />

      {/* Contact Section for Stations */}
      <section id="contacto-estaciones" className="py-24 md:py-32 bg-foreground text-background">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className="heading-serif text-4xl md:text-5xl mb-6">
            ¿Te interesa una estación?
          </h2>
          <p className="text-background/80 mb-10 max-w-2xl mx-auto">
            Cuéntanos sobre tu evento y te ayudaremos a elegir la estación perfecta para tus invitados.
          </p>
          <Link
            to="/#contacto"
            className="inline-flex items-center gap-3 px-10 py-4 bg-background text-foreground text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:bg-background/90"
          >
            Solicitar Cotización
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default EstacionesTematicas;
