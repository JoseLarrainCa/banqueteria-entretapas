import { Instagram, Mail, Phone, MapPin } from 'lucide-react';
import logo from '@/assets/logo-entretapas.jpg';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <img 
              src={logo} 
              alt="Entre Tapas - Experiencia Gourmet" 
              className="h-16 w-auto brightness-0 invert mb-6"
            />
            <p className="text-background/70 text-sm leading-relaxed">
              Creamos experiencias culinarias únicas con sabores auténticos
              para los momentos más especiales de tu vida.
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
                <a href="tel:+56969078445" className="hover:text-background transition-colors">
                  +56 9 6907 8445
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-accent" />
                <a href="mailto:entretapasgourmet@gmail.com" className="hover:text-background transition-colors">
                  entretapasgourmet@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-accent flex-shrink-0 mt-0.5" />
                <span>Santiago, Chile</span>
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
                href="https://www.instagram.com/entretapas_gourmet/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-background/30 flex items-center justify-center transition-all duration-300 hover:bg-background hover:text-foreground"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/50 text-xs">
            © 2024 Entre Tapas Gourmet. Todos los derechos reservados.
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
