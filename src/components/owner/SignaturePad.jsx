import { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import Button from '../ui/Button';

export default function SignaturePad({ onComplete }) {
  const sigRef = useRef(null);
  const [signed, setSigned] = useState(false);

  const handleClear = () => {
    sigRef.current?.clear();
    setSigned(false);
  };

  const handleEnd = () => {
    if (sigRef.current && !sigRef.current.isEmpty()) {
      setSigned(true);
    }
  };

  const handleConfirm = () => {
    if (sigRef.current && !sigRef.current.isEmpty()) {
      const signatureData = sigRef.current.toDataURL();
      onComplete(signatureData);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-text-primary mb-1">Digital Signature</h2>
        <p className="text-sm text-text-secondary">
          Tier 1 Declaration — Sign to complete your onboarding
        </p>
      </div>

      <div className="glass-card p-4 mb-4">
        <p className="text-xs text-text-muted mb-3 uppercase tracking-wider font-medium">
          Draw your signature below
        </p>
        <div className="signature-canvas-wrapper">
          <SignatureCanvas
            ref={sigRef}
            penColor="#818cf8"
            backgroundColor="transparent"
            canvasProps={{
              className: 'w-full',
              style: { width: '100%', height: '150px' },
            }}
            onEnd={handleEnd}
          />
        </div>
        <div className="flex justify-end mt-3">
          <button
            onClick={handleClear}
            className="text-xs text-text-muted hover:text-text-secondary transition-colors cursor-pointer"
          >
            Clear Signature
          </button>
        </div>
      </div>

      <div className="glass-card p-4 mb-6">
        <p className="text-xs text-text-secondary leading-relaxed">
          By signing this declaration, I confirm that all information provided is accurate 
          and I authorize the Amanat Protocol to manage emergency access to my mapped 
          financial assets as per the terms of service.
        </p>
      </div>

      <Button onClick={handleConfirm} disabled={!signed}>
        Confirm Declaration
      </Button>
    </div>
  );
}
