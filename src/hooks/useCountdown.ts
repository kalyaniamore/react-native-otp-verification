import { useEffect, useState } from 'react';

export function useCountdown(initialSeconds: number) {
  const [secondsRemaining, setSecondsRemaining] = useState(initialSeconds);
  const [deadline, setDeadline] = useState(() => Date.now() + initialSeconds * 1000);

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setSecondsRemaining(remaining);

      if (remaining === 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [deadline]);

  const reset = () => {
    setSecondsRemaining(initialSeconds);
    setDeadline(Date.now() + initialSeconds * 1000);
  };

  return { secondsRemaining, reset };
}