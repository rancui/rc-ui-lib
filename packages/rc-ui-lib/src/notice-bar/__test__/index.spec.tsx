import React from 'react';
import { fireEvent, render, act, cleanup } from '@testing-library/react';
import { sleep } from '../../../tests/utils';
import NoticeBar, { NoticeBarInstance } from '..';
import Icon from '../../icon';

describe('NoticeBar', () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('should render left icon correct', async () => {
    const { container } = render(<NoticeBar leftIcon="speaker-s" text="foo" />);
    expect(container).toMatchSnapshot();
  });

  it('should render right icon correct', async () => {
    const { container } = render(<NoticeBar rightIcon="speaker-s" text="foo" />);
    expect(container).toMatchSnapshot();
  });

  it('should render ReactNode icon correct', async () => {
    const { container } = render(
      <NoticeBar leftIcon={<Icon name="cart-o" color="#1989fa" />} text="foo" />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render link mode correct', async () => {
    const { container } = render(<NoticeBar mode="link" text="foo" />);
    expect(
      container.querySelector('.rc-notice-bar__right-icon').classList.contains('van-icon-arrow'),
    ).toBeTruthy();
  });

  it('should emit close event when close icon is clicked', async () => {
    const onClose = jest.fn();
    const { container } = render(<NoticeBar mode="closeable" text="foo" onClose={onClose} />);
    const item = container.querySelector('.rc-notice-bar__right-icon');
    await fireEvent.click(item);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  // it('should emit replay event after replay', async () => {
  //   const onReplay = jest.fn();
  //   const { container } = render(<NoticeBar text="foo" onReplay={onReplay} />);

  //   container.querySelector('.rc-notice-bar__content').simulate('transitionend');
  //   await sleep(80);
  //   expect(onReplay).toHaveBeenCalledTimes(1);
  // });

  it('should start scrolling when content width > wrap width ', async () => {
    const { container } = render(<NoticeBar text="foo" delay={0} />);

    const wrap = container.querySelector('.rc-notice-bar__wrap');
    const content = container.querySelector('.rc-notice-bar__content');

    wrap.getBoundingClientRect = () =>
      ({
        width: 50,
      } as DOMRect);
    content.getBoundingClientRect = () =>
      ({
        width: 100,
      } as DOMRect);

    // await sleep(100);

    expect(container).toMatchSnapshot();
  });

  it('should not start scrolling when content width > wrap width and props scrollable is false  ', async () => {
    const { container } = render(<NoticeBar text="foo" scrollable={false} delay={0} />);

    const wrap = container.querySelector('.rc-notice-bar__wrap');
    const content = container.querySelector('.rc-notice-bar__content');

    wrap.getBoundingClientRect = () =>
      ({
        width: 50,
      } as DOMRect);
    content.getBoundingClientRect = () =>
      ({
        width: 100,
      } as DOMRect);

    await sleep(50);

    expect(container).toMatchSnapshot();
  });

  it('should not start scrolling when content width > wrap width ', async () => {
    const { container } = render(<NoticeBar text="foo" delay={0} />);

    const wrap = container.querySelector('.rc-notice-bar__wrap');
    const content = container.querySelector('.rc-notice-bar__content');

    wrap.getBoundingClientRect = () =>
      ({
        width: 200,
      } as DOMRect);
    content.getBoundingClientRect = () =>
      ({
        width: 100,
      } as DOMRect);

    await sleep(50);

    expect(container).toMatchSnapshot();
  });

  it('should start scrolling when content width > wrap width and props scrollable is true', async () => {
    const { container } = render(<NoticeBar text="foo" scrollable delay={0} />);

    const wrap = container.querySelector('.rc-notice-bar__wrap');
    const content = container.querySelector('.rc-notice-bar__content');

    wrap.getBoundingClientRect = () =>
      ({
        width: 200,
      } as DOMRect);
    content.getBoundingClientRect = () =>
      ({
        width: 100,
      } as DOMRect);

    await sleep(50);

    expect(container).toMatchSnapshot();
  });

  it('should expose reset methods', async () => {
    const NoticeBarRef = React.createRef<NoticeBarInstance>();

    const reset = () => {
      NoticeBarRef.current.reset();
    };
    const { container } = render(<NoticeBar ref={NoticeBarRef} scrollable text="foo" />);

    await act(async () => {
      reset();
    });

    expect(container).toMatchSnapshot();
  });
});
