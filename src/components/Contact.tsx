import { useEffect, useRef, useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => {
                el.classList.add('active');
              }, i * 150);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://formspree.io/f/mzddgpno', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          phone: formState.phone,
          eventType: formState.eventType,
          message: formState.message,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormState({ name: '', email: '', phone: '', eventType: '', message: '' });
        // Google Ads conversion tracking
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'conversion', {
            send_to: 'AW-831126588/JspbCO2CrYQcELz4p4wD',
            value: 1.0,
            currency: 'USD',
          });
        }
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="section-padding bg-primary text-primary-foreground"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <p className="text-xs uppercase tracking-[0.3em] text-primary-foreground/70 mb-4">
            Contáctanos
          </p>
          <h2 className="heading-display text-4xl md:text-5xl lg:text-6xl font-light">
            Hagamos Realidad
            <br />
            Su Evento
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="reveal">
              <label className="block text-xs uppercase tracking-[0.2em] mb-3 text-primary-foreground/80">
                Nombre Completo
              </label>
              <input
                type="text"
                name="name"
                value={formState.name}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-primary-foreground/30 pb-3 text-primary-foreground placeholder-primary-foreground/40 focus:border-primary-foreground focus:outline-none transition-colors"
                placeholder="Su nombre"
                required
              />
            </div>
            <div className="reveal">
              <label className="block text-xs uppercase tracking-[0.2em] mb-3 text-primary-foreground/80">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-primary-foreground/30 pb-3 text-primary-foreground placeholder-primary-foreground/40 focus:border-primary-foreground focus:outline-none transition-colors"
                placeholder="correo@ejemplo.com"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="reveal">
              <label className="block text-xs uppercase tracking-[0.2em] mb-3 text-primary-foreground/80">
                Teléfono
              </label>
              <input
                type="tel"
                name="phone"
                value={formState.phone}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-primary-foreground/30 pb-3 text-primary-foreground placeholder-primary-foreground/40 focus:border-primary-foreground focus:outline-none transition-colors"
                placeholder="+56 9 1234 5678"
              />
            </div>
            <div className="reveal">
              <label className="block text-xs uppercase tracking-[0.2em] mb-3 text-primary-foreground/80">
                Tipo de Evento
              </label>
              <select
                name="eventType"
                value={formState.eventType}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-primary-foreground/30 pb-3 text-primary-foreground focus:border-primary-foreground focus:outline-none transition-colors cursor-pointer appearance-none"
              >
                <option value="" className="text-foreground">Seleccione una opción</option>
                <option value="boda" className="text-foreground">Boda</option>
                <option value="corporativo" className="text-foreground">Evento Corporativo</option>
                <option value="social" className="text-foreground">Evento Social</option>
                <option value="otro" className="text-foreground">Otro</option>
              </select>
            </div>
          </div>

          <div className="reveal">
            <label className="block text-xs uppercase tracking-[0.2em] mb-3 text-primary-foreground/80">
              Cuéntenos sobre su evento
            </label>
            <textarea
              name="message"
              value={formState.message}
              onChange={handleChange}
              rows={4}
              className="w-full bg-transparent border-b border-primary-foreground/30 pb-3 text-primary-foreground placeholder-primary-foreground/40 focus:border-primary-foreground focus:outline-none transition-colors resize-none"
              placeholder="Fecha, número de invitados, ubicación, preferencias..."
            />
          </div>

          <div className="reveal text-center pt-4">
            {submitStatus === 'success' ? (
              <div className="flex items-center justify-center gap-3 text-primary-foreground">
                <CheckCircle size={24} />
                <span className="text-sm uppercase tracking-[0.2em]">
                  ¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.
                </span>
              </div>
            ) : (
              <>
                {submitStatus === 'error' && (
                  <div className="flex items-center justify-center gap-2 text-red-300 mb-4">
                    <AlertCircle size={18} />
                    <span className="text-sm">Hubo un error. Por favor, intenta de nuevo.</span>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-3 px-10 py-4 text-xs uppercase tracking-[0.2em] font-medium border border-primary-foreground/80 text-primary-foreground bg-transparent transition-all duration-300 hover:bg-primary-foreground hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                  <Send size={16} />
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
