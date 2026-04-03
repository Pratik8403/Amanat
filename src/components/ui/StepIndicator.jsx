export default function StepIndicator({ totalSteps, currentStep }) {
  return (
    <div className="step-indicator">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          className={`step-dot ${
            i === currentStep ? 'active' : i < currentStep ? 'completed' : ''
          }`}
        />
      ))}
    </div>
  );
}
