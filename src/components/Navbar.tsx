import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoDark from '@/assets/logo-entretapas-dark.png';
import logoWhite from '@/assets/logo-entretapas-white.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Galería', href: '#galeria' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav
        className={`max-w-7xl mx-auto px-6 md:px-12 relative flex items-center justify-between transition-all duration-500 ${
          isScrolled ? 'py-4' : 'py-6'
        }`}
      >
        {/* Left Navigation */}
        <div className="hidden md:flex items-center gap-8 justify-self-start">
          <a
            href="#nosotros"
            className={`nav-link underline-animate ${
              isScrolled ? 'text-foreground' : 'text-cream'
            }`}
          >
            Nosotros
          </a>
          <a
            href="#servicios"
            className={`nav-link underline-animate ${
              isScrolled ? 'text-foreground' : 'text-cream'
            }`}
          >
            Servicios
          </a>
          <Link
            to="/estaciones"
            className={`nav-link underline-animate relative ${
              isScrolled ? 'text-foreground' : 'text-cream'
            }`}
          >
            <span className="absolute -top-3 -right-7 px-1.5 py-0.5 bg-primary text-primary-foreground text-[8px] uppercase tracking-wider font-bold rounded-sm">
              Nuevo
            </span>
            Estaciones
          </Link>
        </div>

        {/* Logo - Centered */}
        <a href="#" className="flex items-center justify-center flex-shrink-0">
          <img
            src={isScrolled ? logoDark : logoWhite}
            alt="Entre Tapas - Experiencia Gourmet"
            className="h-12 md:h-16 w-auto"
          />
        </a>

        {/* Right Navigation */}
        <div className="hidden md:flex items-center gap-8 flex-1 justify-end justify-self-end">
          <a
            href="#galeria"
            className={`nav-link underline-animate ${
              isScrolled ? 'text-foreground' : 'text-cream'
            }`}
          >
            Galería
          </a>
          <a
            href="#testimonios"
            className={`nav-link underline-animate ${
              isScrolled ? 'text-foreground' : 'text-cream'
            }`}
          >
            Testimonios
          </a>
          <a
            href="#contacto"
            className="px-5 py-2.5 text-xs uppercase tracking-[0.15em] font-medium bg-primary text-primary-foreground whitespace-nowrap transition-all duration-300 hover:bg-primary/90"
          >
            Cotiza tu evento
          </a>
          <a
            href="#contacto"
            className={`px-6 py-2.5 text-xs uppercase tracking-[0.15em] font-medium border transition-all duration-300 ${
              isScrolled 
                ? 'border-foreground text-foreground hover:bg-foreground hover:text-background' 
                : 'border-cream text-cream hover:bg-cream hover:text-foreground'
            }`}
          >
            Contáctanos
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden p-2 transition-colors ${
            isScrolled ? 'text-foreground' : 'text-cream'
          }`}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-md shadow-lg transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="px-6 py-8 flex flex-col gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="nav-link text-foreground"
            >
              {link.name}
            </a>
          ))}
          <Link
            to="/estaciones"
            onClick={() => setIsMobileMenuOpen(false)}
            className="nav-link text-foreground flex items-center gap-2"
          >
            Estaciones
            <span className="px-1.5 py-0.5 bg-primary text-primary-foreground text-[8px] uppercase tracking-wider font-bold rounded-sm">
              Nuevo
            </span>
          </Link>
          <a
            href="#contacto"
            onClick={() => setIsMobileMenuOpen(false)}
            className="btn-primary text-center"
          >
            Cotiza tu evento
          </a>
          <a
            href="#contacto"
            onClick={() => setIsMobileMenuOpen(false)}
            className="btn-primary text-center"
          >
            Contáctanos
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;