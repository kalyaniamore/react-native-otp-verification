import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  MOCK_NETWORK_DELAY_MS,
  OTP_LENGTH,
  RESEND_COUNTDOWN_SECONDS,
} from '../src/constants/otp.constants';
import { otpCopy } from '../src/constants/otp.strings';
import { verifyOTP } from '../src/services/otpService';
import { OTPVerificationScreen } from '../src/screens/OTPVerification';
import type { OTPVerificationScreenProps } from '../src/screens/OTPVerification/types';
import type { OTPServiceResponse } from '../src/types/otp.types';
import { isValidOTP, sanitizeOTP } from '../src/utils/otpUtils';

const initialMetrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 0, right: 0, bottom: 0, left: 0 },
};

function renderScreen(props: OTPVerificationScreenProps = {}) {
  let renderer!: ReactTestRenderer.ReactTestRenderer;

  ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(
      <SafeAreaProvider initialMetrics={initialMetrics}>
        <OTPVerificationScreen {...props} />
      </SafeAreaProvider>,
    );
  });

  return renderer;
}

describe('OTP utilities', () => {
  it('sanitizes non-digits, caps input, and validates exactly four digits', () => {
    expect(sanitizeOTP('12-34-567')).toBe('1234');
    expect(sanitizeOTP('a!')).toBe('');
    expect(isValidOTP('1234')).toBe(true);
    expect(isValidOTP('123')).toBe(false);
    expect(isValidOTP('12345')).toBe(false);
    expect(isValidOTP('12a4')).toBe(false);
    expect(OTP_LENGTH).toBe(4);
  });
});

describe('OTP mock service', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it('waits for the configured network delay before resolving', async () => {
    jest.useFakeTimers();
    let resolved = false;
    const response = verifyOTP('1234').then(result => {
      resolved = true;
      return result;
    });

    await jest.advanceTimersByTimeAsync(MOCK_NETWORK_DELAY_MS - 1);
    expect(resolved).toBe(false);

    await jest.advanceTimersByTimeAsync(1);
    await expect(response).resolves.toMatchObject({ status: 'success' });
  });
});

