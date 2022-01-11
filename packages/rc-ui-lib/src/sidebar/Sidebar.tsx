import React, { ReactElement, useContext } from 'react';
import classNames from 'classnames';

import ConfigProviderContext from '../config-provider/ConfigProviderContext';
import SidebarContext from './SidebarContext';
import { SidebarProps } from '.';

export type SidebarProvide = {
  getActive: () => number;
  setActive: (value: number) => void;
};

const Sidebar: React.FC<SidebarProps> = (props) => {
  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('sidebar', prefixCls);

  const getActive = () => +props.value;

  const setActive = (value: number) => {
    if (value !== getActive()) {
      props.onChange?.(value);
    }
  };

  return (
    <SidebarContext.Provider value={{ getActive, setActive }}>
      <div role="tablist" className={classNames(bem())}>
        {React.Children.toArray(props.children)
          .filter(Boolean)
          .map((child: ReactElement, index: number) =>
            React.cloneElement(child, {
              index,
            }),
          )}
      </div>
    </SidebarContext.Provider>
  );
};

Sidebar.defaultProps = {
  value: '0',
};

export default Sidebar;
