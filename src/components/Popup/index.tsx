import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { PopupSharedProps, PopupProps } from './Props';
import Overlay from '../Overlay';
import Icon from '@/components/Icon';
import { isDef, getMountContanier, ContanierType } from '@/utils';
import { CSSTransition } from 'react-transition-group';
import { useEventListener } from '@/utils/useEventListener';
import classnames from 'classnames';
import transitionCSS from './transition.scss';
import centerCSS from './center.scss';
import styles from './index.scss';

export const defultPopupSharedProps: PopupSharedProps = {
    duration: 300,
    zIndex: 2000,
    teleport: 'body',
    overlay: true,
    overlayStyle: {},
    overlayClass: '',
    transitionAppear: false,
    closeOnClickOverlay: true
};

// 全局参数
const context = {
    zIndex: 2000
};

const baseClass = 'r-popup';

const Popup: React.FC<PopupProps> = (props) => {
    const {
        show = false, // 是否显示弹出层
        zIndex = 2000,
        duration = 300, // 动画时长，单位秒
        teleport, // 	指定挂载的节点
        overlay = true, // 是否显示遮罩层
        // transition, // 动画类名，等价于 transtion 的name属性
        transitionAppear = false,
        overlayStyle = {}, // 自定义遮罩层样式
        overlayClass, // 自定义遮罩层类名
        style = {}, // 自定义弹出层样式
        className,
        round = false, // 是否显示圆角
        closeable = false, // 是否显示关闭图标
        closeIcon = 'cross', // 关闭图标名称或图片链接
        safeAreaInsetBottom = false, // 是否开启底部安全区适配
        closeIconPosition = 'top-right',
        position = 'center', // 	弹出位置，可选值为 top bottom right left
        closeOnPopstate = false, // 是否在页面回退时自动关闭
        closeOnClickOverlay = true, //是否在点击遮罩层后关闭
        onClickOverlay, // 点击遮罩层时触发
        // onClick, // 点击弹出层时触发
        onClickCloseIcon, // 点击关闭图标时触发
        onOpen, // 打开弹出层时触发
        onOpened, // 打开弹出层且动画结束后触发
        onClose, // 关闭弹出层时触发
        onClosed, // 关闭弹出层且动画结束后触发
        children
    } = props;

    const [visible, setVisible] = useState(show);
    // 初始化
    const zIndexRef = useRef<number | string>(zIndex || context.zIndex);
    const popupRef = useRef<HTMLDivElement>(null);

    // 需在该处监听show的变化，用以显示（隐藏）遮罩或（和）弹出层;
    useEffect(() => {
        setVisible(show);
    }, [show]);

    // 自定义行内样式
    const customStyle: React.CSSProperties = {
        zIndex: zIndexRef.current as number,
        ...style
    };

    if (isDef(duration)) {
        const key = position === 'center' ? 'animationDuration' : 'transitionDuration';
        customStyle[key] = `${duration}ms`;
    }

    const onPopupClosed = (el) => {
        onClosed?.(el);
    };

    // 渲染遮罩层
    const renderOverlay = () => {
        if (overlay) {
            //  overlay为true，显示遮罩层
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
            // setVisible(false);
            // 通知父组件更改状态为初始状态
            onClose?.();
        }
    }, [closeOnClickOverlay]);

    const renderCloseIcon = () => {
        const classString = classnames(
            styles[`${baseClass}__close-icon`],
            styles[`${baseClass}__close-icon--${closeIconPosition}`]
        );
        if (closeable) {
            return <Icon name={closeIcon} className={classString} onClick={handleClickCloseIcon} />;
        }
    };

    // 点击关闭icon，关闭弹出层。
    const handleClickCloseIcon = (e) => {
        // setVisible(false);
        // 通知父组件更改状态为初始状态
        onClickCloseIcon?.(e);
    };

    // 渲染弹出层
    const renderPopup = () => {
        return (
            <div
                ref={popupRef}
                style={customStyle}
                className={classnames(
                    styles[`${baseClass}`],
                    styles[`${baseClass}--${position}`],
                    {
                        [styles[`${baseClass}--${position}--round`]]: round,
                        [styles[`${baseClass}--safe-area-inset-bottom`]]: safeAreaInsetBottom
                    },
                    className
                )}
            >
                {children}
                {renderCloseIcon()}
            </div>
        );
    };
    const renderTransition = () => {
        // 根据弹出层位置设置动画
        const name =
            position === 'center'
                ? {
                      ...centerCSS
                  }
                : {
                      enterActive: transitionCSS[`r-slide-${position}-enter-active`],
                      enterDone: transitionCSS[`r-slide-${position}-enter-done`],
                      exitActive: transitionCSS[`r-slide-${position}-exit-active`]
                  };
        return (
            <CSSTransition
                appear={transitionAppear}
                in={visible}
                timeout={duration}
                unmountOnExit
                classNames={name}
                onEnter={(el) => onOpen?.(el)}
                onEntered={(el) => onOpened?.(el)}
                onExit={() => onClose?.()}
                onExited={(el) => onPopupClosed?.(el)}
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
            <>
                {renderOverlay()}
                {renderTransition()}
            </>
        );
    };

    const renderPortal = () => {
        const ele = getMountContanier(document.querySelector(teleport as string) as ContanierType);
        return teleport ? ReactDOM.createPortal(<>{renderUI()}</>, ele) : <>{renderUI()}</>;
    };

    return <>{renderPortal()}</>;
};
export default Popup;
