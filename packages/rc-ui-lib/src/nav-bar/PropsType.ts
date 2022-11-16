import React from 'react';
import { BaseTypeProps } from '../utils';

export interface NavBarProps extends BaseTypeProps {
  /** 标题 */
  title?: string | React.ReactNode;
  /** 左侧区域 */
  leftArea?: string | React.ReactNode;
  /** 右侧区域 */
  rightArea?: string | React.ReactNode;
  /** 是否固定在顶部 */
  fixed?: Boolean;
  /** 导航栏 z-index */
  zIndex?: number;
  /** 是否显示下边框 */
  border?: boolean;
  /** 是否显示左侧箭头 */
  leftArrow?: Boolean;
  /** 固定在顶部时，是否在标签位置生成一个等高的占位元素 */
  placeholder?: Boolean;
  /**  是否开启顶部安全区适配 */
  safeAreaInsetTop?: Boolean;
  /** 点击左侧时触发		 */
  onClickLeft?: (event: React.MouseEvent) => void;
  /** 点击右侧时触发	 */
  onClickRight?: (event: React.MouseEvent) => void;
  /** 子元素 */
  children?: React.ReactNode;
}
