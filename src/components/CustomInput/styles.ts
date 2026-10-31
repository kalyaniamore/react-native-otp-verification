import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { dimensions } from '../../theme/dimensions';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export const styles = StyleSheet.create({
  container: {
    height: dimensions.inputHeight,
    marginBottom: spacing.medium,
    width: '100%',
  },
  cells: {
    flexDirection: 'row',
    gap: spacing.small,
    height: '100%',
  },
  cell: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
  },
  digit: {
    color: colors.text,
    fontSize: typography.fontSizeOtp,
    fontWeight: typography.fontWeightBold,
  },
  hiddenInput: {
    color: 'transparent',
    opacity: 0.02,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  focused: {
    backgroundColor: colors.activeSurface,
    borderColor: colors.primary,
    borderWidth: 2,
  },
  disabled: {
    backgroundColor: colors.disabledSurface,
  },
});