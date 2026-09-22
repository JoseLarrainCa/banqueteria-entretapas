import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import EventQuoteModal from '@/components/EventQuoteModal';

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
      <WhatsAppButton />
      <EventQuoteModal />
    </main>
  );
};

export default Index;
