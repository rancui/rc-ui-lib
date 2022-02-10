import { CSSProperties, ReactNode } from 'react';

export type SwipeCellSide = 'left' | 'right';

export type SwipeCellPosition = SwipeCellSide | 'cell' | 'outside';

export type SwipeCellInstance = {
  open: (side: SwipeCellSide) => void;
  close: (position: SwipeCellPosition) => void;
};

export interface SwipeCellProps {
  /** 标识符，可以在事件参数中获取到 */
  name?: string;
  /**
   * 指定左侧滑动区域宽度，单位为px
   * 默认值`auto`
   */
  leftWidth?: string | number;
  /**
   * 指定右侧滑动区域宽度，单位为px
   * 默认值`auto`
   */
  rightWidth?: string | number;
  /** 自定义左操作栏内容 */
  left?: ReactNode;
  /** 自定义右操作栏内容 */
  right?: ReactNode;
  /** 是否禁用滑动 */
  disabled?: boolean;
  /** 是否在点击其他区域时自动归位 */
  hideOnClickOutside?: boolean;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  tabIndex?: number;
  /** 关闭前的回调函数 */
  beforeClose?: (option: {
    name: string;
    position: SwipeCellSide;
    instance: {
      close: (position?: SwipeCellPosition) => void;
    };
  }) => void;
  /** 点击时的回调函数 */
  onClick?: (position: SwipeCellPosition) => void;
  /** 打开时的回调函数 */
  onOpen?: (option: { position: SwipeCellSide; name: string }) => void;
  /** 关闭时的回调函数 */
  onClose?: (option: { position: SwipeCellPosition; name: string }) => void;
}
