/* eslint-disable class-methods-use-this */
import { CreateObject, fireEvent, waitFor } from '@testing-library/react';

export type Dictionary<T = any> = { [key: string]: T };

export function patchCreateEvent(createEvents: CreateObject): void {
  // patching createEvent
  Object.keys(createEvents).forEach((key) => {
    if (key.indexOf('pointer') === 0) {
      const fn = createEvents[key.replace('pointer', 'mouse')];
      if (!fn) return;
      createEvents[key] = function (
        type: any,
        { pointerId = 1, pointerType = 'mouse', ...rest } = {},
      ) {
        const event = fn(type, rest);
        event.pointerId = pointerId;
        event.pointerType = pointerType;
        const eventType = event.type;
        Object.defineProperty(event, 'type', {
          get() {
            return eventType.replace('mouse', 'pointer');
          },
        });
        return event;
      };
    }
  });
}

class TestsEventStatic {
  private getTouch(el: any, x: number, y: number): Dictionary {
    return {
      target: el,
      pageX: x,
      pageY: y,
      clientX: x,
      clientY: y,
      radiusX: 2.5,
      radiusY: 2.5,
      rotationAngle: 10,
      force: 0.5,
    };
  }

  async triggerTouch(
    target: any,
    eventName: 'touchstart' | 'touchmove' | 'touchend' | 'touchcancel',
    cords: Array<[number, number]>,
  ) {
    const [touch, ...touches] = cords;

    const [x, y] = touch;

    const touchList = [this.getTouch(target, x, y)];

    // eslint-disable-next-line no-restricted-syntax
    for (const [pX, pY] of touches) {
      touchList.push(this.getTouch(target, pX, pY));
    }

    const eventData = {
      cancelable: true,
      bubbles: true,
      clientX: x,
      clientY: y,
      touches: touchList,
      targetTouches: touchList,
      changedTouches: touchList,
      timeStamp: new Date().getTime(),
    };

    await waitFor(() => {
      if (eventName === 'touchstart') {
        fireEvent.touchStart(target, eventData);
      } else if (eventName === 'touchmove') {
        fireEvent.touchMove(target, eventData);
      } else if (eventName === 'touchend') {
        fireEvent.touchEnd(target, eventData);
      } else if (eventName === 'touchcancel') {
        fireEvent.touchCancel(target, eventData);
      }
    });
  }

  async triggerDrag(target: any, pos: [number, number]) {
    const [x, y] = pos;

    await this.triggerTouch(target, 'touchstart', [[0, 0]]);
    await this.triggerTouch(target, 'touchmove', [[x / 4, y / 4]]);
    await this.triggerTouch(target, 'touchmove', [[x / 3, y / 3]]);
    await this.triggerTouch(target, 'touchmove', [[x / 2, y / 2]]);
    await this.triggerTouch(target, 'touchmove', [[x, y]]);
    await this.triggerTouch(target, 'touchend', [[x, y]]);
  }
}

const TestsEvent = new TestsEventStatic();

export default TestsEvent;
