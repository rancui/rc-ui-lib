import { ReactElement } from 'react';

export interface SidebarProps {
  /** 默认值 */
  value?: string | number;
  children: ReactElement | ReactElement[];
  /** 改变时的回调函数	 */
  onChange?: (value: number) => void;
}

export interface SidebarItemProps {
  /** 是否显示右上角小红点 */
  dot?: boolean;
  /** 图标右上角徽标的内容 */
  badge?: number | string;
  /** 内容 */
  title?: string;
  children?: ReactElement | string;
  /** 是否禁用该项 */
  disabled?: boolean;
  index?: number;
  /** 点击时的回调函数	 */
  onClick?: (value: number) => void;
}
