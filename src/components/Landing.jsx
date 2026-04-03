import { useNavigate } from 'react-router-dom';
import Card from './ui/Card';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-full flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden bg-bg-pure">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent-primary/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Logo & Brand */}
      <div className="flex flex-col items-center justify-center mb-16 relative z-10 animate-fade-in w-full mt-8">
        <div className="w-24 h-24 rounded-[32px] bg-[#18181b] border border-[#27272a] shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_1px_3px_rgba(255,255,255,0.1)] flex items-center justify-center mb-8 relative">
          {/* Inner pulse ring */}
          <div className="absolute inset-0 rounded-[32px] border border-accent-primary/30 animate-pulse-glow" />
          <img src="/favicon.svg" alt="Amanat Shield" className="w-12 h-12" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }} />
          <span className="text-4xl hidden">🛡️</span>
        </div>
        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-3 font-sans">Amanat</h1>
        <p className="text-[13px] text-text-secondary text-center max-w-[260px] leading-relaxed font-medium uppercase tracking-widest px-4 border-l-2 border-r-2 border-accent-primary/30">
          Emergency Financial Intelligence Protocol
        </p>
      </div>

      {/* Role selection */}
      <div className="w-full flex flex-col gap-5 relative z-10 animate-slide-up mt-auto pb-4">
        <p className="text-[10px] text-text-muted text-center uppercase tracking-[0.2em] font-bold mb-2">
          Select Clearance Level
        </p>

        <Card
          variant="glow"
          className="group !py-5"
          onClick={() => navigate('/owner')}
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)] group-hover:scale-105 transition-transform duration-300">
              <span className="text-2xl text-white">👤</span>
            </div>
            <div className="flex-1">
              <h2 className="text-base font-bold text-white mb-1 tracking-tight">Account Holder</h2>
              <p className="text-[11px] text-text-secondary tracking-wide">Map assets & configure delegates</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#27272a] flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Card>

        <Card
          variant="default"
          className="group !py-5 hover:!border-success/40 transition-colors"
          onClick={() => navigate('/nominee')}
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-success/10 border border-success/30 flex items-center justify-center group-hover:bg-success/20 group-hover:scale-105 transition-all duration-300">
              <span className="text-2xl opacity-90">🤝</span>
            </div>
            <div className="flex-1">
              <h2 className="text-base font-bold text-white mb-1 tracking-tight">Trusted Nominee</h2>
              <p className="text-[11px] text-text-secondary tracking-wide">Enter access code & trigger verify</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#27272a] flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <div className="w-full text-center mt-8 pb-4 relative z-10 animate-fade-in opacity-40">
        <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-white mb-1.5">
          Zero-Knowledge Architecture
        </p>
        <p className="text-[10px] text-white">
          Runtime-Only Demo Edition
        </p>
      </div>
    </div>
  );
}
