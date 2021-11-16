import { MutableRefObject, useEffect } from 'react';
import { useTouch } from './use-touch';
import { getScrollParent } from './use-scroll-parent';
import { preventDefault } from '../utils';

let totalLockCount = 0;

const BODY_LOCK_CLASS = 'rc-overflow-hidden';

export const useLockScroll = (
  rootRef: MutableRefObject<HTMLElement | undefined>,
  shouldLock: () => boolean,
): void => {
  const touch = useTouch();

  const onTouchMove = (event: TouchEvent) => {
    touch.move(event);

    const direction = touch.deltaY.current > 0 ? '10' : '01';
    const el = getScrollParent(event.target as Element, rootRef.current) as HTMLElement;
    const { scrollHeight, offsetHeight, scrollTop } = el;
    let status = '11';

    if (scrollTop === 0) {
      status = offsetHeight >= scrollHeight ? '00' : '01';
    } else if (scrollTop + offsetHeight >= scrollHeight) {
      status = '10';
    }

    if (
      status !== '11' &&
      touch.isVertical() &&
      // eslint-disable-next-line no-bitwise
      !(parseInt(status, 2) & parseInt(direction, 2))
    ) {
      preventDefault(event, true);
    }
  };

  const lock = () => {
    document.addEventListener('touchstart', touch.start);
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    if (!totalLockCount) {
      document.body.classList.add(BODY_LOCK_CLASS);
    }

    // eslint-disable-next-line no-plusplus
    totalLockCount++;
  };

  const unlock = () => {
    if (totalLockCount) {
      document.removeEventListener('touchstart', touch.start);
      document.removeEventListener('touchmove', onTouchMove);

      // eslint-disable-next-line no-plusplus
      totalLockCount--;

      if (!totalLockCount) {
        document.body.classList.remove(BODY_LOCK_CLASS);
      }
    }
  };

  const init = () => shouldLock() && lock();

  const destroy = () => shouldLock() && unlock();

  useEffect(() => {
    init();
    return () => {
      destroy();
    };
  }, []);

  useEffect(() => {
    if (shouldLock()) {
      lock();
    } else {
      unlock();
    }
  }, [shouldLock()]);
};
