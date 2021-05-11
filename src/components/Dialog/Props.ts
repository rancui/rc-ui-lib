import { ContanierType } from '@/utils';
import React from 'react';

type DialogAction = 'confirm' | 'cancel';
type DialogDone = (close?: boolean) => void;
type themeType = 'default' | 'round-button';

export interface DialogProps {
    show: boolean;
    // 标题
    title?: string;
    // 弹窗宽度，默认单位为px
    width?: string | number;
    // 文本内容，支持通过\n换行
    message?: string;
    // 样式风格，可选值为round
    theme?: themeType;
    // 是否展示遮罩层
    overlay?: boolean;
    // 指定挂载的节点
    teleport?: string | ContanierType;
    // 自定义类名
    className?: string;
    // 是否允许 message 内容中渲染 HTML
    allowHtml?: boolean;
    // 是否锁定背景滚动
    lockScroll?: boolean;
    // 	过渡动画类名
    transition?: string;
    // 内容对齐方式，可选值为left right
    messageAlign?: string;
    // 自定义遮罩层类名
    overlayClass?: string;
    // 自定义遮罩层样式
    overlayStyle?: React.CSSProperties;
    // 是否在页面回退时自动关闭
    closeOnPopstate?: boolean;
    //	取消按钮文案
    cancelButtonText?: string;
    // 取消按钮颜色
    cancelButtonColor?: string;
    // 确认按钮文案
    confirmButtonText?: string;
    // 确认按钮颜色
    confirmButtonColor?: string;
    // 是否展示确认按钮
    showConfirmButton?: boolean;
    // 是否展示取消按钮
    showCancelButton?: boolean;
    // 是否在点击遮罩层后关闭弹窗
    closeOnClickOverlay?: boolean;
    // 关闭前的回调函数，返回 false 可阻止关闭，支持返回 Promise
    onBeforeClose?: (action: DialogAction, done: DialogDone) => void;
    // 点击遮罩层触发
    onClickOverlay?: () => void;
    onConfirm?: () => void;
    onCancel?: () => void;
    onOpen?: () => void;
    onOpened?: () => void;
    onClose?: () => void;
    onClosed?: () => void;
    updateShow?: (show: boolean) => void;
}
