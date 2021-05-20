import React, { MouseEventHandler } from 'react';

type LabelPositionTypes = 'left' | 'right';
type ShapeTypes = 'square' | 'round';
type BaseClassTypes = 'r-checkbox' | 'r-radio';

export interface CheckerProps extends CheckerBaseProps {
    // 复选框类型
    role?: string;
    // 父组件属性对象
    parent?: Record<string, any>;
    // 是否选中
    checked?: boolean;
    // 是否和复选框组绑定
    bindGroup?: boolean;
    // 点击
    onClick: MouseEventHandler<HTMLDivElement>;
}

export interface CheckerBaseProps {
    // 是否为选中状态
    model: boolean;
    // 标识符
    name?: string;
    // 形状
    shape?: ShapeTypes;
    // 是否使用自定义图片（Icon组件中使用）
    imgUrl?: Record<string, string>;
    // 是否禁用复选框
    disabled?: boolean;
    // 是否禁用复选框文本点击
    labelDisabled?: boolean;
    // 文本位置
    labelPosition?: LabelPositionTypes;
    // 图标大小，默认单位为 px
    iconSize?: number | string;
    // 选中状态颜色
    checkedColor?: string;
    // 基类名
    baseClass?: BaseClassTypes;
    // 子元素
    children: React.ReactNode;
    // 状态切换
    onToggle?: (checked: boolean) => void;
}
