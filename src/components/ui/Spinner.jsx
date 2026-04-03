export default function Spinner({ size = 20, className = '' }) {
  return (
    <div
      className={`inline-block rounded-full border-2 border-text-muted border-t-accent-primary ${className}`}
      style={{
        width: size,
        height: size,
        animation: 'spin 0.8s linear infinite',
      }}
    />
  );
}
