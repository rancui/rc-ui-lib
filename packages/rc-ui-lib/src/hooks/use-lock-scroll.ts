import { useEffect, RefObject } from 'react';
import { useTouch } from './use-touch';
import { getScrollParent } from './use-scroll-parent';
import { supportsPassive } from './use-support-passive';

let totalLockCount = 0;

const BODY_LOCK_CLASS = 'rc-overflow-hidden';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useLockScroll(rootRef: RefObject<HTMLElement>, shouldLock: boolean) {
  const touch = useTouch();

  const onTouchMove = (event: TouchEvent) => {
    touch.move(event);

    const direction = touch.deltaY.current > 0 ? '10' : '01';
    const el = getScrollParent(event.target as Element, rootRef.current) as HTMLElement;
    if (!el) return;
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
      if (event.cancelable) {
        event.preventDefault();
      }
    }
  };

  const lock = () => {
    document.addEventListener('touchstart', touch.start);
    document.addEventListener(
      'touchmove',
      onTouchMove,
      supportsPassive ? { passive: false } : false,
    );

    if (!totalLockCount) {
      document.body.classList.add(BODY_LOCK_CLASS);
    }

    totalLockCount++;
  };

  const unlock = () => {
    if (totalLockCount) {
      document.removeEventListener('touchstart', touch.start);
      document.removeEventListener('touchmove', onTouchMove);

      totalLockCount--;

      if (!totalLockCount) {
        document.body.classList.remove(BODY_LOCK_CLASS);
      }
    }
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (shouldLock) {
      lock();
      return () => {
        unlock();
      };
    }
  }, [shouldLock]);
}
