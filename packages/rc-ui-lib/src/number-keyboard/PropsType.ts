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
  /** 是否显示键盘 */
  visible?: boolean;
  /** 键盘标题 */
  title?: string;
  /** 样式风格，可选值为 `custom`、`default` */
  theme?: NumberKeyboardTheme;
  /** 键盘 z-index 层级 */
  zIndex?: number;
  /**
   * 是否在点击关闭按钮时触发 blur 事件
   * 默认值为`true`
   */
  blurOnClose?: boolean;
  /**
   * 是否展示删除图标
   * 默认值为`true`
   */
  showDeleteKey?: boolean;
  /** 是否将通过随机顺序展示按键 */
  randomKeyOrder?: boolean;
  /** 关闭按钮文字，空则不展示 */
  closeButtonText?: string;
  /** 删除按钮文字，空则展示删除图标 */
  deleteButtonText?: string;
  /**
   * 是否将关闭按钮设置为加载中状态，
   * 仅在 `theme="custom"` 时有效
   */
  closeButtonLoading?: boolean;
  /**
   * 是否在点击外部时收起键盘
   * 默认值为`true`
   */
  hideOnClickOutside?: boolean;
  /**
   * 是否开启底部安全区适配
   * 默认值为`true`
   */
  safeAreaInsetBottom?: boolean;
  /** 底部额外按键的内容 */
  extraKey?: string | string[];
  /**
   * 自定义标题左侧
   */
  titleLeft?: React.ReactNode;
  /**
   * 点击关闭按钮时触发
   */
  onClose?: () => void;
  /** 点击按键时触发 */
  onInput?: (v: string) => void;
  /** 点击删除键时触发 */
  onDelete?: () => void;
  /** 点击关闭按钮或非键盘区域时触发 */
  onBlur?: () => void;
  /** 指定挂载的节点 */
  teleport?: TeleportType;
}
