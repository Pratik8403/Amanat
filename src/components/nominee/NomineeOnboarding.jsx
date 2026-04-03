import { useState } from 'react';
import StepIndicator from '../ui/StepIndicator';
import CodeVerification from './CodeVerification';
import NomineePanAadhaar from './NomineePanAadhaar';
import NomineeFaceVerify from './NomineeFaceVerify';
import { markNomineeVerified } from '../../state/AmanatState';

export default function NomineeOnboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const totalSteps = 3;

  const handleStep1 = () => setStep(1);
  const handleStep2 = () => setStep(2);

  const handleStep3 = () => {
    markNomineeVerified();
    onComplete();
  };

  return (
    <div className="px-5 py-6 pb-12 min-h-full bg-bg-primary overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-[18px] bg-[#18181b] border border-border-default flex items-center justify-center shadow-inner">
          <img src="/favicon.svg" alt="Amanat" className="w-7 h-7" onError={(e) => e.target.style.display='none'} />
        </div>
        <div>
          <h1 className="text-[10px] font-bold text-accent-secondary tracking-widest uppercase mb-0.5">Amanat Protocol</h1>
          <p className="text-xl font-black text-white tracking-tight">Nominee Login</p>
        </div>
      </div>

      <StepIndicator totalSteps={totalSteps} currentStep={step} />

      <div className="mt-2">
        {step === 0 && <CodeVerification onComplete={handleStep1} />}
        {step === 1 && <NomineePanAadhaar onComplete={handleStep2} />}
        {step === 2 && <NomineeFaceVerify onComplete={handleStep3} />}
      </div>
    </div>
  );
}
