import React, { useEffect, useState, useMemo, MouseEventHandler } from 'react';
import { CSSTransition } from 'react-transition-group';
import classnames from 'classnames';
import { OverlayProps } from './props';
import './style/index.scss';
import '../popup/style/center.scss';

const baseClass = 'r-overlay';
// const BODY_LOCK_CLASS = 'r-overflow-hidden';

const Overlay: React.FC<OverlayProps> = (props) => {
  const { show = false, zIndex = 1, duration = 300, customStyle, onClick, children } = props;
  const [visible, setVisible] = useState(false);
  const [display, setDisplay] = useState({ display: 'none' });

  useEffect(() => {
    setVisible(show);
    setDisplay({ display: visible ? 'block' : 'none' });
  }, [show]);

  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    onClick?.(e);
  };

  const style = useMemo(() => {
    return {
      zIndex: zIndex !== undefined ? +zIndex : undefined,
      ...display,
      ...customStyle,
    };
  }, [display, zIndex, customStyle]);

  const handleStatus = (el: HTMLElement) => {
    el.style.display = show ? 'block' : 'none';
  };

  return (
    <CSSTransition
      in={visible}
      classNames="animate"
      timeout={+duration}
      onEnter={(el: HTMLElement) => handleStatus(el)}
      onExited={(el: HTMLElement) => handleStatus(el)}
    >
      <div className={classnames(baseClass)} onClick={handleClick} style={style}>
        {children}
      </div>
    </CSSTransition>
  );
};
export default Overlay;
