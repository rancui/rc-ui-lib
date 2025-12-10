/* eslint-disable @typescript-eslint/no-shadow */
import React, { forwardRef, useContext, useRef, useImperativeHandle, RefObject } from 'react';
import classNames from 'classnames';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

import useClickAway from '../hooks/use-click-away';
import useMountedRef from '../hooks/use-mounted-ref';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';
import { callInterceptor } from '../utils/interceptor';
import { nearest } from '../utils/nearest';
import { SwipeCellInstance, SwipeCellPosition, SwipeCellProps, SwipeCellSide } from '.';
import { isDef } from '../utils';

const SwipeCell = forwardRef<SwipeCellInstance, SwipeCellProps>((props, ref) => {
  const {
    disabled = false,
    hideOnClickOutside = true,
    leftWidth,
    rightWidth,
    left,
    right,
    name,
    beforeClose,
    onClick,
    onOpen,
    onClose,
    children,
  } = props;

  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('swipe-cell', prefixCls);

  const rootRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>();
  const rightRef = useRef<HTMLDivElement>();

  const opened = useRef(false);
  const lockClick = useRef(false);
  const draggingRef = useRef(false);

  const mountedRef = useMountedRef();

  const getWidth = (elementRef: RefObject<HTMLDivElement>) =>
    elementRef.current ? elementRef.current.offsetWidth : 0;

  function getLeftWidth() {
    return isDef(leftWidth) ? +leftWidth : getWidth(leftRef);
  }
  function getRightWidth() {
    return isDef(rightWidth) ? +rightWidth : getWidth(rightRef);
  }

  const [{ x }, api] = useSpring(
    () => ({
      x: 0,
      config: {
        tension: 200,
        friction: 30,
      },
    }),
    [],
  );

  const bind = useDrag(
    (state) => {
      if (!disabled) {
        lockClick.current = true;
        draggingRef.current = true;
        const [offsetX] = state.offset;
        if (state.last) {
          const leftWidthValue = getLeftWidth();
          const rightWidthValue = getRightWidth();
          let position = offsetX + state.velocity[0] * state.direction[0] * 50;
          if (offsetX > 0) {
            position = Math.max(0, position);
          } else {
            position = Math.min(0, position);
          }
          const nearestPosition = nearest([-rightWidthValue, 0, leftWidthValue], position);
          api.start({
            x: nearestPosition,
          });
          opened.current = nearestPosition !== 0;
          window.setTimeout(() => {
            if (mountedRef.current) {
              draggingRef.current = false;
              lockClick.current = false;
            }
          });
        } else {
          api.start({
            x: offsetX,
            immediate: true,
          });
        }
      }
    },
    {
      from: () => [x.get(), 0],
      bounds: () => {
        const leftWidthValue = getLeftWidth();
        const rightWidthValue = getRightWidth();
        return {
          left: -rightWidthValue,
          right: leftWidthValue,
        };
      },
      axis: 'x',
      preventScroll: true,
      pointer: { touch: true },
    },
  );

  const open = (side: SwipeCellSide) => {
    opened.current = true;
    const offset = side === 'left' ? getLeftWidth() : -getRightWidth();

    api.start({
      x: offset,
    });

    onOpen?.({
      position: side,
      name: name || '',
    });
  };

  const close = (position?: SwipeCellPosition) => {
    api.start({
      x: 0,
    });
    if (opened.current) {
      opened.current = false;
      onClose?.({
        position,
        name: name || '',
      });
    }
  };

  const handleClick = (position: SwipeCellPosition = 'outside') => {
    onClick?.(position);
    if (opened.current && !lockClick.current) {
      callInterceptor({
        interceptor: beforeClose,
        args: [
          {
            name: name || '',
            position,
            instance: {
              close: () => close(position),
            },
          },
        ],
        done: () => close(position),
      });
    }
  };

  const getClickHandler = (position: SwipeCellPosition, stop?: boolean) => (event: React.MouseEvent) => {
    if (stop) {
      event.preventDefault();
      event.stopPropagation();
    }
    handleClick(position);
  };

  const renderSideContent = (
    side: SwipeCellSide,
    sideRef: React.MutableRefObject<HTMLDivElement>,
  ) => {
    const contentSlot = side === 'left' ? left : right;
    return contentSlot ? (
      <div ref={sideRef} className={classNames(bem(side))} onClick={getClickHandler(side, true)}>
        {contentSlot}
      </div>
    ) : null;
  };

  useImperativeHandle(ref, () => ({
    open: (side: SwipeCellSide) => open(side),
    close,
  }));

  useClickAway(rootRef, () => handleClick('outside'), 'touchstart', hideOnClickOutside);

  return (
    <div
      ref={rootRef}
      {...bind()}
      className={classNames(bem())}
      onClickCapture={(e) => {
        if (draggingRef.current) {
          e.stopPropagation();
          e.preventDefault();
        }
      }}
      onClick={getClickHandler('cell')}
    >
      <animated.div className={classNames(bem('wrapper'))} style={{ x }}>
        {renderSideContent('left', leftRef)}
        <div
          className={classNames(bem('content'))}
          onClickCapture={(e) => {
            if (x.goal !== 0) {
              e.preventDefault();
              e.stopPropagation();
              api.start({
                x: 0,
              });
            }
          }}
        >
          <animated.div
            style={{
              pointerEvents: x.to((v) => (v !== 0 && x.goal !== 0 ? 'none' : 'unset')),
            }}
          >
            {children}
          </animated.div>
        </div>
        {renderSideContent('right', rightRef)}
      </animated.div>
    </div>
  );
});

export default SwipeCell;
