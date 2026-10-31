export interface CustomInputProps {
  value: string;
  onChangeText: (value: string) => void;
  length?: number;
  editable?: boolean;
  accessibilityLabel?: string;
}