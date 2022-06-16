import React, { useState } from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { sleep } from '../../../tests/utils';
import NoticeBar, { NoticeBarInstance } from '..';
import Icon from '../../icon';

describe('NoticeBar', () => {
  let wrapper;
  afterEach(() => {
    wrapper.unmount();
    jest.restoreAllMocks();
  });

  it('should render left icon correct', async () => {
    wrapper = mount(<NoticeBar leftIcon="speaker-s" text="foo" />);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render right icon correct', async () => {
    wrapper = mount(<NoticeBar rightIcon="speaker-s" text="foo" />);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render ReactNode icon correct', async () => {
    wrapper = mount(<NoticeBar leftIcon={<Icon name="cart-o" color="#1989fa" />} text="foo" />);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render link mode correct', async () => {
    wrapper = mount(<NoticeBar mode="link" text="foo" />);
    expect(
      wrapper.find('.rc-notice-bar__right-icon').at(1).hasClass('van-icon-arrow'),
    ).toBeTruthy();
  });

  it('should emit close event when close icon is clicked', async () => {
    const onClose = jest.fn();
    wrapper = mount(<NoticeBar mode="closeable" text="foo" onClose={onClose} />);
    const item = wrapper.find('.rc-notice-bar__right-icon');
    await item.at(0).simulate('click');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  // it('should emit replay event after replay', async () => {
  //   const onReplay = jest.fn();
  //   wrapper = mount(<NoticeBar text="foo" onReplay={onReplay} />);

  //   wrapper.find('.rc-notice-bar__content').simulate('transitionend');
  //   await sleep(80);
  //   expect(onReplay).toHaveBeenCalledTimes(1);
  // });

  it('should start scrolling when content width > wrap width ', async () => {
    wrapper = mount(<NoticeBar text="foo" delay={0} />);

    const wrap = wrapper.find('.rc-notice-bar__wrap');
    const content = wrapper.find('.rc-notice-bar__content');

    wrap.getBoundingClientRect = () =>
      ({
        width: 50,
      } as DOMRect);
    content.getBoundingClientRect = () =>
      ({
        width: 100,
      } as DOMRect);

    await sleep(50);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should not start scrolling when content width > wrap width and props scrollable is false  ', async () => {
    wrapper = mount(<NoticeBar text="foo" scrollable={false} delay={0} />);

    const wrap = wrapper.find('.rc-notice-bar__wrap');
    const content = wrapper.find('.rc-notice-bar__content');

    wrap.getBoundingClientRect = () =>
      ({
        width: 50,
      } as DOMRect);
    content.getBoundingClientRect = () =>
      ({
        width: 100,
      } as DOMRect);

    await sleep(50);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should not start scrolling when content width > wrap width ', async () => {
    wrapper = mount(<NoticeBar text="foo" delay={0} />);

    const wrap = wrapper.find('.rc-notice-bar__wrap');
    const content = wrapper.find('.rc-notice-bar__content');

    wrap.getBoundingClientRect = () =>
      ({
        width: 200,
      } as DOMRect);
    content.getBoundingClientRect = () =>
      ({
        width: 100,
      } as DOMRect);

    await sleep(50);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should start scrolling when content width > wrap width and props scrollable is true', async () => {
    wrapper = mount(<NoticeBar text="foo" scrollable delay={0} />);

    const wrap = wrapper.find('.rc-notice-bar__wrap');
    const content = wrapper.find('.rc-notice-bar__content');

    wrap.getBoundingClientRect = () =>
      ({
        width: 200,
      } as DOMRect);
    content.getBoundingClientRect = () =>
      ({
        width: 100,
      } as DOMRect);

    await sleep(50);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should expose reset methods', async () => {
    const NoticeBarRef = React.createRef<NoticeBarInstance>();

    const reset = () => {
      NoticeBarRef.current.reset();
    };
    wrapper = mount(<NoticeBar ref={NoticeBarRef} scrollable text="foo" />);

    await act(async () => {
      reset();
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
