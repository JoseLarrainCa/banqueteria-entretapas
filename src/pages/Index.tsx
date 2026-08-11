import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Menu18 from '@/components/Menu18';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import FiestasPatriasStrip from '@/components/FiestasPatriasStrip';
import FiestasPatriasModal from '@/components/FiestasPatriasModal';

const Index = () => {
  return (
    <main className="min-h-screen">
      <FiestasPatriasStrip />
      <Navbar />
      <Hero />
      <Menu18 />
      <About />
      <Services />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
      <WhatsAppButton />
      <FiestasPatriasModal />
    </main>
  );
};

export default Index;
