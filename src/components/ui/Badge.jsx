export default function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-bg-elevated text-text-secondary border-border-default',
    success: 'bg-success-soft text-success border-success/20',
    danger: 'bg-danger-soft text-danger border-danger/20',
    warning: 'bg-warning-soft text-warning border-warning/20',
    accent: 'bg-accent-glow text-accent-secondary border-accent-primary/20',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-bold border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
