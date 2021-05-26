import React, { createContext, forwardRef, MutableRefObject } from 'react';
import classnames from 'classnames';
import { RadioGroupProps } from './props';
import './style/index.scss';

// 创建组件间共享上下文
export const RadioGroupContext = createContext(null);
const baseClass = 'r-radio-group';
const RadioGroup = forwardRef<unknown, RadioGroupProps>((props, ref) => {
  const { direction = 'vertical', children } = props;
  // 样式
  const classString = classnames(baseClass, `${baseClass}--${direction}`);

  return (
    <div role="radio-group" className={classString} ref={ref as MutableRefObject<HTMLDivElement>}>
      <RadioGroupContext.Provider value={props as any}>{children}</RadioGroupContext.Provider>
    </div>
  );
});
RadioGroup.displayName = 'RadioGroup';
export default RadioGroup;
