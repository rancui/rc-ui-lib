/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, cleanup, waitFor, act } from '@testing-library/react';
import { sleep } from '../../../tests/utils';
import CountDown, { CountDownInstance, CountDownProps } from '..';

describe('CountDown test with testing library', () => {
  function createCountDown(props: CountDownProps) {
    const countDownRef = React.createRef<CountDownInstance>();

    const { queryByTestId, container, rerender, debug, baseElement } = render(
      <CountDown ref={countDownRef} {...props} />,
    );

    return {
      container,
      rerender,
      countDownRef,
      debug,
      queryByTestId,
      baseElement,
    };
  }

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('should emit finish event when finished', async () => {
    Object.defineProperty(window, 'inBrowser', { value: true });
    const onFinish = jest.fn();

    createCountDown({
      time: 1,
      onFinish,
    });

    expect(onFinish).not.toHaveBeenCalled();

    await sleep(100);

    expect(onFinish).toHaveBeenCalled();
  });

  it('should emit finish event when finished and millisecond is true', async () => {
    Object.defineProperty(window, 'inBrowser', { value: true });
    const onFinish = jest.fn();

    createCountDown({
      time: 1,
      millisecond: true,
      onFinish,
    });

    expect(onFinish).not.toHaveBeenCalled();

    await sleep(100);

    expect(onFinish).toHaveBeenCalled();
  });

  it('should re-render after some time', async () => {
    Object.defineProperty(window, 'inBrowser', { value: true });

    const { container } = createCountDown({
      time: 1000,
      format: 'SSS',
    });
    const preSnapshot = container.querySelector('.rc-count-down').innerHTML;

    await sleep(100);
    const laternapshot = container.querySelector('.rc-count-down').innerHTML;

    expect(preSnapshot).not.toEqual(laternapshot);
  });

  it('should not start counting when auto-start prop is false', async () => {
    Object.defineProperty(window, 'inBrowser', { value: true });

    const { container } = createCountDown({
      time: 100,
      format: 'SSS',
      autoStart: false,
    });

    await sleep(50);

    expect(container).toMatchSnapshot();
  });
  it('should start counting after calling the start method', async () => {
    Object.defineProperty(window, 'inBrowser', { value: true });

    const { countDownRef, container } = createCountDown({
      time: 100,
      format: 'SSS',
      autoStart: false,
      millisecond: true,
    });

    const preSnapshot = container.querySelector('.rc-count-down').innerHTML;

    await waitFor(async () => {
      countDownRef.current.start();
    });
    await sleep(50);
    const laternapshot = container.querySelector('.rc-count-down').innerHTML;

    expect(preSnapshot).not.toEqual(laternapshot);
  });
  it('should pause counting after calling the pause method', async () => {
    Object.defineProperty(window, 'inBrowser', { value: true });

    const { countDownRef, container } = createCountDown({
      time: 100,
      format: 'SSS',
      millisecond: true,
    });
    expect(container).toMatchSnapshot();

    await waitFor(async () => {
      countDownRef.current.pause();
    });

    await sleep(50);

    expect(container).toMatchSnapshot();
  });
  it('should reset time after calling the reset method', async () => {
    Object.defineProperty(window, 'inBrowser', { value: true });

    const { countDownRef, container } = createCountDown({
      time: 100,
      format: 'SSS',
      autoStart: false,
      millisecond: true,
    });
    expect(container).toMatchSnapshot();

    await waitFor(async () => {
      countDownRef.current.start();
    });

    await sleep(50);

    await waitFor(async () => {
      countDownRef.current.reset();
    });

    expect(container).toMatchSnapshot();
  });
  it('should format complete time correctly', async () => {
    Object.defineProperty(window, 'inBrowser', { value: true });

    const { container } = createCountDown({
      time: 30 * 60 * 60 * 1000 - 1,
      format: 'DD-HH-mm-ss-SSS',
      autoStart: false,
      millisecond: true,
    });

    expect(container).toMatchSnapshot();
  });
  it('should format incomplete time correctly', async () => {
    Object.defineProperty(window, 'inBrowser', { value: true });

    const { container } = createCountDown({
      time: 30 * 60 * 60 * 1000 - 1,
      format: 'HH-mm-ss-SSS',
      autoStart: false,
      millisecond: true,
    });

    expect(container).toMatchSnapshot();
  });
  it('should format SS milliseconds correctly', async () => {
    Object.defineProperty(window, 'inBrowser', { value: true });

    const { container } = createCountDown({
      time: 1500,
      format: 'ss-SS',
      autoStart: false,
      millisecond: true,
    });

    expect(container).toMatchSnapshot();
  });
  it('should format S milliseconds correctly', async () => {
    Object.defineProperty(window, 'inBrowser', { value: true });

    const { container } = createCountDown({
      time: 1500,
      format: 'ss-S',
      autoStart: false,
      millisecond: true,
    });

    expect(container).toMatchSnapshot();
  });
  it('should render correctly using renderChilden', async () => {
    Object.defineProperty(window, 'inBrowser', { value: true });

    const { container } = createCountDown({
      time: 1500,
      autoStart: false,
      renderChildren(timeData) {
        return (
          <>
            <span className="block">{timeData.hours}</span>
            <span className="colon">:</span>
            <span className="block">{timeData.minutes}</span>
            <span className="colon">:</span>
            <span className="block">{timeData.seconds}</span>
          </>
        );
      },
    });

    expect(container).toMatchSnapshot();
  });

  it('should emit change event when counting', async () => {
    Object.defineProperty(window, 'inBrowser', { value: true });
    const onChange = jest.fn();

    const { countDownRef } = createCountDown({
      time: 1,
      autoStart: false,
      onChange,
    });

    await waitFor(async () => {
      countDownRef.current.start();
    });

    await sleep(100);

    expect(onChange).toHaveBeenCalledWith({
      days: 0,
      hours: 0,
      milliseconds: 0,
      minutes: 0,
      seconds: 0,
      total: 0,
    });
  });
});
