import React from 'react';
import { PopupCloseIconPosition } from '../popup/PropsType';
import { BaseTypeProps } from '../utils';

export type CloseParams = { url: string; index: number };

export interface ImagePreviewProps extends BaseTypeProps {
  visible?: boolean;
  /** 是否开启循环播放 */
  loop?: boolean;
  overlay?: boolean;
  /** 是否在页面回退时自动关闭 */
  closeable?: boolean;
  /** 图片预览起始位置索引 */
  startPosition?: number;
  /** 关闭图标名称或图片链接 */
  closeIcon?: string;
  /** 关闭图标位置 */
  closeIconPosition?: PopupCloseIconPosition;
  /** 是否显示轮播指示器 */
  showIndicators?: boolean;
  /** 是否显示页码 */
  showIndex?: boolean;
  indexRender?: ({ index, len }: { index: number; len: number }) => React.ReactNode;
  /** 是否在页面回退时自动关闭 */
  closeOnPopstate?: boolean;
  /** 自定义遮罩层样式 */
  overlayStyle?: React.CSSProperties;
  /**
   * 关闭前的回调函数，返回 false 可阻止关闭，支持返回 Promise
   */
  beforeClose?: (active: string | number) => boolean | Promise<boolean>;

  /**
   * 关闭时的回调函数
   * @param {string} url 当前图片 URL
   * @param {number} index 当前图片的索引值
   */
  onClose?: ({ url, index }?: CloseParams) => void;
  /** 完全关闭时的回调 */
  onClosed?: () => void;
  /** 切换图片时的回调函数，回调参数为当前索引 */
  onChange?: (index: number) => void;
  /** 需要预览的图片 URL 数组 */
  images?: string[];
  /** 动画时长，单位为 ms */
  swipeDuration?: number;
  /** 弹出时的的父容器 */
  teleport?: HTMLElement | (() => HTMLElement);
}

export type ImagePreviewStatic = {
  (ImagePreviewProps): JSX.Element;
  /** 调用该函数后会直接在页面中展示图片预览界面 */
  open: (OpenProps: Omit<ImagePreviewProps, 'visible'>) => () => void;
};
