/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-console */
/* eslint-disable */
if (window.PointerEvent) {
  console.error('ERROR: patching PointerEvent is no longer necessary');
} else {
  // console.log('Setup: patching PointerEvent');
  // @ts-ignore
  window.PointerEvent = window.MouseEvent;
  // document.createEvent = null // prevents https://github.com/facebook/react/blob/master/packages/shared/invokeGuardedCallbackImpl.js
  // @ts-ignore
  window.onpointerdown = true; // prevents lib warning during tests
  // @ts-ignore
  window.ontouchstart = true; // prevents lib warning during tests
  // patching window
  const _windowAddEventListener = window.addEventListener;
  window.addEventListener = function (type, fn, options) {
    _windowAddEventListener(type.replace('pointer', 'mouse'), fn, options);
  };
  const _windowRemoveEventListener = window.removeEventListener;
  window.removeEventListener = function (type, fn, options) {
    _windowRemoveEventListener(type.replace('pointer', 'mouse'), fn, options);
  };

  // patching elements
  const _addEventListener = EventTarget.prototype.addEventListener;
  const _removeEventListener = EventTarget.prototype.removeEventListener;
  EventTarget.prototype.addEventListener = function (type, fn, options) {
    this._addEventListener = _addEventListener;
    this._addEventListener(type.replace('pointer', 'mouse'), fn, options);
  };
  EventTarget.prototype.removeEventListener = function (type, fn, options) {
    this._removeEventListener = _removeEventListener;
    this._removeEventListener(type.replace('pointer', 'mouse'), fn, options);
  };
  // @ts-ignore
  EventTarget.prototype.setPointerCapture = function (pointerId) {
    this.pointerId = pointerId;
  };
  // @ts-ignore
  EventTarget.prototype.hasPointerCapture = function (pointerId) {
    return this.pointerId === pointerId;
  };
  // @ts-ignore
  EventTarget.prototype.releasePointerCapture = function (pointerId) {
    if (this.pointerId === pointerId) this.pointerId = null;
  };
}
