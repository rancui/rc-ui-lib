// export type TagTypes = keyof HTMLElementTagNameMap;
import React, { MouseEventHandler } from 'react';

export interface BadgeProps {
  // 是否展示为小红点
  dot?: boolean;
  // 最大值，超过最大值会显示 {max}+，仅当 content 为数字时有效
  max?: number | string;
  // 徽标背景颜色
  color?: string;
  // 徽标内容
  content?: number | string;
  // 设置徽标的偏移量，数组的两项分别对应水平和垂直方向的偏移量
  offset?: [number, number];
  // 外部注入类
  className?: string;
  // 内联样式
  style?: React.CSSProperties;
  // 自定义标签
  tag?: string;
  // 点击事件
  onClick?: MouseEventHandler<HTMLElement>;
}
