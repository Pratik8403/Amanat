import { useState } from 'react';
import Button from '../ui/Button';
import { verifyNomineeCode } from '../../state/AmanatState';

export default function CodeVerification({ onComplete }) {
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [verifying, setVerifying] = useState(false);

  const handleDigitChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      const next = document.getElementById(`code-input-${index + 1}`);
      next?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      const prev = document.getElementById(`code-input-${index - 1}`);
      prev?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      setDigits(pasted.split(''));
      setError('');
    }
  };

  const handleVerify = () => {
    const code = digits.join('');
    if (code.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setVerifying(true);
    setTimeout(() => {
      if (verifyNomineeCode(code)) {
        onComplete();
      } else {
        setError('Invalid verification code. Please contact the account holder.');
        setVerifying(false);
      }
    }, 1000);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-text-primary mb-1">Verification Code</h2>
        <p className="text-sm text-text-secondary">
          Enter the 6-digit code shared by the account holder
        </p>
      </div>

      <div className="flex justify-center gap-2 mb-6" onPaste={handlePaste}>
        {digits.map((digit, i) => (
          <input
            key={i}
            id={`code-input-${i}`}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleDigitChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className={`w-12 h-14 text-center text-xl font-bold rounded-xl border outline-none transition-all duration-200 bg-bg-secondary text-text-primary ${
              error
                ? 'border-danger focus:ring-1 focus:ring-danger'
                : 'border-border-default focus:border-accent-primary focus:ring-1 focus:ring-accent-primary'
            }`}
          />
        ))}
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-danger-soft border border-danger/30 mb-4 animate-fade-in">
          <p className="text-xs text-danger text-center">{error}</p>
        </div>
      )}

      <Button onClick={handleVerify} disabled={verifying || digits.some(d => !d)}>
        {verifying ? 'Verifying...' : 'Verify Code'}
      </Button>
    </div>
  );
}
