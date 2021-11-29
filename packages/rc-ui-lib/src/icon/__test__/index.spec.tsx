import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Icon } from '..';

const IconFont = Icon.createFromIconfontCN('//at.alicdn.com/t/font_2763890_w471tfudy4d.js');

describe('Icon', () => {
  let wrapper;
  afterEach(() => {
    wrapper.unmount();
    jest.restoreAllMocks();
  });

  it('should render icon with builtin icon name correctly', () => {
    wrapper = mount(<Icon name="success" />);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render icon with url name correctly', () => {
    wrapper = mount(<Icon name="https://img.yzcdn.com/icon.jpg" />);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render default slot correctly', () => {
    wrapper = mount(<Icon name="success">Default Slot</Icon>);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should change root tag after using tag prop', () => {
    wrapper = mount(
      <Icon name="success" tag="div">
        Default Slot
      </Icon>,
    );
    expect(wrapper.html()).toEqual(
      '<div class="rc-badge__wrapper van-icon van-icon-success">Default Slot</div>',
    );
  });

  it('should render dot correctly', () => {
    wrapper = mount(<Icon name="success" dot />);
    expect(wrapper.find('.rc-badge').html()).toMatchSnapshot();
  });

  it('should render badge correctly', () => {
    wrapper = mount(<Icon name="success" badge={{ content: 9 }} />);
    expect(wrapper.find('.rc-badge').html()).toMatchSnapshot();
  });

  it('should change icon size when using size prop', () => {
    wrapper = mount(<Icon name="success" size={20} />);
    expect(wrapper.getDOMNode().style.fontSize).toEqual('20px');
  });

  it('should render correctly when createFromIconfontCN', () => {
    wrapper = mount(<IconFont name="cuIcon-classify" color="#f44336" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
