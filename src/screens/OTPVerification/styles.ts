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
    paddingVertical: spacing.large,
  },
  form: {
    alignItems: 'center',
    maxWidth: dimensions.contentMaxWidth,
    width: '100%',
  },
  illustration: {
    height: 170,
    marginBottom: spacing.medium,
    maxWidth: '100%',
    width: 190,
  },
  mark: {
    alignItems: 'center',
    backgroundColor: colors.activeSurface,
    borderColor: colors.border,
    borderRadius: 30,
    borderWidth: 1,
    height: 60,
    justifyContent: 'center',
    marginBottom: spacing.large,
    width: 60,
  },
  markText: {
    color: colors.primary,
    fontSize: 30,
    fontWeight: typography.fontWeightBold,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: typography.fontSizeCaption,
    fontWeight: typography.fontWeightBold,
    lineHeight: typography.lineHeightCaption,
    marginBottom: spacing.medium,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: typography.fontSizeTitle,
    fontWeight: typography.fontWeightBold,
    lineHeight: typography.lineHeightTitle,
    marginBottom: spacing.small,
    textAlign: 'center',
  },
  description: {
    color: colors.mutedText,
    fontSize: typography.fontSizeBody,
    fontWeight: typography.fontWeightRegular,
    lineHeight: typography.lineHeightBody,
    marginBottom: spacing.extraLarge,
    textAlign: 'center',
  },
  destination: {
    alignItems: 'center',
    backgroundColor: colors.activeSurface,
    borderRadius: 12,
    marginBottom: spacing.large,
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
    width: '100%',
  },
  destinationLabel: {
    color: colors.mutedText,
    fontSize: typography.fontSizeCaption,
    lineHeight: typography.lineHeightCaption,
  },
  destinationValue: {
    color: colors.text,
    fontSize: typography.fontSizeBody,
    fontWeight: typography.fontWeightBold,
    lineHeight: typography.lineHeightBody,
  },
  inputLabel: {
    alignSelf: 'flex-start',
    color: colors.text,
    fontSize: typography.fontSizeBody,
    fontWeight: typography.fontWeightBold,
    lineHeight: typography.lineHeightBody,
    marginBottom: spacing.small,
  },
  feedback: {
    color: colors.mutedText,
    fontSize: typography.fontSizeCaption,
    lineHeight: typography.lineHeightCaption,
    marginBottom: spacing.small,
    minHeight: typography.lineHeightCaption,
    textAlign: 'center',
    width: '100%',
  },
  success: {
    color: colors.success,
  },
  error: {
    color: colors.error,
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
  securityNote: {
    color: colors.mutedText,
    fontSize: typography.fontSizeCaption,
    lineHeight: typography.lineHeightCaption,
    marginTop: spacing.large,
    textAlign: 'center',
  },
});