import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { Tabbar } from '..';
import { BORDER_TOP_BOTTOM } from '../../utils/constant';
import { sleep } from '../../../tests/utils';
import { mockGetBoundingClientRect } from '../../utils/dom/mock';

// const activeClass = 'rc-tabbar-item--active';
describe('Tabbar', () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('should emit change event when click the tabbar item', async () => {
    const onChange = jest.fn();
    const { container } = render(
      <Tabbar value={1} onChange={onChange}>
        <Tabbar.Item icon="home-o">标签</Tabbar.Item>
        <Tabbar.Item icon="search">标签</Tabbar.Item>
        <Tabbar.Item icon="friends-o">标签</Tabbar.Item>
        <Tabbar.Item icon="setting-o">标签</Tabbar.Item>
      </Tabbar>,
    );
    const items = container.querySelectorAll('.rc-tabbar-item');
    await fireEvent.click(items[0]);
    expect(onChange).toHaveBeenCalledWith(0);
    await fireEvent.click(items[1]);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should match active tab by name when using name prop', async () => {
    const onChange = jest.fn();
    const { container } = render(
      <Tabbar value="a" onChange={onChange}>
        <Tabbar.Item name="a">Tab</Tabbar.Item>
        <Tabbar.Item name="b">Tab</Tabbar.Item>
      </Tabbar>,
    );
    const items = container.querySelectorAll('.rc-tabbar-item');
    await fireEvent.click(items[1]);
    expect(onChange).toHaveBeenCalledWith('b');
    // expect(item.classList.contains(activeClass)).toEqual(true);
  });

  it('should not render border when border prop is false', () => {
    const { container } = render(
      <Tabbar border={false} value="a">
        <Tabbar.Item name="a">Tab</Tabbar.Item>
        <Tabbar.Item name="b">Tab</Tabbar.Item>
      </Tabbar>,
    );

    expect(container.querySelector('.rc-tabbar').classList.contains(BORDER_TOP_BOTTOM)).toEqual(
      false,
    );
  });

  it('should render placeholder element when using placeholder prop', async () => {
    const restore = mockGetBoundingClientRect({ height: 50 });
    const { container } = render(
      <Tabbar fixed placeholder value="a">
        <Tabbar.Item name="a">Tab</Tabbar.Item>
        <Tabbar.Item name="b">Tab</Tabbar.Item>
      </Tabbar>,
    );

    await sleep(0);
    expect(container).toMatchSnapshot();
    restore();
  });

  it('should render cust prop', async () => {
    const restore = mockGetBoundingClientRect({ height: 50 });
    const { container } = render(
      <Tabbar fixed placeholder value="a">
        <Tabbar.Item name="a">Tab</Tabbar.Item>
        <Tabbar.Item name="b">Tab</Tabbar.Item>
      </Tabbar>,
    );

    await sleep(0);
    expect(container).toMatchSnapshot();
    restore();
  });

  it('render Custom icon correctly', () => {
    const icon = {
      active: 'https://img.yzcdn.cn/vant/user-active.png',
      inactive: 'https://img.yzcdn.cn/vant/user-inactive.png',
    };
    const { container } = render(
      <Tabbar>
        <Tabbar.Item icon={(ac) => <img alt="" src={ac ? icon.active : icon.inactive} />}>
          标签
        </Tabbar.Item>
        <Tabbar.Item icon="friends-o">标签</Tabbar.Item>
        <Tabbar.Item icon="setting-o">标签</Tabbar.Item>
      </Tabbar>,
    );
    expect(container).toMatchSnapshot();
  });
});
