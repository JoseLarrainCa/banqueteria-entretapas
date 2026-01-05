import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

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
          ? 'bg-background/95 backdrop-blur-md shadow-sm py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Left Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.slice(0, 2).map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`nav-link underline-animate ${
                isScrolled ? 'text-foreground' : 'text-cream'
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Logo */}
        <a href="#" className="text-center">
          <h1 
            className={`heading-display text-2xl md:text-3xl font-semibold tracking-wide transition-colors duration-300 ${
              isScrolled ? 'text-foreground' : 'text-cream'
            }`}
          >
            ÉLITE
          </h1>
          <span 
            className={`text-[10px] uppercase tracking-[0.35em] transition-colors duration-300 ${
              isScrolled ? 'text-muted-foreground' : 'text-cream/80'
            }`}
          >
            Banquetería & Eventos
          </span>
        </a>

        {/* Right Navigation */}
        <div className="hidden md:flex items-center gap-10">
          <a
            href="#galeria"
            className={`nav-link underline-animate ${
              isScrolled ? 'text-foreground' : 'text-cream'
            }`}
          >
            Galería
          </a>
          <a
            href="#contacto"
            className={`btn-hero ${isScrolled ? 'btn-outline' : ''}`}
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
