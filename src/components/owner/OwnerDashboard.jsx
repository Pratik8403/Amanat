import { useState } from 'react';
import WealthTab from './WealthTab';
import NomineeTab from './NomineeTab';
import SecurityTab from './SecurityTab';
import { useAmanatState } from '../../hooks/useAmanatState';

const tabs = [
  { id: 'wealth', label: 'Wealth', icon: (
    <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  )},
  { id: 'nominee', label: 'Nominee', icon: (
    <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  )},
  { id: 'security', label: 'Security', icon: (
    <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  )},
];

export default function OwnerDashboard() {
  const [activeTab, setActiveTab] = useState('wealth');
  const state = useAmanatState();

  const hasAlert = state.emergencyStatus && !state.accessRevoked;
  const isProtected = state.nominee.verified && !state.accessRevoked;

  return (
    <div className="min-h-full pb-32">
      {/* Premium Header */}
      <div className="px-5 pt-8 pb-6 bg-gradient-to-b from-bg-card to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-accent-glow flex items-center justify-center border border-accent-primary/20 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
              <img src="/favicon.svg" alt="Amanat" className="w-6 h-6" onError={(e) => e.target.style.display='none'} />
              <span className="text-xl">🛡️</span>
            </div>
            <div>
              <h1 className="text-[10px] font-bold text-accent-secondary tracking-widest uppercase mb-0.5">Amanat Protocol</h1>
              <p className="text-xl font-bold text-white tracking-tight">Dashboard</p>
            </div>
          </div>
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-bg-card border border-border-default flex items-center justify-center cursor-pointer hover:bg-bg-card-hover transition-colors">
              <span className="text-lg">👤</span>
            </div>
            {hasAlert && <span className="absolute top-0 right-0 w-3 h-3 bg-danger rounded-full border-2 border-bg-primary animate-pulse" />}
          </div>
        </div>
      </div>

      {/* Hero Security Card (WOW Factor) */}
      <div className="px-5 mb-8">
        <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#18181b] to-[#09090b] border border-border-default shadow-[0_8px_30px_rgba(0,0,0,0.5)] p-6">
          {/* Subtle background glow */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent-primary/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-[11px] font-semibold tracking-wider uppercase text-text-muted mb-1">Security Status</p>
              <h2 className="text-xl font-bold text-white">
                Protection Active
              </h2>
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isProtected ? 'bg-success-soft shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-warning-soft shadow-[0_0_15px_rgba(245,158,11,0.2)]'}`}>
              <svg className={`w-5 h-5 ${isProtected ? 'text-success' : 'text-warning'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={isProtected ? "M5 13l4 4L19 7" : "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"} />
              </svg>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-accent-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium text-text-secondary">Financial Visibility Enabled</span>
            </div>
            <div className="flex items-center gap-3">
              <svg className={`w-5 h-5 ${state.nominee.verified ? 'text-accent-secondary' : 'text-text-muted'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span className={`text-sm font-medium ${state.nominee.verified ? 'text-text-secondary' : 'text-text-muted'}`}>
                {state.nominee.verified ? 'Nominee Verified & Linked' : 'Awaiting Nominee Verification'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-accent-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-sm font-medium text-text-secondary">Emergency Protocol Ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="px-5">
        {activeTab === 'wealth' && <WealthTab />}
        {activeTab === 'nominee' && <NomineeTab />}
        {activeTab === 'security' && <SecurityTab />}
      </div>

      {/* Floating Bottom Dock */}
      <div className="bottom-dock">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`dock-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <div className="relative">
              {tab.icon}
              {tab.id === 'security' && hasAlert && (
                <div className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-danger border-2 border-[#18181b]" />
              )}
            </div>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
