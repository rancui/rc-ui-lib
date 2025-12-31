import React, { useContext } from 'react';
import classnames from 'classnames';
import Popup from '../popup';
import { NotifyPrivateProps, NotifyProps } from './PropsType';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';

const Notify: React.FC<NotifyProps & NotifyPrivateProps> = ({
  children,
  type = 'danger',
  duration = 3000,
  color = 'white',
  lockScroll = false,
  visible,
  background,
  message,
  className,
  onClick,
  onClose,
  onClosed,
  teleport,
  ...restProps
}) => {
  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('notify', prefixCls);

  const style = {
    color,
    background,
  };

  return (
    <Popup
      visible={visible}
      className={classnames(bem([type]), className)}
      style={style}
      overlay={false}
      position="top"
      lockScroll={lockScroll}
      onClick={onClick}
      onClose={onClose}
      onClosed={onClosed}
      teleport={teleport}
      {...restProps}
    >
      {children || message}
    </Popup>
  );
};

export default Notify;
