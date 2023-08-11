import React from 'react';
import { act, cleanup, render } from '@testing-library/react';
import { RollingText, type RollingTextProps } from '..';
import { RollingTextInstance } from '../PropsType';
import { sleep } from '../../../tests/utils';

const itemWrapperClass = '.rc-rolling-text-item__box';
const animationClass = 'rc-rolling-text-item__box--animate';

describe('RollingText test', () => {
  function createRollingText(props: RollingTextProps) {
    const rollingTextRef = React.createRef<RollingTextInstance>();
    const { container, rerender, debug } = render(<RollingText ref={rollingTextRef} {...props} />);

    return {
      rollingTextRef,
      container,
      rerender,
      debug,
    };
  }

  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('should render comp', () => {
    const { container } = createRollingText({
      startNum: 0,
      targetNum: 123,
    });

    expect(container).toMatchSnapshot();
  });

  it('should render correctly when using textList prop', () => {
    const { container } = createRollingText({
      textList: ['aaaaa', 'bbbbb', 'ccccc', 'ddddd', 'eeeee', 'fffff', 'ggggg'],
      duration: 1,
    });

    expect(container).toMatchSnapshot();
  });

  test('should start rolling when auto-start prop is true', async () => {
    const { container } = createRollingText({
      startNum: 0,
      targetNum: 123,
      autoStart: true,
      stopOrder: 'rtl',
    });

    expect(container.querySelector(itemWrapperClass).classList).toContain(animationClass);
  });

  test('should not start rolling when auto-start prop is false', async () => {
    const { container } = createRollingText({
      startNum: 0,
      targetNum: 123,
      autoStart: false,
      direction: 'up',
    });

    expect(container.querySelector(itemWrapperClass).classList).not.toContain(animationClass);
  });

  test('should start rolling after calling the start method', async () => {
    const { container, rollingTextRef } = createRollingText({
      startNum: 0,
      targetNum: 123,
      autoStart: false,
    });

    act(() => {
      rollingTextRef.current.start();
    });
    await sleep();
    expect(container.querySelector(itemWrapperClass).classList).toContain(animationClass);
  });

  test('should reset the animation after calling the reset method', async () => {
    const { container, rollingTextRef } = createRollingText({
      startNum: 0,
      targetNum: 123,
      autoStart: false,
    });

    act(() => {
      rollingTextRef.current.start();
    });
    await sleep();
    expect(container.querySelector(itemWrapperClass).classList).toContain(animationClass);

    act(() => {
      rollingTextRef.current.reset();
    });
    await sleep();
    expect(container.querySelector(itemWrapperClass).classList).not.toContain(animationClass);
  });

  test('should restart rolling after calling the reset method when auto-start prop is true', async () => {
    const { container, rollingTextRef } = createRollingText({
      startNum: 0,
      targetNum: 123,
      autoStart: true,
    });

    act(() => {
      rollingTextRef.current.reset();
    });
    await sleep();
    expect(container.querySelector(itemWrapperClass).classList).not.toContain(animationClass);
    await sleep(50);
    expect(container.querySelector(itemWrapperClass).classList).toContain(animationClass);
  });
});
