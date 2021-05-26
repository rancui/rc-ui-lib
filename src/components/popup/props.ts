import React, { MouseEventHandler } from 'react';
import { ContanierType } from '../../utils';

export type positionTypes = 'top' | 'right' | 'bottom' | 'left' | 'center';
export type closeIconPositionTypes = 'top-left' | 'bottom-left' | 'bottom-right';

export interface PopupSharedProps {
  // 是否显示弹出层
  show?: boolean;
  // 动画时长，单位毫秒
  duration?: number | string;
  // z-index
  zIndex?: number | string;
  // 指定挂载的节点
  teleport?: string | ContanierType;
  // 是否显示遮罩层
  overlay?: boolean;
  // 自定义遮罩层样式
  overlayStyle?: React.CSSProperties;
  // 自定义遮罩层类名
  overlayClass?: unknown;
  // 是否在点击遮罩层后关闭
  closeOnClickOverlay?: boolean;
}

export const defultPopupSharedProps: PopupSharedProps = {
  show: false,
  duration: 300,
  zIndex: 2000,
  teleport: 'body',
  overlay: true,
  overlayStyle: {},
  overlayClass: '',
  closeOnClickOverlay: true,
};

export interface PopupProps extends PopupSharedProps {
  // 弹出层内联样式
  style?: React.CSSProperties;
  // 该组件被引用时传入的样式
  className?: string;
  // 是否显示圆角
  round?: boolean;
  // 是否显示关闭图标
  closeable?: boolean;
  // 动画类名，等价于Vue中的transtion的name属性(该处是配合该组件中的react-transition-group代码使用)
  transition?: string;
  // 是否开启底部安全区适配
  safeAreaInsetBottom?: boolean;
  // 关闭图标名称或图片链接
  closeIcon?: string;
  // 关闭按钮的位置
  closeIconPosition?: closeIconPositionTypes;
  // 弹出位置，可选值为 top bottom right left
  position?: positionTypes;
  // 点击遮罩层时触发
  onClickOverlay?: () => void;
  // 点击弹出层时触发
  onClick?: MouseEventHandler<HTMLDivElement>;
  // 打开弹出层时触发，参数是el，即该元素本身
  onOpen?: (el: HTMLElement) => void;
  // 打开弹出层且动画结束后触发，参数是el，即该元素本身
  onOpened?: (el: HTMLElement) => void;
  // 关闭弹出层时触发，参数是el，即该元素本身
  onClose?: () => void;
  // 关闭弹出层且动画结束后触发，参数是el，即该元素本身
  onClosed?: (el: HTMLElement) => void;
  // 点击关闭按钮图标时触发，参数是el，即该元素本身
  onClickCloseIcon?: MouseEventHandler<HTMLElement>;
  children?: React.ReactNode;
}
