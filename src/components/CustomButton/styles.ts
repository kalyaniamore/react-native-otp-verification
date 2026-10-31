import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { dimensions } from '../../theme/dimensions';
import { typography } from '../../theme/typography';

export const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 8,
    height: dimensions.buttonHeight,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  pressed: {
    backgroundColor: colors.primaryPressed,
  },
  disabled: {
    backgroundColor: colors.disabled,
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  title: {
    color: colors.onPrimary,
    fontSize: typography.fontSizeBody,
    fontWeight: typography.fontWeightBold,
  },
});