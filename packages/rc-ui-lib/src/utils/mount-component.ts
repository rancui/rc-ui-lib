/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createElement, useRef, useEffect } from 'react';
import { render, unmount } from './dom/render';

export function mountComponent(RootComponent, callback) {
  const root = document.createElement('div');

  const Container = () => {
    const ref = useRef(null);
    useEffect(() => {
      const { open, toggle, clear, ...rest } = ref.current;
      callback({
        open,
        toggle,
        clear,
        unmount() {
          unmount(root);
          if (root.parentNode) {
            root.parentNode.removeChild(root);
          }
        },
        ...rest,
      });
    }, [ref.current]);

    return createElement(RootComponent, { ref });
  };

  const app = createElement(Container);
  document.body.appendChild(root);

  render(app, root);
}
