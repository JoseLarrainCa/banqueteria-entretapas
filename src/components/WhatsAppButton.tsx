const WhatsAppButton = () => {
  const phone = "56969078445";
  const message = encodeURIComponent("Hola, me gustaría cotizar un servicio de catering.");
  const url = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 hover:shadow-xl"
    >
      <svg viewBox="0 0 32 32" className="w-8 h-8 fill-white">
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.96A15.9 15.9 0 0016.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.31 22.594c-.39 1.1-1.932 2.014-3.164 2.28-.844.18-1.946.324-5.66-1.216-4.752-1.97-7.81-6.79-8.046-7.104-.228-.314-1.862-2.48-1.862-4.73s1.178-3.354 1.596-3.812c.418-.458.912-.572 1.216-.572.304 0 .608.002.874.016.28.014.656-.106.026 1.61-.228.618-1.28 3.122-1.394 3.35-.114.228-.19.494-.038.794s.228.456.456.722c.228.266.478.594.684.798.228.228.462.476.792.836.33.36.694.876 1.178 1.482.624.782 1.376 1.47 2.226 1.94.312.172.556.144.778-.076.228-.228.95-1.1 1.204-1.482.252-.38.506-.314.854-.19.348.128 2.212 1.044 2.592 1.234.38.19.632.286.726.444.096.158.096.912-.294 2.012z" />
      </svg>
    </a>
  );
};

export default WhatsAppButton;
