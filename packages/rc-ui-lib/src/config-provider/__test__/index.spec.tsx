import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Icon from '../../icon';
import ConfigProvider from '..';

describe('ConfigProvider', () => {
  let wrapper;
  afterEach(() => {
    wrapper.unmount();
  });

  it('when using themeVars prop', () => {
    const themeVars = {
      color: 'red',
    };
    wrapper = mount(
      <ConfigProvider themeVars={themeVars}>
        <Icon name="success" />
      </ConfigProvider>,
    );
    expect(toJson(wrapper.html())).toMatchSnapshot();
  });

  it('when using iconPrefix prop', () => {
    wrapper = mount(
      <ConfigProvider iconPrefix="my-icon">
        <Icon name="success" />
      </ConfigProvider>,
    );
    expect(wrapper.find('i.my-icon-success').exists()).toBeTruthy();
  });
});
