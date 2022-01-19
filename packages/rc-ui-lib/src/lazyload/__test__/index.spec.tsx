/* eslint-disable max-classes-per-file */
import React from 'react';
import { fireEvent, render, cleanup, waitFor } from '@testing-library/react';
import { Lazyload } from '..';
import { sleep } from '../../../tests/utils';
import { DEFAULT_URL } from '../utils';

type ImageConstructor = new (
  width?: number | undefined,
  height?: number | undefined,
) => HTMLImageElement;

describe('test Lazyload by listen event', () => {
  const originImage = global.Image;

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
  it('lazyload should render correctly by use listen event when IntersectionObserver is not available', async () => {
    const { container } = render(
      <Lazyload observer>
        <img alt="" src="https://img.yzcdn.cn/vant/apple-5.jpg" width="100%" height="300" />
      </Lazyload>,
    );
    const wrapper = container.querySelector('.rc-lazyload');
    mockRect(wrapper, {
      top: 10,
      left: 36,
      width: 300,
      height: 250,
    });
    mockRect(document.body, {
      width: 375,
      height: 400,
    });

    await sleep(1000);

    expect(container).toMatchSnapshot();
  });
  it('lazyload should render correctly when load image failed', async () => {
    global.Image = class {
      onerror: () => void;

      constructor() {
        this.onerror = jest.fn();
        setTimeout(() => {
          this.onerror();
        }, 50);
      }
    } as unknown as ImageConstructor;
    const { container, debug } = render(
      <Lazyload.Image errorImage={DEFAULT_URL} image="https://img.yzcdn.cn/vant/apple-5.jpg" />,
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
      height: 400,
    });
    await sleep(1000);
    debug();
    expect(container).toMatchSnapshot();
    global.Image = originImage;
  });
  it('LazyloadImage should render correctly when use listen event', async () => {
    const { container } = render(<Lazyload.Image image="https://img.yzcdn.cn/vant/apple-5.jpg" />);
    expect(container).toMatchSnapshot();
  });

  it('LazyloadImage should render correctly when prop type is background', async () => {
    const { container } = render(
      <Lazyload.Image type="background" image="https://img.yzcdn.cn/vant/apple-5.jpg" />,
    );

    expect(container).toMatchSnapshot();
  });

  it('LazyloadImage should emit onLoaded event when use listen event', async () => {
    global.Image = class {
      onload: () => void;

      constructor() {
        this.onload = jest.fn();
        setTimeout(() => {
          this.onload();
        }, 50);
      }
    } as unknown as ImageConstructor;
    const onLoaded = jest.fn();

    const { container } = render(
      <div>
        <Lazyload.Image onLoaded={onLoaded} image="https://img.yzcdn.cn/vant/apple-5.jpg" />
        <Lazyload.Image image="https://img.yzcdn.cn/vant/apple-4.jpg" />
        <Lazyload.Image image="https://img.yzcdn.cn/vant/apple-3.jpg" />
      </div>,
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
      height: 400,
    });

    await waitFor(() => {
      fireEvent.scroll(window, { target: { pageYOffset: 30 } });
    });

    await sleep(1000);

    expect(onLoaded).toHaveBeenCalled();
    global.Image = originImage;
  });
});

describe('test Lazyload by observer', () => {
  const nativeIntersectionObserver = global.IntersectionObserver;
  const originImage = global.Image;
  beforeEach(() => {
    // IntersectionObserver isn't available in test environment
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.IntersectionObserver = class IntersectionObserver {
      callback: any;

      constructor(callback) {
        this.callback = callback;
      }

      observe(element: HTMLElement) {
        console.log(element);
        this.callback([{ isIntersecting: true, target: element }]);
      }

      disconnect: () => void;

      unobserve: () => void;
    };

    global.Image = class {
      onload: () => void;

      constructor() {
        this.onload = jest.fn();
        setTimeout(() => {
          this.onload();
        }, 50);
      }
    } as unknown as ImageConstructor;
  });

  afterEach(() => {
    global.IntersectionObserver = nativeIntersectionObserver;
    global.Image = originImage;
    cleanup();
    jest.restoreAllMocks();
  });

  it('should render correctly when IntersectionObserver is available', async () => {
    const { container } = render(
      <Lazyload.Image image="https://img.yzcdn.cn/vant/apple-5.jpg" height="300px" />,
    );
    await sleep(500);
    expect(container).toMatchSnapshot();
  });
  it('lazyload should render correctly when IntersectionObserver is available', async () => {
    const { container } = render(
      <Lazyload>
        <img alt="" src="https://img.yzcdn.cn/vant/apple-5.jpg" width="100%" height="300" />
      </Lazyload>,
    );
    await sleep(500);
    expect(container).toMatchSnapshot();
  });

  it('should load component when set prop forceVisible', async () => {
    const { container } = render(
      <Lazyload forceVisible>
        <img alt="" src="https://img.yzcdn.cn/vant/apple-5.jpg" width="100%" height="300" />
      </Lazyload>,
    );
    expect(container).toMatchSnapshot();
  });
});
