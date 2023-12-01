import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import TestsDOM from '../../../tests/dom';
import TestsEvent from '../../../tests/events';
import PullRefresh from '..';

describe('PullRefresh', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render different head content in different pulling status', async () => {
    const onRefresh = jest.fn();

    const { container, rerender } = render(<PullRefresh onRefresh={onRefresh} />);

    const track = TestsDOM.mustQuerySelector(container, '.rc-pull-refresh__track');

    await act(async () => {
      // pulling
      await TestsEvent.triggerTouch(track, 'touchstart', [[0, 0]]);
      await TestsEvent.triggerTouch(track, 'touchmove', [[0, 20]]);
    });

    expect(container).toMatchSnapshot();

    // loosing
    await TestsEvent.triggerTouch(track, 'touchmove', [[0, 100]]);

    expect(container).toMatchSnapshot();

    // loading
    await TestsEvent.triggerTouch(track, 'touchend', [[0, 100]]);

    expect(container).toMatchSnapshot();

    // still loading
    await TestsEvent.triggerDrag(track, [0, 90]);

    expect(container).toMatchSnapshot();

    expect(onRefresh).toHaveBeenCalled();

    // end loading
    act(() => {
      rerender(<PullRefresh onRefresh={onRefresh} disabled />);
    });

    act(() => {
      rerender(<PullRefresh onRefresh={onRefresh} disabled={false} />);
    });

    expect(container).toMatchSnapshot();
  });

  it('should render status slots correctly', async () => {
    const onRefresh = jest.fn();

    const { container } = render(
      <PullRefresh
        onRefresh={onRefresh}
        pullingText={({ distance }) => (
          <img
            className="doge"
            alt="pulling"
            src="https://img.yzcdn.cn/vant/doge.png"
            style={{ transform: `scale(${distance / 80})` }}
          />
        )}
        loosingText={() => (
          <img alt="loosing" className="doge" src="https://img.yzcdn.cn/vant/doge.png" />
        )}
        loadingText={() => (
          <img alt="loading" className="doge" src="https://img.yzcdn.cn/vant/doge-fire.jpg" />
        )}
      />,
    );

    const track = TestsDOM.mustQuerySelector(container, '.rc-pull-refresh__track');

    // pulling
    await TestsEvent.triggerTouch(track, 'touchstart', [[0, 0]]);
    await TestsEvent.triggerTouch(track, 'touchmove', [[0, 20]]);

    expect(container).toMatchSnapshot();

    // loosing
    await TestsEvent.triggerTouch(track, 'touchmove', [[0, 100]]);

    expect(container).toMatchSnapshot();

    // loading
    await TestsEvent.triggerTouch(track, 'touchend', [[0, 100]]);

    expect(container).toMatchSnapshot();

    expect(onRefresh).toHaveBeenCalled();
  });

  it('should not emit onRefresh event after pulling a short distance', async () => {
    const onRefresh = jest.fn();

    const { container } = render(<PullRefresh onRefresh={onRefresh} />);

    const track = TestsDOM.mustQuerySelector(container, '.rc-pull-refresh__track');

    await TestsEvent.triggerDrag(track, [0, 10]);

    act(() => {
      jest.runAllTimers();
    });

    expect(onRefresh).not.toBeCalled();
  });

  it('should not trigger pull refresh when not in page top', async () => {
    const onRefresh = jest.fn();

    const { container } = render(<PullRefresh onRefresh={onRefresh} />);

    const track = TestsDOM.mustQuerySelector(container, '.rc-pull-refresh__track');

    // ignore touch event when not at page top
    await waitFor(() => {
      fireEvent.scroll(window, { target: { pageYOffset: 1 } });
    });

    await TestsEvent.triggerDrag(track, [0, 100]);
    expect(onRefresh).not.toBeCalled();

    await waitFor(() => {
      fireEvent.scroll(window, { target: { pageYOffset: 0 } });
    });

    await TestsEvent.triggerDrag(track, [0, 100]);

    act(() => {
      jest.runAllTimers();
    });
    expect(onRefresh).toBeCalled();
  });

  it('should render success text correctly', async () => {
    const onRefresh = jest.fn();

    const { container, rerender } = render(
      <PullRefresh
        successText={() => (
          <img alt="success" className="doge" src="https://img.yzcdn.cn/vant/doge.png" />
        )}
        onRefresh={onRefresh}
      />,
    );

    const track = TestsDOM.mustQuerySelector(container, '.rc-pull-refresh__track');

    await TestsEvent.triggerDrag(track, [0, 100]);

    // loading
    expect(onRefresh).toBeCalled();

    await waitFor(() =>
      rerender(
        <PullRefresh
          successText={() => (
            <img alt="success" className="doge" src="https://img.yzcdn.cn/vant/doge.png" />
          )}
          disabled={false}
          onRefresh={onRefresh}
        />,
      ),
    );

    // success
    expect(container).toMatchSnapshot();

    await TestsEvent.triggerTouch(track, 'touchend', [[0, 0]]);

    act(() => {
      jest.runAllTimers();
    });

    // normal
    expect(container).toMatchSnapshot();
  });

  it('should set height when using headHeight', async () => {
    const onRefresh = jest.fn();

    const { container } = render(<PullRefresh onRefresh={onRefresh} headHeight={100} />);

    const head = TestsDOM.mustQuerySelector<HTMLElement>(container, '.rc-pull-refresh__head');

    expect(head.style.height).toEqual('100px');
  });

  it('should render success when onRefresh error', async () => {
    const onRefresh = jest.fn().mockRejectedValue(new Error('async error'));

    const { container } = render(
      <PullRefresh
        successText={() => (
          <img alt="success" className="doge" src="https://img.yzcdn.cn/vant/doge.png" />
        )}
        onRefresh={onRefresh}
      />,
    );

    const track = TestsDOM.mustQuerySelector(container, '.rc-pull-refresh__track');

    await act(async() => {
      await TestsEvent.triggerDrag(track, [0, 100]);
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(container).toMatchSnapshot();
  });
});
