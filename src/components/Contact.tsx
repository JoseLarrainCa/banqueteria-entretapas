import { useEffect, useRef, useState } from 'react';
import { Send } from 'lucide-react';

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    message: '',
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formState);
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
                placeholder="+52 123 456 7890"
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
            <button
              type="submit"
              className="inline-flex items-center gap-3 px-10 py-4 text-xs uppercase tracking-[0.2em] font-medium border border-primary-foreground/80 text-primary-foreground bg-transparent transition-all duration-300 hover:bg-primary-foreground hover:text-primary"
            >
              Enviar Solicitud
              <Send size={16} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
