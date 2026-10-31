import type { OTPServiceResponse, OTPVerificationStatus } from '../../types/otp.types';

export interface OTPVerificationScreenProps {
  title?: string;
  description?: string;
  destination?: string;
  onVerify?: (otp: string) => Promise<OTPServiceResponse>;
  onResend?: () => Promise<OTPServiceResponse>;
}

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