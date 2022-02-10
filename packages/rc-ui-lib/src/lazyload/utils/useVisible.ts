import { useCallback, useEffect, useState } from 'react';
import { addCssClassName } from '.';
import useIntersectionObserver from './useIntersectionObserver';

const defaultObserverOptions = {
  threshold: [0, 1],
};

const useVisible = (
  initialVisible: boolean,
  observerOptions = defaultObserverOptions,
): [(node: Element) => void, boolean] => {
  const [visible, setVisible] = useState(initialVisible);

  const forceVisible = () => {
    setVisible(true);
  };

  useEffect(() => {
    if (initialVisible) {
      forceVisible();
    }
  }, [initialVisible]);

  const handleIntersection = useCallback(
    (entries) => {
      entries
        .filter((entry) => entry.isIntersecting)
        .forEach((entry) => {
          const target = entry.target as HTMLElement;
          addCssClassName(target, 'rc-lazyload__loaded');
          setVisible(true);
        });
    },
    [setVisible, visible],
  );
  const ref = useIntersectionObserver(observerOptions, handleIntersection);
  return [ref, visible];
};

export default useVisible;
