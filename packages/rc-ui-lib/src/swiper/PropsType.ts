import React from 'react';
import { BaseTypeProps } from '../utils';

type DirectionTypes = 'horizontal' | 'vertical';
type IndicatorColorTypes = 'primary' | 'white';

export type PageIndicatorProps = {
  total: number;
  current: number;
  color?: IndicatorColorTypes;
  direction?: DirectionTypes;
  style?: React.CSSProperties;
  className?: string;
};

export interface SwiperProps extends BaseTypeProps {
  /** 初始位置索引 */
  defaultIndex?: number;
  /** 是否允许手势滑动 */
  allowTouchMove?: boolean;
  /** 是否自动切换 */
  autoplay?: boolean;
  /** 自动切换的间隔 */
  autoplayInterval?: number;
  /** 是否循环 */
  loop?: boolean;
  /**
   * 方向，默认是水平方向
   *  @default 'horizontal'
   * */
  direction?: DirectionTypes;
  /** 切换时触发 */
  onIndexChange?: (index: number) => void;
  /** 指示器的相关属性 */
  indicatorProps?: Pick<PageIndicatorProps, 'style' | 'className'>;
  /** 自定义指示器 */
  indicator?: ((total: number, current: number) => React.ReactNode) | boolean;
  /** 滑块的宽度百分比 */
  slideSize?: number;
  /** 滑块轨道整体的偏移量百分比 */
  trackOffset?: number;
  /** 是否在边界两边卡住，避免出现空白，仅在非 loop 模式且 slideSize < 100 时生效 */
  stuckAtBoundary?: boolean;
  /** 子元素 */
  children?: React.ReactElement | React.ReactElement[];
}

export interface SwiperInstance {
  activeIndex: number;
  swipeTo: (index: number) => void;
  swipeNext: () => void;
  swipePrev: () => void;
  lock: () => void;
  unlock: () => void;
}

export interface SwiperItemProps extends BaseTypeProps {
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
