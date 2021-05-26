import React, {
  useState,
  useRef,
  useMemo,
  useEffect,
  useCallback,
  forwardRef,
  MutableRefObject,
  MouseEventHandler,
} from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import classnames from 'classnames';
import Icon from '../icon';
import { isDef, getMountContanier, ContanierType } from '../../utils';
import Overlay from '../overlay';
import { PopupProps } from './props';
import './style/transition.scss';
import './style/index.scss';

// 全局参数
const context = {
  zIndex: 2000,
};

const baseClass = 'r-popup';

const Popup = forwardRef<unknown, PopupProps>((props, ref) => {
  const {
    show = false,
    zIndex = 2000,
    duration = 300,
    teleport,
    overlay = true,
    overlayStyle = {},
    overlayClass,
    style = {},
    className,
    round = false,
    closeable = false,
    closeIcon = 'cross',
    safeAreaInsetBottom = false,
    closeIconPosition = 'top-right',
    position = 'center',
    closeOnClickOverlay = true,
    onClickOverlay,
    // transition,
    // onClick,
    onClickCloseIcon,
    onOpen,
    onOpened,
    onClose,
    onClosed,
    children,
  } = props;

  const [visible, setVisible] = useState(false);

  // 初始化
  const zIndexRef = useRef<number | string>(zIndex || context.zIndex);
  const popupRef = useRef<HTMLDivElement>(null);

  // 需在该处监听show的变化，用以显示（隐藏）遮罩或（和）弹出层;
  useEffect(() => {
    setVisible(show);
  }, [show]);

  // 行内样式
  const customStyle = useMemo(() => {
    const InnerStyle: React.CSSProperties = {
      zIndex: zIndexRef.current as number,
    };

    if (isDef(duration)) {
      const key = position === 'center' ? 'animationDuration' : 'transitionDuration';
      InnerStyle[key] = `${duration}ms`;
    }

    return { zIndex: zIndexRef.current as number, ...InnerStyle, ...style };
  }, [duration, position, style]);

  // 渲染遮罩层
  const renderOverlay = () => {
    if (overlay) {
      return (
        <Overlay
          show={visible}
          className={overlayClass}
          customStyle={overlayStyle}
          zIndex={zIndexRef.current}
          duration={+duration}
          onClick={clickOverlay}
        />
      );
    }
    return null;
  };

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  // 点击遮罩，关闭弹出层。
  const clickOverlay = useCallback(() => {
    onClickOverlay?.();
    if (closeOnClickOverlay) {
      handleClose();
    }
  }, [closeOnClickOverlay, handleClose, onClickOverlay]);

  const renderCloseIcon = () => {
    const classString = classnames(
      `${baseClass}__close-icon`,
      `${baseClass}__close-icon--${closeIconPosition}`,
    );
    if (closeable) {
      return <Icon name={closeIcon} className={classString} onClick={handleClickCloseIcon} />;
    }
    return null;
  };

  // 点击关闭icon，关闭弹出层。
  const handleClickCloseIcon: MouseEventHandler<HTMLElement> = (e) => {
    onClickCloseIcon?.(e);
  };

  // 渲染弹出层
  const renderPopup = () => {
    return (
      <div
        ref={popupRef}
        style={customStyle}
        className={classnames(
          baseClass,
          `${baseClass}--${position}`,
          {
            [`${baseClass}--${position}--round`]: round,
            [`${baseClass}--safe-area-inset-bottom`]: safeAreaInsetBottom,
          },
          className,
        )}
      >
        {children}
        {renderCloseIcon()}
      </div>
    );
  };

  const handleOpen = (el: HTMLElement) => {
    onOpen?.(el);
  };

  const handleOpened = (el: HTMLElement) => {
    onOpened?.(el);
  };

  const handleClosed = (el: HTMLElement) => {
    onClosed?.(el);
  };

  const handleShow = (el: HTMLElement) => {
    el.style.display = 'block';
  };

  const handleHide = (el: HTMLElement) => {
    el.style.display = 'none';
  };

  const renderTransition = () => {
    // 根据弹出层位置设置动画
    const name = position === 'center' ? 'anmimate' : `r-slide-${position}`;
    return (
      <CSSTransition
        in={visible}
        timeout={+duration}
        classNames={name}
        onEnter={(el: HTMLElement) => handleOpen(el)}
        onEntering={(el: HTMLElement) => handleShow(el)}
        onEntered={(el: HTMLElement) => handleOpened?.(el)}
        onExit={() => handleClose()}
        onExiting={(el) => (name === 'anmimate' ? handleHide(el) : null)}
        onExited={(el) => handleClosed(el)}
      >
        {renderPopup()}
      </CSSTransition>
    );
  };

  const renderUI = () => {
    return (
      <div className="popup-wrapper" role="popup" ref={ref as MutableRefObject<HTMLDivElement>}>
        {renderOverlay()}
        {renderTransition()}
      </div>
    );
  };

  const renderPortal = () => {
    const ele = getMountContanier(document.querySelector(teleport as string) as ContanierType);
    return teleport ? ReactDOM.createPortal(renderUI(), ele) : renderUI();
  };

  return <>{renderPortal()}</>;
});

Popup.displayName = 'Popup';

export default Popup;
