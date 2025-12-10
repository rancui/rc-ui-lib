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
    visible = false,
    safeAreaInsetBottom = true,
    theme = 'default',
    blurOnClose = true,
    showDeleteKey = true,
    hideOnClickOutside = true,
    zIndex = 100,
    teleport,
    title,
    closeButtonText,
    titleLeft,
    deleteButtonText,
    closeButtonLoading = false,
    extraKey = '',
    randomKeyOrder = false,
    onBlur,
    onClose,
    onDelete,
    onInput,
  } = props;

  const root = useRef<HTMLDivElement>(null);

  const showClose = closeButtonText && theme === 'default';
  const showTitle = !!(title || showClose || titleLeft);

  const keys = useMemo(
    () => (theme === 'custom' ? genCustomKeys(props) : genDefaultKeys(props)),
    [theme, randomKeyOrder, extraKey, showDeleteKey, deleteButtonText],
  );

  const handleBlur = () => {
    if (visible) {
      onBlur?.();
    }
  };

  const handleClose = () => {
    onClose?.();

    if (blurOnClose) {
      handleBlur();
    }
  };

  const onPress = (text: string, type: KeyType) => {
    if (text === '') {
      if (type === 'extra') {
        handleBlur();
      }
      return;
    }

    if (type === 'delete') {
      onDelete?.();
    } else if (type === 'close') {
      handleClose();
    } else {
      onInput?.(text);
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
          <button type="button" className={classNames(bem('close'))} onClick={handleClose}>
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
              text={deleteButtonText}
              type="delete"
              onPress={onPress}
            />
          )}
          <NumberKeyboardKey
            large
            text={closeButtonText}
            type="close"
            color="blue"
            loading={closeButtonLoading}
            onPress={onPress}
          />
        </div>
      );
    }
    return null;
  };

  useClickAway(root, handleBlur, 'touchstart', hideOnClickOutside);

  return (
    <Popup
      visible={visible}
      preventDefaultMouseDown
      overlay={false}
      round={showTitle}
      zIndex={zIndex}
      position="bottom"
      duration={300}
      teleport={teleport}
      safeAreaInsetBottom={safeAreaInsetBottom}
      onClose={handleClose}
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

export default NumberKeyboard;
