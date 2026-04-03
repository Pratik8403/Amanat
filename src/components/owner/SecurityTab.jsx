import Card from '../ui/Card';
import Button from '../ui/Button';
import { useAmanatState } from '../../hooks/useAmanatState';
import { revokeAccess } from '../../state/AmanatState';
import { formatTimestamp } from '../../utils/helpers';

export default function SecurityTab() {
  const state = useAmanatState();

  const handleRevoke = () => {
    if (window.confirm('CRITICAL ACTION\nAre you sure you want to revoke all nominee access? This cannot be undone.')) {
      revokeAccess();
    }
  };

  return (
    <div className="animate-fade-in">
      <h3 className="text-[13px] font-bold text-white mb-3 ml-1">Protocol Controls</h3>

      {/* Extreme Emergency Banners */}
      {state.emergencyStatus && !state.accessRevoked && (
        <div className="mb-6 animate-pulse-glow">
          <Card variant="danger" className="relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-danger/20 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-danger/20 flex items-center justify-center border border-danger/50 shadow-[0_0_20px_rgba(239,68,68,0.5)]">
                <span className="text-xl">🚨</span>
              </div>
              <div>
                <p className="text-[11px] font-bold text-danger uppercase tracking-widest">Protocol Activated</p>
                <p className="text-lg font-black text-white">
                  {state.emergencyStatus === 'tier1' ? 'Tier 1 Triggered' : 'Tier 2 Initiated'}
                </p>
              </div>
            </div>
            
            <div className="bg-[#000000] rounded-xl p-4 border border-danger/30 mb-5 shadow-inner">
              <p className="text-xs text-text-primary leading-relaxed">
                {state.emergencyStatus === 'tier1'
                  ? 'Your trusted nominee has declared a hospitalization emergency. They currently have visibility over your liquid asset balances.'
                  : 'A succession transfer has been requested alongside mandatory legal documents. You have 24 hours to dispute.'}
              </p>
            </div>

            <Button variant="danger" onClick={handleRevoke} className="!py-4">
              Revoke All Permissions Instantly
            </Button>
          </Card>
        </div>
      )}

      {/* Revoked State */}
      {state.accessRevoked && (
        <Card className="mb-6 border border-success/30 bg-[#121214]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center border border-success/20">
              <span className="text-2xl">🔒</span>
            </div>
            <div>
              <p className="text-sm font-bold text-success">App Secured</p>
              <p className="text-xs text-text-secondary mt-0.5">All nominee delegations revoked.</p>
            </div>
          </div>
        </Card>
      )}

      {/* Default Kill Switch */}
      {!state.accessRevoked && !state.emergencyStatus && (
        <Card className="mb-6 bg-[#121214]">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-lg">🛡️</span>
            <div>
              <p className="text-sm font-bold text-white">Master Kill Switch</p>
              <p className="text-[10px] text-text-muted mt-0.5">Terminate all active connections instantly.</p>
            </div>
          </div>
          <Button variant="danger" onClick={handleRevoke}>
            Terminate Access
          </Button>
        </Card>
      )}

      {/* Activity Log Feed */}
      <h3 className="text-[13px] font-bold text-white mb-3 ml-1 mt-6">Audit Trail</h3>
      
      <div className="relative pl-3">
        {/* Timeline track */}
        <div className="absolute top-2 bottom-2 left-[15px] w-px bg-border-subtle" />
        
        {state.securityLogs.length === 0 ? (
          <div className="py-8 ml-6">
            <p className="text-xs text-text-muted">No security events triggered.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {state.securityLogs.map((log) => {
              // Extract emoji and type
              let color = 'bg-accent-primary';
              let shadow = 'shadow-[0_0_10px_rgba(37,99,235,0.3)]';
              
              if (log.type === 'danger') { color = 'bg-danger'; shadow = 'shadow-[0_0_10px_rgba(239,68,68,0.5)]'; }
              if (log.type === 'warning') { color = 'bg-warning'; shadow = 'shadow-[0_0_10px_rgba(245,158,11,0.5)]'; }
              if (log.type === 'success') { color = 'bg-success'; shadow = 'shadow-[0_0_10px_rgba(16,185,129,0.3)]'; }

              return (
                <div key={log.id} className="relative pl-8">
                  {/* Timeline dot */}
                  <div className={`absolute top-1.5 left-[-4.5px] w-3 h-3 rounded-full border-2 border-bg-primary ${color} ${shadow} z-10`} />
                  
                  <div className="glass-card bg-[#121214] p-3 transition-transform hover:translate-x-1">
                    <p className="text-[10px] text-text-muted font-mono mb-1 tracking-wider uppercase">
                      {formatTimestamp(log.timestamp)}
                    </p>
                    <p className="text-xs text-white font-medium leading-relaxed">
                      {log.message}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