describe('OTP verification screen', () => {
  it('sanitizes formatted paste and preserves remaining digits when editing', () => {
    const renderer = renderScreen();

    try {
      const input = renderer.root.findByProps({
        accessibilityLabel: otpCopy.inputAccessibilityLabel,
      });

      ReactTestRenderer.act(() => input.props.onChangeText('12-34-567'));
      expect(
        renderer.root.findByProps({
          accessibilityLabel: otpCopy.inputAccessibilityLabel,
        }).props.value,
      ).toBe('1234');

      ReactTestRenderer.act(() => input.props.onChangeText('124'));
      expect(
        renderer.root.findByProps({
          accessibilityLabel: otpCopy.inputAccessibilityLabel,
        }).props.value,
      ).toBe('124');
      const verifyButton = renderer.root.findByProps({
        accessibilityLabel: otpCopy.verifyAccessibilityLabel,
      });
      expect(
        verifyButton.props.accessibilityState?.disabled ??
          verifyButton.props.disabled,
      ).toBe(true);
    } finally {
      ReactTestRenderer.act(() => renderer.unmount());
    }
  });

  it('prevents duplicate verify requests and shows the response', async () => {
    let completeVerification!: (response: OTPServiceResponse) => void;
    const onVerify = jest.fn(
      () =>
        new Promise<OTPServiceResponse>(resolve => {
          completeVerification = resolve;
        }),
    );
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const renderer = renderScreen({ onVerify });

    try {
      const input = renderer.root.findByProps({
        accessibilityLabel: otpCopy.inputAccessibilityLabel,
      });
      ReactTestRenderer.act(() => input.props.onChangeText('1234'));

      const verifyButton = renderer.root.findByProps({
        accessibilityLabel: otpCopy.verifyAccessibilityLabel,
      });
      let firstRequest!: Promise<void>;
      let duplicateRequest!: Promise<void>;

      await ReactTestRenderer.act(async () => {
        firstRequest = verifyButton.props.onPress();
        duplicateRequest = verifyButton.props.onPress();
        expect(onVerify).toHaveBeenCalledTimes(1);
        completeVerification({
          status: 'success',
          message: 'Verified for the demo.',
        });
        await Promise.all([firstRequest, duplicateRequest]);
      });

      expect(onVerify).toHaveBeenCalledWith('1234');
      if (__DEV__) {
        expect(logSpy).toHaveBeenCalledWith(otpCopy.otpLogLabel, '1234');
      } else {
        expect(logSpy).not.toHaveBeenCalled();
      }
      expect(
        renderer.root
          .findAllByType(Text)
          .some(node => node.props.children === 'Verified for the demo.'),
      ).toBe(true);
    } finally {
      ReactTestRenderer.act(() => renderer.unmount());
      logSpy.mockRestore();
    }
  });

  it('re-enables resend after 60 seconds and restarts the countdown after success', async () => {
    jest.useFakeTimers();
    const intervalSpy = jest.spyOn(globalThis, 'setInterval');
    const clearIntervalSpy = jest.spyOn(globalThis, 'clearInterval');
    const onResend = jest.fn(async () => ({
      status: 'success' as const,
      message: otpCopy.resendSuccess,
    }));
    const renderer = renderScreen({ onResend });

    try {
      expect(
        renderer.root.findByProps({
          accessibilityLabel: otpCopy.resendCountdown(RESEND_COUNTDOWN_SECONDS),
        }).props.disabled,
      ).toBe(true);

      await ReactTestRenderer.act(async () => {
        await jest.advanceTimersByTimeAsync(
          (RESEND_COUNTDOWN_SECONDS - 1) * 1000,
        );
      });
      expect(
        renderer.root.findByProps({
          accessibilityLabel: otpCopy.resendCountdown(1),
        }),
      ).toBeTruthy();

      await ReactTestRenderer.act(async () => {
        await jest.advanceTimersByTimeAsync(1000);
      });
      const resendButton = renderer.root.findByProps({
        accessibilityLabel: otpCopy.resendAccessibilityLabel,
      });
      expect(resendButton.props.disabled).toBe(false);

      await ReactTestRenderer.act(async () => {
        const firstRequest = resendButton.props.onPress();
        const duplicateRequest = resendButton.props.onPress();
        await Promise.all([firstRequest, duplicateRequest]);
      });

      expect(onResend).toHaveBeenCalledTimes(1);
      expect(
        renderer.root.findByProps({
          accessibilityLabel: otpCopy.resendCountdown(RESEND_COUNTDOWN_SECONDS),
        }),
      ).toBeTruthy();
    } finally {
      ReactTestRenderer.act(() => renderer.unmount());
      const countdownInterval = intervalSpy.mock.results.at(-1)?.value;
      expect(clearIntervalSpy).toHaveBeenCalledWith(countdownInterval);
      clearIntervalSpy.mockRestore();
      intervalSpy.mockRestore();
      jest.clearAllTimers();
      jest.useRealTimers();
    }
  });

  it('recovers from a rejected verification and lets the user retry', async () => {
    const onVerify = jest
      .fn<Promise<OTPServiceResponse>, [string]>()
      .mockRejectedValueOnce(new Error('offline'))
      .mockResolvedValueOnce({
        status: 'success',
        message: 'Verified for the demo.',
      });
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const renderer = renderScreen({ onVerify });

    try {
      const input = renderer.root.findByProps({
        accessibilityLabel: otpCopy.inputAccessibilityLabel,
      });
      ReactTestRenderer.act(() => input.props.onChangeText('1234'));

      const verifyButton = renderer.root.findByProps({
        accessibilityLabel: otpCopy.verifyAccessibilityLabel,
      });
      await ReactTestRenderer.act(async () => {
        await verifyButton.props.onPress();
      });

      expect(
        renderer.root
          .findAllByType(Text)
          .some(node => node.props.children === otpCopy.verificationFailure),
      ).toBe(true);
      expect(
        verifyButton.props.accessibilityState?.busy ??
          verifyButton.props.disabled,
      ).toBe(false);

      ReactTestRenderer.act(() => input.props.onChangeText('1234'));
      await ReactTestRenderer.act(async () => {
        await verifyButton.props.onPress();
      });

      expect(onVerify).toHaveBeenCalledTimes(2);
      expect(
        renderer.root
          .findAllByType(Text)
          .some(node => node.props.children === 'Verified for the demo.'),
      ).toBe(true);
    } finally {
      ReactTestRenderer.act(() => renderer.unmount());
      logSpy.mockRestore();
    }
  });
});
