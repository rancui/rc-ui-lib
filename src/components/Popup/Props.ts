import React, { Ref } from 'react';

// import PopupSharedProps from './PopupSharedProps';

export type positionTypes = 'top' | 'right' | 'bottom' | 'left' | 'center';
export type closeIconPositionTypes = 'top-left' | 'bottom-left' | 'bottom-right';

export interface PopupSharedProps {
    // 是否显示弹出层
    show?: boolean;
    // 动画时长，单位毫秒
    duration?: number | string;
    zIndex?: number | string;
    // 指定挂载的节点
    teleport?: string | HTMLElement;
    // 是否显示遮罩层
    overlay?: boolean;
    // 自定义遮罩层样式
    overlayStyle?: React.CSSProperties;
    // 自定义遮罩层类名
    overlayClass?: string;
    // 是否在初始渲染时启用过渡动画
    transitionAppear?: boolean;
    // 是否锁定背景滚动
    lockScroll?: boolean;
    // 是否在显示弹层时才渲染节点
    lazyRender?: boolean;
    //是否在点击遮罩层后关闭
    closeOnClickOverlay?: boolean;
}

export interface PopupProps extends PopupSharedProps {
    // 是否显示弹出层
    // show: boolean;
    // 弹出层内联样式
    style?: React.CSSProperties;
    // 该组件被引用时传入的样式
    className?: string;
    // 是否显示圆角
    round?: boolean;
    // 是否显示关闭图标
    closeable?: boolean;
    // 动画类名，等价于Vue中的transtion的name属性(该处是配合该组件中的react-transition-group代码使用)
    transition?: string;
    // 是否开启底部安全区适配
    safeAreaInsetBottom?: boolean;
    // 关闭图标名称或图片链接
    closeIcon?: string;
    // 关闭按钮的位置
    closeIconPosition?: closeIconPositionTypes;
    // 弹出位置，可选值为 top bottom right left
    position?: positionTypes;
    // 是否在页面回退时自动关闭
    closeOnPopstate?: boolean;
    // 点击遮罩层时触发
    onClickOverlay?: () => void;
    // 点击弹出层时触发
    onClick?: (e: MouseEvent) => void;
    // 打开弹出层时触发，参数是el，即该元素本身
    onOpen?: (el: HTMLElement) => void;
    // 打开弹出层且动画结束后触发，参数是el，即该元素本身
    onOpened?: (el: HTMLElement) => void;
    // 关闭弹出层时触发，参数是el，即该元素本身
    onClose?: () => void;
    // 关闭弹出层且动画结束后触发，参数是el，即该元素本身
    onClosed?: (el: HTMLElement) => void;
    // 点击关闭按钮图标时触发，参数是el，即该元素本身
    onClickCloseIcon?: (el: MouseEvent) => void;
    children?: React.ReactNode;
    ref?: Ref<HTMLDivElement>;
}