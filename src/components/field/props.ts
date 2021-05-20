import { FocusEventHandler, KeyboardEventHandler, MouseEventHandler } from 'react';
import { CellProps } from '../cell/props';
import {
    FieldRule,
    FieldTextAlign,
    FieldType,
    FieldClearTrigger,
    FieldFormatTrigger
} from './types';

export interface FieldProps extends CellProps {
    model: string | number;
    name?: string;
    type?: FieldType;
    maxlength?: number | string;
    placeholder?: string;
    // 是否显示内边框
    border?: boolean;
    // 是否禁用输入框
    disabled?: boolean;
    // 是否为只读状态，只读状态下无法输入内容
    readonly?: boolean;
    // 是否在 label 后面添加冒号
    colon?: boolean;
    // 是否启用清除图标，点击清除图标后会清空输入框
    clearable?: boolean;
    // 清除图标名称或图片链接
    clearIcon?: string;
    // 	显示清除图标的时机，always 表示输入框不为空时展示，focus 表示输入框聚焦且不为空时展示
    clearTrigger?: FieldClearTrigger;
    // 是否自动聚焦，iOS 系统不支持该属性
    autofocus?: boolean;
    // 是否显示字数统计，需要设置 maxlength 属性
    showWordLimit?: boolean;
    // 是否将输入内容标红
    error?: boolean;
    // 底部错误提示文案，为空时不展示
    errorMessage?: string;
    // 错误提示文案对齐方式，可选值为 left center right
    errorMessageAlign?: FieldTextAlign;
    // 输入内容格式化函数
    formatter?: (value: string) => string;
    // 格式化函数触发的时机
    formatTrigger?: FieldFormatTrigger;
    // 左侧文本宽度，默认单位为 px
    labelWidth?: number | string;
    // 左侧文本对齐方式
    labelAlign?: FieldTextAlign;
    // 输入框对齐方式
    inputAlign?: FieldTextAlign;
    // 	是否自适应内容高度，只对 textarea 有效，
    //  传入对象,如 { maxHeight: 100, minHeight: 50 }，
    // 单位为px
    autosize?: boolean | Record<string, unknown>;
    // 左侧图标名称或图片链接
    leftIcon?: string;
    // 右侧图标名称或图片链接
    rightIcon?: string;
    // 表单校验规则，详见 Form 组件
    rules?: Array<FieldRule>;
    // input 标签原生的自动完成属性
    autocomplete?: string;
    // 文本行数
    rows?: number | string;
    // 输入框内容变化时触发
    onUpdateModel?: (s: string) => void;
    // 输入框失去焦点时触发
    onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    // 输入框获得焦点时触发
    onFocus?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    // 点击清除按钮时触发
    // onClear?: MouseEventHandler<unknown>;
    onClear?: MouseEventHandler<unknown>;
    // 键盘按下时触发
    onKeyPress?: KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    // 点击输入区域时触发
    onClickInput?: MouseEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    // 点击左侧图标时触发
    onClickLeftIcon?: MouseEventHandler<HTMLDivElement>;
    // 点击右侧图标时触发
    onClickRightIcon?: MouseEventHandler<HTMLDivElement>;
}
