import { useState, useRef } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { useAmanatState } from '../../hooks/useAmanatState';
import { triggerTier1, triggerTier2 } from '../../state/AmanatState';
import { formatCurrency } from '../../utils/helpers';

export default function NomineeDashboard() {
  const state = useAmanatState();
  const [tier2File, setTier2File] = useState(null);
  const [tier2Submitted, setTier2Submitted] = useState(false);
  const fileRef = useRef(null);

  // Access revoked screen
  if (state.accessRevoked) {
    return (
      <div className="min-h-full flex flex-col items-center justify-center px-6 py-20 animate-fade-in bg-[#09090b]">
        <div className="w-24 h-24 rounded-full bg-danger/10 border border-danger/30 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
          <span className="text-4xl">🔒</span>
        </div>
        <h2 className="text-2xl font-black text-white mb-3 tracking-tight">Access Terminated</h2>
        <p className="text-sm text-text-secondary text-center leading-relaxed max-w-[260px]">
          The account holder has manually overridden and revoked your protocol clearance. 
          Contact them through secure channels.
        </p>
      </div>
    );
  }

  // Tier 1 active - show assets
  if (state.emergencyStatus === 'tier1') {
    const liquidAssets = state.assets.filter(a => a.liquid);
    const totalLiquid = liquidAssets.reduce((s, a) => s + a.value, 0);

    return (
      <div className="min-h-full px-5 py-8 animate-fade-in">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-danger flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.4)] animate-pulse-glow">
            <span className="text-2xl text-white font-black">!</span>
          </div>
          <div>
            <h1 className="text-[10px] font-bold text-danger tracking-widest uppercase">Emergency Protocol Active</h1>
            <p className="text-xl font-black text-white tracking-tight">Tier 1 Clearance</p>
          </div>
        </div>

        <div className="glass-card-danger p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-danger opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-danger"></span>
            </span>
            <p className="text-[10px] text-danger font-bold uppercase tracking-widest">Live Visibility Granted</p>
          </div>
          <p className="text-sm text-text-secondary mb-1 mt-4">Immediate Liquid Funds</p>
          <p className="text-4xl font-extrabold text-white tracking-tight">{formatCurrency(totalLiquid)}</p>
        </div>

        <h3 className="text-[13px] font-bold text-white mb-3 ml-1">Accessible Assets</h3>
        <div className="flex flex-col gap-3 mb-8">
          {liquidAssets.map((asset) => (
            <div key={asset.id} className="glass-card p-4 flex items-center justify-between border-l-2 border-l-success">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center text-xl">
                  {asset.type.includes('Savings') && '🏦'}
                  {asset.type.includes('Mutual') && '📈'}
                </div>
                <div>
                  <p className="text-sm font-bold text-white mb-0.5">{asset.type}</p>
                  <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">{asset.institution}</p>
                </div>
              </div>
              <p className="text-base font-bold text-success">{formatCurrency(asset.value)}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#121214] border border-border-default rounded-2xl p-4 flex gap-4">
          <span className="text-xl">📩</span>
          <p className="text-xs text-text-secondary leading-relaxed">
            The account holder is receiving real-time alerts regarding your access. Actions are fully auditable.
          </p>
        </div>
      </div>
    );
  }

  // Tier 2 submitted
  if (tier2Submitted || state.emergencyStatus === 'tier2') {
    return (
      <div className="min-h-full flex flex-col items-center justify-center px-6 py-20 animate-fade-in bg-[#09090b]">
        <div className="w-24 h-24 rounded-full bg-warning/10 border border-warning/30 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
          <span className="text-4xl">⏳</span>
        </div>
        <h2 className="text-2xl font-black text-white mb-2 tracking-tight">Request Processing</h2>
        <p className="text-sm text-text-secondary text-center leading-relaxed max-w-[260px] mb-6">
          Legal succession documents submitted. The account holder has been notified.
        </p>
        <Badge variant="warning" className="px-4 py-2">Hold Period: 24 Hours</Badge>
      </div>
    );
  }

  // Default — trigger panel
  return (
    <div className="min-h-full px-5 py-8 pb-32 bg-[#000000]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-12 h-12 rounded-[18px] bg-[#18181b] border border-border-default flex items-center justify-center shadow-inner">
          <img src="/favicon.svg" alt="Amanat" className="w-7 h-7" onError={(e) => e.target.style.display='none'} />
        </div>
        <div>
          <h1 className="text-[10px] font-bold gradient-text tracking-widest uppercase mb-0.5">Control Center</h1>
          <p className="text-2xl font-black text-white tracking-tight">Triggers</p>
        </div>
      </div>

      <div className="mb-6 ml-1">
        <h2 className="text-[13px] font-bold text-text-muted uppercase tracking-wider mb-2">Emergency Protocols</h2>
        <p className="text-xs text-text-secondary leading-relaxed max-w-[280px]">
          Activate a secure clearance tier. The owner is notified instantly. Misuse is logged.
        </p>
      </div>

      {/* Tier 1 Card */}
      <div className="relative overflow-hidden glass-card p-6 mb-5 border border-border-default hover:border-warning/50 transition-colors shadow-lg">
        <div className="absolute top-0 right-0 w-32 h-32 bg-warning/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 rounded-xl bg-warning/10 border border-warning/20 flex items-center justify-center">
            <span className="text-2xl">🏥</span>
          </div>
          <Badge variant="warning">Tier 1</Badge>
        </div>
        
        <h3 className="text-lg font-bold text-white mb-2 tracking-tight">Hospitalization Access</h3>
        <p className="text-xs text-text-secondary leading-relaxed mb-6">
          Bypass standard holds to view liquid assets immediately. For critical medical emergencies only.
        </p>
        
        <Button variant="secondary" onClick={() => triggerTier1()} className="w-full !bg-[#27272a] hover:!bg-warning/20 hover:!text-warning border-transparent">
          Activate Clearance
        </Button>
      </div>

      {/* Tier 2 Card */}
      <div className="relative overflow-hidden glass-card p-6 mb-8 border border-border-default hover:border-danger/50 transition-colors shadow-lg">
        <div className="absolute top-0 right-0 w-32 h-32 bg-danger/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 rounded-xl bg-danger/10 border border-danger/20 flex items-center justify-center">
            <span className="text-2xl">⚖️</span>
          </div>
          <Badge variant="danger">Tier 2</Badge>
        </div>
        
        <h3 className="text-lg font-bold text-white mb-2 tracking-tight">Succession Transfer</h3>
        <p className="text-xs text-text-secondary leading-relaxed mb-6">
          Initiate legal asset transfer. Requires death certificate upload. Mandatory 24-hour owner review period applies.
        </p>

        <input
          ref={fileRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => setTier2File(e.target.files[0])}
          className="hidden"
        />

        {!tier2File ? (
          <Button variant="secondary" onClick={() => fileRef.current?.click()} className="w-full !bg-[#27272a] hover:!bg-border-default border-transparent">
            Upload Death Certificate
          </Button>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#09090b] border border-success/30">
              <span className="text-success text-sm">✓</span>
              <span className="text-xs text-white truncate flex-1 font-mono">{tier2File.name}</span>
            </div>
            <Button variant="danger" onClick={() => {
              triggerTier2(tier2File.name);
              setTier2Submitted(true);
            }}>
              Submit Legal Request
            </Button>
          </div>
        )}
      </div>

      {/* Trust Indicator */}
      <div className="flex flex-col items-center opacity-40">
        <span className="text-2xl mb-2">🛡️</span>
        <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold text-center">
          Secured by Amanat<br/>Zero-Knowledge Engine
        </p>
      </div>
    </div>
  );
}
