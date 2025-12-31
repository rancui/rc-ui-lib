import React, { useEffect, useState, useRef } from 'react';

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
    closeOnClickOverlay,
    ...restProps
  } = props;

  const userContainer = resolveContainer(props.teleport);
  const container = document.createElement('div');
  userContainer.appendChild(container);
  const destroyRef = { current: noop };

  const TempDialog = () => {
    const [visible, setVisible] = useState(false);
    const [cancelLoading, setCancelLoading] = useState(false);
    const [okLoading, setOkLoading] = useState(false);
    const onCloseRef = useRef(onClose);
    const onCancelRef = useRef(onCancel);
    const onClosedRef = useRef(onClosed);

    useEffect(() => {
      setVisible(true);
    }, []);

    useEffect(() => {
      onCloseRef.current = onClose;
      onCancelRef.current = onCancel;
      onClosedRef.current = onClosed;
    }, [onClose, onCancel, onClosed]);

    destroyRef.current = () => {
      setVisible(false);
      if (onCloseRef.current) onCloseRef.current();
    };
    const _afterClose = () => {
      if (onClosedRef.current) {
        onClosedRef.current();
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
        destroyRef.current();
      } else {
        clearTimeout(i);
        setOkLoading(false);
      }
    };
    const _onCancel = async (e, clickOverlay?) => {
      if (clickOverlay) {
        if (onCancelRef.current) {
          await onCancelRef.current(e);
        }
        destroyRef.current();
        return;
      }
      const i = setTimeout(() => setCancelLoading(true));
      if ((await onCancelRef.current(e)) !== false) {
        clearTimeout(i);
        destroyRef.current();
      } else {
        clearTimeout(i);
        setCancelLoading(false);
      }
    };

    const _onClickOverlay = (event: React.MouseEvent) => {
      const shouldClose = closeOnClickOverlay !== undefined ? closeOnClickOverlay : defaultOptions.closeOnClickOverlay;
      if (shouldClose) {
        _onCancel(event, true);
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
        onClose={destroyRef.current}
        onCancel={_onCancel}
        onConfirm={_onConfirm}
        onClosed={_afterClose}
        onClickOverlay={_onClickOverlay}
        closeOnClickOverlay={closeOnClickOverlay !== undefined ? closeOnClickOverlay : defaultOptions.closeOnClickOverlay}
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
      onCancel: (e) => {
        onCancel(e);
        // Use setTimeout to ensure the promise rejection is handled after the click event
        setTimeout(() => {
          reject(new Error('Dialog cancelled'));
        }, 0);
      },
      onConfirm: (e) => {
        onConfirm(e);
        setTimeout(() => {
          resolve(true);
        }, 0);
      },
    });
  });
};

export default Dialog;
