import React, { useState, useEffect } from 'react';
import { hasIntersectionObserver, modeType } from './utils';
import LazyloadEvent from './LazyloadEvent';
import LazyLoadObserve from './LazyloadObserve';
import { LazyloadProps } from './PropsType';

const Lazyload: React.FC<LazyloadProps> = (props) => {
  const [mode, setMode] = useState<keyof typeof modeType>('observer');

  const { observer, eventOptions, ...resetProps } = props;

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
        <LazyloadEvent {...resetProps} {...eventOptions} />
      ) : (
        <LazyLoadObserve {...resetProps} />
      )}
    </>
  );
};

Lazyload.defaultProps = {
  loading: null,
  height: 0,
  observer: true,
};

export default Lazyload;
