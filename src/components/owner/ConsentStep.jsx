import { useState } from 'react';
import Button from '../ui/Button';

export default function ConsentStep({ onComplete }) {
  const [consented, setConsented] = useState(false);

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-text-primary mb-1">Consent Declaration</h2>
        <p className="text-sm text-text-secondary">
          Review and accept the Amanat protocol terms
        </p>
      </div>

      <div className="glass-card p-5 mb-6">
        <div className="flex flex-col gap-4 text-sm text-text-secondary leading-relaxed">
          <p>
            Under the Amanat Emergency Financial Protocol, your mapped financial assets 
            will be made accessible to your verified nominee <strong className="text-text-primary">only</strong> during 
            legitimate emergency situations.
          </p>
          <p>
            Access is governed by a tiered trigger system. You retain full control 
            and can revoke access at any time.
          </p>
          <div className="border-t border-border-default my-2" />
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex-shrink-0 mt-0.5">
              <input
                type="checkbox"
                checked={consented}
                onChange={(e) => setConsented(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded-md border-2 transition-all duration-200 flex items-center justify-center ${
                consented 
                  ? 'bg-accent-primary border-accent-primary' 
                  : 'border-border-default group-hover:border-text-muted'
              }`}>
                {consented && (
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-text-primary text-sm leading-snug">
              I consent to mapping my financial assets under Amanat Emergency Financial Protocol.
            </span>
          </label>
        </div>
      </div>

      <Button onClick={onComplete} disabled={!consented}>
        Continue
      </Button>
    </div>
  );
}
