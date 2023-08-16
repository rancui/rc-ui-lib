import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { mockRect } from '../../utils/dom/mock';
import Slider from '..';

describe('Slider', () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('shallows correctly', () => {
    const { container } = render(<Slider />);
    expect(container).toMatchSnapshot();
  });

  it('min', () => {
    const { container } = render(<Slider min={0} />);
    expect(container).toMatchSnapshot();
  });

  it('max', () => {
    const { container } = render(<Slider max={100} />);
    expect(container).toMatchSnapshot();
  });

  it('step', () => {
    const { container } = render(<Slider step={5} />);
    expect(container).toMatchSnapshot();
  });

  it('vertical', () => {
    const { container } = render(<Slider vertical />);
    expect(container).toMatchSnapshot();
  });

  it('barHeight', () => {
    const { container } = render(<Slider barHeight={2} />);
    expect(container).toMatchSnapshot();
  });

  it('buttonSize', () => {
    const { container } = render(<Slider buttonSize={20} />);
    expect(container).toMatchSnapshot();
  });

  it('activeColor', () => {
    const { container } = render(<Slider activeColor="#ee0a24" />);
    expect(container).toMatchSnapshot();
  });

  it('inactiveColor', () => {
    const { container } = render(<Slider activeColor="#e9e9e9" />);
    expect(container).toMatchSnapshot();
  });

  it('button', () => {
    const { container } = render(<Slider button={<div className="custom-button">button</div>} />);
    expect(container).toMatchSnapshot();
  });

  it('button is function', () => {
    const { container } = render(
      <Slider button={({ value }) => <div className="custom-button">{value}</div>} value={0} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render left button and right button correctly under rang mode', () => {
    const { container } = render(
      <Slider
        range
        leftButton={<div className="custom-button">leftButton</div>}
        rightButton={<div className="custom-button">rightButton</div>}
        value={[20, 80]}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  test('should emit change event under rang mode', async () => {
    mockRect(false);
    const onChange = jest.fn();
    const { container } = render(<Slider onChange={onChange} value={[20, 80]} range />);
    const touchStartEvent = { touches: [{ clientX: 0, clientY: 0 }] } as unknown as TouchEvent;
    const touchMoveEvent = {
      touches: [{ clientX: 20, clientY: 0 }],
    } as unknown as TouchEvent;
    const button = container.querySelector('[role="slider"]');
    await fireEvent.touchStart(button, touchStartEvent);
    await fireEvent.touchMove(button, touchMoveEvent);
    expect(onChange).toHaveBeenCalledWith([40, 80]);
  });

  test('should emit change event after dragging button', async () => {
    mockRect(false);
    const onChange = jest.fn();
    const { container } = render(<Slider onChange={onChange} value={0} />);
    const touchStartEvent = { touches: [{ clientX: 0, clientY: 0 }] } as unknown as TouchEvent;
    const touchMoveEvent = {
      touches: [{ clientX: 20, clientY: 0 }],
    } as unknown as TouchEvent;
    const button = container.querySelector('[role="slider"]');
    await fireEvent.touchStart(button, touchStartEvent);
    await fireEvent.touchMove(button, touchMoveEvent);
    expect(onChange).toHaveBeenCalledWith(20);
  });

  test('should not emit change event when using readonly prop', async () => {
    mockRect(false);
    const onChange = jest.fn();
    const { container } = render(<Slider onChange={onChange} value={0} readonly />);
    const touchStartEvent = { touches: [{ clientX: 0, clientY: 0 }] } as unknown as TouchEvent;
    const touchMoveEvent = {
      touches: [{ clientX: 20, clientY: 0 }],
    } as unknown as TouchEvent;
    const button = container.querySelector('[role="slider"]');
    await fireEvent.touchStart(button, touchStartEvent);
    await fireEvent.touchMove(button, touchMoveEvent);
    expect(onChange).not.toHaveBeenCalled();
  });

  test('should not emit change event when using disabled prop', async () => {
    mockRect(false);
    const onChange = jest.fn();
    const { container } = render(<Slider onChange={onChange} value={0} disabled />);
    const touchStartEvent = { touches: [{ clientX: 0, clientY: 0 }] } as unknown as TouchEvent;
    const touchMoveEvent = {
      touches: [{ clientX: 20, clientY: 0 }],
    } as unknown as TouchEvent;
    const button = container.querySelector('[role="slider"]');
    await fireEvent.touchStart(button, touchStartEvent);
    await fireEvent.touchMove(button, touchMoveEvent);
    expect(onChange).not.toHaveBeenCalled();
  });

  test('should not emit change event when using reverse prop', async () => {
    mockRect(false);
    const onChange = jest.fn();
    const { container } = render(<Slider onChange={onChange} value={0} reverse />);
    const touchStartEvent = { touches: [{ clientX: 100, clientY: 0 }] } as unknown as TouchEvent;
    const touchMoveEvent = {
      touches: [{ clientX: 80, clientY: 0 }],
    } as unknown as TouchEvent;
    const button = container.querySelector('[role="slider"]');
    await fireEvent.touchStart(button, touchStartEvent);
    await fireEvent.touchMove(button, touchMoveEvent);
    expect(onChange).toHaveBeenCalledWith(20);
  });

  test('should emit onChangeAfter event', async () => {
    mockRect(false);
    const onChangeAfter = jest.fn();
    const { container } = render(<Slider onChangeAfter={onChangeAfter} value={0} />);
    const touchStartEvent = { touches: [{ clientX: 0, clientY: 0 }] } as unknown as TouchEvent;
    const touchMoveEvent = {
      touches: [{ clientX: 20, clientY: 0 }],
    } as unknown as TouchEvent;
    const button = container.querySelector('[role="slider"]');
    await fireEvent.touchStart(button, touchStartEvent);
    await fireEvent.touchMove(button, touchMoveEvent);
    await fireEvent.touchEnd(button, {} as unknown as TouchEvent);
    expect(onChangeAfter).toHaveBeenCalledWith(20);
  });

  test('should emit onDragStart event', async () => {
    mockRect(false);
    const onDragStart = jest.fn();
    const { container } = render(<Slider onDragStart={onDragStart} value={0} />);
    const touchStartEvent = { touches: [{ clientX: 0, clientY: 0 }] } as unknown as TouchEvent;
    const touchMoveEvent = {
      touches: [{ clientX: 20, clientY: 0 }],
    } as unknown as TouchEvent;
    const button = container.querySelector('[role="slider"]');
    await fireEvent.touchStart(button, touchStartEvent);
    await fireEvent.touchMove(button, touchMoveEvent);
    // expect(onDragStart).toHaveBeenCalledWith(touchMoveEvent, 0);
    expect(onDragStart).toHaveBeenCalledTimes(1);
  });

  test('should emit onDragEnd event', async () => {
    mockRect(false);
    const onDragEnd = jest.fn();
    const { container } = render(<Slider onDragEnd={onDragEnd} value={0} />);
    const touchStartEvent = { touches: [{ clientX: 0, clientY: 0 }] } as unknown as TouchEvent;
    const touchMoveEvent = {
      touches: [{ clientX: 20, clientY: 0 }],
    } as unknown as TouchEvent;
    const button = container.querySelector('[role="slider"]');
    await fireEvent.touchStart(button, touchStartEvent);
    await fireEvent.touchMove(button, touchMoveEvent);
    await fireEvent.touchEnd(button, touchMoveEvent);
    // expect(onDragEnd).toHaveBeenCalledWith(touchMoveEvent, 20);
    expect(onDragEnd).toHaveBeenCalledTimes(1);
  });

  test('should emit click event after clicking vertical slider', async () => {
    mockRect(true);
    const onChangeAfter = jest.fn();
    const { container } = render(<Slider onChangeAfter={onChangeAfter} value={0} vertical />);
    await fireEvent.click(container.querySelector('.rc-slider'), { clientX: 0, clientY: 20 });
    expect(onChangeAfter).toHaveBeenCalledWith(20);
  });

  it('click when use min prop and rang mode ', async () => {
    mockRect(false);
    const onChangeAfter = jest.fn();
    const { container } = render(
      <Slider range min={10} value={[20, 80]} onChangeAfter={onChangeAfter} />,
    );
    await fireEvent.click(container.querySelector('.rc-slider'), { clientX: 30, clientY: 0 });
    expect(onChangeAfter).toHaveBeenCalledWith([37, 80]);
  });

  it('click when using min prop and rang prop ', async () => {
    mockRect(true);
    const onChangeAfter = jest.fn();
    const { container } = render(
      <Slider range min={10} value={[20, 80]} onChangeAfter={onChangeAfter} vertical />,
    );
    await fireEvent.click(container.querySelector('.rc-slider'), { clientY: 30, clientX: 0 });
    expect(onChangeAfter).toHaveBeenCalledWith([37, 80]);
  });

  it('click when using min prop, rang prop and reverse prop', async () => {
    mockRect(true);
    const onChangeAfter = jest.fn();
    const { container } = render(
      <Slider range min={10} value={[20, 80]} onChangeAfter={onChangeAfter} vertical reverse />,
    );
    await fireEvent.click(container.querySelector('.rc-slider'), { clientY: 30, clientX: 0 });
    expect(onChangeAfter).toHaveBeenCalledWith([20, 73]);
  });

  it('click when using min prop and reverse prop', async () => {
    mockRect(false);
    const onChangeAfter = jest.fn();
    const { container } = render(
      <Slider range min={10} value={[80, 20]} onChangeAfter={onChangeAfter} reverse />,
    );
    await fireEvent.click(container.querySelector('.rc-slider'), { clientX: 30, clientY: 0 });
    expect(onChangeAfter).toHaveBeenCalledWith([73, 80]);
  });
});
