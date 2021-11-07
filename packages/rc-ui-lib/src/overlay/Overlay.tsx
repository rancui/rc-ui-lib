import React, { CSSProperties, TouchEvent, useEffect, useContext, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import classnames from 'classnames';
import { OverlayProps } from './PropsType';
import { noop, preventDefault, isDef } from '../utils';
import useLockScroll from '../hooks/use-lock-scroll';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';

const Overlay: React.FC<OverlayProps> = (props) => {
  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('overlay', prefixCls);
  const nodeRef = useRef(null);
  const [lockScroll, unlockScroll] = useLockScroll(() => props.lockScroll);

  const { visible, duration, customStyle, children } = props;

  const preventTouchMove = (event: TouchEvent) => {
    preventDefault(event, true);
  };

  useEffect(() => {
    if (!props.lockScroll) return;
    if (visible) {
      lockScroll();
    } else {
      unlockScroll();
    }
  }, [visible]);

  const renderOverlay = () => {
    const style: CSSProperties = {
      zIndex: props.zIndex !== undefined ? +props.zIndex : undefined,
      ...props.style,
      ...customStyle,
    };

    if (isDef(duration)) {
      style.animationDuration = `${duration}ms`;
    }

    return (
      <div
        ref={nodeRef}
        style={style}
        onClick={props.onClick}
        className={classnames(bem(), props.className)}
        onTouchMove={props.lockScroll ? preventTouchMove : noop}
      >
        {children}
      </div>
    );
  };

  return (
    <CSSTransition
      nodeRef={nodeRef}
      mountOnEnter
      unmountOnExit
      in={visible}
      timeout={duration}
      classNames="rc-fade"
    >
      {renderOverlay()}
    </CSSTransition>
  );
};

Overlay.defaultProps = {
  lockScroll: true,
  duration: 300,
};

export default Overlay;
