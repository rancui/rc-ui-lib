import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import NavBar from '..';
import Icon from '../../icon';
import { mockGetBoundingClientRect } from '../../utils/dom/mock';

describe('NavBar', () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('should render left area correct', async () => {
    const { container } = render(<NavBar leftArea="speaker-s" title="foo" />);
    expect(container).toMatchSnapshot();
  });

  it('should render right area correct', async () => {
    const { container } = render(<NavBar rightArea="speaker-s" title="foo" />);
    expect(container).toMatchSnapshot();
  });

  it('should render ReactNode icon correct', async () => {
    const { container } = render(
      <NavBar leftArea={<Icon name="cart-o" color="#1989fa" />} title="foo" />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render leftArrow correct', async () => {
    const { container } = render(<NavBar leftArrow title="foo" />);
    expect(container).toMatchSnapshot();
  });

  it('should render correct when set props fixed and placeholder', async () => {
    const restore = mockGetBoundingClientRect({ height: 50 });
    const { container } = render(<NavBar fixed placeholder title="foo" />);
    expect(container).toMatchSnapshot();
    restore();
  });

  it('should emit click-left event when clicking left text', async () => {
    const onClickLeft = jest.fn();
    const { container } = render(<NavBar title="foo" leftArea="left" onClickLeft={onClickLeft} />);
    const item = container.querySelector('.rc-nav-bar__left');
    await fireEvent.click(item);
    expect(onClickLeft).toHaveBeenCalledTimes(1);
  });

  it('should emit click-right event when clicking right text', async () => {
    const onClickRight = jest.fn();
    const { container } = render(
      <NavBar title="foo" rightArea="right" onClickRight={onClickRight} />,
    );
    const item = container.querySelector('.rc-nav-bar__right');
    await fireEvent.click(item);
    expect(onClickRight).toHaveBeenCalledTimes(1);
  });

  it('should have safe-area-inset-top class when using safe-area-inset-top prop ', async () => {
    const { container } = render(<NavBar title="foo" safeAreaInsetTop />);

    expect(container).toMatchSnapshot();
  });

  it('should change z-index when using zIndex prop', async () => {
    const { container } = render(<NavBar title="foo" zIndex={100} />);

    expect(getComputedStyle(container.querySelector('.rc-nav-bar')).zIndex).toEqual('100');
  });
});
