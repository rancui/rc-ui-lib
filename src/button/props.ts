import React, { MouseEventHandler } from 'react';

export type ButtonTypes = 'default' | 'primary' | 'warning' | 'info' | 'danger' | 'round';
export type ButtonSizeTypes = 'large' | 'small' | 'mini' | 'normal';
export type NativeTypes = 'button' | 'submit' | 'reset';
export type IocnPositionTypes = 'left' | 'right';
export type LoadingTypes = 'spinner' | 'circular' | undefined;

export interface ButtonProps {
  // 按钮类型，可选值为 primary,info, warning, danger,round
  type?: ButtonTypes;
  // 按钮文案
  text?: string;
  // 尺寸，可选值为 large, small, mini, normal
  size?: ButtonSizeTypes;
  // 按钮颜色，支持传入 linear-gradient 渐变色
  color?: string;
  // 按钮字体颜色
  fontColor?: string;
  // 左侧图标名称或图片链接
  icon?: string;
  // 图标类名前缀，同 Icon 组件的 class-prefix 属性
  iconPrefix?: string;
  // 图标展示位置，可选值为 left, right
  iconPosition?: IocnPositionTypes;
  // 按钮根节点的 HTML 标签
  tag?: keyof HTMLElementTagNameMap | string;
  // 原生 button 标签的 type 属性
  nativeType?: NativeTypes;
  // 是否使用 0.5px 边框
  hairline?: boolean;
  // 是否为朴素按钮
  plain?: boolean;
  // 是否禁用按钮
  disabled?: boolean;
  // 是否为圆形按钮
  round?: boolean;
  // 是否为方形按钮
  square?: boolean;
  replace?: boolean;
  // 是否为块级元素
  block?: boolean;
  // 是否显示为加载状态
  loading?: boolean;
  // 加载状态提示文字
  loadingText?: string;
  // 加载图标大小
  loadingSize?: string;
  // 加载图标类型，可选值为 spinner
  loadingType?: LoadingTypes;
  // 点击后跳转的链接地址
  url?: string;
  // 后代子元素
  children?: string;
  // 点击按钮，且按钮状态不为加载或禁用时触发
  // onClick?: (e: MouseEvent) => void;
  onClick?: MouseEventHandler<HTMLElement>;
  // 传入的类名
  className?: string;
  // 内联样式
  style?: React.CSSProperties;
}
