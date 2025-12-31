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
  const { value = '0', children, onChange } = props;

  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('sidebar', prefixCls);

  const getActive = () => +value;

  const setActive = (activeValue: number) => {
    if (activeValue !== getActive()) {
      onChange?.(activeValue);
    }
  };

  return (
    <SidebarContext.Provider value={{ getActive, setActive }}>
      <div role="tablist" className={classNames(bem())}>
        {React.Children.toArray(children)
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

export default Sidebar;
