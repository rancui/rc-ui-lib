/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, cleanup, waitFor, act } from '@testing-library/react';
import TestsEvent from '../../../tests/events';
import { sleep } from '../../../tests/utils';
import Swiper, { SwiperInstance, SwiperProps } from '..';

interface ElementRect {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
  x: number;
  y: number;
}

const swipeStyle = {
  width: '100px',
  height: '100px',
};

const $props = {
  loop: true,
  touchable: true,
  autoplay: false,
  initialSwipe: 0,
  allowTouchMove: true,
};

describe('Swipe test with testing library', () => {
  let eachClears: Array<() => void> = [];

  const mockGetBoundingClientRect = (rect: Partial<ElementRect>): (() => void) => {
    const originMethod = Element.prototype.getBoundingClientRect;

    Element.prototype.getBoundingClientRect = jest.fn(
      () =>
        ({
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: 0,
          height: 0,
          ...rect,
        } as any),
    );

    return function () {
      Element.prototype.getBoundingClientRect = originMethod;
    };
  };

  const mockOffset = (c: Element) => {
    Object.defineProperty(c, 'offsetHeight', {
      configurable: true,
      get: () => 100,
    });
    Object.defineProperty(c, 'offsetWidth', {
      configurable: true,
      get: () => 100,
    });
  };

  function createSwipe(props: SwiperProps) {
    const swipeRef = React.createRef<SwiperInstance>();

    const { queryByTestId, container, rerender, debug } = render(
      <Swiper ref={swipeRef} style={swipeStyle} {...props}>
        <Swiper.Item>1</Swiper.Item>
        <Swiper.Item>2</Swiper.Item>
        <Swiper.Item>3</Swiper.Item>
      </Swiper>,
    );

    return {
      container,
      rerender,
      swipeRef,
      debug,
      queryByTestId,
    };
  }

  beforeEach(() => {
    jest.useFakeTimers();

    const clear = mockGetBoundingClientRect({
      width: 100,
      height: 100,
    });

    eachClears.push(clear);
  });

  afterEach(() => {
    eachClears.forEach((clear) => clear());
    eachClears = [];

    cleanup();
    jest.restoreAllMocks();
  });

  it('should swipe to specific swipe after calling the swipeTo method', async () => {
    const onIndexChange = jest.fn();

    const { swipeRef } = createSwipe({
      ...$props,
      onIndexChange,
    });

    const swipeTo = (step: number) => {
      swipeRef.current.swipeTo(step);
    };

    await waitFor(async () => {
      swipeTo(2);
    });

    await sleep(100);

    expect(onIndexChange).toHaveBeenCalledWith(2);
  });

  it('should swipe to next swipe after calling next method', async () => {
    const onIndexChange = jest.fn();

    const { swipeRef } = createSwipe({
      ...$props,
      onIndexChange,
    });

    await waitFor(async () => {
      swipeRef.current.swipeNext();
    });

    await sleep(100);

    expect(onIndexChange).toHaveBeenCalledWith(1);
  });

  it('should not swipe to next swipe after calling unlock method', async () => {
    const onIndexChange = jest.fn();

    const { container, swipeRef } = createSwipe({
      ...$props,
      onIndexChange,
    });

    const track = container.querySelector('.rc-swiper__track');
    mockOffset(track);

    act(() => {
      swipeRef.current.lock();
    });

    await TestsEvent.triggerDrag(track, [-100, 0]);

    expect(onIndexChange).not.toHaveBeenCalled();

    act(() => {
      swipeRef.current.unlock();
    });

    await TestsEvent.triggerDrag(track, [-100, 0]);

    expect(onIndexChange).toHaveBeenCalled();
  });

  it('should swipe to prev swipe after calling prev method', async () => {
    const onIndexChange = jest.fn();
    const { swipeRef } = createSwipe({
      ...$props,
      onIndexChange,
    });

    act(() => {
      swipeRef.current.swipePrev();
    });

    await sleep(100);

    expect(onIndexChange).toHaveBeenCalledWith(2);
  });

  it('should render initial swipe correctly', async () => {
    const { container, rerender } = createSwipe({
      ...$props,
    });

    expect(container).toMatchSnapshot();

    const props2 = {
      ...$props,
      initialSwipe: 2,
    };

    rerender(
      <Swiper style={swipeStyle} {...props2}>
        <Swiper.Item>1</Swiper.Item>
        <Swiper.Item>2</Swiper.Item>
        <Swiper.Item>3</Swiper.Item>
      </Swiper>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly when prop stuckAtBoundary is true', async () => {
    const onIndexChange = jest.fn();

    const { container } = createSwipe({
      ...$props,
      loop: false,
      stuckAtBoundary: true,
      onIndexChange,
    });

    const track = container.querySelector('.rc-swiper__track');
    mockOffset(track);
    await TestsEvent.triggerDrag(track, [100, 0]);
    await sleep(100);
    expect(onIndexChange).toHaveBeenLastCalledWith(0);

    await sleep(1000);
    expect(container).toMatchSnapshot();
  });

  it('should render vertical swipe when using vertical prop', async () => {
    const onIndexChange = jest.fn();
    const { container } = createSwipe({
      ...$props,
      direction: 'vertical',
      allowTouchMove: true,
      onIndexChange,
    });

    const track = container.querySelector('.rc-swiper__track');
    mockOffset(track);

    await TestsEvent.triggerDrag(track, [0, -100]);

    await sleep(1000);
    expect(onIndexChange).not.toHaveBeenCalledWith(0);
  });

  it('should render swipe looply when using loop prop', async () => {
    const onIndexChange = jest.fn();
    const { container } = createSwipe({
      ...$props,
      loop: true,
      onIndexChange,
    });

    const track = container.querySelector('.rc-swiper__track');
    mockOffset(track);
    await TestsEvent.triggerDrag(track, [-100, 0]);
    await sleep(100);
    expect(onIndexChange).not.toHaveBeenLastCalledWith(0);
  });

  it('should autoplay when using autoplay prop', async () => {
    const onIndexChange = jest.fn();
    createSwipe({
      ...$props,
      autoplay: true,
      autoplayInterval: 80,
      onIndexChange,
    });

    // await sleep(200);
    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(onIndexChange).toHaveBeenCalled();
  });

  it('should render correctly when Swiper not child', async () => {
    const { container } = render(<Swiper style={swipeStyle} {...$props} />);

    expect(container).toMatchSnapshot();
  });

  it('should render correctly when using customer renderIndicator', async () => {
    const { container } = createSwipe({
      ...$props,
      indicator: (total, current) => (
        <div className="custom-indicator">
          {current + 1}/{total}
        </div>
      ),
    });

    expect(container).toMatchSnapshot();
  });
});
