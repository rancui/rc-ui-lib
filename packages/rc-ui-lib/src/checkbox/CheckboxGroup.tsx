import React, { forwardRef, useContext, useImperativeHandle } from 'react';
import classnames from 'classnames';

import useMergedState from '../hooks/use-merged-state';
import CheckBoxContext from './CheckboxContext';

import {
  CheckboxGroupProps,
  CheckboxGroupToggleAllOptions,
  CheckboxGroupInstance,
  CheckboxInstance,
} from './PropsType';
import { WithDisplayNameReactElement } from '../utils';
import useRefs from '../hooks/use-refs';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';

const CheckBoxGroup = forwardRef<CheckboxGroupInstance, CheckboxGroupProps>((props, ref) => {
  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('checkbox-group', prefixCls);
  const [childrenRefs, setChildrenRefs] = useRefs();
  const { defaultValue = [] } = props;
  const [checked, setChecked] = useMergedState({
    value: props.value,
    defaultValue,
  });

  const toggleAll = (options: CheckboxGroupToggleAllOptions = {}) => {
    if (typeof options === 'boolean') {
      options = { checked: options };
    }

    const { checked: isChecked, skipDisabled } = options;

    const names: Array<string | number> = [];
    
    React.Children.forEach(props.children, (child: any) => {
      if (!child || child.type?.displayName !== 'Checkbox') {
        return;
      }
      
      const childProps = child.props;
      const name = childProps.name;
      
      if (!name) {
        return;
      }
      
      // 检查 bindGroup
      if (childProps.bindGroup === false) {
        return;
      }
      
      // 处理禁用项
      if (childProps.disabled && skipDisabled) {
        // 如果跳过禁用项，保持当前状态
        if (checked.indexOf(name) !== -1) {
          names.push(name);
        }
        return;
      }
      
      // 确定是否应该选中
      let shouldCheck: boolean;
      if (isChecked !== undefined) {
        shouldCheck = isChecked;
      } else {
        // 取反：如果当前已选中，则不选中；如果当前未选中，则选中
        shouldCheck = checked.indexOf(name) === -1;
      }
      
      if (shouldCheck) {
        names.push(name);
      }
    });

    setChecked(names);
    props.onChange?.(names);
  };

  const toggle = (name: Array<string | number>) => {
    setChecked(name);
    props.onChange?.(name);
  };

  useImperativeHandle(ref, () => ({
    toggleAll,
  }));

  return (
    <CheckBoxContext.Provider value={{ parent: { props }, toggle, checked }}>
      <div className={classnames(bem([props.direction]))}>
        {React.Children.toArray(props.children)
          .filter(Boolean)
          .map((child: WithDisplayNameReactElement, index: number) => {
            if (child.type?.displayName !== 'Checkbox') return child;
            return React.cloneElement(child, { ref: setChildrenRefs(index) });
          })}
      </div>
    </CheckBoxContext.Provider>
  );
});

export default CheckBoxGroup;
