import React from 'react';
import { TeleportType } from '../utils';

export type NumberKeyboardTheme = 'default' | 'custom';

export type KeyType = '' | 'delete' | 'extra' | 'close';

export type KeyConfig = {
  text?: number | string;
  type?: KeyType;
  color?: string;
  wider?: boolean;
};

export interface NumberKeyboardProps {
  visible: boolean;
  title?: string;
  theme?: NumberKeyboardTheme;
  zIndex?: number;
  transition?: boolean;
  blurOnClose?: boolean;
  showDeleteKey?: boolean;
  randomKeyOrder?: boolean;
  closeButtonText?: string;
  deleteButtonText?: string;
  closeButtonLoading?: boolean;
  hideOnClickOutside?: boolean;
  safeAreaInsetBottom?: boolean;
  extraKey?: string | string[];
  /**
   * 自定义标题左侧
   */
  titleLeft?: React.ReactNode;
  /**
   * 点击关闭时触发
   */
  onClose?: () => void;
  onInput?: (v: string) => void;
  onDelete?: () => void;
  onBlur?: () => void;
  /** 指定挂载的节点 */
  teleport?: TeleportType;
}
