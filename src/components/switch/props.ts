import { MouseEventHandler } from "react";

export interface SwitchProps {
    // 开关尺寸，默认单位为px
    size?: string | number;
    // 	是否为加载状态
    loading?: boolean;
    // 是否为禁用状态
    disabled?: boolean;
    // 开关选中状态
    model?: unknown;
    // 打开时的背景色
    activeColor?: string;
    // 关闭时的背景色
    inactiveColor?: string;
    // 	打开时对应的值
    activeValue: unknown;
    // 关闭时对应的值
    inactiveValue: unknown;
    // 开关状态切换时触发
    onChange?: (val: any) => void;
    // 点击时触发
    onClick?: MouseEventHandler<HTMLDivElement>;
}
