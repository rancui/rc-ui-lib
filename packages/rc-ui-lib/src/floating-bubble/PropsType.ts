import { ReactNode } from 'react';
import { BaseTypeProps, TeleportType } from '../utils';

export type FloatingBubbleThemeVars = {
  floatingBubbleSize?: string;
  floatingBubbleInitialGap?: string;
  floatingBubbleIconSize?: string;
  floatingBubbleBackground?: string;
  floatingBubbleColor?: string;
  floatingBubbleZIndex?: number | string;
};

export type FloatingBubbleAxis = 'x' | 'y' | 'xy' | 'lock';

export type FloatingBubbleMagnetic = 'x' | 'y';

export type FloatingBubbleOffset = {
  x: number;
  y: number;
};

export type FloatingBubbleBoundary = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export interface FloatingBubbleProps extends BaseTypeProps {
  /** 	气泡初始位置	 */
  offset?: FloatingBubbleOffset;
  /** 	拖拽的方向	 */
  axis?: FloatingBubbleAxis;
  /** 	自动磁吸的方向	 */
  magnetic?: FloatingBubbleMagnetic;
  /** 	气泡图标名称或图片链接 */
  icon?: string;
  /** 	气泡与窗口的最小间距 */
  gap?: number;
  /** 	指定挂载的节点 	 */
  teleport?: TeleportType;
  /** 点击组件时触发  */
  onClick?: (event: React.MouseEvent) => void;
  /** 由用户拖拽结束导致位置改变后触发 */
  onOffsetChange?: (offset: FloatingBubbleOffset) => void;
  /** 子元素 */
  children?: ReactNode;
}
