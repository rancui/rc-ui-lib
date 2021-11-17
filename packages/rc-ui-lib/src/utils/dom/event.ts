import { MouseEvent, TouchEvent } from 'react';

export const stopPropagation = (event: TouchEvent | MouseEvent | Event): void =>
  event.stopPropagation();

export function preventDefault(
  event: TouchEvent | MouseEvent | Event,
  isStopPropagation?: boolean,
): void {
  /* istanbul ignore else */
  if (typeof event.cancelable !== 'boolean' || event.cancelable) {
    event.preventDefault();
  }

  if (isStopPropagation) {
    stopPropagation(event);
  }
}
