import { ReactElement } from 'react';
import { NumberKeyboardProps } from '../number-keyboard';

export interface PasswordInputProps {
  /** 默认值 */
  value?: string;
  /** 输入框下方文字提示 */
  info?: string;
  /** 是否隐藏密码内容 */
  mask?: boolean;
  /** 密码最大长度 */
  length?: number;
  /**
   * 输入框格子之间的间距，如 20px 2em，默认单位为px
   */
  gutter?: number;
  /** 输入框下方错误提示 */
  errorInfo?: string;
  /** 是否已聚焦，聚焦时会显示光标 */
  focused: boolean;
  keyboard?: ReactElement<NumberKeyboardProps>;
  /** 输入时的回调函数	 */
  onChange?: (val: string) => void;
  /** 输入框聚焦时的回调函数 */
  onFocus?: () => void;
  /** 输入框失焦时的回调函数 */
  onBlur?: () => void;
  /** 输入完成的回调函数 */
  onFill?: (v: string) => void;
}

export type PasswordInputInstance = {
  focus: () => void;
  blur: () => void;
};
