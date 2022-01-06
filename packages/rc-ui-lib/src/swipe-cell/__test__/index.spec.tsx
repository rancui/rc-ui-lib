/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, cleanup, waitFor, act } from '@testing-library/react';
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

  function createSwipeCell(props: Partial<SwipeCellProps>) {
    const swipeCellRef = React.createRef<SwipeCellInstance>();

    const { queryByTestId, container, rerender, debug } = render(
      <SwipeCell
        ref={swipeCellRef}
        style={swipeStyle}
        name="swipeCell"
        left={<Button square type="primary" text="选择" />}
        right={
          <>
            <Button square type="danger" text="删除" />
            <Button square type="primary" text="收藏" />
          </>
        }
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

    await sleep(100);

    expect(onOpen).toHaveBeenCalledWith({
      name: 'swipeCell',
      position: 'left',
    });

    expect(container).toMatchSnapshot();
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

    await sleep(100);

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
    mockOffset(track);
    await TestsEvent.triggerDrag(track, [100, 0]);

    expect(container).toMatchSnapshot();
  });

  it('should allow to drag to show right part', async () => {
    const { container } = createSwipeCell({
      ...$props,
    });

    const track = container.querySelector('.rc-swipe-cell__wrapper');
    mockOffset(track);
    await TestsEvent.triggerDrag(track, [-100, 0]);

    expect(container).toMatchSnapshot();
  });
});
