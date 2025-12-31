import React, { useContext } from 'react';
import classnames from 'classnames';

import { StepsProps } from './PropsType';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';

const Steps: React.FC<StepsProps> = (props) => {
  const {
    children,
    className,
    style,
    active = 0,
    direction = 'horizontal',
    activeIcon = 'checked',
    iconPrefix,
    finishIcon,
    activeColor,
    inactiveIcon,
    inactiveColor,
    onClickStep,
  } = props;

  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('steps', prefixCls);

  return (
    <div className={classnames(className, bem([direction]))} style={style}>
      <div className={classnames(bem('items'))}>
        {React.Children.toArray(children)
          .filter(Boolean)
          .map((child: React.ReactElement, index: number) =>
            React.cloneElement(child, {
              index,
              parent: {
                active,
                direction,
                activeIcon,
                iconPrefix,
                finishIcon,
                activeColor,
                inactiveIcon,
                inactiveColor,
                onClickStep,
              },
            }),
          )}
      </div>
    </div>
  );
};

export default Steps;
