export type LoadingTypes = 'circular' | 'spinner';
export interface LoadingProps {
    // 类型，可选值为 circular, spinner
    type?: LoadingTypes;
    // 加载显示的文案
    text?: string;
    // 颜色
    color?: string;
    // 加载图标大小，默认单位为px
    size?: string | number;
    // 文字大小，默认单位为px
    textSize?: string | number;
    // 文案颜色
    textColor?: string;
    // 是否垂直排列图标和文字内容
    vertical?: boolean;
    // 外部传入的样式
    className?: string;
}
