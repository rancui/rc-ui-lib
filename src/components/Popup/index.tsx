import React, { useState, useRef, useMemo, useEffect, useCallback, forwardRef, Ref } from 'react';
import ReactDOM from 'react-dom';
import { PopupProps } from './props';
import Overlay from '../overlay';
import Icon from '@/components/icon';
import { isDef, getMountContanier, ContanierType } from '@/utils';
import { CSSTransition } from 'react-transition-group';
import { useEventListener } from '@/utils/useEventListener';
import classnames from 'classnames';
import './style/transition.scss';
import './style/index.scss';

// 全局参数
const context = {
    zIndex: 2000
};

const baseClass = 'r-popup';

const Popup = forwardRef<unknown, PopupProps>((props, ref: Ref<HTMLDivElement>) => {
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
        closeOnPopstate = false,
        closeOnClickOverlay = true,
        onClickOverlay,
        // transition,
        // onClick,
        onClickCloseIcon,
        onOpen,
        onOpened,
        onClose,
        onClosed,
        children
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
            zIndex: zIndexRef.current as number
        };

        if (isDef(duration)) {
            const key = position === 'center' ? 'animationDuration' : 'transitionDuration';
            InnerStyle[key] = `${duration}ms`;
        }

        return Object.assign({ zIndex: zIndexRef.current as number }, InnerStyle, style);
    }, [duration, position]);

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
    };

    // 点击遮罩，关闭弹出层。
    const clickOverlay = useCallback(() => {
        onClickOverlay?.();
        if (closeOnClickOverlay) {
            handleClose();
        }
    }, [closeOnClickOverlay]);

    const renderCloseIcon = () => {
        const classString = classnames(
            `${baseClass}__close-icon`,
            `${baseClass}__close-icon--${closeIconPosition}`
        );
        if (closeable) {
            return <Icon name={closeIcon} className={classString} onClick={handleClickCloseIcon} />;
        }
    };

    // 点击关闭icon，关闭弹出层。
    const handleClickCloseIcon = (e) => {
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
                        [`${baseClass}--safe-area-inset-bottom`]: safeAreaInsetBottom
                    },
                    className
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

    const handleClose = () => {
        onClose?.();
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
                onEnter={(el) => handleOpen(el)}
                onEntering={(el) => handleShow(el)}
                onEntered={(el) => handleOpened?.(el)}
                onExit={() => handleClose()}
                onExiting={(el) => (name === 'anmimate' ? handleHide(el) : null)}
                onExited={(el) => handleClosed(el)}
            >
                {renderPopup()}
            </CSSTransition>
        );
    };

    // popstate触发时机：当前历史条目为pushState创建时，当活动历史记录条目更改时，将触发popstate事件
    useEventListener('popstate', () => {
        if (closeOnPopstate) {
            onClose?.();
        }
    });

    const renderUI = () => {
        return (
            <div className="popup-wrapper" role="popup" ref={ref}>
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
