import { ListenEvent } from '../PropsType';

/* eslint-disable prefer-rest-params */
const inBrowser = typeof window !== 'undefined';

export const DEFAULT_URL =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

// 需要监听的事件
export const DEFAULT_EVENTS: ListenEvent[] = [
  'scroll',
  'wheel',
  'resize',
  'mousewheel',
  'animationend',
  'transitionend',
  'touchmove',
];

export const hasIntersectionObserver =
  inBrowser &&
  'IntersectionObserver' in window &&
  'IntersectionObserverEntry' in window &&
  'intersectionRatio' in window.IntersectionObserverEntry.prototype;

export const modeType = {
  event: 'event',
  observer: 'observer',
};

export const call = (fn): void => fn && fn();

export function setImage(
  element: HTMLMediaElement | HTMLIFrameElement | HTMLImageElement | HTMLElement,
  imagePath: string,
): void {
  if (
    element instanceof HTMLIFrameElement ||
    element instanceof HTMLImageElement ||
    element instanceof HTMLMediaElement
  ) {
    element.src = imagePath;
  } else {
    element.style.backgroundImage = `url('${imagePath}')`;
  }
}

export function loadImage(imagePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(imagePath);
    img.onerror = (err) => reject(err);
    img.src = imagePath;
  });
}

export function addCssClassName(
  element: HTMLImageElement | HTMLElement,
  cssClassName: string,
): void {
  if (!element.className.includes(cssClassName)) {
    element.className += ` ${cssClassName}`;
  }
}

export function throttle(fn, threshold = 250, scope?) {
  let last;
  let deferTimer;
  return () => {
    // @ts-ignore
    const context = scope || this;

    const now = +new Date();
    const args = arguments;
    if (last && now < last + threshold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(() => {
        last = now;
        fn.apply(context, args);
      }, threshold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}

export function debounce(func, wait, immediate?) {
  let timeout;
  let args;
  let context;
  let timestamp;
  let result;

  const later = function later() {
    const last = +new Date() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) {
          context = null;
          args = null;
        }
      }
    }
  };

  return function debounced() {
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    context = this;
    args = arguments;
    timestamp = +new Date();

    const callNow = immediate && !timeout;
    if (!timeout) {
      timeout = setTimeout(later, wait);
    }

    if (callNow) {
      result = func.apply(context, args);
      context = null;
      args = null;
    }

    return result;
  };
}
