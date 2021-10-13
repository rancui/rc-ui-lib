import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Badge from '../index';
import Icon from '../../icon';

it('should render nothing when content is empty string', () => {
  const wrapper = mount(<Badge content="" />);

  expect(toJson(wrapper)).toMatchSnapshot();
});

it('should render nothing when content is undefined', () => {
  const wrapper = mount(<Badge content="undefined" />);

  expect(toJson(wrapper)).toMatchSnapshot();
});

it('should render nothing when content is zero', () => {
  const wrapper = mount(<Badge content="0" />);

  expect(toJson(wrapper)).toMatchSnapshot();
});

it('should render content slot correctly', () => {
  const wrapper = mount(
    <Badge content={<Icon name="success" className="badge-icon" />}>
      <div className="child" />
    </Badge>,
  );

  expect(toJson(wrapper)).toMatchSnapshot();
});

it('should change dot position when using offset prop', async () => {
  const wrapper = mount(
    <Badge dot offset={[2, 4]}>
      <div className="child" />
    </Badge>,
  );

  const badge = wrapper.find('.rc-badge');
  expect(badge.props().style.top).toEqual('4px');
  expect(badge.props().style.right).toEqual('-2px');

  await wrapper.setProps({
    offset: [-2, -4],
  });
  expect(wrapper.find('.rc-badge').props().style.top).toEqual('-4px');
  expect(wrapper.find('.rc-badge').props().style.right).toEqual('2px');
});

it('should change dot position when using offset prop with custom unit', async () => {
  const wrapper = mount(
    <Badge dot offset={['2rem', '4em']}>
      <div className="child" />
    </Badge>,
  );

  const badge = wrapper.find('.rc-badge');
  expect(badge.getDOMNode().style.top).toEqual('4em');
  expect(badge.getDOMNode().style.right).toEqual('-2rem');

  await wrapper.setProps({
    offset: ['-2rem', '-4em'],
  });

  expect(wrapper.find('.rc-badge').props().style.top).toEqual('-4em');
  expect(wrapper.find('.rc-badge').props().style.right).toEqual('2rem');
});

it('should change dot position when using offset prop without children', () => {
  const wrapper = mount(<Badge dot offset={[2, 4]} />);

  const badge = wrapper.find('.rc-badge');
  expect(badge.props().style.marginTop).toEqual('4px');
  expect(badge.props().style.marginLeft).toEqual('2px');
});

it('should not render zero when show-zero is false', async () => {
  const wrapper = mount(
    <Badge content="0">
      <div className="child" />
    </Badge>,
  );

  expect(wrapper.find('.rc-badge').exists()).toBeTruthy();
  await wrapper.setProps({ showZero: false });
  expect(wrapper.find('.rc-badge').exists()).toEqual(false);
});

it('can set custom max count', () => {
  const wrapper = mount(
    <Badge content={100} max={99}>
      news
    </Badge>,
  );
  expect(wrapper.find('.rc-badge').text()).toBe('99+');
});
