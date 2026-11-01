import { MOCK_NETWORK_DELAY_MS } from '../constants/otp.constants';
import { otpStrings } from '../constants/otp.strings';
import type { OTPServiceResponse } from '../types/otp.types';

function simulateNetworkDelay(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, MOCK_NETWORK_DELAY_MS));
}

export async function verifyOTP(otp: string): Promise<OTPServiceResponse> {
  await simulateNetworkDelay();

  if (otp === '1234') {
    return { status: 'success', message: otpStrings.verificationSuccess };
  }

  return { status: 'error', message: otpStrings.incorrectCode };
}

export async function requestOTP(): Promise<OTPServiceResponse> {
  await simulateNetworkDelay();
  return { status: 'success', message: otpStrings.resendSuccess };
}