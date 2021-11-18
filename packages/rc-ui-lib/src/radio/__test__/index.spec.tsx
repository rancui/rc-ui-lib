import React from 'react';
import { mount, shallow } from 'enzyme';
import Icon from '../../icon';
import Checker from '../../checkbox/Checker';
import { Radio } from '..';

describe('Radio', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

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

  it('should render Radio.Group correctly when using defaultValue prop', async () => {
    const wrapper = mount(
      <Radio.Group defaultValue="1">
        <Radio name="1">单选框 1</Radio>
        <Radio name="2">单选框 2</Radio>
      </Radio.Group>,
    );

    expect(wrapper.find(Checker).at(0).props().checked).toBeTruthy();
  });

  it('should render Radio.Group correctly when using direction prop', async () => {
    const wrapper = mount(
      <div>
        <Radio.Group direction="horizontal" />
      </div>,
    );
    expect(wrapper.find('.rc-radio-group--horizontal').exists()).toBeTruthy();
  });

  it('should render Radio.Group correctly when using disabled prop', async () => {
    const onClick = jest.fn();
    const onChange = jest.fn();
    const wrapper = shallow(
      <Radio.Group defaultValue="1" disabled onChange={onChange}>
        <Radio name="1">单选框 1</Radio>
        <Radio name="2" onClick={onClick}>
          单选框 2
        </Radio>
      </Radio.Group>,
    );

    wrapper.find(Radio).at(1).simulate('click');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should render Radio.Group correctly when using iconSize prop', async () => {
    const wrapper = mount(
      <Radio.Group defaultValue="1" iconSize="30">
        <Radio name="1">单选框 1</Radio>
        <Radio name="2">单选框 2</Radio>
      </Radio.Group>,
    );
    wrapper.find('.rc-radio__icon').forEach((element) => {
      expect(element.props().style.fontSize).toEqual('30px');
    });
  });

  it('should render Radio.Group correctly when using checkedColor prop', async () => {
    const wrapper = mount(
      <Radio.Group defaultValue="1" checkedColor="red">
        <Radio name="1">单选框 1</Radio>
        <Radio name="2">单选框 2</Radio>
      </Radio.Group>,
    );
    expect(wrapper.find(Icon).at(0).props().style.backgroundColor).toEqual('red');
    await wrapper.find(Icon).at(1).simulate('click');
    expect(wrapper.find(Icon).at(0).props().style.backgroundColor).toBeFalsy();
  });

  it('should emit onChange event in Radio.Group', async () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Radio.Group defaultValue="1" onChange={onChange}>
        <Radio name="1">单选框 1</Radio>
        <Radio name="2">单选框 2</Radio>
      </Radio.Group>,
    );
    await wrapper.find(Icon).at(1).simulate('click');
    expect(onChange).toHaveBeenCalledWith('2');
  });
});
