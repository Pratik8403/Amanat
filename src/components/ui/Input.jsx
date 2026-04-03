export default function Input({ label, value, onChange, placeholder, type = 'text', error, maxLength, className = '', ...props }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-xs font-semibold text-text-secondary tracking-widest uppercase ml-1">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`w-full bg-bg-primary border ${
          error ? 'border-danger' : 'border-border-default hover:border-gray-600 focus:border-accent-primary focus:bg-bg-elevated'
        } rounded-2xl px-5 py-4 text-sm text-text-primary placeholder-text-muted outline-none transition-all duration-300 focus:ring-4 ${
          error ? 'focus:ring-danger/20' : 'focus:ring-accent-glow'
        }`}
        {...props}
      />
      {error && (
        <span className="text-xs text-danger ml-1 font-medium">{error}</span>
      )}
    </div>
  );
}
