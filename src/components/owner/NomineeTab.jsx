import Badge from '../ui/Badge';
import { useAmanatState } from '../../hooks/useAmanatState';
import { maskPan, maskAadhaar } from '../../utils/helpers';

export default function NomineeTab() {
  const state = useAmanatState();
  const { nominee } = state;

  if (!nominee.name) {
    return (
      <div className="flex flex-col items-center justify-center py-24 animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-[#18181b] flex items-center justify-center mb-6 shadow-inner border border-border-default">
          <span className="text-3xl opacity-50">👤</span>
        </div>
        <h3 className="text-base font-bold text-white mb-2">No Nominee Assigned</h3>
        <p className="text-xs text-text-muted text-center max-w-[200px] leading-relaxed">
          Your emergency protocol is inactive until a nominee is verified.
        </p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h3 className="text-[13px] font-bold text-white mb-3 ml-1">Trusted Contact Profile</h3>
      
      <div className="glass-card mb-5 relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent-primary/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-[18px] bg-gradient-to-br from-[#27272a] to-[#18181b] border border-border-default flex items-center justify-center shadow-inner">
                <span className="text-2xl">👤</span>
              </div>
              {nominee.verified && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-success border-2 border-bg-card flex items-center justify-center">
                  <span className="text-[10px] text-white">✓</span>
                </div>
              )}
            </div>
            <div>
              <p className="text-lg font-extrabold text-white mb-0.5 tracking-tight">{nominee.name}</p>
              <p className="text-[11px] text-accent-secondary uppercase tracking-widest font-semibold text-shadow-sm">Nominee</p>
            </div>
          </div>
          {nominee.verified && <Badge variant="success" className="px-3 py-1.5 shadow-[0_0_15px_rgba(16,185,129,0.2)]">Verified ✔</Badge>}
        </div>

        <div className="bg-[#09090b] rounded-[16px] border border-border-default p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-lg opacity-60">📱</span>
              <span className="text-xs text-text-muted font-medium w-24">Phone</span>
            </div>
            <span className="text-sm text-white font-semibold tabular-nums">+91 {nominee.phone}</span>
          </div>
          <div className="w-full h-px bg-border-subtle" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-lg opacity-60">💳</span>
              <span className="text-xs text-text-muted font-medium w-24">PAN</span>
            </div>
            <span className="text-sm text-white font-mono tracking-wider">{maskPan(nominee.pan)}</span>
          </div>
          <div className="w-full h-px bg-border-subtle" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-lg opacity-60">🏛️</span>
              <span className="text-xs text-text-muted font-medium w-24">Aadhaar</span>
            </div>
            <span className="text-sm text-white font-mono tracking-wider">{maskAadhaar(nominee.aadhaar)}</span>
          </div>
        </div>
      </div>

      {state.nomineeCode && !nominee.verified && (
        <div className="glass-card bg-[#121214]">
          <p className="text-[10px] text-warning uppercase tracking-widest font-bold mb-2">Pending Activation</p>
          <div className="flex gap-3">
            <div className="w-1.5 rounded-full bg-warning mt-1 mb-1" />
            <p className="text-xs text-text-secondary leading-relaxed">
              Nominee profile is locked. They must enter their 6-digit access code and complete KYC to enable protocols.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
