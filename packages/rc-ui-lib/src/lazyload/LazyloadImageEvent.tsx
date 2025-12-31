import React, { useEffect, useContext, createElement } from 'react';
import classNames from 'classnames';
import { addCssClassName, DEFAULT_EVENTS, DEFAULT_URL, loadImage, setImage } from './utils';
import useEventVisible from './utils/useEventVisible';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';
import { LazyloadImageProps } from './PropsType';

const DEFAULT_EVENT_OPTIONS = {
  listenEvents: DEFAULT_EVENTS,
  scrollContainer: document.body,
  offset: 0,
  debounce: 300,
  throttle: 0,
};

const LazyloadImage: React.FC<LazyloadImageProps> = (props) => {
  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('lazyload-image', prefixCls);

  const {
    className,
    type = 'image',
    style: incomingStyle,
    image,
    errorImage = DEFAULT_URL,
    loading = null,
    eventOptions = DEFAULT_EVENT_OPTIONS,
    height,
    width,
    onLoaded,
    ...restProps
  } = props;

  const [containerRef, visible] = useEventVisible(eventOptions);

  useEffect(() => {
    if (visible && containerRef.current) {
      const target = containerRef.current;
      const url = target.dataset.src || '';
      loadImage(url)
        .catch(() => {
          setImage(target, errorImage);
          addCssClassName(target, bem('error') as string);
        })
        .then((imagePath: string) => {
          setImage(target, imagePath);
          addCssClassName(target, bem('loaded') as string);
          target.setAttribute('lazy', 'loaded');
          target.removeAttribute('data-src');
          onLoaded?.();
        });
    }
  }, [visible]);

  const style = {
    ...incomingStyle,
    height,
    width,
  };

  return (
    <>
      {type === 'image'
        ? createElement('img', {
            ...restProps,
            ref: containerRef,
            style,
            'data-src': image,
            src: loading || DEFAULT_URL,
            className: classNames(bem(), className),
          })
        : createElement(
            'div',
            {
              ...restProps,
              ref: containerRef,
              style,
              'data-src': image,
              className: classNames(bem(), className),
            },
            props.children,
          )}
    </>
  );
};

export default LazyloadImage;
