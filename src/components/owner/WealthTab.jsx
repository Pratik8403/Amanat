import { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Spinner from '../ui/Spinner';
import { useAmanatState } from '../../hooks/useAmanatState';
import { updateAssets, DEFAULT_ASSETS } from '../../state/AmanatState';
import { parseExcelFile } from '../../utils/excelParser';
import { formatCurrency } from '../../utils/helpers';

export default function WealthTab() {
  const state = useAmanatState();
  const [loading, setLoading] = useState(true);
  const [excelData, setExcelData] = useState(null);

  // Silent load logic
  useEffect(() => {
    // Only attempt load if we don't already have custom assets
    if (state.customAssets) {
      setLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        const response = await fetch('/data/wealth_data.xlsx');
        if (!response.ok) throw new Error('File not found');
        
        const blob = await response.blob();
        const file = new File([blob], 'wealth_data.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        
        const data = await parseExcelFile(file);
        setExcelData(data);
        updateAssets(data, true); // this will trigger a re-render from state
      } catch (err) {
        console.warn('Silent fetch failed, falling back to mock assets:', err);
        // Fallback is automatic since state.assets already has DEFAULT_ASSETS
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [state.customAssets]);

  const activeAssets = state.customAssets || state.assets;
  // If using excel data directly for UI tables, activeAssets might be raw objects if parseExcelFile just returns rows.
  // In our parseExcelFile, it returns { headers, rows }. The updateAssets sets customAssets to this object.
  // We need to gracefully branch between mock structured assets or Excel raw rendering.
  
  const isExcelFormat = activeAssets && activeAssets.headers && activeAssets.rows;

  let totalValue = 0;
  let liquidValue = 0;

  if (isExcelFormat) {
    // Very rough heuristic for Excel: if there's a column with "Amount" or "Value", sum it up.
    // For a pitch, it's safer to just default to the mock asset view for cards, but let's assume we render the raw table if it works.
  } else {
    totalValue = activeAssets.reduce((sum, a) => sum + a.value, 0);
    liquidValue = activeAssets.reduce((sum, a) => a.liquid ? sum + a.value : sum, 0);
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
        <Spinner size={32} className="mb-4" />
        <p className="text-sm text-text-secondary font-medium tracking-wide">Syncing Financial Core...</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {!isExcelFormat && (
        <>
          {/* Premium Portfolio Summary */}
          <div className="mb-6 relative overflow-hidden rounded-[24px] bg-[#121214] border border-border-default shadow-lg p-6">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-accent-primary/10 to-transparent pointer-events-none" />
            
            <p className="text-[11px] text-text-muted uppercase tracking-[0.2em] font-semibold mb-2">Total Net Worth</p>
            <p className="text-4xl font-extrabold text-white tracking-tight mb-6">{formatCurrency(totalValue)}</p>
            
            <div className="flex gap-6 pt-4 border-t border-border-subtle">
              <div>
                <p className="text-[10px] text-text-muted uppercase tracking-wider font-semibold mb-1">Liquid Assets</p>
                <p className="text-base font-bold text-success">{formatCurrency(liquidValue)}</p>
              </div>
              <div className="w-px h-8 bg-border-subtle" />
              <div>
                <p className="text-[10px] text-text-muted uppercase tracking-wider font-semibold mb-1">Locked Value</p>
                <p className="text-base font-bold text-white">{formatCurrency(totalValue - liquidValue)}</p>
              </div>
            </div>
          </div>

          <h3 className="text-[13px] font-bold text-white mb-3 ml-1">Asset Distribution</h3>

          {/* Premium Asset Cards */}
          <div className="flex flex-col gap-3 mb-4">
            {activeAssets.map((asset) => (
              <div key={asset.id} className="relative overflow-hidden glass-card p-4 transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-default">
                {asset.liquid && <div className="absolute top-0 left-0 w-1 h-full bg-success" />}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-inner ${
                      asset.liquid ? 'bg-success-soft text-success' : 'bg-[#27272a] text-white'
                    }`}>
                      {asset.type.includes('Savings') && '🏦'}
                      {asset.type.includes('Mutual') && '📈'}
                      {asset.type.includes('Fixed') && '🔒'}
                      {asset.type.includes('Insurance') && '🛡️'}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white mb-0.5">{asset.type}</p>
                      <p className="text-[11px] font-medium text-text-muted tracking-wide uppercase">{asset.institution}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-bold text-white mb-1">{formatCurrency(asset.value)}</p>
                    {asset.liquid ? (
                      <Badge variant="success">Liquid</Badge>
                    ) : (
                      <Badge variant="default">Locked</Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Experimental: View if Excel structured data was loaded successfully instead of standard assets */}
      {isExcelFormat && activeAssets.headers && activeAssets.rows && (
        <div className="glass-card overflow-x-auto p-4">
          <p className="text-xs text-text-muted uppercase tracking-wider font-bold mb-4">Core Financial Database (Synced)</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border-default">
                  {activeAssets.headers.map((h, i) => (
                    <th key={i} className="py-3 px-4 text-[10px] text-text-secondary uppercase tracking-widest font-semibold whitespace-nowrap bg-bg-card/50">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {activeAssets.rows.map((row, ri) => (
                  <tr key={ri} className="border-b border-border-subtle hover:bg-bg-card/40 transition-colors">
                    {activeAssets.headers.map((_, ci) => (
                      <td key={ci} className="py-4 px-4 text-xs font-medium text-white whitespace-nowrap">
                        {row[ci] ?? '—'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
