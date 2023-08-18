import { useRef } from 'react';

const MIN_DISTANCE = 10;

type Direction = '' | 'vertical' | 'horizontal';

const getDirection = (x: number, y: number) => {
  if (x > y && x > MIN_DISTANCE) {
    return 'horizontal';
  }
  if (y > x && y > MIN_DISTANCE) {
    return 'vertical';
  }
  return '';
};

export function useTouch() {
  const startX = useRef<number>(0);
  const startY = useRef<number>(0);
  const deltaX = useRef<number>(0);
  const deltaY = useRef<number>(0);
  const offsetX = useRef<number>(0);
  const offsetY = useRef<number>(0);
  const direction = useRef<Direction>('');
  const isTap = useRef<boolean>(true);

  const isVertical = () => direction.current === 'vertical';
  const isHorizontal = () => direction.current === 'horizontal';

  const reset = () => {
    deltaX.current = 0;
    deltaY.current = 0;
    offsetX.current = 0;
    offsetY.current = 0;
    direction.current = '';
    isTap.current = true;
  };

  const start = ((event: TouchEvent) => {
    reset();
    startX.current = event.touches[0].clientX;
    startY.current = event.touches[0].clientY;
  }) as EventListener;

  const move = ((event: TouchEvent) => {
    const touch = event.touches[0];
    // Fix: Safari back will set clientX to negative number
    deltaX.current = touch.clientX < 0 ? 0 : touch.clientX - startX.current;
    deltaY.current = touch.clientY - startY.current;
    offsetX.current = Math.abs(deltaX.current);
    offsetY.current = Math.abs(deltaY.current);
    // lock direction when distance is greater than a certain value
    const LOCK_DIRECTION_DISTANCE = 10;
    if (
      !direction.current ||
      (offsetX.current < LOCK_DIRECTION_DISTANCE && offsetY.current < LOCK_DIRECTION_DISTANCE)
    ) {
      direction.current = getDirection(offsetX.current, offsetY.current);
    }
    const TAP_OFFSET = 5;
    if (isTap.current && (offsetX.current > TAP_OFFSET || offsetY.current > TAP_OFFSET)) {
      isTap.current = false;
    }
  }) as EventListener;

  return {
    move,
    start,
    reset,
    startX,
    startY,
    deltaX,
    deltaY,
    offsetX,
    offsetY,
    direction,
    isVertical,
    isHorizontal,
    isTap,
  };
}
