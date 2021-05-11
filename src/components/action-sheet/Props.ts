import { PopupSharedProps } from '../popup/props';
export interface ActionSheetProps extends PopupSharedProps {
    // 顶部标题
    title?: string;
    // 面板选项列表
    actions: Action[];
    // 取消按钮文字
    cancelText?: string;
    // 选项上方的描述信息
    description?: string;
    closeOnPopstate?: boolean;
    // 是否在点击选项后关闭
    closeOnClickAction?: boolean;
    // 是否显示圆角
    round?: boolean;
    // 是否显示关闭图标
    closeable?: boolean;
    // 关闭图标名称或图片链接
    closeIcon?: string;
    // 是否开启底部安全区适配
    safeAreaInsetBottom?: boolean;
    // 点击遮罩层时触发
    onClickOverlay?: () => void;
    // 点击选项时触发，禁用或加载状态下不会触发
    onSelect?: (item: Action, index: number) => void;
    // 点击取消按钮时触发
    onCancel?: () => void;
    // 打开面板时触发
    onOpen?: () => void;
    // 打开面板且动画结束后触发
    onOpened?: () => void;
    // 关闭面板时触发
    onClose?: () => void;
    // 关闭面板且动画结束后触发
    onClosed?: () => void;
}
// Action 数据结构
// actions 属性是一个由对象构成的数组，数组中的每个对象配置一列，对象可以包含以下值：
export interface Action {
    // 标题
    name?: string;
    // 二级标题
    subname?: string;
    // 选项文字颜色
    color?: string;
    // 为对应列添加额外的 class
    className?: string;
    // 是否为加载状态
    loading?: boolean;
    // 是否为禁用状态
    disabled?: boolean;
    // 回调
    callback?: (item: Action) => void;
}
