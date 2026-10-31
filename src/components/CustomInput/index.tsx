import { useState } from 'react';
import { TextInput } from 'react-native';
import { styles } from './styles';
import type { CustomInputProps } from './types';

export function CustomInput({
  value,
  onChangeText,
  length = 4,
  editable = true,
  accessibilityLabel = 'Four-digit verification code',
}: CustomInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="text"
      autoCapitalize="none"
      autoCorrect={false}
      editable={editable}
      keyboardType="number-pad"
      maxLength={length}
      onBlur={() => setIsFocused(false)}
      onChangeText={onChangeText}
      onFocus={() => setIsFocused(true)}
      placeholder={'-'.repeat(length)}
      placeholderTextColor={styles.input.color as string}
      selectTextOnFocus
      style={[styles.input, isFocused && styles.focused, !editable && styles.disabled]}
      value={value}
    />
  );
}