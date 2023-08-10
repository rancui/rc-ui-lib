import React from 'react';
import toJson from 'enzyme-to-json';
import Icon from '../../icon';
import ActionBar from '..';
import { sleep } from '../../../tests/utils';
import { mockGetBoundingClientRect } from '../../utils/dom/mock';
import { cleanup, fireEvent, render } from '@testing-library/react';

describe('ActionBar', () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('should allow to disable safe-area-inset-bottom prop', () => {
    const { container } = render(
      <ActionBar safeAreaInsetBottom={false}>
        <ActionBar.Icon icon="chat-o" text="客服" />
        <ActionBar.Icon icon="cart-o" text="购物车" />
        <ActionBar.Icon icon="shop-o" text="店铺" />
      </ActionBar>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render placeholder element when using placeholder prop', async () => {
    const restore = mockGetBoundingClientRect({ height: 50 });
    const { container } = render(
      <ActionBar safeAreaInsetBottom={false} placeholder>
        <ActionBar.Icon icon="chat-o" text="客服" />
        <ActionBar.Icon icon="cart-o" text="购物车" />
        <ActionBar.Icon icon="shop-o" text="店铺" />
      </ActionBar>,
    );

    await sleep(0);
    expect(container).toMatchSnapshot();
    restore();
  });

  it('basic usage with ActionBar.Icon', async () => {
    const { container } = render(
      <ActionBar>
        <ActionBar.Icon icon="chat-o" text="客服" />
        <ActionBar.Icon icon="cart-o" text="购物车" />
        <ActionBar.Icon icon="shop-o" text="店铺" />
        <ActionBar.Button type="danger" text="立即购买" />
      </ActionBar>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly when using badge prop in ActionBarIcon', async () => {
    const { container } = render(
      <ActionBar>
        <ActionBar.Icon icon="chat-o" text="客服" badge={{ dot: true }} />
        <ActionBar.Icon icon="cart-o" text="购物车" badge={{ content: 5 }} />
      </ActionBar>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly when color prop in ActionBarIcon', async () => {
    const { container } = render(
      <ActionBar>
        <ActionBar.Icon icon="chat-o" color="#ee0a24" text="客服" />
        <ActionBar.Icon icon="cart-o" text="购物车" />
        <ActionBar.Icon icon="star" color="#ff5000" text="店铺" />
      </ActionBar>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly when icon prop in ActionBarIcon', async () => {
    const { container } = render(
      <ActionBar>
        <ActionBar.Icon icon="chat-o" color="#ee0a24" text="客服" />
        <ActionBar.Icon icon={<Icon name="shop-o" />} text="购物车" />
      </ActionBar>,
    );
    expect(container).toMatchSnapshot();
  });

  it('when icon prop in ActionBarIcon is not isValidElement', async () => {
    const { container } = render(
      <ActionBar>
        <ActionBar.Icon icon={123} color="#ee0a24" text="客服" />
      </ActionBar>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly when iconClass prop in ActionBarIcon', async () => {
    const { container } = render(
      <ActionBar>
        <ActionBar.Icon icon="chat-o" iconClass="icon-class" text="客服" />
        <ActionBar.Icon icon="cart-o" text="购物车" />
      </ActionBar>,
    );
    expect(container.querySelector('.icon-class')).toBeTruthy();
  });

  it('should render correctly when iconPrefix prop in ActionBar.Icon', async () => {
    const { container } = render(
      <ActionBar>
        <ActionBar.Icon icon="chat-o" iconPrefix="my-icon" text="客服" />
        <ActionBar.Icon icon="cart-o" text="购物车" />
      </ActionBar>,
    );
    expect(container.querySelector('.my-icon-chat-o')).toBeTruthy();
  });

  it('should emit click event in ActionBar.Icon', async () => {
    const onClick = jest.fn();
    const { container } = render(
      <ActionBar>
        <ActionBar.Icon icon="chat-o" text="客服" onClick={onClick} />
        <ActionBar.Icon icon="cart-o" text="购物车" />
      </ActionBar>,
    );
    const icon = container.querySelector('.van-icon-chat-o');
    fireEvent.click(icon);
    expect(onClick).toHaveBeenCalled();
  });

  it('should render correctly when using type prop and text prop in ActionBarButton', () => {
    const { container } = render(
      <ActionBar>
        <ActionBar.Button type="warning" text="加入购物车" />
        <ActionBar.Button type="danger" text="立即购买" />
      </ActionBar>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly when using icon prop in ActionBarButton', () => {
    const { container } = render(
      <ActionBar>
        <ActionBar.Button type="warning" text="加入购物车" icon="shop-o" />
        <ActionBar.Button type="danger" text="立即购买" icon={<Icon name="chat-o" />} />
      </ActionBar>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly when using color prop in ActionBarButton', () => {
    const { container } = render(
      <ActionBar>
        <ActionBar.Button type="warning" text="加入购物车" color="red" />
        <ActionBar.Button
          type="danger"
          text="立即购买"
          color="linear-gradient(to right, #ffd01e, #ff8917)"
        />
      </ActionBar>,
    );
    expect(container).toMatchSnapshot();
  });

  it('when ActionBarButton does not wrapperd by ActionBar', () => {
    const { container } = render(
      <div>
        <ActionBar.Button type="warning" text="加入购物车" />
        <ActionBar.Button type="danger" text="立即购买" />
      </div>,
    );
    expect(container).toMatchSnapshot();
  });

  it('when ActionBarButton has children', () => {
    const { container } = render(
      <ActionBar>
        <ActionBar.Button type="warning">加入购物车</ActionBar.Button>
        <ActionBar.Button type="danger">立即购买</ActionBar.Button>
      </ActionBar>,
    );
    expect(container).toMatchSnapshot();
  });
});
