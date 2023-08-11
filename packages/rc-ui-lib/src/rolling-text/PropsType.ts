import { BaseTypeProps } from '../utils';

export type RollingTextDirection = 'up' | 'down';
export type RollingTextStopOrder = 'ltr' | 'rtl';

export interface RollingTextProps extends BaseTypeProps {
  /**
   * 数字高度，单位为 px
   * @default 40
   */
  height?: number;
  /**
   * 起始数值
   * @default 0
   */
  startNum?: number;
  /**
   * 目标数值
   */
  targetNum?: number;
  /**
   * 内容数组，用于翻转非数字内容
   * @default []
   */
  textList?: string[];
  /**
   * 动画时长，单位为秒
   * @default 2
   */
  duration?: number;
  /**
   * 是否自动开始动画
   * @default true
   */
  autoStart?: boolean;
  /**
   * 文本翻滚方向，值为 down 和 up
   * @default down
   */
  direction?: RollingTextDirection;
  /**
   * 各个数位动画停止先后顺序，值为 ltr 和 rtl
   * @default ltr
   */
  stopOrder?: RollingTextStopOrder;
}

export type RollingTextInstance = {
  start: () => void;
  reset: () => void;
};

export interface RollingTextItemProps {
  figureArr?: any[];
  /**
   * 起始数值
   * @default 0
   */
  delay?: number;
  /**
   * 动画时长，单位为秒
   * @default 2
   */
  duration?: number;
  /**
   * 是否自动开始动画
   * @default true
   */
  isStart: boolean;
  /**
   * 文本翻滚方向，值为 down 和 up
   * @default down
   */
  direction?: RollingTextDirection;
  /**
   * 数字高度，单位为 px
   * @default 40
   */
  height?: number;
}

export type RollingTextThemeVars = {
  rollingTextBackground?: string;
  rollingTextColor?: string;
  rollingTextFontSize?: string;
  rollingTextGap?: string;
  rollingTextItemWidth?: string;
  rollingTextItemBorderRadius?: string;
};
