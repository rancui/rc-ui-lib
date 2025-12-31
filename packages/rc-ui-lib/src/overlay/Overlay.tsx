import React, { CSSProperties, useContext, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import classnames from 'classnames';
import { useLockScroll } from '../hooks/use-lock-scroll';
import { OverlayProps } from './PropsType';
import { isDef } from '../utils';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';

const Overlay: React.FC<OverlayProps> = (props) => {
  const {
    visible,
    duration = 300,
    customStyle,
    children,
    zIndex,
    lockScroll = true,
    onClick,
    className,
    style: propStyle,
  } = props;

  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('overlay', prefixCls);
  const nodeRef = useRef(null);

  useLockScroll(nodeRef, visible && lockScroll);

  const renderOverlay = () => {
    const style: CSSProperties = {
      zIndex: zIndex !== undefined ? +zIndex : undefined,
      ...propStyle,
      ...customStyle,
    };

    if (isDef(duration)) {
      style.animationDuration = `${duration}ms`;
    }

    return (
      <div
        ref={nodeRef}
        style={style}
        onClick={onClick}
        className={classnames(bem(), className)}
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

export default Overlay;
