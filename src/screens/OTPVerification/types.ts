import type { OTPVerificationStatus } from '../../types/otp.types';

export interface OTPVerificationViewModel {
  otp: string;
  status: OTPVerificationStatus;
  message: string;
  isLoading: boolean;
  secondsUntilResend: number;
  canResend: boolean;
  onOTPChange: (value: string) => void;
  onVerify: () => Promise<void>;
  onResend: () => Promise<void>;
}