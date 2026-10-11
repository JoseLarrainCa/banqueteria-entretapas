import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThematicStations from '@/components/ThematicStations';
import StationContactForm from '@/components/StationContactForm';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';


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

      {/* Contact Form for Stations */}
      <StationContactForm />

      <Footer />
      <WhatsAppButton />

    </main>
  );
};

export default EstacionesTematicas;
