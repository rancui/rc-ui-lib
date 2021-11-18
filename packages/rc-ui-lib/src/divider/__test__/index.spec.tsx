import * as React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Divider from '..';

describe('Divider', () => {
  let wrapper;
  afterEach(() => {
    wrapper.unmount();
  });

  it('should render correctly', async () => {
    wrapper = mount(<Divider />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render correctly when have children', async () => {
    wrapper = mount(<Divider>text</Divider>);
    expect(wrapper.find('.rc-divider--content-center').text()).toEqual('text');
  });

  it('should render correctly when contentPosition is set for left', async () => {
    wrapper = mount(<Divider contentPosition="left">text</Divider>);
    expect(wrapper.find('.rc-divider--content-left').text()).toEqual('text');
  });

  it('should render correctly when contentPosition is set for right', async () => {
    wrapper = mount(<Divider contentPosition="right">text</Divider>);
    expect(wrapper.find('.rc-divider--content-right').text()).toEqual('text');
  });

  it('should render correctly when using dashed prop', async () => {
    wrapper = mount(<Divider dashed>text</Divider>);
    expect(wrapper.find('.rc-divider--dashed').text()).toEqual('text');
  });

  it('should render correctly when hairline is false ', async () => {
    wrapper = mount(<Divider>text</Divider>);
    expect(wrapper.find('.rc-divider--hairline').exists()).toBeTruthy();
    await wrapper.setProps({ hairline: false });
    expect(wrapper.find('.rc-divider--hairline').exists()).toBeFalsy();
  });
});
