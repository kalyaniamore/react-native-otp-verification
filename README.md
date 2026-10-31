# Secure Verify

A lightweight React Native + TypeScript OTP verification screen built with native components. The default mock accepts `1234`, simulates an asynchronous request, and allows a new code to be requested after a 60-second cooldown.

The app is named **Secure Verify** and uses the OTP illustration as its launcher icon on iOS and Android.

## Features

- Four numeric digits with native one-time-code autofill support.
- Accessible input, button states, and live verification feedback.
- Mock verification with loading, success, and error states.
- Resend cooldown starts on screen entry and restarts after a successful resend.
- Reusable screen copy, destination label, and injectable verification/resend handlers.
- OTP UI, accessibility, and status-message copy is centralized in `src/constants/otp.strings.ts`.
- No OTP-specific or UI component dependencies.

The demo logs the submitted code to the console to meet the exercise requirement. Never log real OTPs in a production application.

## Run the app

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

Install dependencies, then start Metro:

```sh
npm install
npm start
```

In another terminal, launch a platform:

```sh
npm run android
# or
npm run ios
```

## Verify the project

```sh
npm test -- --runInBand
npm run lint
```

## Reuse the screen

`OTPVerificationScreen` accepts `title`, `description`, and `destination` props to adapt the prompt for flows such as payment or passcode changes. Pass `onVerify(otp)` and `onResend()` handlers to connect a real service; each should resolve to an `OTPServiceResponse`. Without handlers, the screen uses the local mock service in `src/services/otpService.ts`.
