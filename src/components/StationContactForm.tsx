import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const StationContactForm = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    stationType: '',
    guests: '',
    eventDate: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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
          formType: 'Cotización Estación Temática',
          name: formState.name,
          email: formState.email,
          phone: formState.phone,
          stationType: formState.stationType,
          guests: formState.guests,
          eventDate: formState.eventDate,
          message: formState.message,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormState({ name: '', email: '', phone: '', stationType: '', guests: '', eventDate: '', message: '' });
        // Google Ads conversion tracking
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
    <section id="contacto-estaciones" className="py-24 md:py-32 bg-foreground text-background">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-background/70 mb-4">
            Cotiza tu estación
          </p>
          <h2 className="heading-serif text-4xl md:text-5xl lg:text-6xl font-light mb-4">
            ¿Te interesa una estación?
          </h2>
          <p className="text-background/80 max-w-xl mx-auto">
            Cuéntanos sobre tu evento y te ayudaremos a elegir la estación perfecta para tus invitados.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] mb-3 text-background/80">
                Nombre Completo
              </label>
              <input
                type="text"
                name="name"
                value={formState.name}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-background/30 pb-3 text-background placeholder-background/40 focus:border-background focus:outline-none transition-colors"
                placeholder="Su nombre"
                required
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] mb-3 text-background/80">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-background/30 pb-3 text-background placeholder-background/40 focus:border-background focus:outline-none transition-colors"
                placeholder="correo@ejemplo.com"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] mb-3 text-background/80">
                Teléfono
              </label>
              <input
                type="tel"
                name="phone"
                value={formState.phone}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-background/30 pb-3 text-background placeholder-background/40 focus:border-background focus:outline-none transition-colors"
                placeholder="+56 9 1234 5678"
                required
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] mb-3 text-background/80">
                Tipo de Estación
              </label>
              <select
                name="stationType"
                value={formState.stationType}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-background/30 pb-3 text-background focus:border-background focus:outline-none transition-colors cursor-pointer appearance-none"
                required
              >
                <option value="" className="text-foreground">Seleccione una opción</option>
                <option value="clasicas-hamburguesas" className="text-foreground">Clásicas - Hamburguesas Gourmet</option>
                <option value="clasicas-pizzas" className="text-foreground">Clásicas - Pizzas Artesanales</option>
                <option value="clasicas-tacos" className="text-foreground">Clásicas - Tacos y Fajitas</option>
                <option value="street-hotdogs" className="text-foreground">Street Food - Hot Dogs Gourmet</option>
                <option value="street-sandwiches" className="text-foreground">Street Food - Sándwiches Premium</option>
                <option value="street-panes" className="text-foreground">Street Food - Arepas / Bao / Panes del Mundo</option>
                <option value="fresca-ensaladas" className="text-foreground">Fresca - Ensaladas Gourmet</option>
                <option value="fresca-bowls" className="text-foreground">Fresca - Bowls Nutritivos</option>
                <option value="fresca-veggie" className="text-foreground">Fresca - Veggie & Plant Based</option>
                <option value="multiple" className="text-foreground">Múltiples Estaciones</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] mb-3 text-background/80">
                Número de Invitados
              </label>
              <input
                type="number"
                name="guests"
                value={formState.guests}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-background/30 pb-3 text-background placeholder-background/40 focus:border-background focus:outline-none transition-colors"
                placeholder="Ej: 50"
                min="1"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] mb-3 text-background/80">
                Fecha del Evento
              </label>
              <input
                type="date"
                name="eventDate"
                value={formState.eventDate}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-background/30 pb-3 text-background placeholder-background/40 focus:border-background focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.2em] mb-3 text-background/80">
              Cuéntenos más sobre su evento
            </label>
            <textarea
              name="message"
              value={formState.message}
              onChange={handleChange}
              rows={4}
              className="w-full bg-transparent border-b border-background/30 pb-3 text-background placeholder-background/40 focus:border-background focus:outline-none transition-colors resize-none"
              placeholder="Ubicación, horario, preferencias especiales, restricciones alimentarias..."
            />
          </div>

          <div className="text-center pt-4">
            {submitStatus === 'success' ? (
              <div className="flex items-center justify-center gap-3 text-background">
                <CheckCircle size={24} />
                <span className="text-sm uppercase tracking-[0.2em]">
                  ¡Solicitud enviada! Nos pondremos en contacto pronto.
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
                  className="inline-flex items-center gap-3 px-10 py-4 text-xs uppercase tracking-[0.2em] font-medium border border-background/80 text-background bg-transparent transition-all duration-300 hover:bg-background hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed rounded-full"
                >
                  {isSubmitting ? 'Enviando...' : 'Solicitar Cotización'}
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

export default StationContactForm;
