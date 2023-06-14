/* eslint-disable no-return-assign */
import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import classnames from 'classnames';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';
import { PageIndicator } from './page-indicator';
import SwiperItem from './SwiperItem';
import { SwiperProps, SwiperInstance } from './PropsType';
import useRefState from '../hooks/use-ref-state';
import { bound } from '../utils/bound';
import { devWarning } from '../utils/dev-log';
import { noop } from '../utils';
import { getRect } from '../hooks/get-rect';
import useMountedRef from '../hooks/use-mounted-ref';
import { mergeFuncProps } from '../utils/with-func-props';

function modulus(value: number, division: number) {
  const remainder = value % division;
  return remainder < 0 ? remainder + division : remainder;
}

const eventToPropRecord = {
  mousedown: 'onMouseDown',
  mousemove: 'onMouseMove',
  mouseup: 'onMouseUp',
} as const;

let currentUid: undefined | {};

const Swiper = forwardRef<SwiperInstance, SwiperProps>((props, ref) => {
  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('swiper', prefixCls);

  const { loop: outerLoop, autoplay, direction, autoplayInterval } = props;

  const [uid] = useState({});

  const lock = useRef<boolean>(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const [root, setRoot] = useState<HTMLDivElement>(null);
  const [current, setCurrent] = useState(props.defaultIndex);
  const [dragging, setDragging, draggingRef] = useRefState(false);
  const isVertical = direction === 'vertical';

  const axis = useMemo(() => (isVertical ? 'y' : 'x'), [isVertical]);

  const slideRatio = props.slideSize / 100;
  const offsetRatio = props.trackOffset / 100;

  const computedStyle = useMemo(() => {
    return {
      [`--${prefixCls}-swipe-slide-size`]: `${props.slideSize}%`,
      [`--${prefixCls}-swipe-track-offset`]: `${props.trackOffset}%`,
      ...props.style,
    };
  }, [props.style, props.slideSize, props.trackOffset]);

  const axisDistance = useMemo(() => {
    if (!isVertical) return 100;
    const rect = getRect(root);
    return rect.height;
  }, [isVertical, root]);

  const { validChildren, count } = useMemo(() => {
    let innerCount = 0;
    const innerValidChildren = React.Children.map(props.children, (child) => {
      if (!React.isValidElement(child)) return null;
      if (child.type !== SwiperItem) {
        devWarning('Swiper', 'The children of `Swiper` must be `Swiper.Item` components.');
        return null;
      }
      innerCount++;
      return child;
    });
    return {
      validChildren: innerValidChildren,
      count: innerCount,
    };
  }, [props.children]);

  const loop = useMemo(() => {
    if (count <= 1) return false;
    return outerLoop;
  }, [count, outerLoop]);

  const mountedRef = useMountedRef();

  const getSlidePixels = () => {
    const track = trackRef.current;
    if (!track) return 0;
    const trackPixels = isVertical ? track.offsetHeight : track.offsetWidth;
    return (trackPixels * props.slideSize) / 100;
  };

  const boundIndex = (cur: number) => {
    let min = 0;
    let max = count - 1;
    if (props.stuckAtBoundary) {
      min += (1 - slideRatio - offsetRatio) / slideRatio;
      max -= (1 - slideRatio - offsetRatio) / slideRatio;
    }
    return bound(cur, min, max);
  };

  const [{ position }, api] = useSpring(
    () => ({
      position: boundIndex(current) * 100,
      config: {
        tension: 200,
        friction: 30,
        autoplayInterval,
      },
      onRest: () => {
        if (draggingRef.current) return;
        const rawX = position.get();
        const totalWidth = 100 * count;
        const standardPosition = modulus(rawX, totalWidth);
        if (standardPosition === rawX) return;
        api.start({
          position: standardPosition,
          immediate: true,
        });
      },
    }),
    [count],
  );

  const dragCancelRef = useRef<(() => void) | null>(null);
  function forceCancelDrag() {
    dragCancelRef.current?.();
    draggingRef.current = false;
  }

  const bind = useDrag(
    (state) => {
      dragCancelRef.current = state.cancel;
      if (!state.intentional) return;
      if (state.first && !currentUid) {
        currentUid = uid;
      }
      if (currentUid !== uid) return;
      currentUid = state.last ? undefined : uid;
      const slidePixels = getSlidePixels();

      if (lock.current) return;
      if (!slidePixels) return;
      const paramIndex = isVertical ? 1 : 0;
      const offset = state.offset[paramIndex];
      const itemDirection = state.direction[paramIndex];
      const velocity = state.velocity[paramIndex];
      setDragging(true);
      if (!state.last) {
        api.start({
          position: (offset * 100) / slidePixels,
          immediate: true,
        });
      } else {
        const index = Math.round(
          (offset + Math.min(velocity * 2000, slidePixels) * itemDirection) / slidePixels,
        );
        swipeTo(index);
        window.setTimeout(() => {
          if (mountedRef.current) {
            setDragging(false);
          }
        });
      }
    },
    {
      transform: ([x, y]) => [-x, -y],
      from: () => {
        const slidePixels = getSlidePixels();
        return [(position.get() / 100) * slidePixels, (position.get() / 100) * slidePixels];
      },
      bounds: () => {
        if (loop) return {};
        const slidePixels = getSlidePixels();
        const lowerBound = boundIndex(0) * slidePixels;
        const upperBound = boundIndex(count - 1) * slidePixels;
        return isVertical
          ? {
              top: lowerBound,
              bottom: upperBound,
            }
          : {
              left: lowerBound,
              right: upperBound,
            };
      },
      rubberband: true,
      axis,
      preventScroll: !isVertical,
      pointer: {
        touch: true,
      },
    },
  );

  const renderIndicator = () => {
    if (props.indicator === undefined || props.indicator === true) {
      return (
        <div className={classnames(bem('indicator', { vertical: isVertical }))}>
          <PageIndicator
            {...props.indicatorProps}
            direction={props.direction}
            total={count}
            current={current}
          />
        </div>
      );
    }
    if (typeof props.indicator === 'function') {
      return props.indicator(count, current);
    }
    return null;
  };

  const onClickCapture = (e) => {
    if (draggingRef.current) {
      e.stopPropagation();
    }
    forceCancelDrag();
  };

  function swipeTo(index: number, immediate = false) {
    if (loop) {
      const i = modulus(index, count);
      setCurrent(i);
      props.onIndexChange?.(i);
      api.start({
        position: index * 100,
        immediate,
      });
    } else {
      const i = bound(index, 0, count - 1);
      setCurrent(i);
      props.onIndexChange?.(i);
      api.start({
        position: boundIndex(i) * 100,
        immediate,
      });
    }
  }

  const swipeNext = () => {
    swipeTo(Math.round(position.get() / 100) + 1);
  };

  const swipePrev = () => {
    swipeTo(Math.round(position.get() / 100) - 1);
  };

  useImperativeHandle(ref, () => ({
    activeIndex: current,
    swipeTo,
    swipeNext,
    swipePrev,
    lock: () => {
      lock.current = true;
    },
    unlock: () => {
      lock.current = false;
    },
  }));

  useEffect(() => {
    if (!autoplay || dragging) return noop;
    const interval = window.setInterval(() => {
      swipeNext();
    }, autoplayInterval);
    return () => {
      window.clearInterval(interval);
    };
  }, [autoplay, dragging, axisDistance]);

  if (count === 0) {
    devWarning('Swiper', '`Swiper` needs at least one child.');
  }

  const dragProps = { ...(props.allowTouchMove ? bind() : {}) };

  const stopPropagationProps: Partial<Record<any, any>> = {};
  props.stopPropagation.forEach(key => {
    const prop = eventToPropRecord[key];
    stopPropagationProps[prop] = function (e: Event) {
      e.stopPropagation();
    };
  })


  const mergedProps = mergeFuncProps(dragProps, stopPropagationProps);

  return (
    <div
      ref={setRoot}
      className={classnames(props.className, bem({ vertical: isVertical }))}
      style={computedStyle}
    >
      <div
        ref={trackRef}
        className={classnames(
          bem('track', {
            'allow-touch-move': props.allowTouchMove,
          }),
        )}
        onClickCapture={onClickCapture}
        {...mergedProps}
      >
        <div
          className={classnames(
            bem('track-inner', {
              vertical: isVertical,
            }),
          )}
        >
          {React.Children.map(validChildren, (child, index) => {
            return (
              <animated.div
                className={classnames(bem('slide'))}
                style={{
                  [axis]: position.to((pos) => {
                    let finalPosition = -pos + index * 100;
                    const totalWidth = count * 100;
                    const flagWidth = totalWidth / 2;
                    finalPosition = modulus(finalPosition + flagWidth, totalWidth) - flagWidth;
                    return `${finalPosition}%`;
                  }),
                  left: `-${index * 100}%`,
                }}
              >
                {child}
              </animated.div>
            );
          })}
        </div>
      </div>
      {renderIndicator()}
    </div>
  );
});

Swiper.defaultProps = {
  autoplay: false,
  autoplayInterval: 3000,
  allowTouchMove: true,
  defaultIndex: 0,
  loop: true,
  slideSize: 100,
  stuckAtBoundary: false,
  trackOffset: 0,
  stopPropagation: [],
};

Swiper.displayName = 'Swiper';

export default Swiper;
