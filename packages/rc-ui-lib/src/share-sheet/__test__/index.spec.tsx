import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
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
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  test('should render cancel text when using cancel-text prop', async () => {
    const { rerender } = render(<ShareSheet visible cancelText="foo" />);

    expect(document.querySelector('.rc-share-sheet__cancel')).toMatchSnapshot();

    rerender(<ShareSheet visible cancelText="" />);
    expect(document.querySelector('.rc-share-sheet__cancel')).toBeFalsy();
  });

  test('should render description and title when using description prop and title prop', async () => {
    const { rerender } = render(<ShareSheet visible description="foo" title="hoo" />);

    expect(document.querySelector('.rc-share-sheet__description')).toMatchSnapshot();
    expect(document.querySelector('.rc-share-sheet__title')).toMatchSnapshot();
    rerender(<ShareSheet visible description="" title="hoo" />);
    expect(document.querySelector('.rc-share-sheet__description')).toBeFalsy();
  });

  test('should allow to custom the className of option', () => {
    render(
      <ShareSheet
        visible
        options={[{ name: 'Link', icon: 'link', className: 'foo', description: 'hoo' }]}
      />,
    );

    const option = document.querySelector('.rc-share-sheet__option');

    expect(option.classList.contains('foo')).toBeTruthy();
  });
  // description

  test('should render multi Line when option item is array', () => {
    render(<ShareSheet visible options={optionsMuli} />);

    expect(document.querySelector('.rc-share-sheet')).toMatchSnapshot();
  });

  test('should emit select event when an option is clicked', async () => {
    const onSelect = jest.fn();
    render(
      <ShareSheet visible options={[{ icon: 'wechat', name: 'wechat' }]} onSelect={onSelect} />,
    );

    await fireEvent.click(document.querySelector('.rc-share-sheet__option'));
    expect(onSelect).toHaveBeenCalledWith({ icon: 'wechat', name: 'wechat' }, 0);
  });

  test('should emit cancel event when the cancel button is clicked', async () => {
    const onCancel = jest.fn();
    render(<ShareSheet visible onCancel={onCancel} />);

    await fireEvent.click(document.querySelector('.rc-share-sheet__cancel'));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  test('should emit click-overlay event when overlay is clicked', async () => {
    const onCancel = jest.fn();
    render(<ShareSheet visible cancelText="foo" onCancel={onCancel} />);

    await sleep();

    const overlay = document.querySelector('.rc-overlay');
    await fireEvent.click(overlay);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  test('should have "rc-popup--round" class when setting the round prop', async () => {
    render(<ShareSheet visible round />);

    expect(document.querySelector('.rc-popup--round')).toBeTruthy();
  });
});
