import { Pressable, Text, View } from 'react-native';
import { CustomLoader } from '../CustomLoader';
import { styles } from './styles';
import type { CustomButtonProps } from './types';

export function CustomButton({
  title,
  onPress,
  disabled = false,
  loading = false,
  loadingTitle = title,
  accessibilityLabel,
}: CustomButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityRole="button"
      accessibilityState={{ busy: loading, disabled: isDisabled }}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
      ]}>
      <View style={styles.content}>
        {loading ? <CustomLoader /> : null}
        <Text style={styles.title}>{loading ? loadingTitle : title}</Text>
      </View>
    </Pressable>
  );
}