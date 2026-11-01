import type {
  OTPServiceResponse,
  OTPVerificationStatus,
} from '../../types/otp.types';

/** Custom content and service handlers for the reusable verification screen. */
export interface OTPVerificationScreenProps {
  /** Heading shown above the verification instructions. */
  title?: string;
  /** Supporting instructions shown below the heading. */
  description?: string;
  /** Optional masked phone number or other destination shown to the user. */
  destination?: string;
  /** Async verifier; defaults to the local demonstration service. */
  onVerify?: (otp: string) => Promise<OTPServiceResponse>;
  /** Async code requester; defaults to the local demonstration service. */
  onResend?: () => Promise<OTPServiceResponse>;
}

/** State and actions exposed by the OTP verification screen hook. */
export interface OTPVerificationViewModel {
  /** Current sanitized digit string. */
  otp: string;
  /** Current verification or resend lifecycle state. */
  status: OTPVerificationStatus;
  /** User-facing result or error message. */
  message: string;
  /** Whether a verify or resend request is in progress. */
  isLoading: boolean;
  /** Seconds remaining before another code can be requested. */
  secondsUntilResend: number;
  /** Whether the resend action is currently available. */
  canResend: boolean;
  /** Updates the code and clears any stale request feedback. */
  onOTPChange: (value: string) => void;
  /** Validates and submits the current code. */
  onVerify: () => Promise<void>;
  /** Requests a new code when the cooldown has expired. */
  onResend: () => Promise<void>;
}
