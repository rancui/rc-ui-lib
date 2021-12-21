import React, { useContext, useRef, useState } from 'react';
import classnames from 'classnames';
import { ImagePreviewProps } from './PropsType';
import { pick } from '../utils';
import Icon from '../icon';
import Swiper from '../swiper';
import type { SwiperInstance } from '../swiper';
import Popup from '../popup';
import ImagePreviewItem from './ImagePreviewItem';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';

const ImagePreview: React.FC<ImagePreviewProps> = (props) => {
  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('image-preview', prefixCls);

  const swiperRef = useRef<SwiperInstance>(null);
  const [active, setActive] = useState(() => props.startPosition);

  const onSwipeChange = (idx: number) => {
    if (active !== idx) {
      setActive(idx);
      props.onChange?.(idx);
    }
  };

  const renderImages = () => (
    <Swiper
      ref={swiperRef}
      className={classnames(bem('swipe'))}
      loop={props.loop}
      autoplayInterval={props.swipeDuration}
      defaultIndex={active}
      onIndexChange={onSwipeChange}
      indicator={props.showIndicators}
    >
      {props.images.map((image, i) => (
        <Swiper.Item className={classnames(bem('item'))} key={image}>
          <ImagePreviewItem
            maxZoom={props.maxZoom}
            image={image}
            onTap={() => {
              props.onClose?.({ url: image, index: i });
            }}
            onZoomChange={(zoom) => {
              if (zoom !== 1) {
                swiperRef.current?.lock();
              } else {
                swiperRef.current?.unlock();
              }
            }}
          />
        </Swiper.Item>
      ))}
    </Swiper>
  );

  const renderClose = () => {
    if (props.closeable) {
      return (
        <Icon
          name={props.closeIcon}
          className={classnames(bem('close-icon', props.closeIconPosition))}
          onClick={() => props.onClose?.()}
        />
      );
    }
    return null;
  };

  const renderIndex = () => {
    if (props.showIndex) {
      return (
        <div className={classnames(bem('index'))}>
          {props.indexRender
            ? props.indexRender({ index: active, len: props.images.length })
            : `${active + 1} / ${props.images.length}`}
        </div>
      );
    }
    return null;
  };

  return (
    <Popup
      className={classnames(bem(), props.className)}
      overlayClass={classnames(bem('overlay'))}
      beforeClose={props.beforeClose}
      {...pick(props, ['visible', 'overlayStyle', 'closeOnPopstate', 'onClose', 'onClosed'])}
    >
      {renderClose()}
      {renderImages()}
      {renderIndex()}
    </Popup>
  );
};

ImagePreview.defaultProps = {
  loop: true,
  overlay: true,
  showIndex: true,
  images: [],
  swipeDuration: 300,
  startPosition: 0,
  closeIcon: 'clear',
  closeIconPosition: 'top-right',
  showIndicators: false,
  maxZoom: 3,
};

export default ImagePreview;
