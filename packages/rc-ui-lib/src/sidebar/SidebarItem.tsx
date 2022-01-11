import React, { useContext } from 'react';
import classnames from 'classnames';
import { Badge } from '../badge';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';
import { SidebarItemProps } from './PropsType';
import SidebarContext from './SidebarContext';

const SidebarItem: React.FC<SidebarItemProps> = (props) => {
  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('sidebar-item', prefixCls);

  const parent = useContext(SidebarContext);
  if (!Object.prototype.hasOwnProperty.call(parent, 'getActive')) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[rc-ui-lib] <SidebarItem> must be a child component of <Sidebar>.');
    }
    return null;
  }

  const { dot, badge, title, disabled, index } = props;
  const selected = index === parent.getActive();

  const onClick = () => {
    if (props.disabled) {
      return;
    }

    props.onClick?.(index);
    parent.setActive(index);
  };

  return (
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus
    <div
      role="tab"
      tabIndex={disabled ? undefined : 0}
      className={classnames(bem({ select: selected, disabled }))}
      aria-selected={selected}
      onClick={onClick}
    >
      <Badge dot={dot} content={badge} className={classnames(bem('text'))}>
        {props.children ? props.children : title}
      </Badge>
    </div>
  );
};

export default SidebarItem;
