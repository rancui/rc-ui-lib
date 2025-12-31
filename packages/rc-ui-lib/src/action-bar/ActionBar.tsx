import React, { useContext, useMemo, useRef } from 'react';
import classnames from 'classnames';
import { ActionBarProps } from './PropsType';
import ActionBarContext from './ActionBarContext';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';
import { usePlaceholder } from '../hooks/use-placeholder';

const ActionBar: React.FC<ActionBarProps> = ({
  safeAreaInsetBottom = true,
  placeholder = false,
  className,
  style,
  children,
}: ActionBarProps) => {
  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('action-bar', prefixCls);
  const root = useRef<HTMLDivElement>(null);

  const childrenArray = useMemo(() => React.Children.toArray(children), [children]);

  const renderPlaceholder = usePlaceholder(root, bem);

  const renderActionBar = () => (
    <ActionBarContext.Provider value={{ parent: { children: childrenArray } }}>
      <div
        ref={root}
        className={classnames(className, bem(), {
          'rc-safe-area-bottom': safeAreaInsetBottom,
        })}
        style={style}
      >
        {React.Children.toArray(children)
          .filter(Boolean)
          .map((child: React.ReactElement, index: number) => {
            return React.cloneElement(child, {
              index,
            });
          })}
      </div>
    </ActionBarContext.Provider>
  );

  return placeholder ? renderPlaceholder(renderActionBar) : renderActionBar();
};

export default ActionBar;
