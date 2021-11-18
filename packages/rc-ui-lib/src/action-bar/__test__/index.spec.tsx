import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Icon from '../../icon';
import ActionBar from '..';

describe('ActionBar', () => {
  let wrapper;
  afterEach(() => {
    wrapper.unmount();
    jest.restoreAllMocks();
  });

  it('should allow to disable safe-area-inset-bottom prop', () => {
    wrapper = mount(
      <ActionBar safeAreaInsetBottom={false}>
        <ActionBar.Icon icon="chat-o" text="客服" />
        <ActionBar.Icon icon="cart-o" text="购物车" />
        <ActionBar.Icon icon="shop-o" text="店铺" />
      </ActionBar>,
    );
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('basic usage with ActionBar.Icon', async () => {
    wrapper = mount(
      <ActionBar>
        <ActionBar.Icon icon="chat-o" text="客服" />
        <ActionBar.Icon icon="cart-o" text="购物车" />
        <ActionBar.Icon icon="shop-o" text="店铺" />
        <ActionBar.Button type="danger" text="立即购买" />
      </ActionBar>,
    );
    expect(toJson(wrapper.html())).toMatchSnapshot();
  });

  it('should render correctly when using badge prop in ActionBarIcon', async () => {
    wrapper = mount(
      <ActionBar>
        <ActionBar.Icon icon="chat-o" text="客服" badge={{ dot: true }} />
        <ActionBar.Icon icon="cart-o" text="购物车" badge={{ content: 5 }} />
      </ActionBar>,
    );
    expect(toJson(wrapper.html())).toMatchSnapshot();
  });

  it('should render correctly when color prop in ActionBarIcon', async () => {
    wrapper = mount(
      <ActionBar>
        <ActionBar.Icon icon="chat-o" color="#ee0a24" text="客服" />
        <ActionBar.Icon icon="cart-o" text="购物车" />
        <ActionBar.Icon icon="star" color="#ff5000" text="店铺" />
      </ActionBar>,
    );
    expect(toJson(wrapper.html())).toMatchSnapshot();
  });

  it('should render correctly when icon prop in ActionBarIcon', async () => {
    wrapper = mount(
      <ActionBar>
        <ActionBar.Icon icon="chat-o" color="#ee0a24" text="客服" />
        <ActionBar.Icon icon={<Icon name="shop-o" />} text="购物车" />
      </ActionBar>,
    );
    expect(toJson(wrapper.html())).toMatchSnapshot();
  });

  it('when icon prop in ActionBarIcon is not isValidElement', async () => {
    wrapper = mount(
      <ActionBar>
        <ActionBar.Icon icon={123} color="#ee0a24" text="客服" />
      </ActionBar>,
    );
    expect(toJson(wrapper.html())).toMatchSnapshot();
  });

  it('should render correctly when iconClass prop in ActionBarIcon', async () => {
    wrapper = mount(
      <ActionBar>
        <ActionBar.Icon icon="chat-o" iconClass="icon-class" text="客服" />
        <ActionBar.Icon icon="cart-o" text="购物车" />
      </ActionBar>,
    );
    expect(wrapper.find(Icon).at(0).find('icon-class')).toBeTruthy();
  });

  it('should render correctly when iconPrefix prop in ActionBar.Icon', async () => {
    wrapper = mount(
      <ActionBar>
        <ActionBar.Icon icon="chat-o" iconPrefix="my-icon" text="客服" />
        <ActionBar.Icon icon="cart-o" text="购物车" />
      </ActionBar>,
    );
    expect(wrapper.find(Icon).at(0).find('.my-icon-chat-o').exists()).toBeTruthy();
  });

  it('should emit click event in ActionBar.Icon', async () => {
    const onClick = jest.fn();
    wrapper = mount(
      <ActionBar>
        <ActionBar.Icon icon="chat-o" text="客服" onClick={onClick} />
        <ActionBar.Icon icon="cart-o" text="购物车" />
      </ActionBar>,
    );
    await wrapper.find(Icon).at(0).children('.van-icon-chat-o').first().simulate('click');
    expect(onClick).toHaveBeenCalled();
  });

  it('should render correctly when using type prop and text prop in ActionBarButton', () => {
    wrapper = mount(
      <ActionBar>
        <ActionBar.Button type="warning" text="加入购物车" />
        <ActionBar.Button type="danger" text="立即购买" />
      </ActionBar>,
    );
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when using icon prop in ActionBarButton', () => {
    wrapper = mount(
      <ActionBar>
        <ActionBar.Button type="warning" text="加入购物车" icon="shop-o" />
        <ActionBar.Button type="danger" text="立即购买" icon={<Icon name="chat-o" />} />
      </ActionBar>,
    );
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when using color prop in ActionBarButton', () => {
    wrapper = mount(
      <ActionBar>
        <ActionBar.Button type="warning" text="加入购物车" color="red" />
        <ActionBar.Button
          type="danger"
          text="立即购买"
          color="linear-gradient(to right, #ffd01e, #ff8917)"
        />
      </ActionBar>,
    );
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('when ActionBarButton does not wrapperd by ActionBar', () => {
    wrapper = mount(
      <div>
        <ActionBar.Button type="warning" text="加入购物车" />
        <ActionBar.Button type="danger" text="立即购买" />
      </div>,
    );
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('when ActionBarButton has children', () => {
    wrapper = mount(
      <ActionBar>
        <ActionBar.Button type="warning">加入购物车</ActionBar.Button>
        <ActionBar.Button type="danger">立即购买</ActionBar.Button>
      </ActionBar>,
    );
    expect(wrapper.html()).toMatchSnapshot();
  });
});
