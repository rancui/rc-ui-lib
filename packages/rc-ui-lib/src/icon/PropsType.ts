import React from 'react';
import { BadgeSettingProps, HtmlTagType } from '../badge/PropsType';
import { BaseTypeProps } from '../utils';

export interface IconProps extends BaseTypeProps {
  /** HTML 标签
   * @default 'i'
   */
  tag?: HtmlTagType;
  /** 图标名称或图片链接   */
  name: string;
  /** 图标颜色   */
  color?: string;
  /** 是否显示图标右上角小红点 */
  dot?: boolean;
  /**
   * 图标大小，如 20px 2em，默认单位为px
   * @default 'inherit''
   */
  size?: number | string;
  /** 徽标内容 */
  badge?: BadgeSettingProps;
  /**
   * 类名前缀，用于使用自定义图标
   * @default 'van-icon'
   */
  classPrefix?: string;
  /** 自元素 */
  children?: React.ReactNode;
  /** 点击图标时触发   */
  onClick?: (e: React.MouseEvent) => void;
  /** 触摸开始，多点触控 */
  onTouchStart?: (e: React.MouseEvent) => void;
}
