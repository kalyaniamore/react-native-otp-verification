import { useEffect, useState } from 'react';

/**
 * Tracks a countdown against an absolute deadline so delayed timer ticks do not extend it.
 * The interval is cleared when the countdown reaches zero or the hook's component unmounts.
 *
 * @param initialSeconds Initial duration and duration restored by `reset`.
 * @returns The remaining whole seconds and a function to restart the countdown.
 */
export function useCountdown(initialSeconds: number) {
  const [secondsRemaining, setSecondsRemaining] = useState(initialSeconds);
  const [deadline, setDeadline] = useState(
    () => Date.now() + initialSeconds * 1000,
  );

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
