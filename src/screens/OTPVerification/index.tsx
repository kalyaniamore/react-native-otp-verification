import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton } from '../../components/CustomButton';
import { CustomInput } from '../../components/CustomInput';
import { otpStrings } from '../../constants/otp.strings';
import { OTP_LENGTH } from '../../constants/otp.constants';
import { isValidOTP } from '../../utils/otpUtils';
import { styles } from './styles';
import type { OTPVerificationScreenProps } from './types';
import { useOTPVerification } from './useOTPVerification';

/** Presents the OTP challenge, verification feedback, and resend countdown. */
export function OTPVerificationScreen({
  title = otpStrings.title,
  description = otpStrings.description,
  destination,
  onVerify: verifyHandler,
  onResend: resendHandler,
}: OTPVerificationScreenProps = {}) {
  const {
    otp,
    status,
    message,
    isLoading,
    secondsUntilResend,
    canResend,
    onOTPChange,
    onVerify,
    onResend,
  } = useOTPVerification({ onVerify: verifyHandler, onResend: resendHandler });

  const feedbackStyle = status === 'success' ? styles.success : styles.error;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.form}>
          <Image
            accessibilityLabel={otpStrings.illustrationAccessibilityLabel}
            resizeMode="contain"
            source={require('../../assets/images/otp-verification.png')}
            style={styles.illustration}
          />
          <Text style={styles.eyebrow}>{otpStrings.secureVerification}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>

          {destination ? (
            <View style={styles.destination}>
              <Text style={styles.destinationLabel}>{otpStrings.codeSentTo}</Text>
              <Text style={styles.destinationValue}>{destination}</Text>
            </View>
          ) : null}

          <Text style={styles.inputLabel}>{otpStrings.verificationCode}</Text>
          <CustomInput
            accessibilityLabel={otpStrings.inputAccessibilityLabel}
            editable={!isLoading}
            length={OTP_LENGTH}
            onChangeText={onOTPChange}
            value={otp}
          />
          <Text
            accessibilityLiveRegion="polite"
            style={[styles.feedback, message ? feedbackStyle : undefined]}
          >
            {message}
          </Text>

          <CustomButton
            accessibilityLabel={otpStrings.verifyAccessibilityLabel}
            disabled={!isValidOTP(otp)}
            loading={isLoading && status === 'loading'}
            loadingTitle={otpStrings.verifying}
            onPress={onVerify}
            title={otpStrings.verify}
          />

          <Pressable
            accessibilityLabel={
              canResend
                ? otpStrings.resendAccessibilityLabel
                : otpStrings.resendCountdown(secondsUntilResend)
            }
            accessibilityRole="button"
            accessibilityState={{ disabled: !canResend }}
            disabled={!canResend}
            onPress={onResend}
            style={styles.resendButton}
          >
            <Text
              style={[styles.resendText, !canResend && styles.resendDisabled]}
            >
              {canResend
                ? otpStrings.resend
                : otpStrings.resendCountdownShort(secondsUntilResend)}
            </Text>
          </Pressable>
          <Text style={styles.securityNote}>{otpStrings.securityNote}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
