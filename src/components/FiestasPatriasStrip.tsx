import Banderines from './Banderines';

const FiestasPatriasStrip = () => {
  return (
    <div className="relative bg-chile-red text-cream">
      <div className="max-w-7xl mx-auto px-6 py-2.5 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
        <p className="text-[11px] md:text-xs uppercase tracking-[0.2em] font-medium">
          Fiestas Patrias · Cupos limitados para el 18
        </p>
        <a
          href="#menu-18"
          className="text-[11px] md:text-xs uppercase tracking-[0.2em] font-semibold underline-animate"
        >
          Cotiza tu 18
        </a>
      </div>
      <Banderines className="absolute left-0 right-0 top-full" />
    </div>
  );
};

export default FiestasPatriasStrip;
