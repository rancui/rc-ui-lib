import React, { useState, useEffect } from 'react';
import { hasIntersectionObserver, modeType } from './utils';
import LazyloadEvent from './LazyloadEvent';
import LazyLoadObserve from './LazyloadObserve';
import { LazyloadProps } from './PropsType';

const Lazyload: React.FC<LazyloadProps> = ({
  loading = null,
  height = 0,
  observer = true,
  eventOptions = {},
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
    height,
    ...resetProps,
  };

  return (
    <>
      {mode === modeType.event ? (
        <LazyloadEvent {...resetPropsWithDefaults} {...eventOptions} />
      ) : mode === modeType.observer ? (
        <LazyLoadObserve {...resetPropsWithDefaults} />
      ) : null}
    </>
  );
};

export default Lazyload;
