import { MOCK_NETWORK_DELAY_MS } from '../constants/otp.constants';
import type { OTPServiceResponse } from '../types/otp.types';

function simulateNetworkDelay(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, MOCK_NETWORK_DELAY_MS));
}

export async function verifyOTP(otp: string): Promise<OTPServiceResponse> {
  await simulateNetworkDelay();

  if (otp === '1234') {
    return { status: 'success', message: 'Your number has been verified.' };
  }

  return { status: 'error', message: 'That code is not valid. Check it and try again.' };
}

export async function requestOTP(): Promise<OTPServiceResponse> {
  await simulateNetworkDelay();
  return { status: 'success', message: 'A new verification code has been sent.' };
}