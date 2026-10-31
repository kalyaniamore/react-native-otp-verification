import { useEffect, useState } from 'react';

export function useCountdown(initialSeconds: number) {
  const [secondsRemaining, setSecondsRemaining] = useState(initialSeconds);

  useEffect(() => {
    if (secondsRemaining <= 0) {
      return undefined;
    }

    const timer = setTimeout(() => {
      setSecondsRemaining(current => Math.max(0, current - 1));
    }, 1000);

    return () => clearTimeout(timer);
  }, [secondsRemaining]);

  const reset = () => setSecondsRemaining(initialSeconds);

  return { secondsRemaining, reset };
}