import React, { useContext, useRef, useState } from 'react';
import classnames from 'classnames';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';
import { pick } from '../utils';
import Icon from '../icon';
import Swiper from '../swiper';
import ImagePreviewItem from './ImagePreviewItem';
import { ImagePreviewProps } from './PropsType';
import Popup from '../popup';
import { SwiperInstance } from '../swiper/PropsType';

const ImagePreview: React.FC<ImagePreviewProps> = (props) => {
  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('image-preview', prefixCls);
  const [active, setActive] = useState(() => props.startPosition);
  const swiperRef = useRef<SwiperInstance>(null);

  const onSwipeChange = (idx: number) => {
    if (active !== idx) {
      setActive(idx);
      props.onChange?.(idx);
    }
  };

  const renderImages = () => (
    <Swiper
      ref={swiperRef}
      defaultIndex={active}
      loop={props.loop}
      className={classnames(bem('swipe'))}
      autoplayInterval={props.swipeDuration}
      onIndexChange={onSwipeChange}
      indicator={props.showIndicators}
    >
      {props.images.map((image, i) => (
        // eslint-disable-next-line react/no-array-index-key
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
      className={classnames(props.className, bem())}
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
};

export default ImagePreview;
