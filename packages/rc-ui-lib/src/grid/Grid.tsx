import React, { useContext } from 'react';
import classnames from 'classnames';
import { addUnit } from '../utils';

import { GridProps } from './PropsType';
import { BORDER_TOP } from '../utils/constant';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';

const Grid: React.FC<GridProps> = ({ 
  children, 
  className, 
  style, 
  center = true,
  border = true,
  columnNum = 4,
  gutter,
  ...props 
}) => {
  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('grid', prefixCls);
  return (
    <div
      style={{ paddingLeft: addUnit(gutter), ...style }}
      className={classnames(className, bem(), { [BORDER_TOP]: border && !gutter })}
    >
      {React.Children.toArray(children)
        .filter(Boolean)
        .map((child: React.ReactElement, index: number) =>
          React.cloneElement(child, {
            index,
            parent: { center, border, columnNum, gutter, ...props },
          }),
        )}
    </div>
  );
};

export default Grid;
