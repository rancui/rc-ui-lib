import { render, cleanup, fireEvent } from '@testing-library/react';
import React from 'react';
import { sleep } from '../../../tests/utils';
import TestsEvent from '../../../tests/events';
import { mockGetBoundingClientRect } from '../../utils/dom/mock';
import FloatingBubble from '../FloatingBubble';

describe('FloatingBubble', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'inBrowser', { value: true });
  });
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });
  it('should render correctly when icon set', async () => {
    const restore = mockGetBoundingClientRect({ width: 48, height: 48 });
    const root = document.createElement('div');
    const { container } = render(<FloatingBubble icon="chat-o" teleport={root} />);
    await sleep(10);
    const floatingBubbleEl = root.querySelector<HTMLDivElement>('.rc-floating-bubble')!;
    expect(floatingBubbleEl.style.transform).toEqual(
      `translate3d(${window.innerWidth - 48 - 24}px, ${window.innerHeight - 48 - 24}px, 0)`,
    );
    expect(floatingBubbleEl.querySelector('.van-icon-chat-o')).not.toBeNull();
    expect(container).toMatchSnapshot();
    restore();
  });
  it('should render correctly when offset set', async () => {
    const restore = mockGetBoundingClientRect({ width: 48, height: 48 });
    const root = document.createElement('div');
    render(<FloatingBubble icon="chat-o" teleport={root} offset={{ x: 100, y: 100 }} />);
    const floatingBubbleEl = root.querySelector<HTMLDivElement>('.rc-floating-bubble')!;
    await sleep(10);

    expect(floatingBubbleEl.style.transform).toEqual(`translate3d(${100}px, ${100}px, 0)`);

    await TestsEvent.triggerDrag(floatingBubbleEl, [24, 1000]);
    expect(floatingBubbleEl.style.transform).toEqual(
      `translate3d(${100}px, ${window.innerHeight - 48 - 24}px, 0)`,
    );
    restore();
  });
  it('should only y axis direction move when axis is default', async () => {
    const restore = mockGetBoundingClientRect({ width: 48, height: 48 });
    const root = document.createElement('div');
    render(<FloatingBubble icon="chat-o" teleport={root} />);
    const floatingBubbleEl = root.querySelector<HTMLDivElement>('.rc-floating-bubble')!;
    await TestsEvent.triggerDrag(floatingBubbleEl, [-100, -100]);
    expect(floatingBubbleEl.style.transform).toEqual(
      `translate3d(${window.innerWidth - 48 - 24}px, 24px, 0)`,
    );
    restore();
  });
  it('should only x axis direction move when axis is x', async () => {
    const restore = mockGetBoundingClientRect({ width: 48, height: 48 });
    const root = document.createElement('div');
    render(<FloatingBubble icon="chat-o" axis="x" teleport={root} />);
    const floatingBubbleEl = root.querySelector<HTMLDivElement>('.rc-floating-bubble')!;
    await TestsEvent.triggerDrag(floatingBubbleEl, [2000, -100]);
    expect(floatingBubbleEl.style.transform).toEqual(
      `translate3d(${window.innerWidth - 24}px, ${window.innerHeight - 48 - 24}px, 0)`,
    );
    restore();
  });
  it('should free direction move when axis is "xy"', async () => {
    const restore = mockGetBoundingClientRect({ width: 48, height: 48 });
    const root = document.createElement('div');
    render(<FloatingBubble icon="chat-o" axis="xy" teleport={root} />);
    const floatingBubbleEl = root.querySelector<HTMLDivElement>('.rc-floating-bubble')!;
    await TestsEvent.triggerDrag(floatingBubbleEl, [-1000, 24]);
    expect(floatingBubbleEl.style.transform).toEqual(
      `translate3d(${window.innerWidth - 48 - 24}px, ${window.innerHeight - 48 - 24}px, 0)`,
    );
    restore();
  });
  it('should magnetic to x axios when magnetic is "x" ', async () => {
    const restore = mockGetBoundingClientRect({ width: 48, height: 48 });
    const root = document.createElement('div');
    render(<FloatingBubble icon="chat-o" axis="xy" magnetic="x" teleport={root} />);
    const floatingBubbleEl = root.querySelector<HTMLDivElement>('.rc-floating-bubble')!;
    await TestsEvent.triggerDrag(floatingBubbleEl, [100, 100]);
    await sleep(100);
    expect(floatingBubbleEl.style.transform).toEqual(`translate3d(24px, 100px, 0)`);
    restore();
  });
  it('should magnetic to y axios when magnetic is "y" ', async () => {
    const restore = mockGetBoundingClientRect({ width: 48, height: 48 });
    const root = document.createElement('div');
    render(<FloatingBubble icon="chat-o" axis="xy" magnetic="y" teleport={root} />);
    const floatingBubbleEl = root.querySelector<HTMLDivElement>('.rc-floating-bubble')!;
    await TestsEvent.triggerDrag(floatingBubbleEl, [100, 100]);
    await sleep(100);
    expect(floatingBubbleEl.style.transform).toEqual(`translate3d(100px, 24px, 0)`);
    restore();
  });
  it('should emit click when click wrapper', async () => {
    const onClick = jest.fn();
    const root = document.createElement('div');
    render(
      <FloatingBubble icon="chat-o" axis="xy" magnetic="y" teleport={root} onClick={onClick} />,
    );
    const floatingBubbleEl = root.querySelector<HTMLDivElement>('.rc-floating-bubble')!;
    await fireEvent.click(floatingBubbleEl);
    expect(onClick).toHaveBeenCalled();
  });
  it('should offsetchange when touchend', async () => {
    const onClick = jest.fn();
    const onOffsetChange = jest.fn();
    const restore = mockGetBoundingClientRect({ width: 48, height: 48 });
    const root = document.createElement('div');
    render(
      <FloatingBubble
        icon="chat-o"
        axis="xy"
        magnetic="y"
        teleport={root}
        onClick={onClick}
        onOffsetChange={onOffsetChange}
      />,
    );
    const floatingBubbleEl = root.querySelector<HTMLDivElement>('.rc-floating-bubble')!;

    await TestsEvent.triggerDrag(floatingBubbleEl, [10, 10]);
    expect(onClick).not.toHaveBeenCalled();
    await sleep(10);
    expect(onOffsetChange).toHaveBeenCalled();
    restore();
  });
  it('should lock drag when axis is "lock"', async () => {
    const restore = mockGetBoundingClientRect({ width: 48, height: 48 });
    const root = document.createElement('div');
    render(<FloatingBubble icon="chat-o" axis="lock" magnetic="y" teleport={root} />);
    const floatingBubbleEl = root.querySelector<HTMLDivElement>('.rc-floating-bubble')!;
    await TestsEvent.triggerDrag(floatingBubbleEl, [0, 0]);
    expect(floatingBubbleEl.style.transform).toEqual(
      `translate3d(${window.innerWidth - 48 - 24}px, ${window.innerHeight - 48 - 24}px, 0)`,
    );
    restore();
  });
  it('should not move when drag distance belove TAP_OFFSET"', async () => {
    const restore = mockGetBoundingClientRect({ width: 48, height: 48 });
    const root = document.createElement('div');
    render(<FloatingBubble icon="chat-o" axis="x" magnetic="y" teleport={root} />);
    const floatingBubbleEl = root.querySelector<HTMLDivElement>('.rc-floating-bubble')!;
    await TestsEvent.triggerDrag(floatingBubbleEl, [4, 4]);
    expect(floatingBubbleEl.style.transform).toEqual(
      `translate3d(${window.innerWidth - 48 - 24}px, ${window.innerHeight - 48 - 24}px, 0)`,
    );
    restore();
  });

  it('should teleport body when default', async () => {
    const { container } = render(<FloatingBubble icon="chat-o" axis="xy" magnetic="y" />);
    expect(container.parentNode).toEqual(document.body);
    expect(container).toMatchSnapshot();
  });
});
