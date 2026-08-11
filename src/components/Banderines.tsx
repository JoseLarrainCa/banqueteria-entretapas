const Banderines = ({ className = '' }: { className?: string }) => {
  const colors = ['bg-chile-red/90', 'bg-cream', 'bg-chile-blue/90'];
  const count = 40;

  return (
    <div
      aria-hidden="true"
      className={`w-full overflow-hidden pointer-events-none select-none ${className}`}
    >
      <div className="flex w-full">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={`h-4 md:h-5 flex-1 mx-[1px] ${colors[i % 3]}`}
            style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
          />
        ))}
      </div>
    </div>
  );
};

export default Banderines;
