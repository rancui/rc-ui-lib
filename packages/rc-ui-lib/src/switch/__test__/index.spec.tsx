import React from 'react';
import { mount } from 'enzyme';
import { Switch } from '..';

describe('Switch', () => {
  let wrapper;
  afterEach(() => {
    wrapper.unmount();
    jest.restoreAllMocks();
  });

  it('should emit onClick event when click the switch button', async () => {
    const onClick = jest.fn();
    wrapper = mount(<Switch defaultChecked={false} onClick={onClick} />);

    wrapper.simulate('click');
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should emit change event when click the switch button', async () => {
    const onChange = jest.fn();
    const onClick = jest.fn();
    wrapper = mount(<Switch defaultChecked={false} onClick={onClick} onChange={onChange} />);
    await wrapper.simulate('click');
    expect(onChange).toHaveBeenCalledWith(true);
    await wrapper.simulate('click');
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it('should not emit change event if disabled', async () => {
    const onChange = jest.fn();
    const onClick = jest.fn();
    wrapper = mount(
      <Switch defaultChecked={false} disabled onClick={onClick} onChange={onChange} />,
    );
    await wrapper.simulate('click');
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  it('should change active color when using active-color prop', async () => {
    wrapper = mount(<Switch defaultChecked activeColor="black" />);
    expect(wrapper.getDOMNode().style.backgroundColor).toEqual('black');
    wrapper.setProps({ activeColor: 'red' });
    expect(wrapper.getDOMNode().style.backgroundColor).toEqual('red');
  });

  it('should change inactive color when using inactive-color prop', async () => {
    wrapper = mount(<Switch defaultChecked={false} inactiveColor="black" />);
    expect(wrapper.getDOMNode().style.backgroundColor).toEqual('black');
    await wrapper.setProps({ inactiveColor: 'red' });
    wrapper.update();
    expect(wrapper.getDOMNode().style.backgroundColor).toEqual('red');
  });

  it('should apply active color to loading icon', () => {
    wrapper = mount(<Switch defaultChecked loading activeColor="red" />);
    const loading = wrapper.find('.rc-switch__loading').at(0);
    expect(loading.props().color).toEqual('red');
  });

  it('should apply inactive color to loading icon', () => {
    wrapper = mount(<Switch defaultChecked={false} loading inactiveColor="red" />);
    const loading = wrapper.find('.rc-switch__loading').at(0);
    expect(loading.props().color).toEqual('red');
  });

  it('should change size when using size prop', () => {
    wrapper = mount(<Switch size={20} />);
    expect(wrapper.getDOMNode().style.fontSize).toEqual('20px');
  });
});
