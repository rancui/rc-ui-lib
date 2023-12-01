import { BaseTypeProps } from '../utils';

export interface WatermarkProps extends BaseTypeProps {
  /** 	水印宽度, 默认值为100	 */
  width?: number;
  /** 	水印高度, 默认值为100	 */
  height?: number;
  /** 	水印的 z-index, 默认值为100	 */
  zIndex?: number | string;
  /** 	文字水印的内容	 */
  content?: string;
  /** 	图片水印的内容，如果与 content 同时传入，优先使用图片水印	 */
  image?: string;
  /** 	水印的旋转角度 默认-22	 */
  rotate?: number | string;
  /** 水印是否全屏显示 */
  fullPage?: boolean;
  /** 水印之间的水平间隔 */
  gapX?: number;
  /** 水印之间的垂直间隔 */
  gapY?: number;
  /** 文字水印的颜色 */
  textColor?: string;
  /** 水印的透明度 */
  opacity?: number;
  /**
   * 子元素
   */
  children?: React.ReactNode;
}

export type WatermarkThemeVars = {
  watermarkZIndex?: number | string;
};
