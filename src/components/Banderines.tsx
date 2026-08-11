const Banderines = ({ className = '' }: { className?: string }) => {
  const colors = ['bg-chile-red', 'bg-cream', 'bg-chile-blue'];
  const count = 26;

  return (
    <div
      aria-hidden="true"
      className={`w-full overflow-hidden pointer-events-none select-none ${className}`}
    >
      <div className="h-px w-full bg-foreground/20" />
      <div className="flex w-full">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={`h-5 md:h-6 flex-1 mx-[2px] shadow-sm ${colors[i % 3]}`}
            style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
          />
        ))}
      </div>
    </div>
  );
};

export default Banderines;
