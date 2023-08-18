import React, { useState, useEffect } from 'react';
import LazyloadImageEvent from './LazyloadImageEvent';
import LazyLoadImageObserve from './LazyloadImageObserve';
import { DEFAULT_EVENTS, hasIntersectionObserver, modeType } from './utils';
import { LazyloadImageProps } from './PropsType';

const Lazyload: React.FC<LazyloadImageProps> = (props) => {
  const [mode, setMode] = useState<keyof typeof modeType>();

  const { observer, ...resetProps } = props;

  useEffect(() => {
    const toSetMode = (value) => {
      if (!hasIntersectionObserver && value === modeType.observer) {
        value = modeType.event;
      }
      setMode(value);
    };

    toSetMode(observer ? modeType.observer : modeType.event);
  }, [observer]);

  return (
    <>
      {mode === modeType.event ? (
        <LazyloadImageEvent {...resetProps} />
      ) : mode === modeType.observer ? (
        <LazyLoadImageObserve {...resetProps} />
      ) : null}
    </>
  );
};

Lazyload.defaultProps = {
  loading: null,
  observer: true,
  eventOptions: {
    scrollContainer: document.body,
    offset: 0,
    debounce: 300,
    throttle: 0,
    listenEvents: DEFAULT_EVENTS,
  },
};

export default Lazyload;
