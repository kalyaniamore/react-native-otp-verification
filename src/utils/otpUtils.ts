import { OTP_LENGTH } from '../constants/otp.constants';

export function sanitizeOTP(value: string): string {
  return value.replace(/\D/g, '').slice(0, OTP_LENGTH);
}

export function isValidOTP(value: string): boolean {
  return value.length === OTP_LENGTH && /^\d+$/.test(value);
}