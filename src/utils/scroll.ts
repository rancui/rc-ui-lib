import { isIOS } from './system';

type ScrollElement = Element | Window;

const isWindow = (val: unknown): val is Window => {
  return val === window;
};

export const getScrollTop = (el: ScrollElement): number => {
  const top = 'scrollTop' in el ? el.scrollTop : el.pageYOffset;

  // iOS scroll bounce cause minus scrollTop
  return Math.max(top, 0);
};

export const setScrollTop = (el: ScrollElement, value: number): void => {
  if ('scrollTop' in el) {
    // eslint-disable-next-line no-param-reassign
    el.scrollTop = value;
  } else {
    el.scrollTo(el.scrollX, value);
  }
};

export const getRootScrollTop = (): number => {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
};

export const setRootScrollTop = (value: number): void => {
  setScrollTop(window, value);
  setScrollTop(document.body, value);
};

// get distance from element top to page top or scroller top
export const getElementTop = (el: ScrollElement, scroller?: HTMLElement): number => {
  if (isWindow(el)) {
    return 0;
  }

  const scrollTop = scroller ? getScrollTop(scroller) : getRootScrollTop();
  return el.getBoundingClientRect().top + scrollTop;
};

export const getVisibleHeight = (el: ScrollElement): number => {
  if (isWindow(el)) {
    return el.innerHeight;
  }
  return el.getBoundingClientRect().height;
};

export const getVisibleTop = (el: ScrollElement): number => {
  if (isWindow(el)) {
    return 0;
  }
  return el.getBoundingClientRect().top;
};

// hack for iOS12 page scroll
// see: https://developers.weixin.qq.com/community/develop/doc/00044ae90742f8c82fb78fcae56800
export const resetScroll = (): void => {
  if (isIOS()) {
    setRootScrollTop(getRootScrollTop());
  }
};
