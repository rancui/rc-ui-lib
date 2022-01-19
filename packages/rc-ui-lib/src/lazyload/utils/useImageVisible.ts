import { useCallback, useState } from 'react';
import { addCssClassName, loadImage, setImage } from '.';
import { IntersectionObserverEntryType, ObserverOptions } from '../PropsType';
import useIntersectionObserver from './useIntersectionObserver';

const defaultObserverOptions = {
  threshold: [0, 1],
};

const useImageVisible = (
  observerOptions: ObserverOptions = defaultObserverOptions,
  errorImage: string,
): [(node: Element) => void, boolean] => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntryType[]) => {
      entries
        .filter((entry) => entry.isIntersecting)
        .forEach((entry) => {
          const target = entry.target as HTMLImageElement | HTMLElement;
          const url = target.dataset.src || '';
          loadImage(url)
            .catch(() => {
              setImage(target, errorImage);
              addCssClassName(target, 'rc-lazyload__error');
              target.setAttribute('lazy', 'error');
            })
            .then((imagePath: string) => {
              setImage(target, imagePath);
              setIsLoaded(true);
              addCssClassName(target, 'rc-lazyload__loaded');
              target.setAttribute('lazy', 'loaded');
              target.removeAttribute('data-src');
            });
        });
    },
    [setIsLoaded, isLoaded],
  );
  const ref = useIntersectionObserver(observerOptions, handleIntersection);
  return [ref, isLoaded];
};

export default useImageVisible;
