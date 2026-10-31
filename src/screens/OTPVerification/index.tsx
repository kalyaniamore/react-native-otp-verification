import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton } from '../../components/CustomButton';
import { CustomInput } from '../../components/CustomInput';
import { OTP_LENGTH } from '../../constants/otp.constants';
import { styles } from './styles';
import { useOTPVerification } from './useOTPVerification';

export function OTPVerificationScreen() {
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
  } = useOTPVerification();

  const feedbackStyle = status === 'success' ? styles.success : styles.error;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.form}>
          <Text style={styles.eyebrow}>
            Account security
          </Text>
          <Text style={styles.title}>
            Verify your number
          </Text>
          <Text style={styles.description}>
            Enter the four-digit code sent to your registered mobile number.
          </Text>

          <Text style={styles.inputLabel}>Verification code</Text>
          <CustomInput
            accessibilityLabel="Four-digit verification code"
            editable={!isLoading}
            length={OTP_LENGTH}
            onChangeText={onOTPChange}
            value={otp}
          />
          <Text
            accessibilityLiveRegion="polite"
            style={[styles.feedback, message ? feedbackStyle : undefined]}>
            {message}
          </Text>

          <CustomButton
            accessibilityLabel="Verify code"
            disabled={!otp}
            loading={isLoading && status === 'loading'}
            onPress={onVerify}
            title="Verify"
          />

          <Pressable
            accessibilityLabel={
              canResend ? 'Resend verification code' : `Resend code in ${secondsUntilResend} seconds`
            }
            accessibilityRole="button"
            accessibilityState={{ disabled: !canResend }}
            disabled={!canResend}
            onPress={onResend}
            style={styles.resendButton}>
            <Text style={[styles.resendText, !canResend && styles.resendDisabled]}>
              {canResend ? 'Resend code' : `Resend code in ${secondsUntilResend}s`}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}