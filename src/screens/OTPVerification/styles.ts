import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { dimensions } from '../../theme/dimensions';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.large,
    paddingVertical: spacing.extraLarge,
  },
  form: {
    maxWidth: dimensions.contentMaxWidth,
    width: '100%',
  },
  eyebrow: {
    color: colors.primary,
    fontSize: typography.fontSizeCaption,
    fontWeight: typography.fontWeightBold,
    lineHeight: typography.lineHeightCaption,
    marginBottom: spacing.small,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: typography.fontSizeTitle,
    fontWeight: typography.fontWeightBold,
    lineHeight: typography.lineHeightTitle,
    marginBottom: spacing.small,
  },
  description: {
    color: colors.mutedText,
    fontSize: typography.fontSizeBody,
    fontWeight: typography.fontWeightRegular,
    lineHeight: typography.lineHeightBody,
    marginBottom: spacing.extraLarge,
  },
  inputLabel: {
    color: colors.text,
    fontSize: typography.fontSizeBody,
    fontWeight: typography.fontWeightBold,
    lineHeight: typography.lineHeightBody,
    marginBottom: spacing.small,
  },
  input: {
    marginBottom: spacing.medium,
  },
  feedback: {
    color: colors.mutedText,
    fontSize: typography.fontSizeCaption,
    lineHeight: typography.lineHeightCaption,
    marginBottom: spacing.medium,
    minHeight: 22,
  },
  success: {
    color: colors.success,
  },
  error: {
    color: colors.error,
  },
  verifyButton: {
    marginTop: spacing.small,
  },
  resendButton: {
    alignSelf: 'center',
    marginTop: spacing.large,
    padding: spacing.small,
  },
  resendText: {
    color: colors.primary,
    fontSize: typography.fontSizeBody,
    fontWeight: typography.fontWeightBold,
    lineHeight: typography.lineHeightBody,
  },
  resendDisabled: {
    color: colors.mutedText,
  },
});