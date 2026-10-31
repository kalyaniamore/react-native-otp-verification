import { useState } from 'react';
import { Keyboard, Text, TextInput, View } from 'react-native';
import { otpCopy } from '../../constants/otp.strings';
import { styles } from './styles';
import type { CustomInputProps } from './types';

export function CustomInput({
  value,
  onChangeText,
  length = 4,
  editable = true,
  accessibilityLabel = otpCopy.inputAccessibilityLabel,
}: CustomInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleChangeText = (text: string) => {
    const digits = text.replace(/\D/g, '').slice(0, length);
    onChangeText(digits);

    if (digits.length >= length) {
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.container}>
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        pointerEvents="none"
        style={styles.cells}
      >
        {Array.from({ length }, (_, index) => {
          const isActive =
            isFocused && index === Math.min(value.length, length - 1);
          const digit = value[index];

          return (
            <View
              key={index}
              style={[
                styles.cell,
                isActive && styles.focused,
                !editable && styles.disabled,
              ]}
            >
              <Text style={styles.digit}>{digit ?? ''}</Text>
            </View>
          );
        })}
      </View>
      <TextInput
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={otpCopy.inputAccessibilityHint}
        accessibilityRole="text"
        autoCapitalize="none"
        autoComplete="one-time-code"
        autoCorrect={false}
        editable={editable}
        keyboardType="number-pad"
        onBlur={() => setIsFocused(false)}
        onChangeText={handleChangeText}
        onFocus={() => setIsFocused(true)}
        selectionColor="transparent"
        selectTextOnFocus={false}
        style={styles.hiddenInput}
        textContentType="oneTimeCode"
        value={value}
      />
    </View>
  );
}
