export default function Card({ children, className = '', variant = 'default', onClick }) {
  // variants: default, glow, danger
  const baseClass = onClick ? 'cursor-pointer transition-transform duration-300 hover:-translate-y-1 active:scale-[0.98]' : '';
  
  let typeClass;
  if (variant === 'glow') typeClass = 'glass-card-glow';
  else if (variant === 'danger') typeClass = 'glass-card-danger';
  else typeClass = 'glass-card';

  return (
    <div
      className={`${typeClass} p-5 ${baseClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
