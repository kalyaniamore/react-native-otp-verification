import { isValidOTP, sanitizeOTP } from '../src/utils/otpUtils';

describe('OTP utilities', () => {
  it('removes non-numeric characters and caps the code at four digits', () => {
    expect(sanitizeOTP('a1-2b345')).toBe('1234');
  });

  it('accepts exactly four numeric digits', () => {
    expect(isValidOTP('1234')).toBe(true);
    expect(isValidOTP('123')).toBe(false);
    expect(isValidOTP('12a4')).toBe(false);
  });
});