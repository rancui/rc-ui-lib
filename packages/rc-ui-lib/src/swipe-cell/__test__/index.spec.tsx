/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, cleanup, waitFor, act, fireEvent } from '@testing-library/react';
import TestsEvent from '../../../tests/events';
import { sleep } from '../../../tests/utils';
import { Button, Cell } from '../..';
import SwipeCell, { SwipeCellInstance, SwipeCellProps, SwipeCellSide } from '..';

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
  leftWidth: 100,
  rightWidth: 100,
};

describe('SwipeCell test with testing library', () => {
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

    return () => {
      Element.prototype.getBoundingClientRect = originMethod;
    };
  };

  const mockOffset = (c: Element) => {
    Object.defineProperty(c, 'offsetWidth', {
      configurable: true,
      get: () => 100,
    });
  };

  function createSwipeCell(props?: Partial<SwipeCellProps>) {
    const swipeCellRef = React.createRef<SwipeCellInstance>();

    const { queryByTestId, container, rerender, debug } = render(
      <SwipeCell
        ref={swipeCellRef}
        style={swipeStyle}
        name="swipeCell"
        left={<Button square type="primary" text="选择" />}
        right={<Button square type="danger" text="删除" />}
        {...props}
      >
        <Cell title="单元格" value="内容" />
      </SwipeCell>,
    );

    return {
      container,
      rerender,
      swipeCellRef,
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

  it('should swipe to specific side after calling the open method', async () => {
    const onOpen = jest.fn();

    const { swipeCellRef, container } = createSwipeCell({
      ...$props,
      onOpen,
    });

    const open = (side: SwipeCellSide) => {
      swipeCellRef.current.open(side);
    };

    await waitFor(async () => {
      open('left');
    });

    await act(() => {
      jest.useRealTimers();
    });
    await sleep(1000);

    expect(onOpen).toHaveBeenCalledWith({
      name: 'swipeCell',
      position: 'left',
    });

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });

  it('should emit onClick event when click swipe-cell', async () => {
    const onClick = jest.fn();
    const { container } = createSwipeCell({
      ...$props,
      onClick,
    });

    const wrap = container.querySelector('.rc-swipe-cell');
    await fireEvent.click(wrap);

    expect(onClick).toHaveBeenCalledWith('cell');
  });

  it('should close after calling close method', async () => {
    const onClose = jest.fn();

    const { swipeCellRef } = createSwipeCell({
      ...$props,
      onClose,
    });

    await waitFor(async () => {
      swipeCellRef.current.open('left');
    });

    await waitFor(async () => {
      swipeCellRef.current.close('outside');
    });

    await act(() => {
      jest.useRealTimers();
    });
    await sleep(1000);

    expect(onClose).toHaveBeenCalledWith({
      name: 'swipeCell',
      position: 'outside',
    });
  });

  it('should allow to drag to show left part', async () => {
    const { container } = createSwipeCell({
      ...$props,
    });

    const track = container.querySelector('.rc-swipe-cell__wrapper');
    const leftSide = container.querySelector('.rc-swipe-cell__left');

    mockOffset(leftSide);
    await act(async () => {
      await TestsEvent.triggerDrag(track, [100, 0]);
    });

    await act(() => {
      jest.useRealTimers();
    });
    await sleep(1000);

    expect(container).toMatchSnapshot();
  });

  it('should allow to drag to show right part', async () => {
    const { container } = createSwipeCell({
      ...$props,
    });

    const track = container.querySelector('.rc-swipe-cell__wrapper');
    const rightSide = container.querySelector('.rc-swipe-cell__right');

    mockOffset(rightSide);
    await TestsEvent.triggerDrag(track, [-100, 0]);

    await act(() => {
      jest.useRealTimers();
    });
    await sleep(1000);

    expect(container).toMatchSnapshot();
  });

  it('should call beforeClose before closing', async () => {
    let position;
    let instance;
    const { container, swipeCellRef } = createSwipeCell({
      ...$props,
      // eslint-disable-next-line consistent-return
      beforeClose(params) {
        ({ position, instance } = params);
        if (position === 'right') {
          instance.close();
        } else {
          return true;
        }
      },
    });

    const track = container.querySelector('.rc-swipe-cell__wrapper');
    const rightSide = container.querySelector('.rc-swipe-cell__right');
    const leftSide = container.querySelector('.rc-swipe-cell__left');

    mockOffset(rightSide);

    await waitFor(async () => {
      swipeCellRef.current.open('right');
    });

    fireEvent.click(track);
    expect(position).toEqual('cell');

    await waitFor(async () => {
      swipeCellRef.current.open('right');
    });

    fireEvent.click(rightSide);
    expect(position).toEqual('right');

    await waitFor(async () => {
      swipeCellRef.current.open('left');
    });

    fireEvent.click(leftSide);
    expect(position).toEqual('left');
  });

  it('should reset transform after short dragging', async () => {
    const { container } = createSwipeCell();

    const track = container.querySelector('.rc-swipe-cell__wrapper');
    const leftSide = container.querySelector('.rc-swipe-cell__left');

    mockOffset(leftSide);

    await TestsEvent.triggerDrag(track, [-5, 0]);

    await act(() => {
      jest.useRealTimers();
    });
    await sleep(1000);

    expect(container).toMatchSnapshot();
  });

  it('should not allow to drag when using disabled prop', async () => {
    const { container } = createSwipeCell({
      ...$props,
      disabled: true,
    });

    const track = container.querySelector('.rc-swipe-cell__wrapper');
    const leftSide = container.querySelector('.rc-swipe-cell__left');

    mockOffset(leftSide);
    await TestsEvent.triggerDrag(track, [100, 0]);

    await act(() => {
      jest.useRealTimers();
    });
    await sleep(1000);

    expect(container).toMatchSnapshot();
  });

  it('should render correct when click content', async () => {
    const { container, swipeCellRef } = createSwipeCell({
      ...$props,
    });

    const content = container.querySelector('.rc-swipe-cell__content');

    await waitFor(async () => {
      swipeCellRef.current.open('left');
    });

    await fireEvent.click(content);

    await act(() => {
      jest.useRealTimers();
    });
    await sleep(1000);

    expect(container).toMatchSnapshot();
  });
});
