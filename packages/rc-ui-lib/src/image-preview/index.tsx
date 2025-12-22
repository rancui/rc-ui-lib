import React, { useEffect, useState } from 'react';

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
  // 使用对象引用来存储 destroy 函数，解决闭包问题
  const destroyRef = { current: noop as (p?: CloseParams) => void };

  const TempDialog = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      setVisible(true);
    }, []);

    const destroy = (p?: CloseParams) => {
      setVisible(false);
      if (onClose) onClose(p);
    };

    destroyRef.current = destroy;

    const _afterClose = async (action: string | number) => {
      const result = await beforeClose?.(action);
      if (result !== false) {
        destroy();

        const unmountResult = unmount(container);
        if (unmountResult && container.parentNode) {
          container.parentNode.removeChild(container);
        }
        return true;
      }
      return false;
    };

    return (
      <BaseImagePreview
        {...defaultConfig}
        {...restProps}
        visible={visible}
        teleport={() => container}
        onClose={destroy}
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
