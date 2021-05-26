export interface ActionBarIconProps {
  // 按钮文字
  text: string;
  // 图标
  icon?: string;
  // 图标颜色
  color?: string;
  // 是否显示图标右上角小红点
  dot?: boolean;
  // 图标右上角徽标的内容
  badge?: number | string;
  // 图标额外类名
  className?: string;
}
