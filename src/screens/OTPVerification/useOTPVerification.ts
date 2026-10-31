import { useRef, useState } from 'react';
import { useCountdown } from '../../hooks/useCountdown';
import { RESEND_COUNTDOWN_SECONDS } from '../../constants/otp.constants';
import { requestOTP, verifyOTP } from '../../services/otpService';
import { isValidOTP, sanitizeOTP } from '../../utils/otpUtils';
import type { OTPVerificationViewModel } from './types';

export function useOTPVerification(): OTPVerificationViewModel {
  const [otp, setOtp] = useState('');
  const [status, setStatus] = useState<OTPVerificationViewModel['status']>('idle');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const requestInProgress = useRef(false);
  const { secondsRemaining, reset } = useCountdown(RESEND_COUNTDOWN_SECONDS);

  const onOTPChange = (value: string) => {
    setOtp(sanitizeOTP(value));
    setStatus('idle');
    setMessage('');
  };

  const onVerify = async () => {
    if (requestInProgress.current) {
      return;
    }

    if (!isValidOTP(otp)) {
      setStatus('error');
      setMessage('Enter a valid four-digit code.');
      return;
    }

    requestInProgress.current = true;
    setIsLoading(true);
    setStatus('loading');
    setMessage('');

    // Assessment-only requirement; never log real OTPs in production.
    console.log('OTP submitted for assessment:', otp);

    try {
      const response = await verifyOTP(otp);
      setStatus(response.status);
      setMessage(response.message);
    } catch {
      setStatus('error');
      setMessage('Verification could not be completed. Try again.');
    } finally {
      requestInProgress.current = false;
      setIsLoading(false);
    }
  };

  const onResend = async () => {
    if (requestInProgress.current || secondsRemaining > 0) {
      return;
    }

    requestInProgress.current = true;
    setIsLoading(true);
    setStatus('loading');
    setMessage('');

    try {
      const response = await requestOTP();
      setStatus(response.status);
      setMessage(response.message);
      if (response.status === 'success') {
        reset();
      }
    } catch {
      setStatus('error');
      setMessage('A new code could not be sent. Try again.');
    } finally {
      requestInProgress.current = false;
      setIsLoading(false);
    }
  };

  return {
    otp,
    status,
    message,
    isLoading,
    secondsUntilResend: secondsRemaining,
    canResend: secondsRemaining === 0 && !isLoading,
    onOTPChange,
    onVerify,
    onResend,
  };
}