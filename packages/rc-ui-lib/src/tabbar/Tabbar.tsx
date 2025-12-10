import React, { useContext, useRef } from 'react';
import classnames from 'classnames';
import { TabbarProps } from './PropsType';
import { getZIndexStyle } from '../utils';
import { BORDER_TOP_BOTTOM } from '../utils/constant';
import useHeight from '../hooks/use-height';
import TabbarContext from './TabbarContext';
import useMergedState from '../hooks/use-merged-state';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';

const Tabbar: React.FC<TabbarProps> = (props) => {
  const {
    fixed = true,
    border = true,
    defaultValue = 0,
    value: valueProp,
    zIndex,
    activeColor,
    inactiveColor,
    placeholder,
    safeAreaInsetBottom,
    onChange,
    children,
    className,
    style: propStyle,
  } = props;

  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('tabbar', prefixCls);

  const [current, setCurrent] = useMergedState({
    value: valueProp,
    defaultValue,
  });
  const root = useRef<HTMLDivElement>();
  const height = useHeight(root);

  const renderPlaceholder = (renderContent: () => React.ReactNode) => {
    return (
      <div className={classnames(bem('placeholder'))} style={{ height }}>
        {renderContent()}
      </div>
    );
  };

  // enable safe-area-inset-bottom by default when fixed
  const enableSafeArea = () => safeAreaInsetBottom ?? fixed;

  const setActive = (active: number | string) => {
    if (active !== valueProp) {
      onChange?.(active);
      setCurrent(active);
    }
  };

  const renderTabbar = () => {
    return (
      <TabbarContext.Provider
        value={{
          parent: {
            fixed,
            border,
            defaultValue,
            value: current,
            zIndex,
            activeColor,
            inactiveColor,
            placeholder,
            safeAreaInsetBottom,
            onChange,
          },
        }}
      >
        <div
          ref={root}
          style={{ ...propStyle, ...getZIndexStyle(zIndex) }}
          className={classnames(className, bem({ fixed }), {
            [BORDER_TOP_BOTTOM]: border,
            'rc-safe-area-bottom': enableSafeArea(),
          })}
        >
          {React.Children.toArray(children)
            .filter(Boolean)
            .map((child: React.ReactElement, index) =>
              React.cloneElement(child, {
                setActive,
                index,
              }),
            )}
        </div>
      </TabbarContext.Provider>
    );
  };

  if (fixed && placeholder) {
    return renderPlaceholder(renderTabbar);
  }
  return renderTabbar();
};

export default Tabbar;
