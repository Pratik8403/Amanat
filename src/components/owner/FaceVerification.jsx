import { useState, useRef, useEffect, useCallback } from 'react';
import Button from '../ui/Button';

export default function FaceVerification({ onComplete }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [status, setStatus] = useState('idle'); // idle | requesting | streaming | scanning | liveness | verifying | verified | denied
  const [scanText, setScanText] = useState('');

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => stopCamera();
  }, [stopCamera]);

  const startCamera = async () => {
    setStatus('requesting');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setStatus('streaming');
    } catch (err) {
      setStatus('denied');
    }
  };

  const startScan = () => {
    setStatus('scanning');
    setScanText('Scanning face');

    setTimeout(() => {
      setStatus('liveness');
      setScanText('Checking liveness');
    }, 1500);

    setTimeout(() => {
      setStatus('verifying');
      setScanText('Verifying identity');
    }, 3000);

    setTimeout(() => {
      setStatus('verified');
      setScanText('');
      stopCamera();
      setTimeout(() => onComplete(), 1500);
    }, 4500);
  };

  return (
    <div className="animate-fade-in flex flex-col h-full">
      <div className="mb-8 text-center pt-4">
        <h2 className="text-2xl font-black text-white tracking-tight mb-2">Face Verification</h2>
        <p className="text-[13px] text-text-secondary px-4">
          Position your face within the frame to authenticate.
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-10">
        {/* Camera viewport wrapper */}
        <div className="relative">
          {(status !== 'idle' && status !== 'requesting' && status !== 'denied' && status !== 'verified') && (
            <div className="absolute -inset-4 bg-accent-glow rounded-full blur-2xl opacity-50 pointer-events-none" />
          )}
          
          <div className="camera-circle bg-[#121214]">
            {(status === 'streaming' || status === 'scanning' || status === 'liveness' || status === 'verifying') && (
              <>
                <video ref={videoRef} autoPlay playsInline muted />
                {(status === 'scanning' || status === 'liveness' || status === 'verifying') && (
                  <div className="camera-scan-overlay">
                    <div className="camera-scan-line" />
                  </div>
                )}
              </>
            )}

            {status === 'idle' && (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <span className="text-4xl opacity-30 mb-2">👤</span>
              </div>
            )}

            {status === 'requesting' && (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-[3px] border-text-muted border-t-accent-primary animate-spin" />
              </div>
            )}

            {status === 'verified' && (
              <div className="w-full h-full flex items-center justify-center bg-success shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]">
                <span className="text-5xl text-white drop-shadow-md">✓</span>
              </div>
            )}

            {status === 'denied' && (
              <div className="w-full h-full flex items-center justify-center bg-danger/20 border-4 border-danger">
                <span className="text-4xl">❌</span>
              </div>
            )}
          </div>
        </div>

        {/* Status text area (Fixed height to prevent jumping) */}
        <div className="h-10 flex items-center justify-center w-full">
          {(status === 'scanning' || status === 'liveness' || status === 'verifying') && (
            <div className="flex items-center gap-3 animate-fade-in bg-[#18181b] rounded-full px-5 py-2 border border-border-default shadow-lg">
              <div className="w-3 h-3 rounded-full border-2 border-accent-secondary border-t-transparent animate-spin" />
              <p className="text-xs text-white font-bold tracking-widest uppercase">{scanText}...</p>
            </div>
          )}

          {status === 'verified' && (
            <div className="flex items-center gap-2 animate-slide-up">
              <p className="text-sm font-extrabold text-success tracking-wide">Face Verified Successfully</p>
            </div>
          )}

          {status === 'denied' && (
            <p className="text-xs text-danger font-medium text-center">Camera access required.</p>
          )}
        </div>
      </div>

      {/* Action buttons fixed to bottom area */}
      <div className="mt-auto pt-8">
        {status === 'idle' && (
          <Button onClick={startCamera}>
            Enable Camera
          </Button>
        )}

        {status === 'streaming' && (
          <Button onClick={startScan}>
            Begin Scan
          </Button>
        )}

        {status === 'denied' && (
          <Button variant="secondary" onClick={startCamera}>
            Retry Access
          </Button>
        )}

        {status === 'verified' && (
          <Button variant="success" className="cursor-default pointer-events-none">
            Authentication Complete
          </Button>
        )}
      </div>
    </div>
  );
}
