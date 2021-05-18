import { PopupSharedProps } from '../popup/props';

export type ToastTypes = 'text' | 'loading' | 'success' | 'fail' | 'html';
export type PositionTypes = 'top' | 'bottom' | 'center';
export type loadingTypes = 'circular' | 'spinner';
export type ContanierType = HTMLElement | (() => HTMLElement) | Window;

export interface ToastProps extends PopupSharedProps {
    // 类名
    className?: string;
    // toast类型
    type: ToastTypes;
    // toast位置
    position?: PositionTypes;
    // 传入的文本内容
    message?: string;
    // 自定义图标（iconfont）或图片链接
    icon?: string;
    // icon的大小
    iconSize?: number | string;
    // 自定义图标前缀
    iconPrefix?: string;
    // 是否点击后关闭toast，目前没写。
    closeOnClick?: boolean;
    // 点击遮罩层时，关闭toast
    closeOnClickOverlay?: boolean;
    // loading的类型
    loadingType?: loadingTypes;
    // 动画类名，传给Popup使用
    transition?: string;
    // toast打开以后触发的函数
    onOpened?: () => void;
    // toast关闭以后触发的函数
    onClose?: () => void;
}
