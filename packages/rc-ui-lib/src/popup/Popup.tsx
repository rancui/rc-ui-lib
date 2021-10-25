/* eslint-disable no-plusplus */
import React, {
  useMemo,
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  useContext,
  CSSProperties,
} from 'react';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';

import Icon from '../icon';
import Overlay from '../overlay';
import useLockScroll from '../hooks/use-lock-scroll';
import useEventListener from '../hooks/use-event-listener';

import { isDef } from '../utils';
import { PopupInstanceType, PopupProps } from './PropsType';
import { callInterceptor } from '../utils/interceptor';
import { renderToContainer } from '../utils/dom/renderToContainer';
import useSsrCompat from '../hooks/use-ssr-compat';
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
  'forceRender',
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
  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('popup', prefixCls);

  const {
    style,
    round,
    visible,
    closeable,
    title,
    descrition,
    children,
    duration,
    closeIcon,
    position,
    onClickOverlay,
    closeOnClickOverlay,
    onOpen,
    beforeClose,
    onClose,
    onClickCloseIcon,
    teleport,
  } = props;
  const opened = useRef<boolean>(false);
  const zIndex = useRef<number>(globalZIndex);
  const popupRef = useRef<HTMLDivElement>();
  const [animatedVisible, setAnimatedVisible] = useState(visible);
  const [lockScroll, unlockScroll] = useLockScroll(() => props.lockScroll);
  const [ssrCompatRender, rendered] = useSsrCompat();

  const popupStyle = useMemo(() => {
    const initStyle: CSSProperties = {
      zIndex: zIndex.current,
      ...style,
    };

    if (isDef(duration)) {
      const key = position === 'center' ? 'animationDuration' : 'transitionDuration';
      initStyle[key] = `${duration}ms`;
    }
    return initStyle;
  }, [zIndex.current, style, duration]);

  const open = () => {
    if (!opened.current) {
      if (props.zIndex !== undefined) {
        globalZIndex = props.zIndex;
      }
      opened.current = true;
      zIndex.current = ++globalZIndex;
      onOpen?.();
    }
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

  const handleClickOverlay = (event) => {
    onClickOverlay?.(event);
    if (closeOnClickOverlay) {
      close();
    }
  };

  const renderOverlay = () => {
    const { overlay, overlayClass, overlayStyle } = props;
    if (overlay) {
      return (
        <Overlay
          visible={visible && rendered}
          className={overlayClass}
          customStyle={overlayStyle}
          // zIndex={zIndex.current}
          zIndex={popupStyle.zIndex as number}
          duration={duration}
          onClick={handleClickOverlay}
        />
      );
    }
    return null;
  };

  const handleClickCloseIcon = (e) => {
    onClickCloseIcon?.(e);
    close();
  };

  const renderCloseIcon = () => {
    if (closeable) {
      const { closeIconPosition, iconPrefix } = props;
      return (
        <Icon
          name={closeIcon}
          className={classnames(bem('close-icon', closeIconPosition))}
          classPrefix={iconPrefix}
          onClick={handleClickCloseIcon}
        />
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
    if (descrition) {
      return <div className={classnames(bem('descrition'))}>{descrition}</div>;
    }
    return null;
  };

  const renderPopup = () => {
    return (
      <div
        ref={popupRef}
        style={{
          ...popupStyle,
          display: !visible && !animatedVisible ? 'none' : undefined,
        }}
        className={classnames(
          props.className,
          bem({
            round,
            [position]: position,
          }),
          { 'rc-safe-area-bottom': props.safeAreaInsetBottom },
        )}
        onClick={props.onClick}
      >
        {renderTitle()}
        {renderDescrition()}
        {children}
        {renderCloseIcon()}
      </div>
    );
  };

  const renderTransition = () => {
    const { transition, destroyOnClose, forceRender, onClosed, onOpened } = props;
    const name = position === 'center' ? 'rc-fade' : `rc-popup-slide-${position}`;

    return (
      <CSSTransition
        in={visible && rendered}
        nodeRef={popupRef}
        timeout={duration}
        classNames={transition || name}
        mountOnEnter={!forceRender}
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
    if (props.closeOnPopstate) {
      close();
    }
  });

  useEffect(() => {
    if (!rendered) return;
    if (visible) {
      lockScroll();
      setAnimatedVisible(true);
    } else {
      unlockScroll();
    }
  }, [visible, rendered]);

  useImperativeHandle(ref, () => ({
    popupRef,
  }));

  return ssrCompatRender(() =>
    renderToContainer(
      teleport,
      <PopupContext.Provider value={{ visible }}>
        {renderOverlay()}
        {renderTransition()}
      </PopupContext.Provider>,
    ),
  );
});

Popup.defaultProps = {
  zIndex: 2000,
  duration: 300,
  overlay: true,
  lockScroll: true,
  position: 'center',
  closeIcon: 'cross',
  closeIconPosition: 'top-right',
  closeOnClickOverlay: true,
  teleport: () => document.body,
};

export default Popup;
