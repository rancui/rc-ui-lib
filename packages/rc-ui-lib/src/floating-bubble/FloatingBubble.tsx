import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import classnames from 'classnames';
import { FloatingBubbleProps } from './PropsType';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';
import { renderToContainer } from '../utils/dom/renderToContainer';
import { Icon } from '../icon';
import getRect from '../hooks/get-rect';
import useWindowSize from '../hooks/use-window-size';
import { addUnit, pick } from '../utils';
import { useTouch } from '../hooks/use-touch';
import useEventListener from '../hooks/use-event-listener';
import { closest } from '../utils/closest';
import { useSetState } from '../hooks';

const FloatingBubble: React.FC<FloatingBubbleProps> = (props) => {
  const {
    gap = 24,
    axis = 'y',
    offset = { x: -1, y: -1 },
    teleport = () => document.body,
    magnetic,
    icon,
    onClick,
    children,
    onOffsetChange,
  } = props;

  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('floating-bubble', prefixCls);
  const windowSize = useWindowSize();
  const touch = useTouch();
  const rootRef = useRef<HTMLDivElement>();
  const prevX = useRef(0);
  const prevY = useRef(0);
  const [state, setState] = useSetState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const [dragging, setDragging] = useState(false);
  const [show, setShow] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const boundary = useMemo(() => {
    return {
      top: gap,
      right: windowSize.width - state.width - gap,
      bottom: windowSize.height - state.height - gap,
      left: gap,
    };
  }, [windowSize, gap, state]);

  const rootStyle = useMemo(() => {
    const style: React.CSSProperties = {};
    const x = addUnit(state.x);
    const y = addUnit(state.y);
    style.transform = `translate3d(${x}, ${y}, 0)`;
    if (dragging || !initialized) {
      style.transition = 'none';
    }
    return style;
  }, [state, dragging, initialized]);
  const updateState = () => {
    const { width, height } = getRect(rootRef.current);
    setState({
      x: offset.x > 1 ? offset.x : windowSize.width - width - gap,
      y: offset.y > 1 ? offset.y : windowSize.height - height - gap,
      width,
      height,
    });
  };
  const onTouchStart = (event) => {
    touch.start(event);
    setDragging(true);
    prevX.current = state.x;
    prevY.current = state.y;
  };
  const onTouchMove = (event) => {
    event.preventDefault();
    touch.move(event);
    if (axis === 'lock') return;
    if (!touch.isTap.current) {
      if (axis === 'x' || axis === 'xy') {
        let nextX = prevX.current + touch.deltaX.current;
        if (nextX < boundary.left) nextX = boundary.left;
        if (nextX > boundary.right) nextX = boundary.right;
        setState({ x: nextX });
      }
      if (axis === 'y' || axis === 'xy') {
        let nextY = prevY.current + touch.deltaY.current;
        if (nextY < boundary.top) nextY = boundary.top;
        if (nextY > boundary.bottom) nextY = boundary.bottom;
        setState({ y: nextY });
      }
    }
  };
  useEventListener('touchmove', onTouchMove, {
    target: rootRef.current,
  });
  const onTouchEnd = () => {
    setDragging(false);
    // setTimeout(() => {
    if (magnetic === 'x') {
      const nextX = closest([boundary.left, boundary.right], state.x);
      setState({ x: nextX });
    }
    if (magnetic === 'y') {
      const nextY = closest([boundary.top, boundary.bottom], state.y);
      setState({ y: nextY });
    }
    if (!touch.isTap.current) {
      const updateOffset = pick(state, ['x', 'y']);

      if (prevX.current !== updateOffset.x || prevY.current !== updateOffset.y) {
        onOffsetChange?.(updateOffset);
      }
    }
    // }, 0);
  };
  useEffect(() => {
    // setShow(true);
    // setTimeout(() => {
    updateState();
    setInitialized(true);
    // }, 0);
    return () => {
      if (teleport) setShow(false);
    };
  }, []);

  const renderContent = () => {
    return (
      show && (
        <div
          className={classnames(bem())}
          ref={rootRef}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onTouchCancel={onTouchEnd}
          onClick={(e) => {
            if (touch.isTap.current) {
              onClick?.(e);
            }
          }}
          style={rootStyle}
        >
          {children || <Icon name={icon} className={classnames(bem('icon'))} />}
        </div>
      )
    );
  };
  return teleport ? renderToContainer(teleport, renderContent()) : renderContent();
};

export default FloatingBubble;
