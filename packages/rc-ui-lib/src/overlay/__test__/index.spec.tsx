import React from 'react';
import { mount } from 'enzyme';
import { Overlay } from '..';

describe('Overlay', () => {
  it('should change z-index when using z-index prop', () => {
    const wrapper = mount(<Overlay visible zIndex={99} />);
    const overlay = wrapper.find('.rc-overlay');
    expect(overlay.getDOMNode().style.zIndex).toEqual('99');
  });

  it('should allow to custom class name with class-name prop', () => {
    const wrapper = mount(<Overlay visible className="foo" />);
    const overlay = wrapper.find('.rc-overlay');
    expect(overlay.contains('foo'));
  });

  it('should allow to custom style with custom-style prop', () => {
    const wrapper = mount(<Overlay visible customStyle={{ backgroundColor: 'red' }} />);
    const overlay = wrapper.find('.rc-overlay');
    expect(overlay.getDOMNode().style.backgroundColor).toEqual('red');
  });

  it('should change animation duration when using duration prop', () => {
    const wrapper = mount(<Overlay visible duration={100} />);
    const overlay = wrapper.find('.rc-overlay');
    expect(overlay.getDOMNode().style.animationDuration).toEqual('100ms');
  });

  it('should render default slot correctly', () => {
    const wrapper = mount(<Overlay>Custom Default</Overlay>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should allow to touchmove when lock-scroll is false', async () => {
    const onTouchMove = jest.fn();
    const wrapper = mount(
      <div onTouchMove={onTouchMove}>
        <Overlay visible lockScroll={false} />
      </div>,
    );

    const overlay = wrapper.find('.rc-overlay');
    overlay.simulate('touchmove');
    expect(onTouchMove).toHaveBeenCalledTimes(1);
  });

  it('should not allow to touchmove when lock-scroll is true', async () => {
    const onTouchMove = jest.fn();
    const wrapper = mount(
      <div onTouchMove={onTouchMove}>
        <Overlay visible lockScroll />
      </div>,
    );

    const overlay = wrapper.find('.rc-overlay');
    overlay.simulate('touchmove');
    expect(onTouchMove).toHaveBeenCalledTimes(0);
  });
});
