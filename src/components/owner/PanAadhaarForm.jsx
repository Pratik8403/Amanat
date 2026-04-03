import { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';
import { validatePan, validateAadhaar } from '../../utils/helpers';

export default function PanAadhaarForm({ onComplete, role = 'Owner' }) {
  const [pan, setPan] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [errors, setErrors] = useState({});
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleVerify = () => {
    const newErrors = {};
    if (!validatePan(pan)) newErrors.pan = 'Enter a valid PAN (e.g., ABCDE1234F)';
    if (!validateAadhaar(aadhaar)) newErrors.aadhaar = 'Enter a valid 12-digit Aadhaar number';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setVerifying(true);

    // Simulate verification
    setTimeout(() => {
      setVerifying(false);
      setVerified(true);
      setTimeout(() => onComplete({ pan: pan.toUpperCase(), aadhaar }), 800);
    }, 2000);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-text-primary mb-1">Identity Verification</h2>
        <p className="text-sm text-text-secondary">
          Verify your PAN & Aadhaar to proceed with {role.toLowerCase()} setup
        </p>
      </div>

      <div className="flex flex-col gap-4 mb-6">
        <Input
          label="PAN Number"
          placeholder="ABCDE1234F"
          value={pan}
          onChange={(e) => setPan(e.target.value.toUpperCase().slice(0, 10))}
          maxLength={10}
          error={errors.pan}
          disabled={verifying || verified}
        />
        <Input
          label="Aadhaar Number"
          placeholder="123456789012"
          value={aadhaar}
          onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, '').slice(0, 12))}
          maxLength={12}
          error={errors.aadhaar}
          disabled={verifying || verified}
        />
      </div>

      {verified ? (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-success-soft border border-success/30 animate-fade-in">
          <span className="text-success text-xl">✓</span>
          <div>
            <p className="text-sm font-semibold text-success">Identity Verified</p>
            <p className="text-xs text-text-secondary">PAN & Aadhaar confirmed</p>
          </div>
        </div>
      ) : (
        <Button onClick={handleVerify} disabled={verifying || !pan || !aadhaar}>
          {verifying ? (
            <>
              <Spinner size={16} />
              Verifying...
            </>
          ) : (
            'Verify Identity'
          )}
        </Button>
      )}
    </div>
  );
}
