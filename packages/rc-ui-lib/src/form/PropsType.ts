import React from 'react';
import type { FormProps as RcFormProps, FormInstance as RcFormInstance } from 'rc-field-form';
import type { FieldProps as RcFieldProps } from 'rc-field-form/lib/Field';
import type { Meta } from 'rc-field-form/lib/interface';
import type { BaseTypeProps } from '../utils';
import type { CellGroupProps } from '../cell/PropsType';
import { FieldProps } from '../field/PropsType';

export type FormLayout = 'vertical' | 'horizontal';

export type FormValidateTrigger = 'onBlur' | 'onChange' | 'onSubmit';
type OmitFromCellGroupProps = Omit<CellGroupProps, 'title'>;
export interface FormProps extends RcFormProps, OmitFromCellGroupProps, BaseTypeProps {
  /** 表单布局 */
  layout?: FormLayout;
  /** 是否显示 label 后面的冒号 */
  colon?: boolean;
  /** 表单底部内容	 */
  footer?: React.ReactNode;
  /** 是否显示验证信息 */
  showValidateMessage?: boolean;
  /** 子元素 */
  children?: React.ReactNode;
  validateTrigger?: FormValidateTrigger;
}

export type RenderChildren<Values = unknown> = (form: RcFormInstance<Values>) => React.ReactNode;
type ChildrenType<Values = unknown> = RenderChildren<Values> | React.ReactNode;

export type FormInstance = RcFormInstance;

export type MemoInputProps = {
  value: unknown;
  update: number;
  children: React.ReactNode;
} & Record<string, unknown>;

export type FormItemProps = RcFieldProps &
  Pick<FormProps, 'showValidateMessage' | 'validateTrigger'> &
  Pick<
    FieldProps,
    | 'style'
    | 'className'
    | 'tooltip'
    | 'intro'
    | 'colon'
    | 'labelWidth'
    | 'labelAlign'
    | 'labelClass'
    | 'onClick'
  > & {
    /** 输入框左侧文本 */
    label?: string;
    /** 必填项 */
    required?: boolean;
    noStyle?: boolean;
    /** 是否禁用表单项 */
    disabled?: boolean;
    /** 自定义item，此时不会渲染内置的field */
    customField?: boolean;
    /** 子元素 */
    children?: ChildrenType;
  };

export type FormItemLayoutProps = Pick<
  FormItemProps,
  | 'required'
  | 'disabled'
  | 'label'
  | 'style'
  | 'className'
  | 'tooltip'
  | 'intro'
  | 'colon'
  | 'labelWidth'
  | 'labelAlign'
  | 'labelClass'
  | 'showValidateMessage'
  | 'validateTrigger'
> & {
  onClick?: (e?: React.MouseEvent) => void;
  htmlFor?: string;
  meta?: Meta;
  layout?: FormLayout;
  /** @private */
  isFieldChildren?: boolean;
} & BaseTypeProps;
