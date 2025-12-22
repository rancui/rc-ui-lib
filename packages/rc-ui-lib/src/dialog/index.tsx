import React, { useEffect, useState } from 'react';

import { noop } from '../utils';
import { AlertDialogProps, DialogProps, DialogStatic } from './PropsType';

import BaseDialog from './Dialog';
import { resolveContainer } from '../utils/dom/getContainer';
import { unmount, render } from '../utils/dom/render';

const Dialog = BaseDialog as DialogStatic;

// 可返回用于销毁此弹窗的方法
Dialog.show = (props: DialogProps) => {
  const defaultOptions = {
    overlay: true,
    closeable: false,
    closeIcon: 'cross',
    lockScroll: true,
    transition: 'rc-dialog-bounce',
    showConfirmButton: true,
    showCancelButton: false,
    closeOnClickOverlay: false,
  };
  const {
    onClosed,
    onCancel = noop,
    onConfirm = noop,
    onClose = noop,
    cancelProps,
    confirmProps,
    ...restProps
  } = props;

  const userContainer = resolveContainer(props.teleport);
  const container = document.createElement('div');
  userContainer.appendChild(container);
  // 使用对象引用来存储 destroy 函数，解决闭包问题
  const destroyRef = { current: noop };

  const TempDialog = () => {
    const [visible, setVisible] = useState(false);
    const [cancelLoading, setCancelLoading] = useState(false);
    const [okLoading, setOkLoading] = useState(false);

    useEffect(() => {
      setVisible(true);
    }, []);

    const destroy = () => {
      setVisible(false);
      if (onClose) onClose();
    };

    destroyRef.current = destroy;

    const _afterClose = () => {
      if (onClosed) {
        onClosed();
      }
      const unmountResult = unmount(container);
      if (unmountResult && container.parentNode) {
        container.parentNode.removeChild(container);
      }
    };

    const _onConfirm = async (e) => {
      const i = setTimeout(() => setOkLoading(true));
      if ((await onConfirm(e)) !== false) {
        clearTimeout(i);
        destroy();
      } else {
        clearTimeout(i);
        setOkLoading(false);
      }
    };
    const _onCancel = async (e, clickOverlay?) => {
      if (clickOverlay) {
        // 点击 overlay 时，也应该调用 onCancel
        if ((await onCancel(e)) !== false) {
          destroy();
        }
        return;
      }
      const i = setTimeout(() => setCancelLoading(true));
      if ((await onCancel(e)) !== false) {
        clearTimeout(i);
        destroy();
      } else {
        clearTimeout(i);
        setCancelLoading(false);
      }
    };

    // 处理点击 overlay 的情况
    const handleClickOverlay = (e: React.MouseEvent) => {
      if (restProps.closeOnClickOverlay) {
        // 手动调用 _onCancel，而不是让 Popup 的 close() 调用 onClose
        _onCancel(e, true);
      }
    };

    return (
      <BaseDialog
        {...defaultOptions}
        {...restProps}
        visible={visible}
        teleport={() => container}
        cancelProps={{ loading: cancelLoading, ...cancelProps }}
        confirmProps={{ loading: okLoading, ...confirmProps }}
        onClose={destroy}
        onCancel={_onCancel}
        onConfirm={_onConfirm}
        onClosed={_afterClose}
        {...(restProps.closeOnClickOverlay
          ? {
              onClickOverlay: handleClickOverlay,
              closeOnClickOverlay: false,
            }
          : {})}
      />
    );
  };
  render(<TempDialog />, container);

  return () => destroyRef.current();
};

// 可使用 async/await 的方式
Dialog.alert = (props: AlertDialogProps) => {
  const { onConfirm = noop } = props;
  return new Promise((resolve) => {
    Dialog.show({
      ...props,
      onConfirm: (e) => {
        onConfirm(e);
        resolve(e);
      },
    });
  });
};

Dialog.confirm = (props: DialogProps): Promise<boolean> => {
  const { onCancel = noop, onConfirm = noop } = props;
  return new Promise((resolve, reject) => {
    Dialog.show({
      // 强制显示 OK Btn
      confirmButtonText: '确认',
      showCancelButton: true,
      ...props,
      onCancel: async (e) => {
        const result = await onCancel(e);
        // 如果 onCancel 返回 false，不关闭弹窗，也不 reject
        if (result === false) {
          return false;
        }
        // 否则 reject promise（不传递值），并返回 true 让 _onCancel 知道应该关闭弹窗
        reject();
        return true;
      },
      onConfirm: (e) => {
        onConfirm(e);
        resolve(true);
      },
    });
  });
};

export default Dialog;
