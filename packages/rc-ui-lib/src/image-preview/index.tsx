import React, { useEffect, useState, useRef } from 'react';

import { noop } from '../utils';
import { CloseParams, ImagePreviewProps, ImagePreviewStatic } from './PropsType';

import BaseImagePreview from './ImagePreview';
import { resolveContainer } from '../utils/dom/getContainer';
import { unmount, render } from '../utils/dom/render';

const ImagePreview = BaseImagePreview as ImagePreviewStatic;

const defaultConfig: ImagePreviewProps = {
  loop: true,
  images: [],
  className: '',
  showIndex: true,
  closeable: false,
  closeIcon: 'clear',
  startPosition: 0,
  swipeDuration: 300,
  closeOnPopstate: true,
  closeIconPosition: 'top-right',
};

// 可返回用于销毁此弹窗的方法
ImagePreview.open = (props: ImagePreviewProps) => {
  const { onClose = noop, beforeClose, ...restProps } = props;

  const userContainer = resolveContainer(props.teleport);
  const container = document.createElement('div');
  userContainer.appendChild(container);
  const destroyRef = { current: noop as (p?: CloseParams) => void };

  const TempDialog = () => {
    const [visible, setVisible] = useState(false);
    const beforeCloseRef = useRef(beforeClose);
    const onCloseRef = useRef(onClose);

    useEffect(() => {
      setVisible(true);
    }, []);

    useEffect(() => {
      beforeCloseRef.current = beforeClose;
      onCloseRef.current = onClose;
    }, [beforeClose, onClose]);

    const _doClose = (p?: CloseParams) => {
      setVisible(false);
      if (onCloseRef.current) onCloseRef.current(p);
    };

    destroyRef.current = async (p?: CloseParams) => {
      if (beforeCloseRef.current) {
        const result = await beforeCloseRef.current(0);
        if (result === false) {
          return;
        }
      }
      _doClose(p);
    };

    const _afterClose = async (p) => {
      if (beforeCloseRef.current) {
        const result = await beforeCloseRef.current(0);
        if (result === false) {
          return false;
        }
      }
      _doClose(p);

      const unmountResult = unmount(container);
      if (unmountResult && container.parentNode) {
        container.parentNode.removeChild(container);
      }
      return true;
    };

    return (
      <BaseImagePreview
        {...defaultConfig}
        {...restProps}
        visible={visible}
        teleport={() => container}
        onClose={_afterClose}
        beforeClose={_afterClose}
      />
    );
  };
  render(<TempDialog />, container);

  return {
    close: (p?: CloseParams) => destroyRef.current(p),
  };
};

export default ImagePreview;
