import React, { useContext, useMemo, useRef } from 'react';
import classnames from 'classnames';
import { ActionBarProps } from './PropsType';
import ActionBarContext from './ActionBarContext';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';
import useHeight from '../hooks/use-height';

const ActionBar: React.FC<ActionBarProps> = (props) => {
  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('action-bar', prefixCls);
  const root = useRef<HTMLDivElement>(null);

  const children = useMemo(() => React.Children.toArray(props.children), [props.children]);

  const renderPlaceholder = (renderContent: () => React.ReactElement) => {
    const height = useHeight(root);
    return (
      <div
        className={classnames(bem('placeholder'))}
        style={{ height: height ? `${height}px` : undefined }}
      >
        {renderContent()}
      </div>
    );
  };

  const renderActionBar = () => (
    <ActionBarContext.Provider value={{ parent: { children } }}>
      <div
        ref={root}
        className={classnames(props.className, bem(), {
          'rc-safe-area-bottom': props.safeAreaInsetBottom,
        })}
        style={props.style}
      >
        {React.Children.toArray(props.children)
          .filter(Boolean)
          .map((child: React.ReactElement, index: number) => {
            return React.cloneElement(child, {
              index,
            });
          })}
      </div>
    </ActionBarContext.Provider>
  );

  return props.placeholder ? renderPlaceholder(renderActionBar) : renderActionBar();
};

ActionBar.defaultProps = {
  safeAreaInsetBottom: true,
  placeholder: false,
};

export default ActionBar;
