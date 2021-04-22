import React, { MouseEvent } from 'react';

export interface OverlayProps {
    // 是否显示遮罩层
    show: boolean;
    // 遮罩层层级
    zIndex?: number | string;
    // 遮罩层动画时长，单位秒
    duration?: number | string;
    // 自定义类名
    className?: string;
    // 自定义样式
    customStyle?: React.CSSProperties;
    // 点击时触发
    onClick?: (e: MouseEvent<HTMLElement>) => void;
}
