import React from 'react';

export interface IconProps {
    // 图标名称或图片链接
    name?: string;
    // 是否显示图标右上角小红点
    dot?: boolean;
    // HTML 标签
    tag?: keyof HTMLElementTagNameMap | string;
    // 图标大小，默认单位为px
    size?: string | number;
    // 图标右上角徽标的内容
    badge?: string | number;
    // 图标颜色
    color?: string;
    // 类名前缀，用于使用自定义图标
    classPrefix?: string;
    // 外部传入的类名
    className?: string;
    // 点击触发
    onClick?: (e: MouseEvent) => void;
    // 行内样式
    style?: React.CSSProperties;
}
