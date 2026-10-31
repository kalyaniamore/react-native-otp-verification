import { ActivityIndicator } from 'react-native';
import { colors } from '../../theme/colors';
import { styles } from './styles';
import type { CustomLoaderProps } from './types';

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