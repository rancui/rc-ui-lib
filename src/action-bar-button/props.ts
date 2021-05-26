export type ButtonTypes = 'primary' | 'info' | 'warning' | 'danger';
export type IndexPostionTypes = 'first' | 'last';

export interface ActionBarButtonProps {
  // 按钮文字
  text: string;
  // 按钮类型
  type?: ButtonTypes;
  // 按钮颜色
  color?: string;
  // 左侧图标名称或图片链接
  icon?: string;
  // 是否禁用按钮
  disabled?: boolean;
  // 是否显示为加载状态
  loading?: boolean;
  // 在父组件中，排序位置
  indexPostion?: IndexPostionTypes;
  // 点击按钮
  onClick?: () => void;
}
