import React, { useEffect, createContext, forwardRef, MutableRefObject } from 'react';
import classnames from 'classnames';
import { CheckboxGroupProps } from './props';
import './style/index.scss';

const baseClass = 'r-checkbox-group';
// 创建组件间共享上下文
export const CheckboxGroupContext = createContext(null);

export type CheckboxGroupToggleAllOptions =
  | boolean
  | {
      checked?: boolean;
      // 跳过禁用的复选框
      skipDisabled?: boolean;
    };

const CheckboxGroup = forwardRef<unknown, CheckboxGroupProps>((props, ref) => {
  const { model, direction = 'vertical', onChange, children } = props;

  useEffect(() => {
    onChange?.(model as any);
  }, [model, onChange]);

  const classStrig = classnames(baseClass, `${baseClass}--${direction}`);

  return (
    <div className={classStrig} ref={ref as MutableRefObject<HTMLDivElement>}>
      <CheckboxGroupContext.Provider value={props as any}>{children}</CheckboxGroupContext.Provider>
    </div>
  );
});

CheckboxGroup.displayName = 'CheckboxGroup';
export default CheckboxGroup;