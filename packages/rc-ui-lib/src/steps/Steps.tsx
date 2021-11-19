import React, { useContext } from 'react';
import classnames from 'classnames';

import { StepsProps } from './PropsType';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';

const Steps: React.FC<StepsProps> = ({ children, className, style, ...props }) => {
  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('steps', prefixCls);

  return (
    <div className={classnames(className, bem([props.direction]))} style={style}>
      <div className={classnames(bem('items'))}>
        {React.Children.toArray(children)
          .filter(Boolean)
          .map((child: React.ReactElement, index: number) =>
            React.cloneElement(child, {
              index,
              parent: props,
            }),
          )}
      </div>
    </div>
  );
};

Steps.defaultProps = {
  active: 0,
  direction: 'horizontal',
  activeIcon: 'checked',
};

export default Steps;
