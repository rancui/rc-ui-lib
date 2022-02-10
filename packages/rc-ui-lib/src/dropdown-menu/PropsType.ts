import React, { ReactNode } from 'react';
import { BaseTypeProps, TeleportType } from '../utils';

type DirectionTypes = 'up' | 'down';

export type DropdownItemOption = {
  /** 文案 */
  text?: string;
  /** 标识符 */
  value?: string | number;
  /** 左侧图标名称或图片链接 */
  icon?: string | ReactNode;
};

export interface DropdownMenuProps extends BaseTypeProps {
  /** 菜单标题和选项的选中态颜色 */
  activeColor?: string;
  /** 菜单展开方向 */
  direction?: DirectionTypes;
  /** 菜单栏 z-index 层级 */
  zIndex?: string | number;
  /** 动画时长，单位秒 */
  duration?: number | string;
  /** 是否显示遮罩层 */
  overlay?: boolean;
  /** 是否在点击遮罩层后关闭菜单 */
  closeOnClickOverlay?: boolean;
  /** 是否在点击外部元素后关闭菜单 */
  closeOnClickOutside?: boolean;
  /** 子元素 */
  children?: React.ReactNode;
  /** 点击选项导致 value 变化时触发 */
  onChange?: (value: DropdownItemOption) => void;
  /** @private */
  shouldRenderTitle?: boolean;
}

export interface DropdownItemProps extends BaseTypeProps {
  /** 标志符 */
  name?: string;
  /** 菜单项标题 */
  title?: string;
  /** 默认值 */
  defaultValue?: DropdownItemOption;
  /** 当前选中项对应的 value */
  value?: DropdownItemOption;
  /** 占位文本 */
  placeholder?: string;
  /** 选项数组 */
  options?: DropdownItemOption[];
  /** 是否禁用菜单 */
  disabled?: boolean;
  /** 标题额外类名 */
  titleClass?: string;
  /** 子元素 */
  children?: React.ReactNode;
  /** @private */
  showPopup?: boolean;
  /** 指定挂载的节点 */
  teleport?: TeleportType;
  /** 点击选项导致 value 变化时触发 */
  onChange?: (value: DropdownItemOption) => void;
  /** 打开菜单栏时触发 */
  onOpen?: () => void;
  /** 打开菜单栏且动画结束后触发 */
  onOpened?: () => void;
  /** 关闭菜单栏时触发 */
  onClose?: () => void;
  /** 关闭菜单栏且动画结束后触发 */
  onClosed?: () => void;
}

export interface DropdownMenuContextProps {
  props?: React.PropsWithChildren<DropdownMenuProps>;
  value?: Record<string, number | string>;
  offset?: number | string;
  /** 点击选项导致 value 变化时触发 */
  onChange?: (obj) => void;
  renderTitle?: (ins: DropdownItemInstance) => void;
  close?: () => void;
}

export interface DropdownMenuInstance {
  close: () => void;
}
export interface DropdownItemInstance {
  /** 切换菜单展示状态，传 true 为显示，false 为隐藏，不传参为取反	 */
  toggle: (
    show?: boolean,
    options?: {
      immediate?: boolean;
    },
  ) => void;
  /** @private */
  state: {
    showPopup: boolean;
    transition: boolean;
    showWrapper: boolean;
  };
  /** @private */
  renderTitle: (value) => string | ReactNode;
}
