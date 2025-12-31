import React, { useContext, useEffect, useRef, useCallback } from 'react';
import classnames from 'classnames';

import Icon from '../icon';
import Popup from '../popup';
import Loading from '../loading';

import { lockClick } from './lock-click';
import { isDef } from '../utils';
import { ToastPrivateProps, ToastProps } from './PropsType';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';

const Toast: React.FC<ToastProps & ToastPrivateProps & { visible?: boolean }> = ({
  type = 'info',
  duration = 2000,
  position = 'middle',
  transition = 'rc-fade',
  loadingType = 'circular',
  overlay = false,
  visible,
  forbidClick,
  closeOnClick,
  closeOnClickOverlay,
  icon,
  iconPrefix,
  iconSize,
  message,
  className,
  overlayClass,
  overlayStyle,
  onClose,
  onClosed,
  onOpened,
  teleport,
}) => {
  const clickableRef = useRef(false);

  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('toast', prefixCls);

  const toggleClickable = useCallback(() => {
    const newValue = visible && forbidClick;
    if (clickableRef.current !== newValue) {
      clickableRef.current = newValue;
      lockClick(clickableRef.current);
    }
    if (!visible) {
      lockClick(false);
    }
  }, [visible, forbidClick]);

  const handleClick = useCallback(() => {
    if (closeOnClick) {
      onClose?.();
    }
  }, [closeOnClick, onClose]);

  useEffect(() => {
    toggleClickable();
  }, [toggleClickable]);

  const renderIcon = () => {
    const hasIcon = icon || type === 'success' || type === 'fail';
    if (hasIcon) {
      return typeof icon === 'string' ? (
        <Icon
          name={icon || (type === 'fail' ? 'cross' : type)}
          size={iconSize}
          className={classnames(bem('icon'))}
          classPrefix={iconPrefix}
        />
      ) : (
        icon
      );
    }

    if (type === 'loading') {
      return <Loading className={classnames(bem('loading'))} type={loadingType} />;
    }

    return null;
  };

  const renderMessage = () => {
    if (isDef(message) && message !== '') {
      return <div className={classnames(bem('info'))}>{message}</div>;
    }
    return null;
  };

  return (
    <Popup
      className={classnames([
        bem([position, { [type]: !icon }]),
        className,
      ])}
      visible={visible}
      overlay={overlay}
      transition={transition}
      overlayClass={overlayClass}
      overlayStyle={overlayStyle}
      closeOnClickOverlay={closeOnClickOverlay}
      lockScroll={false}
      onClick={handleClick}
      onClose={onClose}
      onClosed={onClosed}
      onOpened={onOpened}
      teleport={teleport}
    >
      {renderIcon()}
      {renderMessage()}
    </Popup>
  );
};

export default Toast;
