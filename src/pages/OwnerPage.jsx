import { useState } from 'react';
import MobileFrame from '../components/ui/MobileFrame';
import OwnerOnboarding from '../components/owner/OwnerOnboarding';
import OwnerDashboard from '../components/owner/OwnerDashboard';

export default function OwnerPage() {
  const [onboarded, setOnboarded] = useState(false);

  return (
    <MobileFrame>
      {onboarded ? (
        <OwnerDashboard />
      ) : (
        <OwnerOnboarding onComplete={() => setOnboarded(true)} />
      )}
    </MobileFrame>
  );
}
