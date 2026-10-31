import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { dimensions } from '../../theme/dimensions';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    color: colors.text,
    fontSize: typography.fontSizeOtp,
    fontWeight: typography.fontWeightBold,
    height: dimensions.inputHeight,
    letterSpacing: 8,
    paddingHorizontal: spacing.medium,
    textAlign: 'center',
  },
  focused: {
    borderColor: colors.primary,
  },
  disabled: {
    backgroundColor: colors.disabledSurface,
    color: colors.mutedText,
  },
});