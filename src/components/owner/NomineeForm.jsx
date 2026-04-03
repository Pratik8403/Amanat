import { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { registerNominee } from '../../state/AmanatState';
import { useCountdown } from '../../hooks/useAmanatState';
import { validatePan, validateAadhaar, validatePhone } from '../../utils/helpers';

export default function NomineeForm({ onComplete }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pan, setPan] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [errors, setErrors] = useState({});
  const [generatedCode, setGeneratedCode] = useState(null);
  const [codeTime, setCodeTime] = useState(null);
  const [copied, setCopied] = useState(false);

  const countdown = useCountdown(codeTime);

  const handleRegister = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!validatePhone(phone)) newErrors.phone = 'Enter a valid 10-digit phone number';
    if (!validatePan(pan)) newErrors.pan = 'Enter a valid PAN (e.g., ABCDE1234F)';
    if (!validateAadhaar(aadhaar)) newErrors.aadhaar = 'Enter a valid 12-digit Aadhaar number';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const code = registerNominee({
      name: name.trim(),
      phone,
      pan: pan.toUpperCase(),
      aadhaar,
    });

    setGeneratedCode(code);
    setCodeTime(new Date().toISOString());
    setErrors({});
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (generatedCode) {
    return (
      <div className="animate-fade-in">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-text-primary mb-1">Nominee Registered</h2>
          <p className="text-sm text-text-secondary">
            Share the verification code with your nominee
          </p>
        </div>

        <Card glow className="mb-6">
          <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-3">
            Nominee Verification Code
          </p>
          <div className="flex items-center justify-center gap-2 mb-4">
            {generatedCode.split('').map((digit, i) => (
              <div
                key={i}
                className="w-11 h-14 bg-bg-secondary border border-border-default rounded-lg flex items-center justify-center text-2xl font-bold text-accent-secondary"
              >
                {digit}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-text-muted">
              Code expires in: <span className="text-warning font-mono font-semibold">{countdown.display}</span>
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs font-medium text-accent-secondary hover:text-accent-primary transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <span>✓</span> Copied
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy Code
                </>
              )}
            </button>
          </div>

          <div className="p-3 rounded-xl bg-bg-secondary border border-border-subtle text-center">
            <p className="text-xs text-text-secondary">
              Share this secure verification code with your nominee. They will need it to activate their access.
            </p>
          </div>
        </Card>

        <Button onClick={onComplete}>
          Continue to Declaration
        </Button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-text-primary mb-1">Nominee Details</h2>
        <p className="text-sm text-text-secondary">
          Register your nominee for emergency access
        </p>
      </div>

      <div className="flex flex-col gap-4 mb-6">
        <Input
          label="Nominee Full Name"
          placeholder="Enter full legal name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
        />
        <Input
          label="Phone Number"
          placeholder="9876543210"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
          maxLength={10}
          error={errors.phone}
        />
        <Input
          label="PAN Number"
          placeholder="ABCDE1234F"
          value={pan}
          onChange={(e) => setPan(e.target.value.toUpperCase().slice(0, 10))}
          maxLength={10}
          error={errors.pan}
        />
        <Input
          label="Aadhaar Number"
          placeholder="123456789012"
          value={aadhaar}
          onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, '').slice(0, 12))}
          maxLength={12}
          error={errors.aadhaar}
        />
      </div>

      <Button onClick={handleRegister}>
        Register Nominee
      </Button>
    </div>
  );
}
