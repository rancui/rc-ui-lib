import React from 'react';
import { BaseTypeProps } from '../utils';

export interface ProgressProps extends BaseTypeProps {
  /** 进度条颜色 */
  color?: string;
  /** 是否置灰 */
  inactive?: Boolean;
  /** 进度文字内容 */
  pivotText?: string;
  /** 进度文字颜色 */
  textColor?: string;
  /** 是否显示进度文字 */
  showPivot?: Boolean;
  /** 进度文字背景色 */
  pivotColor?: string;
  /** 轨道颜色 */
  trackColor?: string;
  /** 进度条粗细，默认单位为`px` */
  strokeWidth?: string | number;
  /** 进度百分比 */
  percentage?: string | number;
}
