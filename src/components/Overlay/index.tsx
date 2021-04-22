import React, { useEffect, useMemo } from 'react';
import animation from '@/assets/scss/animation.scss';
import { CSSTransition } from 'react-transition-group';
import { inBrowser, isDef } from '@/utils';
import classnames from 'classnames';
import { OverlayProps } from './Props';
import styles from './index.scss';

const baseClass = 'r-overlay';
const BODY_LOCK_CLASS = 'r-overflow-hidden';

const Overlay: React.FC<OverlayProps> = (props) => {
    const { show = false, zIndex = 1, duration = 300, customStyle, onClick, children } = props;

    const handleClick = (e) => {
        onClick?.(e);
    };

    const renderOverlay = useMemo(() => {
        const style: React.CSSProperties = {
            zIndex: zIndex !== undefined ? +zIndex : undefined,
            display: 'none',
            ...customStyle
        };

        if (isDef(duration)) {
            style.animationDuration = `${+duration}s`;
        }
        return (
            <CSSTransition
                classNames={{ ...animation }}
                in={show}
                onEntering={(el) => (el.style.display = 'block')}
                onExited={(el) => (el.style.display = 'none')}
                timeout={+duration}
            >
                <div
                    className={classnames(styles[`${baseClass}`])}
                    onClick={handleClick}
                    style={style}
                >
                    {children}
                </div>
            </CSSTransition>
        );
    }, [show, duration]);

    useEffect(() => {
        // 是浏览器环境
        if (inBrowser()) {
            // 当出现遮罩，背景不可滚动
            show
                ? document.body.classList.add(classnames(styles[`${BODY_LOCK_CLASS}`]))
                : document.body.classList.remove(classnames(styles[`${BODY_LOCK_CLASS}`]));
        }
        return () => {
            // 当卸载该组件，移除锁定
            document.body.classList.remove(classnames(styles[`${BODY_LOCK_CLASS}`]));
        };
    }, [show]);

    return <>{renderOverlay}</>;
};
export default Overlay;
