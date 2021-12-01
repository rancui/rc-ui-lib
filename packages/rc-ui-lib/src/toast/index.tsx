import React, { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { extend, isObject } from '../utils';
import { resolveContainer } from '../utils/dom/getContainer';
import { lockClick } from './lock-click';
import { ToastProps, ToastInstance, ToastReturnType, ToastType } from './PropsType';
import BaseToast from './Toast';

const defaultOptions: ToastProps = {
  icon: '',
  message: '',
  className: '',
  type: 'info',
  position: 'middle',
  forbidClick: false,
  duration: 2000,
  teleport: () => document.body,
};

const toastQueue: (() => void)[] = [];

let allowMultiple = false;

let currentOptions = extend({}, defaultOptions);
// default options of specific type
const defaultOptionsMap = new Map<string, ToastProps>();

function parseOptions(message) {
  if (isObject(message)) {
    return message;
  }
  return { message };
}

const syncClear = () => {
  let fn = toastQueue.pop();
  while (fn) {
    fn();
    fn = toastQueue.pop();
  }
};

// 针对 toast 还没弹出来就立刻销毁的情况，将销毁放到下一个 event loop 中，避免销毁失败。
const nextTickClear = () => {
  setTimeout(syncClear);
};

const Toast = (toastProps?: string | ToastProps): unknown => {
  const props = parseOptions(toastProps);
  const instance: ToastReturnType = {
    config: () => {},
    clear: () => null,
  };
  let timer = 0;
  // const { onClose, teleport } = props;
  const container = document.createElement('div');
  container.className = 'toast-contanier';
  const bodyContainer = resolveContainer(props.teleport);
  bodyContainer.appendChild(container);

  const TempToast = () => {
    const options = {
      duration: 2000,
      ...props,
    } as ToastProps;
    const [visible, setVisible] = useState(false);
    const [state, setState] = useState<ToastProps>({ ...options });

    const unmountComponent = useCallback(() => {
      if (state.forbidClick) {
        lockClick(false);
      }
      const unmountResult = ReactDOM.unmountComponentAtNode(container);
      if (unmountResult && container.parentNode) {
        container.parentNode.removeChild(container);
      }
    }, [container]);

    const handleClose = useCallback(() => {
      setVisible(false);
      props.onClose?.();
    }, []);

    instance.clear = unmountComponent;

    instance.config = useCallback(
      (nextState) => {
        setState((prev) =>
          typeof nextState === 'function'
            ? { ...prev, ...nextState(prev) }
            : { ...prev, ...nextState },
        );
      },
      [setState],
    );

    useEffect(() => {
      setVisible(true);
      if (!allowMultiple) syncClear();
      toastQueue.push(unmountComponent);
      if (state.duration !== 0 && 'duration' in state) {
        timer = window.setTimeout(handleClose, +state.duration);
      }
      return () => {
        if (timer !== 0) {
          window.clearTimeout(timer);
        }
      };
    }, []);

    return (
      <BaseToast
        {...state}
        visible={visible}
        teleport={() => container}
        onClose={handleClose}
        onClosed={unmountComponent}
      />
    );
  };

  ReactDOM.render(<TempToast />, container);

  return instance;
};

const createMethod = (type: ToastType) => (options: string | ToastProps) => {
  Toast(extend({}, currentOptions, defaultOptionsMap.get(type), parseOptions(options), { type }));
};

['info', 'loading', 'success', 'fail'].forEach((method) => {
  Toast[method] = createMethod(method as ToastType);
});

Toast.allowMultiple = (value = true) => {
  allowMultiple = value;
};

Toast.clear = nextTickClear;

const setDefaultOptions = (type: ToastType | ToastProps, options?: ToastProps) => {
  if (typeof type === 'string') {
    defaultOptionsMap.set(type, options);
  } else {
    extend(currentOptions, type);
  }
};

Toast.setDefaultOptions = setDefaultOptions;

Toast.resetDefaultOptions = (type?: ToastType) => {
  if (typeof type === 'string') {
    defaultOptionsMap.delete(type);
  } else {
    currentOptions = extend({}, defaultOptions);
    defaultOptionsMap.clear();
  }
};

export default Toast as ToastInstance;
export type { ToastType, ToastPosition, ToastOptions } from './PropsType';
