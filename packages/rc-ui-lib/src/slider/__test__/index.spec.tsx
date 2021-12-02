import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { mockRect } from '../../utils/dom/mock';
import Slider from '..';

describe('Slider', () => {
  let wrapper;
  afterEach(() => {
    wrapper.unmount();
    jest.restoreAllMocks();
  });

  it('shallows correctly', () => {
    wrapper = shallow(<Slider />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('min', () => {
    wrapper = shallow(<Slider min={0} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('max', () => {
    wrapper = shallow(<Slider max={100} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('step', () => {
    wrapper = shallow(<Slider step={5} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('vertical', () => {
    wrapper = shallow(<Slider vertical />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('barHeight', () => {
    wrapper = shallow(<Slider barHeight={2} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('buttonSize', () => {
    wrapper = shallow(<Slider buttonSize={20} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('activeColor', () => {
    wrapper = shallow(<Slider activeColor="#ee0a24" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('inactiveColor', () => {
    wrapper = shallow(<Slider activeColor="#e9e9e9" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('button', () => {
    wrapper = shallow(<Slider button={<div className="custom-button">button</div>} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('button is function', () => {
    wrapper = shallow(
      <Slider button={({ value }) => <div className="custom-button">{value}</div>} value={0} />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render left button and right button correctly under rang mode', () => {
    wrapper = shallow(
      <Slider
        range
        leftButton={<div className="custom-button">leftButton</div>}
        rightButton={<div className="custom-button">rightButton</div>}
        value={[20, 80]}
      />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('should emit change event under rang mode', async () => {
    mockRect(false);
    const onChange = jest.fn();
    wrapper = mount(<Slider onChange={onChange} value={[20, 80]} range />);
    const touchStartEvent = { touches: [{ clientX: 0, clientY: 0 }] } as unknown as TouchEvent;
    const touchMoveEvent = {
      touches: [{ clientX: 20, clientY: 0 }],
    } as unknown as TouchEvent;
    const button = wrapper.find('[role="slider"]').at(0);
    await button.invoke('onTouchStart')!(touchStartEvent);
    await button.invoke('onTouchMove')!(touchMoveEvent);
    expect(onChange).toHaveBeenCalledWith([40, 80]);
  });

  test('should emit change event after dragging button', async () => {
    mockRect(false);
    const onChange = jest.fn();
    wrapper = mount(<Slider onChange={onChange} value={0} />);
    const touchStartEvent = { touches: [{ clientX: 0, clientY: 0 }] } as unknown as TouchEvent;
    const touchMoveEvent = {
      touches: [{ clientX: 20, clientY: 0 }],
    } as unknown as TouchEvent;
    const button = wrapper.find('[role="slider"]');
    await button.invoke('onTouchStart')!(touchStartEvent);
    await button.invoke('onTouchMove')!(touchMoveEvent);
    expect(onChange).toHaveBeenCalledWith(20);
  });

  test('should not emit change event when using readonly prop', async () => {
    mockRect(false);
    const onChange = jest.fn();
    wrapper = mount(<Slider onChange={onChange} value={0} readonly />);
    const touchStartEvent = { touches: [{ clientX: 0, clientY: 0 }] } as unknown as TouchEvent;
    const touchMoveEvent = {
      touches: [{ clientX: 20, clientY: 0 }],
    } as unknown as TouchEvent;
    const button = wrapper.find('[role="slider"]');
    await button.invoke('onTouchStart')!(touchStartEvent);
    await button.invoke('onTouchMove')!(touchMoveEvent);
    expect(onChange).not.toHaveBeenCalled();
  });

  test('should not emit change event when using disabled prop', async () => {
    mockRect(false);
    const onChange = jest.fn();
    wrapper = mount(<Slider onChange={onChange} value={0} disabled />);
    const touchStartEvent = { touches: [{ clientX: 0, clientY: 0 }] } as unknown as TouchEvent;
    const touchMoveEvent = {
      touches: [{ clientX: 20, clientY: 0 }],
    } as unknown as TouchEvent;
    const button = wrapper.find('[role="slider"]');
    await button.invoke('onTouchStart')!(touchStartEvent);
    await button.invoke('onTouchMove')!(touchMoveEvent);
    expect(onChange).not.toHaveBeenCalled();
  });

  test('should not emit change event when using reverse prop', async () => {
    mockRect(false);
    const onChange = jest.fn();
    wrapper = mount(<Slider onChange={onChange} value={0} reverse />);
    const touchStartEvent = { touches: [{ clientX: 100, clientY: 0 }] } as unknown as TouchEvent;
    const touchMoveEvent = {
      touches: [{ clientX: 80, clientY: 0 }],
    } as unknown as TouchEvent;
    const button = wrapper.find('[role="slider"]');
    await button.invoke('onTouchStart')!(touchStartEvent);
    await button.invoke('onTouchMove')!(touchMoveEvent);
    expect(onChange).toHaveBeenCalledWith(20);
  });

  test('should emit onChangeAfter event', async () => {
    mockRect(false);
    const onChangeAfter = jest.fn();
    wrapper = mount(<Slider onChangeAfter={onChangeAfter} value={0} />);
    const touchStartEvent = { touches: [{ clientX: 0, clientY: 0 }] } as unknown as TouchEvent;
    const touchMoveEvent = {
      touches: [{ clientX: 20, clientY: 0 }],
    } as unknown as TouchEvent;
    const button = wrapper.find('[role="slider"]');
    await button.invoke('onTouchStart')!(touchStartEvent);
    await button.invoke('onTouchMove')!(touchMoveEvent);
    await button.invoke('onTouchEnd')!({} as unknown as TouchEvent);
    expect(onChangeAfter).toHaveBeenCalledWith(20);
  });

  test('should emit onDragStart event', async () => {
    mockRect(false);
    const onDragStart = jest.fn();
    wrapper = mount(<Slider onDragStart={onDragStart} value={0} />);
    const touchStartEvent = { touches: [{ clientX: 0, clientY: 0 }] } as unknown as TouchEvent;
    const touchMoveEvent = {
      touches: [{ clientX: 20, clientY: 0 }],
    } as unknown as TouchEvent;
    const button = wrapper.find('[role="slider"]');
    await button.invoke('onTouchStart')!(touchStartEvent);
    await button.invoke('onTouchMove')!(touchMoveEvent);
    expect(onDragStart).toHaveBeenCalledWith(touchMoveEvent, 0);
  });

  test('should emit onDragEnd event', async () => {
    mockRect(false);
    const onDragEnd = jest.fn();
    wrapper = mount(<Slider onDragEnd={onDragEnd} value={0} />);
    const touchStartEvent = { touches: [{ clientX: 0, clientY: 0 }] } as unknown as TouchEvent;
    const touchMoveEvent = {
      touches: [{ clientX: 20, clientY: 0 }],
    } as unknown as TouchEvent;
    const button = wrapper.find('[role="slider"]');
    await button.invoke('onTouchStart')!(touchStartEvent);
    await button.invoke('onTouchMove')!(touchMoveEvent);
    await button.invoke('onTouchEnd')!(touchMoveEvent);
    expect(onDragEnd).toHaveBeenCalledWith(touchMoveEvent, 20);
  });

  test('should emit click event after clicking vertical slider', async () => {
    mockRect(true);
    const onChangeAfter = jest.fn();
    wrapper = mount(<Slider onChangeAfter={onChangeAfter} value={0} vertical />);
    await wrapper.find('.rc-slider').simulate('click', { clientX: 0, clientY: 20 });
    expect(onChangeAfter).toHaveBeenCalledWith(20);
  });

  it('click when use min prop and rang mode ', async () => {
    mockRect(false);
    const onChangeAfter = jest.fn();
    wrapper = mount(<Slider range min={10} value={[20, 80]} onChangeAfter={onChangeAfter} />);
    await wrapper.find('.rc-slider').simulate('click', { clientX: 30, clientY: 0 });
    expect(onChangeAfter).toHaveBeenCalledWith([37, 80]);
  });

  it('click when using min prop and rang prop ', async () => {
    mockRect(true);
    const onChangeAfter = jest.fn();
    wrapper = mount(
      <Slider range min={10} value={[20, 80]} onChangeAfter={onChangeAfter} vertical />,
    );
    await wrapper.find('.rc-slider').simulate('click', { clientY: 30, clientX: 0 });
    expect(onChangeAfter).toHaveBeenCalledWith([37, 80]);
  });

  it('click when using min prop, rang prop and reverse prop', async () => {
    mockRect(true);
    const onChangeAfter = jest.fn();
    wrapper = mount(
      <Slider range min={10} value={[20, 80]} onChangeAfter={onChangeAfter} vertical reverse />,
    );
    await wrapper.find('.rc-slider').simulate('click', { clientY: 30, clientX: 0 });
    expect(onChangeAfter).toHaveBeenCalledWith([20, 73]);
  });

  it('click when using min prop and reverse prop', async () => {
    mockRect(false);
    const onChangeAfter = jest.fn();
    wrapper = mount(
      <Slider range min={10} value={[80, 20]} onChangeAfter={onChangeAfter} reverse />,
    );
    await wrapper.find('.rc-slider').simulate('click', { clientX: 30, clientY: 0 });
    expect(onChangeAfter).toHaveBeenCalledWith([73, 80]);
  });
});
