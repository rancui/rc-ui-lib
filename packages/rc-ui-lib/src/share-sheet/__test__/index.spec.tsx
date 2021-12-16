import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { sleep } from '../../../tests/utils';
import { ShareSheet } from '..';

const optionsMuli = [
  [
    { name: '微信', icon: 'wechat' },
    { name: '朋友圈', icon: 'wechat-moments' },
    { name: '微博', icon: 'https://img.yzcdn.cn/vant/share-sheet-weibo.png' },
    { name: 'QQ', icon: 'qq' },
  ],
  [
    { name: '复制链接', icon: 'link' },
    { name: '分享海报', icon: 'poster' },
    { name: '二维码', icon: 'qrcode' },
    { name: '小程序码', icon: 'weapp-qrcode' },
  ],
];

describe('ShareSheet', () => {
  let wrapper;
  afterEach(() => {
    wrapper.unmount();
    jest.restoreAllMocks();
  });

  test('should render cancel text when using cancel-text prop', async () => {
    wrapper = mount(<ShareSheet visible cancelText="foo" />);

    expect(toJson(wrapper.find('.rc-share-sheet__cancel'))).toMatchSnapshot();

    await wrapper.setProps({ cancelText: '' });
    expect(wrapper.find('.rc-share-sheet__cancel').exists()).toBeFalsy();
  });

  test('should render description and title when using description prop and title prop', async () => {
    wrapper = mount(<ShareSheet visible description="foo" title="hoo" />);

    expect(wrapper.find('.rc-share-sheet__description').html()).toMatchSnapshot();
    expect(wrapper.find('.rc-share-sheet__title').html()).toMatchSnapshot();

    await wrapper.setProps({ description: '' });
    expect(wrapper.find('.rc-share-sheet__description').exists()).toBeFalsy();
  });

  test('should allow to custom the className of option', () => {
    wrapper = mount(
      <ShareSheet
        visible
        options={[{ name: 'Link', icon: 'link', className: 'foo', description: 'hoo' }]}
      />,
    );

    const option = wrapper.find('.rc-share-sheet__option');

    expect(option.hasClass('foo')).toBeTruthy();
  });
  // description

  test('should render multi Line when option item is array', () => {
    wrapper = mount(<ShareSheet visible options={optionsMuli} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('should emit select event when an option is clicked', () => {
    const onSelect = jest.fn();
    wrapper = mount(
      <ShareSheet visible options={[{ icon: 'wechat', name: 'wechat' }]} onSelect={onSelect} />,
    );

    wrapper.find('.rc-share-sheet__option').at(0).simulate('click');
    expect(onSelect).toHaveBeenCalledWith({ icon: 'wechat', name: 'wechat' }, 0);
  });

  test('should emit cancel event when the cancel button is clicked', () => {
    const onCancel = jest.fn();
    wrapper = mount(<ShareSheet visible onCancel={onCancel} />);

    wrapper.find('.rc-share-sheet__cancel').simulate('click');

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  test('should emit click-overlay event when overlay is clicked', async () => {
    const onCancel = jest.fn();
    wrapper = mount(<ShareSheet visible cancelText="foo" onCancel={onCancel} />);

    await sleep();

    const overlay = wrapper.find('.rc-overlay')!;
    overlay.simulate('click');
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  test('should have "van-popup--round" class when setting the round prop', async () => {
    wrapper = mount(<ShareSheet visible round />);

    expect(wrapper.find('.rc-popup--round').exists()).toBeTruthy();
  });
});
