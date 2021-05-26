import React, { forwardRef, useContext, useMemo, useImperativeHandle } from 'react';
import { CheckerProps } from '../checkbox/props';
import Checker from '../checkbox/checker';
import { RadioGroupContext } from '../radio-group';
import './style/index.scss';

const Radio = forwardRef<unknown, CheckerProps>((props, ref) => {
  const { name } = props;
  // 获取共享上下文
  const parent = useContext(RadioGroupContext);
  const { onChange, model } = parent as any;

  const updateParentModel = () => {
    onChange?.(name);
  };

  const checked = useMemo(() => {
    const val = parent ? model : name;
    return name === val;
  }, [model, name, parent]);

  useImperativeHandle(ref, () => {
    toggle;
  });

  const toggle = () => {
    if (parent) {
      updateParentModel();
    } else {
      // 没有父组件的情况（使用该组件时，必须添加父组件RadioGroup）
    }
  };

  return (
    <Checker
      ref={ref}
      baseClass="r-radio"
      role="radio"
      parent={parent as any}
      checked={checked}
      onToggle={toggle}
      {...props}
    />
  );
});

Radio.displayName = 'Radio';
export default Radio;
