import { fireEvent, render, waitFor } from '@testing-library/react';
import React, { useRef } from 'react';
import Sticky from '../index';
import TestContainer from './testContainer';

describe('Sticky', () => {
  Object.defineProperty(window.HTMLElement.prototype, 'clientHeight', {
    value: 640,
  });

  afterEach(async () => {
    await waitFor(() => {
      fireEvent.scroll(window, { target: { pageYOffset: 0 } });
    });
  });

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
  const mockSticky = (sticky: Element, rect?: Partial<DOMRect>) => {
    Object.defineProperty(sticky.parentNode, 'offsetParent', {
      configurable: true,
      get: () => document.body,
    });

    if (rect) {
      mockRect(sticky, rect);
    }
  };

  it('should sticky to top after scrolling', async () => {
    const onScroll = jest.fn();
    const { container } = render(
      <Sticky style={{ height: '10px' }} data-testid="sticky" onScroll={onScroll}>
        Content
      </Sticky>,
    );

    const sticky = container.querySelector('.rc-sticky');

    mockSticky(sticky, {
      top: -100,
      bottom: -90,
    });

    await waitFor(() => {
      fireEvent.scroll(window, { target: { pageYOffset: 100 } });
    });

    expect(container).toMatchSnapshot();

    expect(onScroll).toHaveBeenCalled();
  });

  it('should render container correctly ', async () => {
    const { container } = render(<TestContainer />);

    const sticky = container.querySelector('.rc-sticky');

    mockSticky(sticky, {
      top: -100,
      bottom: -90,
    });

    await waitFor(() => {
      fireEvent.scroll(window, { target: { pageYOffset: 100 } });
    });

    expect(container).toMatchSnapshot();
  });

  it('should sticky to bottom after scrolling', async () => {
    const { container } = render(
      <Sticky style={{ height: '10px' }} offsetBottom={10} position="bottom" data-testid="sticky">
        Content
      </Sticky>,
    );

    const sticky = container.querySelector('.rc-sticky');

    mockSticky(sticky, {
      top: 640,
      bottom: 650,
    });

    await waitFor(() => {
      fireEvent.scroll(window, { target: { pageYOffset: 50 } }); // 0
    });

    expect(container).toMatchSnapshot();
  });

  it('should update z-index when using z-index prop', async () => {
    const { container } = render(
      <Sticky style={{ height: '10px' }} zIndex={0} data-testid="sticky">
        Content
      </Sticky>,
    );

    const sticky = container.querySelector('.rc-sticky');

    mockSticky(sticky, {
      top: -100,
      bottom: -90,
    });

    await waitFor(() => {
      fireEvent.scroll(window, { target: { pageYOffset: 100 } });
    });

    expect(container).toMatchSnapshot();
  });

  it('should add offset top when using offset-top prop', async () => {
    const { container } = render(
      <Sticky style={{ height: '10px' }} zIndex={0} offsetTop={10} data-testid="sticky">
        Content
      </Sticky>,
    );

    const sticky = container.querySelector('.rc-sticky');

    mockSticky(sticky, {
      top: -100,
      bottom: -90,
    });

    await waitFor(() => {
      fireEvent.scroll(window, { target: { pageYOffset: 100 } });
    });

    expect(container).toMatchSnapshot();
  });

  it('should allow to using offset-top prop with rem unit', async () => {
    const originGetComputedStyle = window.getComputedStyle;

    window.getComputedStyle = () => ({ fontSize: '16px' } as any);

    const { container } = render(
      <Sticky style={{ height: '10px' }} offsetTop="2rem" data-testid="sticky">
        Content
      </Sticky>,
    );

    const sticky = container.querySelector('.rc-sticky');

    mockSticky(sticky, {
      top: -100,
      bottom: -90,
    });

    await waitFor(() => {
      fireEvent.scroll(window, { target: { pageYOffset: 100 } });
    });

    expect(container).toMatchSnapshot();
    window.getComputedStyle = originGetComputedStyle;
  });

  it('should allow to using offset-top prop with vw unit', async () => {
    (window as any).innerWidth = 300;

    const { container } = render(
      <Sticky style={{ height: '10px' }} offsetTop="10vw" data-testid="sticky">
        Content
      </Sticky>,
    );

    const sticky = container.querySelector('.rc-sticky');

    mockSticky(sticky, {
      top: -100,
      bottom: -90,
    });

    await waitFor(() => {
      fireEvent.scroll(window, { target: { pageYOffset: 100 } });
    });

    expect(container).toMatchSnapshot();
  });

  it('should not trigger scroll event when hidden', async () => {
    const onChange = jest.fn();

    const { container } = render(
      <Sticky style={{ height: '10px', display: 'none' }} data-testid="sticky" onChange={onChange}>
        Content
      </Sticky>,
    );

    const sticky = container.querySelector('.rc-sticky');

    mockSticky(sticky, {
      top: -100,
      bottom: -90,
    });

    await waitFor(() => {
      fireEvent.scroll(window, { target: { pageYOffset: 100 } });
    });

    expect(onChange).toHaveBeenCalledTimes(0);
    expect(container).toMatchSnapshot();
  });

  it('should sticky inside container bottom when using containerRef prop', async () => {
    const Demo = () => {
      const containerRef = useRef<HTMLDivElement>(null);

      return (
        <div data-testid="container" ref={containerRef} style={{ marginTop: '640px' }}>
          <div style={{ height: '150px' }} />
          <Sticky
            data-testid="sticky"
            style={{ height: '44px' }}
            container={containerRef}
            position="bottom"
          >
            Content
          </Sticky>
        </div>
      );
    };

    const { container, getByTestId } = render(<Demo />);

    const sticky = container.querySelector('.rc-sticky');
    const containerBox = getByTestId('container');

    mockSticky(sticky, {
      height: 44,
      width: 88,
      top: 690,
      bottom: 734,
    });

    mockRect(containerBox, {
      top: 540,
      bottom: 734,
    });

    await waitFor(() => {
      fireEvent.scroll(window, { target: { pageYOffset: 100 } });
    });

    expect(containerBox).toMatchSnapshot();

    mockRect(sticky, {
      height: 44,
      width: 88,
      top: 770,
      bottom: 814,
    });

    mockRect(containerBox, {
      top: 620,
      bottom: 814,
    });

    await waitFor(() => {
      fireEvent.scroll(window, { target: { pageYOffset: 20 } });
    });

    expect(containerBox).toMatchSnapshot();
  });
});
