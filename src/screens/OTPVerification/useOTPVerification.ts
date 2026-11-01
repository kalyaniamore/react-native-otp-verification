import { useRef, useState } from 'react';
import { useCountdown } from '../../hooks/useCountdown';
import { otpCopy } from '../../constants/otp.strings';
import { RESEND_COUNTDOWN_SECONDS } from '../../constants/otp.constants';
import { requestOTP, verifyOTP } from '../../services/otpService';
import { isValidOTP, sanitizeOTP } from '../../utils/otpUtils';
import type {
  OTPVerificationScreenProps,
  OTPVerificationViewModel,
} from './types';

/**
 * Coordinates OTP editing, mock service requests, request locking, and resend timing.
 * Service handlers can be supplied by a consuming screen; local mocks are used by default.
 */
export function useOTPVerification({
  onVerify: verify = verifyOTP,
  onResend: resend = requestOTP,
}: Pick<
  OTPVerificationScreenProps,
  'onVerify' | 'onResend'
> = {}): OTPVerificationViewModel {
  const [otp, setOtp] = useState('');
  const [status, setStatus] =
    useState<OTPVerificationViewModel['status']>('idle');
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
      setMessage(otpCopy.invalidCode);
      return;
    }

    requestInProgress.current = true;
    setIsLoading(true);
    setStatus('loading');
    setMessage('');

    if (__DEV__) {
      // Assessment-only requirement; never log real OTPs in production.
      console.log(otpCopy.otpLogLabel, otp);
    }

    try {
      const response = await verify(otp);
      setStatus(response.status);
      setMessage(response.message);
    } catch {
      setStatus('error');
      setMessage(otpCopy.verificationFailure);
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
      const response = await resend();
      setStatus(response.status);
      setMessage(response.message);
      if (response.status === 'success') {
        setOtp('');
        reset();
      }
    } catch {
      setStatus('error');
      setMessage(otpCopy.resendFailure);
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
