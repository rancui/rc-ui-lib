import React from 'react';
import { fireEvent, render, cleanup, waitFor } from '@testing-library/react';
import { Lazyload } from '..';
import { sleep } from '../../../tests/utils';

type ImageConstructor = new (
  width?: number | undefined,
  height?: number | undefined,
) => HTMLImageElement;

describe('test Lazyload by listen event', () => {
  global.Image = class {
    onload: () => void;

    constructor() {
      this.onload = jest.fn();
      setTimeout(() => {
        this.onload();
      }, 50);
    }
  } as unknown as ImageConstructor;
  const mockRect = (el: Element, rect: Partial<DOMRect>) => {
    Object.defineProperty(el, 'getBoundingClientRect', {
      configurable: true,
      get: () => {
        return () => ({
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: 0,
          height: 0,
          ...rect,
        });
      },
    });
  };
  it('lazyload should render correctly when use listen event', async () => {
    const { container } = render(
      <Lazyload>
        <img alt="" src="https://img.yzcdn.cn/vant/apple-5.jpg" width="100%" height="300" />
      </Lazyload>,
    );
    expect(container).toMatchSnapshot();
  });
  it('lazyload should render correctly when load image failed', async () => {
    const { container } = render(
      <Lazyload>
        <img alt="" src="https://img.yzcdn.cn/vant/apple-5.jpg" width="100%" height="300" />
      </Lazyload>,
    );
    expect(container).toMatchSnapshot();
  });
  it('LazyloadImage should render correctly when use listen event', async () => {
    const { container } = render(<Lazyload.Image image="https://img.yzcdn.cn/vant/apple-5.jpg" />);
    expect(container).toMatchSnapshot();
  });

  it('LazyloadImage should emit onLoaded event when use listen event', async () => {
    const onLoaded = jest.fn();

    const { container, debug } = render(
      <Lazyload.Image onLoaded={onLoaded} image="https://img.yzcdn.cn/vant/apple-5.jpg" />,
    );
    const wrapper = container.querySelector('.rc-lazyload-image');

    mockRect(wrapper, {
      top: 10,
      left: 36,
      width: 300,
      height: 250,
    });
    mockRect(document.body, {
      width: 375,
      height: 800,
    });

    await waitFor(() => {
      fireEvent.scroll(window, { target: { pageYOffset: 30 } });
    });

    await sleep(1000);

    expect(onLoaded).toHaveBeenCalled();
  });
});
describe('test Lazyload by observer', () => {
  beforeEach(() => {
    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = jest.fn();
    const observe = jest.fn();
    const unobserve = jest.fn();
    const disconnect = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe,
      unobserve,
      disconnect,
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('should render correctly when IntersectionObserver is available', async () => {
    const { container } = render(
      <Lazyload.Image image="https://img.yzcdn.cn/vant/apple-5.jpg" height="300px" />,
    );
    expect(container).toMatchSnapshot();
  });
  it('lazyload should render correctly when IntersectionObserver is available', async () => {
    const { container } = render(
      <Lazyload>
        <img alt="" src="https://img.yzcdn.cn/vant/apple-5.jpg" width="100%" height="300" />
      </Lazyload>,
    );
    expect(container).toMatchSnapshot();
  });
});
