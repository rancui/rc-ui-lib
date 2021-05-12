type DirectionTypes = 'horizontal' | 'vertical';
export interface CheckboxGroupProps {
    // 所有选中项的标识符
    model?: unknown[];
    // 所有选中项的标识符
    disabled?: boolean;
    // 	最大可选数，0为无限制
    max?: number | string;
    // 排列方向
    direction?: DirectionTypes;
    // 所有复选框的图标大小，默认单位为 px
    iconSize?: string | number;
    // 所有复选框的选中状态颜色
    checkedColor?: string;
    // 当绑定值变化时触发的事件
    onChange?: (val: any[]) => void;
}
