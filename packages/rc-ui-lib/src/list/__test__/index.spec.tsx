import React from 'react';
import { fireEvent, render, waitFor, act } from '@testing-library/react';
import List from '..';
import Cell from '../../cell';
import { sleep } from '../../../tests/utils';

describe('List', () => {
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

  beforeEach(() => {
    // mocking the offsetParent
    Object.defineProperty(HTMLElement.prototype, 'offsetParent', {
      get() {
        return {};
      },
    });
  });
  it('should emit load event when reaching bottom', async () => {
    const onLoad = jest.fn();

    onLoad.mockResolvedValue('');

    await act(async () => {
      const { rerender } = render(<List onLoad={onLoad} />);

      await sleep(100);
      rerender(<List finished onLoad={onLoad} />);
    });

    onLoad().then(() => {
      expect(onLoad).toHaveBeenCalled();
    });
  });

  it('should render loading tip correctly and do not trigger onLoad', () => {
    const onLoad = jest.fn();
    const { container } = render(<List loading onLoad={onLoad} />);

    expect(container).toMatchSnapshot();

    expect(onLoad).not.toBeCalled();
  });

  it('should render finish tip correctly and do not trigger onLoad', () => {
    const onLoad = jest.fn();
    const { container } = render(<List finished finishedText="finished" onLoad={onLoad} />);

    expect(container).toMatchSnapshot();
    expect(onLoad).not.toBeCalled();
  });

  it('should render error slots correctly and do not trigger onLoad', async () => {
    const onLoad = jest.fn();
    const { getByText, container } = render(<List error errorText="errorTip!" />);

    expect(container).toMatchSnapshot();
    expect(onLoad).not.toBeCalled();

    const errorTextBox = getByText('errorTip!');

    act(() => {
      fireEvent.click(errorTextBox);
    });
    expect(onLoad).toHaveBeenCalledTimes(0);
  });

  it('should render correctly when set direction', async () => {
    const onLoad = jest.fn();
    const { container, rerender } = render(<List direction="up" onLoad={onLoad} />);

    await act(async () => {
      rerender(<List direction="up" loading onLoad={onLoad} />);
      await sleep(100);
      rerender(<List direction="up" onLoad={onLoad} />);
      await sleep(100);
      rerender(<List direction="up" finished onLoad={onLoad} />);
    });

    expect(container).toMatchSnapshot();

    expect(onLoad).toHaveBeenCalled();
  });

  it('should trigger load when scroll', async () => {
    Object.defineProperty(window.HTMLElement.prototype, 'clientHeight', {
      value: 640,
    });

    const onLoad = jest.fn();

    const { container, rerender } = render(
      <List onLoad={onLoad} offset={100} immediateCheck={false}>
        {new Array(30).fill(0).map((_, i) => (
          <Cell key={String(i)} title={i} />
        ))}
      </List>,
    );

    const listContainer = container.querySelector('.rc-list');
    const placeholderContainer = container.querySelector('.rc-list__placeholder');

    Object.defineProperty(listContainer, 'offsetParent', {
      configurable: true,
      get: () => document.body,
    });
    mockRect(listContainer, {
      top: 0,
      bottom: 750,
    });

    mockRect(placeholderContainer, {
      top: 600,
      bottom: 780,
    });

    expect(container).toMatchSnapshot();

    fireEvent.scroll(window, { target: { pageYOffset: 50 } });

    rerender(
      <List finished offset={100} immediateCheck={false}>
        {new Array(30).fill(0).map((_, i) => (
          <Cell key={String(i)} title={i} />
        ))}
      </List>,
    );

    await waitFor(() => {
      expect(onLoad).toHaveBeenCalled();
    });
  });
});
