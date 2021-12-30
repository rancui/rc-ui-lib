import React, { useContext, useMemo, useRef } from 'react';
import classNames from 'classnames';
import { Popup } from '../popup';
import { NumberKeyboardProps, KeyType } from './PropsType';

import { genCustomKeys, genDefaultKeys } from './utils';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';
import NumberKeyboardKey from './NumberKeyboardKey';
import useClickAway from '../hooks/use-click-away';

const NumberKeyboard: React.FC<NumberKeyboardProps> = (props) => {
  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('number-keyboard', prefixCls);
  const {
    visible,
    safeAreaInsetBottom,
    theme,
    blurOnClose,
    showDeleteKey,
    hideOnClickOutside,
    zIndex,
    teleport,
    title,
    closeButtonText,
    titleLeft,
  } = props;

  const root = useRef<HTMLDivElement>(null);

  const showClose = closeButtonText && theme === 'default';
  const showTitle = !!(title || showClose || titleLeft);

  const keys = useMemo(
    () => (theme === 'custom' ? genCustomKeys(props) : genDefaultKeys(props)),
    [theme],
  );

  const onBlur = () => {
    if (visible) {
      props.onBlur?.();
    }
  };

  const onClose = () => {
    props.onClose?.();

    if (blurOnClose) {
      onBlur();
    }
  };

  const onPress = (text: string, type: KeyType) => {
    if (text === '') {
      if (type === 'extra') {
        onBlur();
      }
      return;
    }

    if (type === 'delete') {
      props.onDelete?.();
    } else if (type === 'close') {
      onClose();
    } else {
      props.onInput?.(text);
    }
  };

  const renderTitle = () => {
    if (!showTitle) {
      return null;
    }
    return (
      <div className={classNames(bem('header'))}>
        {titleLeft && <span className={classNames(bem('title-left'))}>{titleLeft}</span>}
        {title && <h2 className={classNames(bem('title'))}>{title}</h2>}
        {showClose && (
          <button type="button" className={classNames(bem('close'))} onClick={onClose}>
            {closeButtonText}
          </button>
        )}
      </div>
    );
  };

  const renderKeys = () => {
    return keys.map((key) => {
      return (
        <NumberKeyboardKey
          key={`${key.text}${key.type}`}
          text={key.text}
          type={key.type}
          wider={key.wider}
          color={key.color}
          onPress={onPress}
        />
      );
    });
  };

  const renderSidebar = () => {
    if (theme === 'custom') {
      return (
        <div className={classNames(bem('sidebar'))}>
          {showDeleteKey && (
            <NumberKeyboardKey
              large
              text={props.deleteButtonText}
              type="delete"
              onPress={onPress}
            />
          )}
          <NumberKeyboardKey
            large
            text={props.closeButtonText}
            type="close"
            color="blue"
            loading={props.closeButtonLoading}
            onPress={onPress}
          />
        </div>
      );
    }
    return null;
  };

  if (hideOnClickOutside) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useClickAway(root, onBlur, 'touchstart');
  }

  return (
    <Popup
      visible={visible}
      overlay={false}
      round={showTitle}
      zIndex={zIndex}
      position="bottom"
      duration={300}
      teleport={teleport}
      safeAreaInsetBottom={safeAreaInsetBottom}
      onClose={onClose}
    >
      <div ref={root} className={classNames(bem())}>
        {renderTitle()}
        <div className={classNames(bem('body'))}>
          <div className={classNames(bem('keys'))}>{renderKeys()}</div>
          {renderSidebar()}
        </div>
      </div>
    </Popup>
  );
};

NumberKeyboard.defaultProps = {
  theme: 'default',
  extraKey: '',
  showDeleteKey: true,
  zIndex: 100,
  closeButtonLoading: false,
  hideOnClickOutside: true,
  randomKeyOrder: false,
  safeAreaInsetBottom: true,
  blurOnClose: true,
};

export default NumberKeyboard;
