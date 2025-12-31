import React, { useContext } from 'react';
import classnames from 'classnames';

import Popup from '../popup';
import Button from '../button';
import ActionBar from '../action-bar';

import { DialogProps, DialogStatic } from './PropsType';
import { addUnit, noop } from '../utils';
import { BORDER_TOP, BORDER_LEFT } from '../utils/constant';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';

const Dialog: React.FC<DialogProps> = (props) => {
  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('dialog', prefixCls);

  const {
    width,
    title,
    theme,
    visible,
    message,
    className,
    messageAlign,
    closeOnClickOverlay,
    onClickCloseIcon,
    transition = 'rc-dialog-bounce',
    showConfirmButton = true,
    closeOnPopstate = true,
    showCancelButton,
    cancelButtonText,
    cancelButtonColor,
    confirmButtonText,
    confirmButtonColor,
    cancelProps,
    confirmProps,
    onCancel,
    onConfirm,
    onOpen,
    onOpened,
    onClose,
    onClosed,
    footer,
    children,
    ...others
  } = props;

  const renderTitle = () => {
    if (title) {
      return (
        <div
          className={classnames(
            bem('header', {
              isolated: !message && !children,
            }),
          )}
        >
          {title}
        </div>
      );
    }
    return null;
  };

  const renderContent = () => {
    if (children) {
      return <div className={classnames(bem('content'))}>{children}</div>;
    }
    if (message) {
      return (
        <div className={classnames(bem('content', { isolated: !title }))}>
          <div
            className={classnames(
              bem('message', {
                'has-title': title,
                [messageAlign]: messageAlign,
              }),
            )}
          >
            {message}
          </div>
        </div>
      );
    }

    return null;
  };

  const renderButtons = () => (
    <div className={classnames(BORDER_TOP, bem('footer'))}>
      {showCancelButton && (
        <Button
          size="large"
          text={cancelButtonText || '取消'}
          className={classnames(bem('cancel'))}
          style={{ color: cancelButtonColor }}
          loading={cancelProps?.loading}
          disabled={cancelProps?.disabled}
          onClick={cancelProps?.loading ? noop : onCancel}
        />
      )}
      {showConfirmButton && (
        <Button
          size="large"
          text={confirmButtonText || '确认'}
          className={classnames(bem('confirm'), { [BORDER_LEFT]: showCancelButton })}
          round={theme === 'round-button'}
          style={{ color: confirmButtonColor }}
          loading={confirmProps?.loading}
          disabled={confirmProps?.disabled}
          onClick={confirmProps?.loading ? noop : onConfirm}
        />
      )}
    </div>
  );

  const renderRoundButtons = () => (
    <ActionBar className={classnames(bem('footer'))}>
      {showCancelButton && (
        <ActionBar.Button
          type="warning"
          text={cancelButtonText || '取消'}
          className={classnames(bem('cancel'))}
          color={cancelButtonColor}
          loading={cancelProps?.loading}
          disabled={cancelProps?.disabled}
          onClick={cancelProps?.loading ? noop : onCancel}
        />
      )}
      {showConfirmButton && (
        <ActionBar.Button
          type="danger"
          text={confirmButtonText || '确认'}
          className={classnames(bem('confirm'))}
          color={confirmButtonColor}
          loading={confirmProps?.loading}
          disabled={confirmProps?.disabled}
          onClick={confirmProps?.loading ? noop : onConfirm}
        />
      )}
    </ActionBar>
  );

  const renderFooter = () => {
    if (footer) return footer;
    return theme === 'round-button' ? renderRoundButtons() : renderButtons();
  };

  return (
    <Popup
      {...others}
      visible={visible}
      className={classnames(bem([theme]), className)}
      style={{ width: addUnit(width) }}
      aria-labelledby={title || message}
      closeOnClickOverlay={closeOnClickOverlay}
      transition={transition}
      closeOnPopstate={closeOnPopstate}
      onOpen={onOpen}
      onOpened={onOpened}
      onClose={onClose}
      onClosed={onClosed}
    >
      {renderTitle()}
      {renderContent()}
      {renderFooter()}
    </Popup>
  );
};

export default Dialog as React.FC<DialogProps> & DialogStatic;
