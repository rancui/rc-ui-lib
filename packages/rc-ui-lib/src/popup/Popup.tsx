import React, {
  useMemo,
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  useContext,
} from 'react';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';

import Icon from '../icon';
import Overlay from '../overlay';
import useEventListener from '../hooks/use-event-listener';
import { useLockScroll } from '../hooks/use-lock-scroll';

import { isDef } from '../utils';
import { PopupInstanceType, PopupProps } from './PropsType';
import { callInterceptor } from '../utils/interceptor';
import { renderToContainer } from '../utils/dom/renderToContainer';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';
import PopupContext from './PopupContext';

export const sharedPopupProps = [
  'round',
  'zIndex',
  'closeable',
  'overlay',
  'overlayClass',
  'overlayStyle',
  'destroyOnClose',
  'mountOnEnter',
  'lockScroll',
  'duration',
  'transition',
  'closeOnClickOverlay',
  'closeOnPopstate',
  'onClickOverlay',
  'safeAreaInsetBottom',
  'onOpen',
  'onClose',
  'onOpened',
  'onClosed',
  'beforeClose',
] as const;

let globalZIndex = 2000;

const Popup = forwardRef<PopupInstanceType, PopupProps>((props, ref) => {
  const {
    round,
    visible,
    closeable,
    title,
    description,
    children,
    duration = 300,
    closeIcon = 'cross',
    position = 'center',
    zIndex: zIndexProp,
    overlay = true,
    lockScroll = true,
    closeIconPosition = 'top-right',
    closeOnClickOverlay = true,
    preventDefaultMouseDown = false,
    teleport = () => document.body,
    overlayClass,
    overlayStyle,
    destroyOnClose,
    mountOnEnter,
    transition,
    safeAreaInsetBottom,
    closeOnPopstate,
    onClickOverlay: onClickOverlayProp,
    onOpen,
    onClose,
    onOpened,
    onClosed,
    beforeClose,
    iconPrefix,
    onClick,
    onClickCloseIcon,
    className,
    style: propStyle,
  } = props;

  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('popup', prefixCls);

  const opened = useRef(false);
  const zIndex = useRef<number>(zIndexProp ?? globalZIndex);
  const popupRef = useRef<HTMLDivElement>();
  const [animatedVisible, setAnimatedVisible] = useState(visible);

  const style = useMemo(() => {
    const initStyle = {
      zIndex: zIndex.current,
      ...propStyle,
    };

    if (isDef(duration)) {
      const key = position === 'center' ? 'animationDuration' : 'transitionDuration';
      initStyle[key] = `${duration}ms`;
    }
    return initStyle;
  }, [zIndex.current, propStyle, duration, position]);

  const open = () => {
    zIndex.current = zIndexProp !== undefined ? +zIndexProp : globalZIndex++;
    opened.current = true;
    onOpen?.();
  };

  const close = () => {
    if (opened.current) {
      callInterceptor({
        interceptor: beforeClose,
        args: ['close'],
        done: () => {
          opened.current = false;
          onClose?.();
        },
      });
    }
  };

  const handleClickOverlay = (event: React.MouseEvent) => {
    onClickOverlayProp?.(event);

    if (closeOnClickOverlay) {
      close();
    }
  };

  const renderOverlay = () => {
    if (overlay) {
      return (
        <Overlay
          visible={visible}
          lockScroll={lockScroll}
          className={overlayClass}
          customStyle={overlayStyle}
          zIndex={zIndex.current}
          duration={duration}
          onClick={handleClickOverlay}
        />
      );
    }
    return null;
  };

  const handleClickCloseIcon = (e: React.MouseEvent) => {
    if (onClickCloseIcon) {
      onClickCloseIcon(e);
    }
    close();
  };

  const renderCloseIcon = () => {
    if (closeable) {
      if (typeof closeIcon === 'string') {
        return (
          <Icon
            name={closeIcon}
            className={classnames(bem('close-icon', closeIconPosition))}
            classPrefix={iconPrefix}
            onClick={handleClickCloseIcon}
          />
        );
      }
      return (
        <div
          className={classnames(bem('close-icon', closeIconPosition))}
          onClick={handleClickCloseIcon}
        >
          {closeIcon}
        </div>
      );
    }
    return null;
  };

  const renderTitle = () => {
    if (title) {
      return <div className={classnames(bem('title'))}>{title}</div>;
    }
    return null;
  };

  const renderDescrition = () => {
    if (description) {
      return <div className={classnames(bem('description'))}>{description}</div>;
    }
    return null;
  };

  const renderPopup = () => {
    return (
      <div
        ref={popupRef}
        style={{
          ...style,
          display: !animatedVisible ? 'none' : undefined,
        }}
        className={classnames(
          bem({
            round,
            [position]: position,
          }),
          { 'rc-safe-area-bottom': safeAreaInsetBottom },
          className,
        )}
        onClick={onClick}
        onMouseDown={(e) => {
          if (preventDefaultMouseDown) {
            e.preventDefault();
          }
        }}
      >
        {renderTitle()}
        {renderDescrition()}
        {children}
        {renderCloseIcon()}
      </div>
    );
  };

  const renderTransition = () => {
    const name =
      position === 'center' ? `${prefixCls}-fade` : `${prefixCls}-popup-slide-${position}`;

    return (
      <CSSTransition
        in={visible}
        nodeRef={popupRef}
        timeout={{
          exit: duration,
        }}
        classNames={transition || name}
        mountOnEnter={!mountOnEnter}
        unmountOnExit={destroyOnClose}
        onEnter={open}
        onEntered={onOpened}
        onExited={() => {
          setAnimatedVisible(false);
          onClosed?.();
        }}
      >
        {renderPopup()}
      </CSSTransition>
    );
  };

  useEventListener('popstate', () => {
    if (closeOnPopstate) {
      close();
    }
  });

  useLockScroll(popupRef, visible);

  useEffect(() => {
    if (visible) {
      opened.current = true;
      setAnimatedVisible(true);
    }
  }, [visible]);

  useImperativeHandle(ref, () => ({
    popupRef,
  }));

  return renderToContainer(
    teleport,
    <PopupContext.Provider value={{ visible }}>
      {renderOverlay()}
      {renderTransition()}
    </PopupContext.Provider>,
  );
});

Popup.displayName = 'Popup';

export default Popup;
