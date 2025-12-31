import React, { useState, useContext, useMemo, forwardRef } from 'react';
import classnames from 'classnames';

import TabsContext from './TabsContext';
import { TabPaneProps } from './PropsType';
import { useUpdateEffect } from '../hooks';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';

const TabPane = forwardRef<HTMLDivElement, TabPaneProps>((props, ref) => {
  const { showZeroBadge = true, name, index, title, children } = props;

  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('tab', prefixCls);
  const parent = useContext(TabsContext);

  const [inited, setInited] = useState(false);

  const parentProps = parent?.props || {};
  const { animated, swipeable, scrollspy, lazyRender = true } = parentProps;

  const getName = () => name ?? index;

  const init = () => {
    setInited(true);
  };

  const isActive = useMemo(() => {
    const active = getName() === parent?.currentName;

    if (active && !inited) {
      init();
    }

    return active;
  }, [inited, parent?.currentName, name, index]);

  useUpdateEffect(() => {
    if (parent?.setLine && parent?.scrollIntoView) {
      parent.setLine();
      parent.scrollIntoView();
    }
  }, [title]);

  const show = scrollspy || isActive;

  if (animated || swipeable) {
    return <div className={classnames(bem('pane'))}>{children}</div>;
  }

  const shouldRender = inited || scrollspy || !lazyRender;
  const Content = shouldRender ? children : null;

  return (
    <div
      ref={ref}
      style={{ display: show ? 'block' : 'none' }}
      role="tabpanel"
      className={classnames(bem('pane'))}
    >
      {Content}
    </div>
  );
});

export default TabPane;
