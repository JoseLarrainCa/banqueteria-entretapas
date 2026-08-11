const Banderines = ({ className = '' }: { className?: string }) => {
  // Alternating Chilean flag colors as design tokens
  const colors = ['chile-red', 'cream', 'chile-blue'];
  const count = 40;

  return (
    <div
      aria-hidden="true"
      className={`w-full overflow-hidden pointer-events-none select-none ${className}`}
    >
      <div className="flex w-full justify-between">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={`h-4 md:h-5 flex-1 mx-[1px] bg-${colors[i % 3]}/90`}
            style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
          />
        ))}
      </div>
    </div>
  );
};

export default Banderines;
