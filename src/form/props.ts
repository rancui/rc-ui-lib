export type FieldTextAlign = 'left' | 'center' | 'right';
export type FieldValidateTrigger = 'onBlur' | 'onChange' | 'onSubmit';

export interface FormProps {
  // 	表单项 label 宽度，默认单位为px
  labelWidth?: number | string;
  // 表单项 label 对齐方式，可选值为 left center right
  labelAlign?: FieldTextAlign;
  // 输入框对齐方式，可选值为 left center right
  inputAlign?: FieldTextAlign;
  // 错误提示文案对齐方式，可选值为 left center right
  errorMessageAlign?: FieldTextAlign;
  // 表单校验触发时机，可选值为 onBlur onChange、onSubmit
  validateTrigger?: FieldValidateTrigger;
  // 是否在 label 后面添加冒号
  colon?: boolean;
  // 是否禁用表单中的所有输入框
  disabled?: boolean;
  // 是否将表单中的所有输入框设置为只读状态
  readonly?: boolean;
  // 是否在某一项校验不通过时停止校验
  validateFirst?: boolean;
  // 是否在提交表单且校验不通过时滚动至错误的表单项
  scrollToError?: boolean;
  // 是否在校验不通过时标红输入框
  showError?: boolean;
  // 是否在校验不通过时在输入框下方展示错误提示
  showErrorMessage?: boolean;
  // 	是否在按下回车键时提交表单
  submitOnEnter?: boolean;
  // 提交表单且验证通过后触发
  onSubmit?: (values: Record<string, any>) => void;
  // 提交表单且验证不通过后触发
  onFailed?: (errorInfo: { values: Record<string, any>; errors: Record<string, any>[] }) => void;
}
