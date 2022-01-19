import { useEffect, useRef, useState } from 'react';
import { debounce as debounceFunc, DEFAULT_EVENTS, throttle as throttleFunc } from '.';
import { EventOptions } from '../PropsType';

// try to handle passive events
let passiveEventSupported = false;
try {
  const opts = Object.defineProperty({}, 'passive', {
    get() {
      passiveEventSupported = true;
    },
  });
  window.addEventListener('test', null, opts);
  // eslint-disable-next-line no-empty
} catch (e) {}

const passiveEvent = passiveEventSupported ? { capture: false, passive: true } : false;

const useEventVisible = (
  eventOptions: EventOptions,
): [React.MutableRefObject<HTMLDivElement | HTMLImageElement>, boolean] => {
  const {
    listenEvents = DEFAULT_EVENTS,
    offset,
    scrollContainer,
    debounce,
    throttle,
  } = eventOptions;
  // 是否可见
  const [visible, setVisible] = useState(false);
  // // 包裹容器
  const containerRef = useRef<HTMLDivElement | HTMLImageElement>(null);

  useEffect(() => {
    // 检查函数
    let checkVisible = () => {
      // 如果容器不存在则不计算
      if (!containerRef.current) return;
      // 获取当前组件位置
      const { top, left, width, height } = containerRef.current?.getBoundingClientRect();
      // 获取滚动容器位置
      const {
        top: parentTop,
        left: parentLeft,
        width: parentWidth,
        height: parentHeight,
      } = scrollContainer.getBoundingClientRect();
      // 计算屏幕高度和宽度
      const windowInnerHeight = window.innerHeight || document.documentElement.clientHeight;
      const windowInnerWidth = window.innerWidth || document.documentElement.clientWidth;
      // 计算滚动容器和屏幕可视区的相交区域
      const intersectionTop = Math.min(parentTop, 0);
      const intersectionLeft = Math.min(parentLeft, 0);

      const intersectionHeight =
        Math.min(windowInnerHeight, parentTop + parentHeight) - intersectionTop;
      const intersectionWidth =
        Math.min(windowInnerWidth, parentLeft + parentWidth) - intersectionLeft;
      // 计算组件距离可视区的高度
      const offsetTop = top - intersectionTop;
      const offsetLeft = left - intersectionLeft;
      // 偏移量计算[top, left]
      const offsets = Array.isArray(offset) ? offset : [offset, offset];
      // 通过上述距离判断组件是否在可见区域
      const isVisible =
        offsetTop - offsets[0] <= intersectionHeight &&
        offsetTop + height + offsets[0] >= 0 &&
        offsetLeft - offsets[1] <= intersectionWidth &&
        offsetLeft + width + offsets[1] >= 0;

      setVisible(isVisible);
      // 如果可见取消当前组件的所有的监听
      if (isVisible) {
        listenEvents.forEach((event) => {
          scrollContainer?.removeEventListener(event, checkVisible);
        });
      }
    };

    // 使用防抖节流增强checkVisible函数，这里优先防抖，其次节流
    if (debounce) {
      // 防抖函数
      checkVisible = debounceFunc(checkVisible, debounce);
    } else if (throttle) {
      // 节流函数
      checkVisible = throttleFunc(checkVisible, throttle);
    }
    // 批量监听事件
    listenEvents.forEach((event) => {
      scrollContainer?.addEventListener(event, checkVisible, passiveEvent);
    });

    // 自动执行一次
    checkVisible();

    return () => {
      listenEvents.forEach((event) => {
        scrollContainer?.removeEventListener(event, checkVisible, passiveEvent);
      });
    };
  }, [scrollContainer]);
  return [containerRef, visible];
};

export default useEventVisible;
