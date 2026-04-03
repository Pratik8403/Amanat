import { useState } from 'react';
import MobileFrame from '../components/ui/MobileFrame';
import NomineeOnboarding from '../components/nominee/NomineeOnboarding';
import NomineeDashboard from '../components/nominee/NomineeDashboard';

export default function NomineePage() {
  const [verified, setVerified] = useState(false);

  return (
    <MobileFrame>
      {verified ? (
        <NomineeDashboard />
      ) : (
        <NomineeOnboarding onComplete={() => setVerified(true)} />
      )}
    </MobileFrame>
  );
}
