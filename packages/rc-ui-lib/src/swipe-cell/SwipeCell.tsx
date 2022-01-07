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
    return isDef(props.leftWidth) ? +props.leftWidth : getWidth(leftRef);
  }
  function getRightWidth() {
    return isDef(props.rightWidth) ? +props.rightWidth : getWidth(rightRef);
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
      if (!props.disabled) {
        lockClick.current = true;
        draggingRef.current = true;
        const [offsetX] = state.offset;
        if (state.last) {
          const leftWidth = getLeftWidth();
          const rightWidth = getRightWidth();
          let position = offsetX + state.velocity[0] * state.direction[0] * 50;
          if (offsetX > 0) {
            position = Math.max(0, position);
          } else {
            position = Math.min(0, position);
          }
          const nearestPosition = nearest([-rightWidth, 0, leftWidth], position);
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
        const leftWidth = getLeftWidth();
        const rightWidth = getRightWidth();
        return {
          left: -rightWidth,
          right: leftWidth,
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

    props.onOpen?.({
      position: side,
      name: props.name,
    });
  };

  const close = (position?: SwipeCellPosition) => {
    api.start({
      x: 0,
    });
    if (opened.current) {
      opened.current = false;
      props.onClose?.({
        position,
        name: props.name,
      });
    }
  };

  const onClick = (position: SwipeCellPosition = 'outside') => {
    props.onClick?.(position);
    if (opened.current && !lockClick.current) {
      callInterceptor({
        interceptor: props.beforeClose,
        args: [
          {
            name: props.name,
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

  const getClickHandler = (position: SwipeCellPosition, stop?: boolean) => (event) => {
    if (stop) {
      event.preventDefault();
      event.stopPropagation();
    }
    onClick(position);
  };

  const renderSideContent = (
    side: SwipeCellSide,
    sideRef: React.MutableRefObject<HTMLDivElement>,
  ) => {
    const contentSlot = props[side];
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

  useClickAway(rootRef, () => onClick('outside'), 'touchstart', props.hideOnClickOutside);

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
            {props.children}
          </animated.div>
        </div>
        {renderSideContent('right', rightRef)}
      </animated.div>
    </div>
  );
});

SwipeCell.defaultProps = {
  disabled: false,
  hideOnClickOutside: true,
};

export default SwipeCell;
