/** Configuration for the controlled digit input. */
export interface CustomInputProps {
  /** Current digit string displayed by the input. */
  value: string;
  /** Called with sanitized numeric input, capped to `length` digits. */
  onChangeText: (value: string) => void;
  /** Number of digit cells to display. Defaults to four. */
  length?: number;
  /** Whether the input accepts edits. */
  editable?: boolean;
  /** Accessible name announced for the native text input. */
  accessibilityLabel?: string;
}
