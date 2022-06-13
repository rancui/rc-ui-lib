import React, { memo, useContext } from 'react';
import classnames from 'classnames';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';
import { PageIndicatorProps } from './PropsType';

export const PageIndicator = memo<PageIndicatorProps>(
  ({ color = 'primary', direction = 'horizontal', ...props }) => {
    const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
    const [bem] = createNamespace('indicator', prefixCls);
    const isVertical = direction === 'vertical';
    const dots: React.ReactElement[] = [];
    for (let i = 0; i < props.total; i++) {
      dots.push(
        <div
          key={i}
          className={classnames(
            bem('dot', {
              active: props.current === i,
            }),
          )}
        />,
      );
    }

    return (
      <div
        className={classnames(props.className, bem({ vertical: isVertical }))}
        style={{ color, ...props.style }}
      >
        {dots}
      </div>
    );
  },
);
