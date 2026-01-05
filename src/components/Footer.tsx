import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <h3 className="heading-display text-2xl font-semibold mb-2">
              ÉLITE
            </h3>
            <p className="text-[10px] uppercase tracking-[0.35em] text-background/60 mb-6">
              Banquetería & Eventos
            </p>
            <p className="text-background/70 text-sm leading-relaxed">
              Creamos experiencias culinarias extraordinarias para los momentos
              más importantes de su vida.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] mb-6">
              Contacto
            </h4>
            <ul className="space-y-4 text-sm text-background/70">
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-accent" />
                <span>+52 55 1234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-accent" />
                <span>info@elitebanqueteria.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-accent flex-shrink-0 mt-0.5" />
                <span>Ciudad de México, México</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] mb-6">
              Síguenos
            </h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 border border-background/30 flex items-center justify-center transition-all duration-300 hover:bg-background hover:text-foreground"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-background/30 flex items-center justify-center transition-all duration-300 hover:bg-background hover:text-foreground"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/50 text-xs">
            © 2024 Élite Banquetería. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-xs text-background/50">
            <a href="#" className="hover:text-background transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="hover:text-background transition-colors">
              Términos de Servicio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
