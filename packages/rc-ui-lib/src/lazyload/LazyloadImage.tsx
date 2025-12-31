import React, { useState, useEffect } from 'react';
import LazyloadImageEvent from './LazyloadImageEvent';
import LazyLoadImageObserve from './LazyloadImageObserve';
import { DEFAULT_EVENTS, hasIntersectionObserver, modeType } from './utils';
import { LazyloadImageProps } from './PropsType';

const defaultImageEventOptions = {
  scrollContainer: document.body,
  offset: 0,
  debounce: 300,
  throttle: 0,
  listenEvents: DEFAULT_EVENTS,
};

const Lazyload: React.FC<LazyloadImageProps> = ({
  loading = null,
  observer = true,
  eventOptions = defaultImageEventOptions,
  ...resetProps
}) => {
  const [mode, setMode] = useState<keyof typeof modeType>();

  useEffect(() => {
    const toSetMode = (value) => {
      if (!hasIntersectionObserver && value === modeType.observer) {
        value = modeType.event;
      }
      setMode(value);
    };

    toSetMode(observer ? modeType.observer : modeType.event);
  }, [observer]);

  const resetPropsWithDefaults = {
    loading,
    ...resetProps,
  };

  return (
    <>
      {mode === modeType.event ? (
        <LazyloadImageEvent {...resetPropsWithDefaults} {...eventOptions} />
      ) : mode === modeType.observer ? (
        <LazyLoadImageObserve {...resetPropsWithDefaults} />
      ) : null}
    </>
  );
};
export default Lazyload;
