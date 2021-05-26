import { inBrowser } from './index';

export const isAndroid = (): boolean => {
  return inBrowser() ? /android/.test(navigator.userAgent.toLowerCase()) : false;
};

export const isIOS = (): boolean => {
  return inBrowser() ? /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) : false;
};
