export interface PasswordInputProps {
  value: string;
  info?: string;
  mask?: boolean;
  length?: number;
  gutter?: number;
  errorInfo?: string;
  focused: boolean;
  onFocus?: (e: TouchEvent) => void;
}
