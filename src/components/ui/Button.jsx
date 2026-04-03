export default function Button({ children, onClick, variant = 'primary', disabled = false, className = '', ...props }) {
  const baseStyles = 'w-full py-4 px-6 rounded-[20px] font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed outline-none select-none';

  const variants = {
    primary: 'bg-accent-primary hover:bg-blue-500 text-white shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-0.5 active:scale-95 active:shadow-none active:translate-y-0',
    secondary: 'bg-bg-elevated border border-border-default text-text-primary hover:bg-bg-card-hover hover:border-gray-500 hover:-translate-y-0.5 active:scale-95 active:translate-y-0',
    danger: 'bg-danger hover:bg-red-500 text-white shadow-[0_4px_14px_0_rgba(239,68,68,0.39)] hover:shadow-[0_6px_20px_rgba(239,68,68,0.23)] hover:-translate-y-0.5 active:scale-95 active:shadow-none active:translate-y-0',
    ghost: 'bg-transparent text-accent-secondary hover:bg-bg-card active:scale-95',
    success: 'bg-success hover:bg-emerald-400 text-white shadow-[0_4px_14px_0_rgba(16,185,129,0.39)] hover:-translate-y-0.5 active:scale-95 active:shadow-none active:translate-y-0',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
