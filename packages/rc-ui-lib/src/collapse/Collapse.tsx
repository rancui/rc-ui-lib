/* eslint-disable no-console */
import React, { ReactElement, useContext, useRef, useState } from 'react';
import classnames from 'classnames';
import CollapseContext from './CollapseContext';
import { CollapseProps } from './PropsType';
import { BORDER_TOP_BOTTOM } from '../utils/constant.js';
import { useUpdateEffect } from '../hooks';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';

function validateModelValue(
  modelValue: string | number | Array<string | number>,
  accordion: boolean,
) {
  if (accordion && Array.isArray(modelValue)) {
    console.error('[rc-ui-lib] Collapse: "value" should not be Array in accordion mode');
    return false;
  }
  if (!accordion && !Array.isArray(modelValue)) {
    console.error('[rc-ui-lib] Collapse: "value" should be Array in non-accordion mode');
    return false;
  }
  return true;
}

const Collapse: React.FC<CollapseProps> = (props) => {
  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('collapse', prefixCls);

  const innerEffect = useRef(false);

  const [modelValue, setModelValue] = useState(() => props.value ?? props.initValue);

  const updateName = (name: number | string | Array<number | string>) => {
    innerEffect.current = true;
    setModelValue(name);
    props.onChange?.(name);
  };

  const toggle = (name, isExpanded: boolean) => {
    const { accordion } = props;
    if (accordion) {
      updateName(name === modelValue ? '' : name);
    } else if (isExpanded) {
      updateName((modelValue as Array<number | string>).concat(name));
    } else {
      updateName(
        (modelValue as Array<number | string>).filter((activeName) => activeName !== name),
      );
    }
  };

  const isExpanded = (name: string | number): boolean => {
    const { accordion } = props;
    if (process.env.NODE_ENV !== 'production' && !validateModelValue(modelValue, accordion)) {
      return false;
    }
    return accordion ? modelValue === name : (modelValue as Array<number | string>).includes(name);
  };

  useUpdateEffect(() => {
    if (innerEffect.current) {
      innerEffect.current = false;
      return;
    }
    setModelValue(props.value);
  }, [props.value]);

  return (
    <CollapseContext.Provider value={{ isExpanded, toggle }}>
      <div className={classnames(bem(), { [BORDER_TOP_BOTTOM]: props.border })}>
        {React.Children.toArray(props.children)
          .filter(Boolean)
          .map((child: ReactElement, index: number) =>
            React.cloneElement(child, {
              index,
            }),
          )}
      </div>
    </CollapseContext.Provider>
  );
};

Collapse.defaultProps = {
  border: true,
  initValue: [],
};

export default Collapse;
