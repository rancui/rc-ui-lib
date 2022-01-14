import React, { useContext, createElement, useEffect } from 'react';
import classNames from 'classnames';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';
import { LazyloadImageProps } from './PropsType';
import useImageVisible from './utils/useImageVisible';
import { DEFAULT_URL } from './utils';

const LazyloadImage: React.FC<LazyloadImageProps> = (props) => {
  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('lazyload-image', prefixCls);

  const {
    style: incomingStyle,
    type,
    height,
    width,
    image,
    errorImage,
    eventOptions,
    observerOptions,
    onLoaded,
    loading,
    className,
    ...restProps
  } = props;

  const [containerRef, hasLoaded] = useImageVisible(observerOptions);

  useEffect(() => {
    if (hasLoaded) {
      props.onLoaded?.();
    }
  }, [hasLoaded]);

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
  image: '60',
  className: '',
  type: 'image',
  height: 'auto',
  width: 'auto',
};

export default LazyloadImage;
