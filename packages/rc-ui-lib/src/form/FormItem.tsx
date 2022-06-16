/* eslint-disable no-console */
import React, { FC, useRef, useContext } from 'react';
import classnames from 'classnames';
import { Field as RcField } from 'rc-field-form';
import FieldContext from 'rc-field-form/lib/FieldContext';
import type { Meta } from 'rc-field-form/lib/interface';
import Field from '../field';
import type {
  FormItemLayoutProps,
  FormItemProps,
  MemoInputProps,
  RenderChildren,
} from './PropsType';
import { toArray } from '../uploader/utils';
import { FIELD_KEY } from '../field/Field';
import { COMPONENT_TYPE_KEY } from '../utils/constant';
import { FormContext } from './FormContext';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';

function devWarning(component: string, message: string): void {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(`[${component}] ${message}`);
  }
}

const MemoInput = React.memo(
  ({ children, ...props }: MemoInputProps) =>
    React.cloneElement(children as React.ReactElement, props) as JSX.Element,
  (prev, next) => prev.value === next.value && prev.update === next.update,
);

const FormItemLayout: React.FC<FormItemLayoutProps> = (props) => {
  const {
    className,
    meta,
    children,
    isFieldChildren,
    showValidateMessage,
    colon,
    layout,
    ...fieldProps
  } = props;

  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('form', prefixCls);
  const context = useContext(FormContext);
  const itemLayout = layout ?? context.layout;
  const itemColon = colon ?? context.colon;
  const itemShowValidateMessage = showValidateMessage ?? context.showValidateMessage;

  const error = meta && meta.errors.length > 0;
  const errorMessage = itemShowValidateMessage && error ? meta.errors[0] : null;

  const attrs = {
    ...fieldProps,
    className: classnames(
      bem({ vertical: itemLayout === 'vertical' && !isFieldChildren }),
      className,
    ),
    colon: itemColon,
    error,
    errorMessage,
  };

  if (isFieldChildren) return React.cloneElement(children as React.ReactElement, attrs);

  return <Field {...attrs}>{children}</Field>;
};

const FormItem: FC<FormItemProps> = (props) => {
  const {
    className,
    style,
    label,
    name,
    required,
    noStyle,
    tooltip,
    intro,
    customField,
    disabled,
    colon,
    rules,
    children,
    messageVariables,
    trigger = 'onChange',
    validateTrigger = trigger,
    onClick,
    shouldUpdate,
    dependencies,
    labelWidth,
    labelAlign,
    labelClass,
    showValidateMessage,
    ...fieldProps
  } = props;

  const { validateTrigger: contextValidateTrigger } = useContext(FieldContext);
  const mergedValidateTrigger =
    validateTrigger !== undefined ? validateTrigger : contextValidateTrigger;

  const updateRef = useRef<number>(0);
  updateRef.current += 1;

  const isFieldChildren =
    (children as { type: unknown }).type?.[COMPONENT_TYPE_KEY] === FIELD_KEY || customField;

  function renderLayout(
    baseChildren: React.ReactNode,
    fieldId?: string,
    meta?: Meta,
    isRequired?: boolean,
  ) {
    if (noStyle) {
      return baseChildren;
    }
    return (
      <FormItemLayout
        isFieldChildren={isFieldChildren}
        className={className}
        style={style}
        label={label}
        tooltip={tooltip}
        intro={intro}
        required={isRequired}
        disabled={disabled}
        htmlFor={fieldId}
        meta={meta}
        colon={colon}
        labelWidth={labelWidth}
        labelAlign={labelAlign}
        labelClass={labelClass}
        showValidateMessage={showValidateMessage}
        onClick={onClick}
      >
        {baseChildren}
      </FormItemLayout>
    );
  }

  const isRenderProps = typeof children === 'function';

  if (!name && !isRenderProps && !props.dependencies) {
    return renderLayout(children) as JSX.Element;
  }

  return (
    <RcField
      {...fieldProps}
      name={name}
      shouldUpdate={shouldUpdate}
      dependencies={dependencies}
      rules={rules}
      trigger={trigger}
      validateTrigger={mergedValidateTrigger}
    >
      {(control, meta, context) => {
        let childNode: React.ReactNode = null;
        const isRequired =
          required !== undefined
            ? required
            : !!(
                rules &&
                rules.some((rule) => {
                  if (rule && typeof rule === 'object' && rule.required) {
                    return true;
                  }
                  return false;
                })
              );
        const fieldId = (toArray(name).length && meta ? meta.name : []).join('_');

        if (shouldUpdate && dependencies) {
          devWarning('FormItem', "`shouldUpdate` and `dependencies` shouldn't be used together.");
        }

        if (isRenderProps) {
          if ((shouldUpdate || dependencies) && !name) {
            childNode = (children as RenderChildren)(context);
          } else {
            if (!(shouldUpdate || dependencies)) {
              devWarning(
                'FormItem',
                '`children` of render props only work with `shouldUpdate` or `dependencies`.',
              );
            }
            if (name) {
              devWarning(
                'FormItem',
                "Do not use `name` with `children` of render props since it's not a field.",
              );
            }
          }
        } else if (dependencies && !name) {
          devWarning('FormItem', 'Must set `name` or use render props when `dependencies` is set.');
        } else if (React.isValidElement(children)) {
          const childProps = { ...children.props, ...control };

          if (!childProps.id) {
            childProps.id = fieldId;
          }

          if (disabled) {
            childProps.disabled = disabled;
          }

          // We should keep user origin event handler
          const triggers = new Set<string>([
            ...toArray<string>(trigger),
            ...toArray<string>(mergedValidateTrigger as string),
          ]);

          triggers.forEach((eventName) => {
            childProps[eventName] = (...args) => {
              control[eventName]?.(...args);
              children.props[eventName]?.(...args);
            };
          });

          childNode = (
            <MemoInput value={control[props.valuePropName || 'value']} update={updateRef.current}>
              {React.cloneElement(children, childProps)}
            </MemoInput>
          );

          if (isFieldChildren) {
            childProps.value = childProps.value || '';
            childNode = React.cloneElement(children, childProps);
          }
        } else {
          if (name) {
            devWarning(
              'FormItem',
              '`name` is only used for validate React element. If you are using FormItem as layout display, please remove `name` instead.',
            );
          }
          childNode = children;
        }
        return renderLayout(childNode, fieldId, meta, isRequired);
      }}
    </RcField>
  );
};

export default FormItem;
