/** Configuration for the reusable action button. */
export interface CustomButtonProps {
  /** Label shown while the button is idle. */
  title: string;
  /** Called when the enabled button is pressed. */
  onPress: () => void;
  /** Prevents presses and applies the disabled appearance. */
  disabled?: boolean;
  /** Shows a loader and disables the button while work is in progress. */
  loading?: boolean;
  /** Optional label shown in place of `title` while loading. */
  loadingTitle?: string;
  /** Accessible name announced for the button. Defaults to `title`. */
  accessibilityLabel?: string;
}
