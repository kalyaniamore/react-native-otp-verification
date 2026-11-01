import { ActivityIndicator } from 'react-native';
import { colors } from '../../theme/colors';
import { styles } from './styles';
import type { CustomLoaderProps } from './types';

/** Displays a small accessible activity indicator for in-progress actions. */
export function CustomLoader({
  label = 'Loading',
  color = colors.onPrimary,
}: CustomLoaderProps) {
  return (
    <ActivityIndicator
      accessibilityLabel={label}
      accessible
      color={color}
      size="small"
      style={styles.indicator}
    />
  );
}
