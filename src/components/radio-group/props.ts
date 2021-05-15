export interface RadioGroupProps {
    // 所有选中项的标识符
    model?: any;
    // 所有选中项的标识符
    disabled?: boolean;
    // 排列方向
    direction?: directionTypes;
    // 所有复选框的图标大小，默认单位为 px
    iconSize?: string | number;
    // 所有复选框的选中状态颜色
    checkedColor?: string;
    // 当绑定值变化时触发的事件
    onChange?: () => void;
}

type directionTypes = 'horizontal' | 'vertical';
