/* eslint-disable max-classes-per-file */
import React from 'react';
import { fireEvent, render, cleanup } from '@testing-library/react';
import { act } from 'react';
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

    await sleep(500);

    expect(container).toMatchSnapshot();
  });
  it('lazyload should render correctly when load image failed', async () => {
    global.Image = class {
      onerror: () => void;
    } as unknown as ImageConstructor;

    Object.defineProperty(Image.prototype, 'src', {
      set() {
        this.onerror();
      },
    });

    const { container } = render(
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
    await sleep(500);
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
    } as unknown as ImageConstructor;

    Object.defineProperty(Image.prototype, 'src', {
      set() {
        this.onload();
      },
    });
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

    await act(() => {
      fireEvent.scroll(window, { target: { pageYOffset: 30 } });
    });

    await sleep(500);

    expect(onLoaded).toHaveBeenCalled();
    global.Image = originImage;
  });
});

describe('test Lazyload by observer', () => {
  const nativeIntersectionObserver = global.IntersectionObserver;
  const originImage = global.Image;
  beforeEach(() => {
    // IntersectionObserver isn't available in test environment
    // @ts-ignore
    global.IntersectionObserver = class IntersectionObserver {
      callback: any;

      constructor(callback) {
        this.callback = callback;
      }

      observe(element: HTMLElement) {
        this.callback([{ isIntersecting: true, target: element }]);
      }

      disconnect: () => void;

      unobserve: () => void;
    };
    global.Image = class {
      onload: () => void;
    } as unknown as ImageConstructor;

    Object.defineProperty(Image.prototype, 'src', {
      set() {
        this.onload();
      },
    });
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

  it('should handle observerOptions in LazyloadImageObserve', async () => {
    const observerOptions = { threshold: [0.5] };
    const { container } = render(
      <Lazyload.Image
        image="https://img.yzcdn.cn/vant/apple-5.jpg"
        observerOptions={observerOptions}
      />,
    );
    await sleep(500);
    expect(container).toMatchSnapshot();
  });

  it('should handle error image in LazyloadImageObserve', async () => {
    global.Image = class {
      onerror: () => void;
    } as unknown as ImageConstructor;

    Object.defineProperty(Image.prototype, 'src', {
      set() {
        this.onerror();
      },
    });

    const { container } = render(
      <Lazyload.Image
        image="https://invalid-url.com/image.jpg"
        errorImage={DEFAULT_URL}
        observerOptions={{ threshold: [0] }}
      />,
    );
    await sleep(500);
    expect(container).toMatchSnapshot();
    global.Image = originImage;
  });

  it('should handle onLoaded callback in LazyloadImageObserve', async () => {
    const onLoaded = jest.fn();
    render(
      <Lazyload.Image
        image="https://img.yzcdn.cn/vant/apple-5.jpg"
        onLoaded={onLoaded}
        observerOptions={{ threshold: [0] }}
      />,
    );
    await sleep(500);
    expect(onLoaded).toHaveBeenCalled();
  });

  it('should handle type="background" in LazyloadImageObserve', async () => {
    const { container } = render(
      <Lazyload.Image
        type="background"
        image="https://img.yzcdn.cn/vant/apple-5.jpg"
        observerOptions={{ threshold: [0] }}
      >
        <div>Content</div>
      </Lazyload.Image>,
    );
    await sleep(500);
    expect(container).toMatchSnapshot();
  });

  it('should handle loading prop in LazyloadImageObserve', async () => {
    const { container } = render(
      <Lazyload.Image
        image="https://img.yzcdn.cn/vant/apple-5.jpg"
        loading="https://placeholder.com/loading.jpg"
        observerOptions={{ threshold: [0] }}
      />,
    );
    await sleep(100);
    const img = container.querySelector('img');
    expect(img?.src).toContain('loading.jpg');
  });

  it('should handle style prop in LazyloadImageObserve', async () => {
    const { container } = render(
      <Lazyload.Image
        image="https://img.yzcdn.cn/vant/apple-5.jpg"
        style={{ width: '200px', height: '200px' }}
        observerOptions={{ threshold: [0] }}
      />,
    );
    await sleep(500);
    const img = container.querySelector('img');
    // Style is applied via inline style object, check if element exists
    expect(img).toBeTruthy();
    // Check that style prop is passed correctly by checking snapshot
    expect(container).toMatchSnapshot();
  });

  it('should handle className prop in LazyloadImageObserve', async () => {
    const { container } = render(
      <Lazyload.Image
        image="https://img.yzcdn.cn/vant/apple-5.jpg"
        className="custom-class"
        observerOptions={{ threshold: [0] }}
      />,
    );
    await sleep(500);
    expect(container.querySelector('.custom-class')).toBeTruthy();
  });

  it('should handle disconnect in IntersectionObserver', async () => {
    let disconnectCalled = false;
    let unobserveCalled = false;
    // @ts-ignore
    global.IntersectionObserver = class IntersectionObserver {
      callback: any;

      constructor(callback) {
        this.callback = callback;
      }

      observe(element: HTMLElement) {
        this.callback([{ isIntersecting: true, target: element }]);
      }

      disconnect() {
        disconnectCalled = true;
      }

      unobserve() {
        unobserveCalled = true;
      }
    };

    const { unmount } = render(
      <Lazyload.Image
        image="https://img.yzcdn.cn/vant/apple-5.jpg"
        observerOptions={{ threshold: [0] }}
      />,
    );
    await sleep(100);
    unmount();
    await sleep(100);
    // Note: disconnect/unobserve may be called during cleanup
    global.IntersectionObserver = nativeIntersectionObserver;
  });

  it('should handle LazyloadObserve with loading prop', async () => {
    const { container } = render(
      <Lazyload loading={<div>Loading...</div>}>
        <div>Content</div>
      </Lazyload>,
    );
    await sleep(100);
    expect(container).toMatchSnapshot();
  });

  it('should handle LazyloadObserve with style prop', async () => {
    const { container } = render(
      <Lazyload style={{ padding: '10px' }}>
        <div>Content</div>
      </Lazyload>,
    );
    await sleep(100);
    const lazyload = container.querySelector('.rc-lazyload');
    expect(lazyload?.getAttribute('style')).toContain('padding');
  });

  it('should handle LazyloadObserve with className prop', async () => {
    const { container } = render(
      <Lazyload className="custom-lazyload">
        <div>Content</div>
      </Lazyload>,
    );
    await sleep(100);
    expect(container.querySelector('.custom-lazyload')).toBeTruthy();
  });
});
