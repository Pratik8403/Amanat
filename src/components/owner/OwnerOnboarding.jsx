import { useState } from 'react';
import StepIndicator from '../ui/StepIndicator';
import PanAadhaarForm from './PanAadhaarForm';
import FaceVerification from './FaceVerification';
import ConsentStep from './ConsentStep';
import NomineeForm from './NomineeForm';
import SignaturePad from './SignaturePad';
import { completeOwnerOnboarding } from '../../state/AmanatState';

export default function OwnerOnboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [ownerData, setOwnerData] = useState({ pan: '', aadhaar: '' });

  const totalSteps = 5;

  const handleStep1 = (data) => {
    setOwnerData(data);
    setStep(1);
  };

  const handleStep2 = () => setStep(2);
  const handleStep3 = () => setStep(3);
  const handleStep4 = () => setStep(4);

  const handleStep5 = (signature) => {
    completeOwnerOnboarding({ ...ownerData, signature });
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
          <p className="text-xl font-black text-white tracking-tight">Account Setup</p>
        </div>
      </div>

      <StepIndicator totalSteps={totalSteps} currentStep={step} />

      {/* Step content */}
      <div className="mt-2">
        {step === 0 && <PanAadhaarForm onComplete={handleStep1} role="Owner" />}
        {step === 1 && <FaceVerification onComplete={handleStep2} />}
        {step === 2 && <ConsentStep onComplete={handleStep3} />}
        {step === 3 && <NomineeForm onComplete={handleStep4} />}
        {step === 4 && <SignaturePad onComplete={handleStep5} />}
      </div>
    </div>
  );
}
