import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import NavBar from '..';
import Icon from '../../icon';

describe('NavBar', () => {
  let wrapper;
  afterEach(() => {
    wrapper.unmount();
    jest.restoreAllMocks();
  });

  it('should render left area correct', async () => {
    wrapper = mount(<NavBar leftArea="speaker-s" title="foo" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render right area correct', async () => {
    wrapper = mount(<NavBar rightArea="speaker-s" title="foo" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render ReactNode icon correct', async () => {
    wrapper = mount(<NavBar leftArea={<Icon name="cart-o" color="#1989fa" />} title="foo" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should emit click-left event when clicking left text', async () => {
    const onClickLeft = jest.fn();
    wrapper = mount(<NavBar title="foo" leftArea="left" onClickLeft={onClickLeft} />);
    const item = wrapper.find('.rc-nav-bar__left');
    await item.simulate('click');
    expect(onClickLeft).toHaveBeenCalledTimes(1);
  });

  it('should emit click-right event when clicking right text', async () => {
    const onClickRight = jest.fn();
    wrapper = mount(<NavBar title="foo" rightArea="right" onClickRight={onClickRight} />);
    const item = wrapper.find('.rc-nav-bar__right');
    await item.simulate('click');
    expect(onClickRight).toHaveBeenCalledTimes(1);
  });

  it('should have safe-area-inset-top class when using safe-area-inset-top prop ', async () => {
    wrapper = mount(<NavBar title="foo" safeAreaInsetTop />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should change z-index when using zIndex prop', async () => {
    wrapper = mount(<NavBar title="foo" zIndex={100} />);

    expect(wrapper.find('.rc-nav-bar').getDOMNode().style.zIndex).toEqual('100');
  });
});
