import React, { MouseEventHandler } from 'react';

export type CellArrowDirection = 'top' | 'right' | 'bottom' | 'left';
export interface CellProps {
    // 左侧图标名称或图片链接
    icon?: string;
    // 单元格大小
    size?: string;
    // 类名
    className?: string;
    // 左侧标题
    title?: number | string;
    // 右侧内容
    value?: number | string;
    // 标题下方的描述信息
    label?: number | string;
    // 是否使内容垂直居中
    center?: boolean;
    // 是否展示右侧箭头并开启点击反馈
    isLink?: boolean;
    // 是否显示表单必填星号
    required?: boolean;
    // 图标类名前缀，同 Icon 组件的 classPrefix属性
    iconPrefix?: string;
    // 右侧内容额外类名
    valueClass?: string;
    // 描述信息额外类名
    labelClass?: string;
    // 左侧标题额外类名
    titleClass?: string;
    // 左侧标题额外样式
    titleStyle: React.CSSProperties;
    // 箭头方向
    arrowDirection: CellArrowDirection;
    // 是否显示内边框
    border?: boolean;
    // 是否开启点击反馈
    clickable?: boolean | null;
    // 子元素
    children: React.ReactNode;
    // 点击
    onClick?: MouseEventHandler<HTMLDivElement>;
}
