import React from 'react';
import { mount } from 'enzyme';
import { Radio } from '..';

import mountTest from '../../../tests/shared/mountTest';

describe('Radio', () => {
  mountTest(Radio);
  it('should emit "update:modelValue" event when radio icon or label is clicked', async () => {
    const onClick = jest.fn();
    const wrapper = mount(
      <Radio name="a" onClick={onClick} defaultChecked={false}>
        单选框
      </Radio>,
    );

    const icon = wrapper.find('.rc-radio__icon');
    const label = wrapper.find('.rc-radio__label');
    icon.simulate('click');
    expect(onClick).toHaveBeenCalledTimes(1);
    await wrapper.setProps({ checked: false });
    label.simulate('click');
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('should not emit "update:modelValue" event when radio icon is disabled and clicked', async () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Radio name="a" onChange={onChange} defaultChecked disabled>
        单选框
      </Radio>,
    );

    wrapper.find('.rc-radio__icon').simulate('click');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should render "rc-radio--label-disabled" class when using label-disabled prop', () => {
    const wrapper = mount(
      <Radio name="a" defaultChecked labelDisabled>
        单选框
      </Radio>,
    );
    expect(wrapper.find('.rc-radio--label-disabled')).toBeTruthy();
  });

  it('should not emit "update:modelValue" event when label is disabled and clicked', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Radio name="a" onChange={onChange} defaultChecked labelDisabled>
        单选框
      </Radio>,
    );

    const label = wrapper.find('.rc-radio__label');
    label.simulate('click');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should adjust label position when using label-position prop', () => {
    const wrapper = mount(
      <Radio name="a" defaultChecked labelPosition="left">
        单选框
      </Radio>,
    );
    expect(wrapper.find('.rc-radio__label--left')).toBeTruthy();
  });

  it('should emit click event when radio icon is clicked', async () => {
    const onClick = jest.fn();

    const wrapper = mount(
      <Radio name="a" defaultChecked onClick={onClick}>
        单选框
      </Radio>,
    );

    wrapper.simulate('click');
    expect(onClick).toHaveBeenCalled();
  });
});
