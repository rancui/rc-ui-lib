import React from 'react';
import { BaseTypeProps } from '../utils';

export declare type ListenEvent =
  | 'scroll'
  | 'wheel'
  | 'mousewheel'
  | 'resize'
  | 'animationend'
  | 'transitionend'
  | 'touchmove';

export type IntersectionObserverEntryType = IntersectionObserverEntry & {
  isIntersecting: boolean;
};

export type ObserverOptions = {
  root?: Element;
  rootMargin?: string;
  threshold?: number | number[];
};

export type EventOptions = {
  scrollContainer?: HTMLElement;
  offset?: number;
  listenEvents?: ListenEvent[];
  debounce?: number;
  throttle?: number;
};

export type LazyLoadImageType = 'image' | 'background';

interface CommonProps extends BaseTypeProps {
  /**
   * 是否使用 IntersectionObserver
   * 默认为 `true`，不支持时自动转为event
   */
  observer?: boolean;
  forceVisible?: boolean;
  eventOptions?: EventOptions;
  observerOptions?: ObserverOptions;
}

// 主组件的props
export type LazyloadProps = {
  children?: React.ReactNode;
  /** 加载时的组件 */
  loading?: React.ReactNode;
  /** 占位高度 */
  height?: string | number;
} & CommonProps;

export type ImageProps = BaseTypeProps & {
  image: string;
  loading?: string;
  type?: LazyLoadImageType;
  errorImage?: string;
  onLoaded?: () => void;
} & CommonProps;

export type LazyloadImageProps = (
  | React.HTMLAttributes<HTMLImageElement>
  | React.HTMLAttributes<HTMLDivElement>
) &
  ImageProps & {
    height?: number | string;
    width?: number | string;
  };

export type LazyloadEventProps = {
  children?: React.ReactNode;
  loading?: React.ReactNode;
  height?: string | number;
} & BaseTypeProps &
  EventOptions;
