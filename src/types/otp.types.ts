export type OTPVerificationStatus = 'idle' | 'loading' | 'success' | 'error';

export interface OTPServiceResponse {
  status: 'success' | 'error';
  message: string;
}