import React from 'react';
import { mount } from 'enzyme';
import '@testing-library/jest-dom/extend-expect';
import Rate from '..';

describe('Rate', () => {
  it('should emit change event when rate icon is clicked', async () => {
    const onChange = jest.fn();
    const wrapper = mount(<Rate onChange={onChange} defaultValue={0} />);

    const item4 = wrapper.find('.rc-rate__item').at(3);
    expect(wrapper.find('i.rc-rate__icon--full').length).toBe(0);
    await item4.simulate('click');

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toEqual(4);
    expect(wrapper.find('i.rc-rate__icon--full').length).toBe(4);
  });

  it('should not emit change event when rate is not changed', () => {
    const onChange = jest.fn();
    const wrapper = mount(<Rate onChange={onChange} value={4} />);

    const item4 = wrapper.find('.rc-rate__item').at(3);
    item4.simulate('click');
    expect(onChange).not.toHaveBeenCalled();
    expect(wrapper.find('i.rc-rate__icon--full').length).toBe(4);
  });

  it('should not emit change or update:modelValue event when rate is disabled', async () => {
    const onChange = jest.fn();
    const wrapper = mount(<Rate onChange={onChange} disabled />);
    const item4 = wrapper.find('.rc-rate__item').at(3);
    item4.simulate('click');
    expect(onChange).not.toHaveBeenCalled();
    expect(wrapper.find('i.rc-rate__icon--full').length).not.toBe(4);
  });

  it('should render gutter when using gutter prop', () => {
    const wrapper = mount(<Rate gutter={10} />);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should change icon size when using size prop', () => {
    const wrapper = mount(<Rate size="2rem" />);
    wrapper.find('i.rc-rate__icon').forEach((el) => {
      expect(el.getDOMNode().style.fontSize).toEqual('2rem');
    });
  });

  it('should get decimal when using allow-half and readonly prop', () => {
    const wrapper = mount(<Rate allowHalf readonly value={2.3} />);
    const halfIcon = wrapper.find('i.rc-rate__icon--half');
    expect(halfIcon.getDOMNode().style.width).toEqual('0.3em');
  });

  it('should render correct count when using string prop', () => {
    const wrapper = mount(<Rate count={4} />);
    const icons = wrapper.find('.rc-rate__item');
    expect(icons).toHaveLength(4);
  });

  it('should emit click event correctly with allowHalf', async () => {
    const onChange = jest.fn();
    const wrapper = mount(<Rate allowHalf onChange={onChange} />);
    wrapper.find('.rc-rate__item').at(4).simulate('click', { clientX: 92 });
    expect(onChange).toHaveBeenCalledWith(5);
    wrapper.find('.rc-rate__item').at(0).simulate('click');
    expect(onChange).toHaveBeenCalledWith(0.5);
  });

  it('touchMove event', async () => {
    const onChange = jest.fn();
    const wrapper = mount(<Rate onChange={onChange} />);
    wrapper.simulate('touchstart', { touches: [{ clientX: 0, clientY: 0 }] });
    wrapper.simulate('touchmove', { touches: [{ clientX: 100, clientY: 0 }] });
    expect(onChange).toHaveBeenCalled();
  });
});
