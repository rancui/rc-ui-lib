import React from 'react';
import { mount } from 'enzyme';
import { Tabbar } from '..';
import { BORDER_TOP_BOTTOM } from '../../utils/constant';
import { sleep } from '../../../tests/utils';
import { mockGetBoundingClientRect } from '../../utils/dom/mock';

// const activeClass = 'rc-tabbar-item--active';
describe('Tabbar', () => {
  let wrapper;
  afterEach(() => {
    wrapper.unmount();
    jest.restoreAllMocks();
  });

  it('should emit change event when click the tabbar item', async () => {
    const onChange = jest.fn();
    wrapper = mount(
      <Tabbar value={1} onChange={onChange}>
        <Tabbar.Item icon="home-o">标签</Tabbar.Item>
        <Tabbar.Item icon="search">标签</Tabbar.Item>
        <Tabbar.Item icon="friends-o">标签</Tabbar.Item>
        <Tabbar.Item icon="setting-o">标签</Tabbar.Item>
      </Tabbar>,
    );
    const item = wrapper.find('.rc-tabbar-item');
    await item.at(0).simulate('click');
    expect(onChange).toHaveBeenCalledWith(0);
    await item.at(1).simulate('click');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should match active tab by name when using name prop', async () => {
    const onChange = jest.fn();
    wrapper = mount(
      <Tabbar value="a" onChange={onChange}>
        <Tabbar.Item name="a">Tab</Tabbar.Item>
        <Tabbar.Item name="b">Tab</Tabbar.Item>
      </Tabbar>,
    );
    const item = wrapper.find('.rc-tabbar-item').at(1);
    await item.simulate('click');
    expect(onChange).toHaveBeenCalledWith('b');
    // expect(item.hasClass(activeClass)).toEqual(true);
  });

  it('should not render border when border prop is false', () => {
    wrapper = mount(
      <Tabbar border={false} value="a">
        <Tabbar.Item name="a">Tab</Tabbar.Item>
        <Tabbar.Item name="b">Tab</Tabbar.Item>
      </Tabbar>,
    );

    expect(wrapper.hasClass(BORDER_TOP_BOTTOM)).toEqual(false);
  });

  it('should render placeholder element when using placeholder prop', async () => {
    const restore = mockGetBoundingClientRect({ height: 50 });
    wrapper = mount(
      <Tabbar fixed placeholder value="a">
        <Tabbar.Item name="a">Tab</Tabbar.Item>
        <Tabbar.Item name="b">Tab</Tabbar.Item>
      </Tabbar>,
    );

    await sleep(0);
    expect(wrapper.html()).toMatchSnapshot();
    restore();
  });

  it('should render cust prop', async () => {
    const restore = mockGetBoundingClientRect({ height: 50 });
    wrapper = mount(
      <Tabbar fixed placeholder value="a">
        <Tabbar.Item name="a">Tab</Tabbar.Item>
        <Tabbar.Item name="b">Tab</Tabbar.Item>
      </Tabbar>,
    );

    await sleep(0);
    expect(wrapper.html()).toMatchSnapshot();
    restore();
  });

  it('render Custom icon correctly', () => {
    const icon = {
      active: 'https://img.yzcdn.cn/vant/user-active.png',
      inactive: 'https://img.yzcdn.cn/vant/user-inactive.png',
    };
    wrapper = mount(
      <Tabbar>
        <Tabbar.Item icon={(ac) => <img alt="" src={ac ? icon.active : icon.inactive} />}>
          标签
        </Tabbar.Item>
        <Tabbar.Item icon="friends-o">标签</Tabbar.Item>
        <Tabbar.Item icon="setting-o">标签</Tabbar.Item>
      </Tabbar>,
    );
    expect(wrapper.html()).toMatchSnapshot();
  });
});
