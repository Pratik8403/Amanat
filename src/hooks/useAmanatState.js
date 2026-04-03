import { useState, useEffect, useCallback } from 'react';
import { getState, subscribe, initAmanat } from '../state/AmanatState';

export function useAmanatState() {
  const [state, setState] = useState(getState);

  useEffect(() => {
    initAmanat();
    const unsubscribe = subscribe((newState) => {
      setState(newState);
    });
    return unsubscribe;
  }, []);

  return state;
}

export function useCountdown(startTimeISO, durationMs = 600000) {
  const [remaining, setRemaining] = useState(durationMs);

  useEffect(() => {
    if (!startTimeISO) return;

    const interval = setInterval(() => {
      const elapsed = Date.now() - new Date(startTimeISO).getTime();
      const left = Math.max(0, durationMs - elapsed);
      setRemaining(left);
      if (left === 0) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTimeISO, durationMs]);

  const minutes = Math.floor(remaining / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);

  return {
    remaining,
    display: `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`,
    expired: remaining === 0,
  };
}
