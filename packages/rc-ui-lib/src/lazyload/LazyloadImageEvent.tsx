import React, { useEffect, useContext, createElement } from 'react';
import classNames from 'classnames';
import { addCssClassName, DEFAULT_EVENTS, DEFAULT_URL, loadImage, setImage } from './utils';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';
import { LazyloadImageProps } from './PropsType';
import useEventVisible from './utils/useEventVisible';

const LazyloadImage: React.FC<LazyloadImageProps> = (props) => {
  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('lazyload-image', prefixCls);

  const {
    className,
    type,
    style: incomingStyle,
    image,
    errorImage,
    loading,
    eventOptions,
    height,
    width,
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
          props.onLoaded?.();
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

LazyloadImage.defaultProps = {
  loading: null,
  height: 'auto',
  width: 'auto',
  eventOptions: {
    listenEvents: DEFAULT_EVENTS,
    scrollContainer: document.body,
    offset: 0,
    debounce: 300,
    throttle: 0,
  },
  type: 'image',
  errorImage: '',
};

export default LazyloadImage;
