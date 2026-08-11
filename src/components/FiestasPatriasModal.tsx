import { useEffect, useState } from 'react';
import { X, Send, CheckCircle, AlertCircle } from 'lucide-react';
import bannerAsset from '@/assets/fiestas-patrias-banner.png.asset.json';
import Banderines from './Banderines';

const STORAGE_KEY = 'fp18-modal-dismissed';
const WHATSAPP_PHONE = '56969078445';

const FiestasPatriasModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    eventDate: '',
    guests: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    let dismissed: string | null = null;
    try {
      dismissed = localStorage.getItem(STORAGE_KEY);
    } catch {
      dismissed = null;
    }
    if (dismissed === today) return;
    const timer = setTimeout(() => setIsOpen(true), 700);
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setIsOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, new Date().toISOString().slice(0, 10));
    } catch {
      /* almacenamiento no disponible */
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const whatsappUrl = () => {
    const parts = [
      'Hola, quiero cotizar mi celebración de Fiestas Patrias (18 de septiembre).',
      formState.name ? `Mi nombre es ${formState.name}.` : '',
      formState.guests ? `Seríamos ${formState.guests} personas.` : '',
      formState.eventDate ? `Fecha estimada: ${formState.eventDate}.` : '',
    ].filter(Boolean);
    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(parts.join(' '))}`;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://formspree.io/f/mzddgpno', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'Cotización Fiestas Patrias',
          name: formState.name,
          phone: formState.phone,
          email: formState.email,
          eventDate: formState.eventDate,
          guests: formState.guests,
          message: formState.message,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormState({ name: '', phone: '', email: '', eventDate: '', guests: '', message: '' });
        if (typeof (window as any).gtag === 'function') {
          (window as any).gtag('event', 'conversion', {
            send_to: 'AW-831126588/JspbCO2CrYQcELz4p4wD',
            value: 1.0,
            currency: 'USD',
          });
        }
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const inputClass =
    'w-full bg-transparent border-b border-border pb-2 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none transition-colors';

  return (
    <div className="fixed inset-0 z-[100] flex items-start md:items-center justify-center overflow-y-auto p-4 md:p-6">
      <div
        className="fixed inset-0 bg-foreground/70 backdrop-blur-sm animate-fade-in"
        onClick={close}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Cotiza tu 18"
        className="relative z-10 w-full max-w-2xl bg-card shadow-2xl animate-scale-in my-auto"
      >
        <button
          onClick={close}
          aria-label="Cerrar"
          className="absolute top-3 right-3 z-20 p-2 bg-background/80 text-foreground hover:bg-background transition-colors"
        >
          <X size={18} />
        </button>

        <img
          src={bannerAsset.url}
          alt="Fiestas Patrias — Reserva tu evento gourmet con Entre Tapas"
          className="w-full h-auto"
          loading="eager"
        />
        <Banderines />

        <div className="px-6 md:px-10 py-6 md:py-8">
          <p className="section-subtitle mb-2">18 de Septiembre · Cupos limitados</p>
          <h2 className="heading-display text-3xl md:text-4xl font-light mb-2">Cotiza tu 18</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Empanadas, anticuchos, choripán y más, servidos con estilo gourmet. Reserva tu cupo
            antes de que se agenden las fechas.
          </p>

          {submitStatus === 'success' ? (
            <div className="flex items-start gap-3 text-primary py-4">
              <CheckCircle size={22} className="mt-0.5 shrink-0" />
              <p className="text-sm">
                ¡Solicitud enviada! Te contactaremos muy pronto con tu propuesta para el 18.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <input
                  className={inputClass}
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  placeholder="Nombre completo *"
                  required
                />
                <input
                  className={inputClass}
                  type="tel"
                  name="phone"
                  value={formState.phone}
                  onChange={handleChange}
                  placeholder="Teléfono *"
                  required
                />
              </div>
              <div className="grid md:grid-cols-3 gap-5">
                <input
                  className={inputClass}
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
                <input
                  className={inputClass}
                  type="date"
                  name="eventDate"
                  value={formState.eventDate}
                  onChange={handleChange}
                  aria-label="Fecha del evento"
                />
                <input
                  className={inputClass}
                  type="number"
                  min="1"
                  name="guests"
                  value={formState.guests}
                  onChange={handleChange}
                  placeholder="N° de invitados"
                />
              </div>
              <textarea
                className={`${inputClass} resize-none`}
                name="message"
                rows={2}
                value={formState.message}
                onChange={handleChange}
                placeholder="Ubicación, preferencias, horario..."
              />

              {submitStatus === 'error' && (
                <div className="flex items-center gap-2 text-destructive text-sm">
                  <AlertCircle size={16} />
                  <span>Hubo un error. Intenta de nuevo o escríbenos por WhatsApp.</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button type="submit" disabled={isSubmitting} className="btn-primary disabled:opacity-50">
                  <span className="inline-flex items-center gap-2">
                    {isSubmitting ? 'Enviando...' : 'Enviar cotización'}
                    <Send size={14} />
                  </span>
                </button>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 text-xs uppercase tracking-[0.2em] font-medium bg-whatsapp text-cream text-center transition-all duration-300 hover:opacity-90"
                >
                  Escríbenos por WhatsApp
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default FiestasPatriasModal;
