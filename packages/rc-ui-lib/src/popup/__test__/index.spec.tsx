import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { Icon } from '../..';
import { Popup } from '..';

describe('Popup', () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('should change z-index when using z-index prop', async () => {
    render(<Popup position="bottom" visible style={{ height: '30%', zIndex: 1500 }} />);
    expect(getComputedStyle(document.querySelector('.rc-popup')).zIndex).toEqual('1500');
  });

  it('should lock scroll when visibled', async () => {
    const { rerender } = render(<Popup />);
    expect(document.body.classList.contains('rc-overflow-hidden')).toBeFalsy();
    rerender(<Popup visible />);
    expect(document.body.classList.contains('rc-overflow-hidden')).toBeTruthy();
  });

  it('should allow to using teleport prop', async () => {
    const div = document.createElement('div');
    render(<Popup visible teleport={div} />);

    expect(div.querySelector('.rc-popup')).toBeTruthy();
  });

  it('should render overlay by default', () => {
    render(<Popup visible />);
    expect(document.querySelector('.rc-overlay')).toBeTruthy();
  });

  it('should not render overlay when overlay prop is false', () => {
    render(<Popup visible overlay={false} />);
    expect(document.querySelector('rc-overlay')).toBeFalsy();
  });
  it('should emit click-overlay event when overlay is clicked', async () => {
    const onClickOverlay = jest.fn();
    render(<Popup visible onClickOverlay={onClickOverlay} />);
    const overlay = document.querySelector('.rc-overlay');
    await fireEvent.click(overlay);
    expect(onClickOverlay).toHaveBeenCalled();
  });

  it('should emit open event when visible prop is set to true', async () => {
    const onOpen = jest.fn();
    const { rerender } = render(<Popup visible={false} onOpen={onOpen} />);
    rerender(<Popup visible onOpen={onOpen} />);
    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it('should emit close event when visible prop is set to false', async () => {
    const onClickOverlay = jest.fn();
    const onClose = jest.fn();
    const { rerender } = render(<Popup onClickOverlay={onClickOverlay} onClose={onClose} />);
    rerender(<Popup onClickOverlay={onClickOverlay} onClose={onClose} visible />);

    const overlay = document.querySelector('.rc-overlay');
    await fireEvent.click(overlay);
    rerender(<Popup onClickOverlay={onClickOverlay} onClose={onClose} visible={false} />);
    expect(onClickOverlay).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it('should change duration when using duration prop', () => {
    render(<Popup visible duration={500} />);
    const popup = document.querySelector('.rc-popup');
    const overlay = document.querySelector('.rc-overlay');
    expect(getComputedStyle(popup).animationDuration).toEqual('500ms');
    expect(getComputedStyle(overlay).animationDuration).toEqual('500ms');
  });

  it('should have "rc-popup--round" class when setting the round prop', () => {
    render(<Popup visible round />);
    expect(document.querySelector('.rc-popup--round')).toBeTruthy();
  });

  it('should render close icon when using closeable prop', () => {
    render(<Popup visible closeable />);
    expect(document.querySelector('.rc-popup__close-icon')).toBeTruthy();
  });

  it('should emit click-close-icon event when close icon is clicked', async () => {
    const onClickCloseIcon = jest.fn();
    render(<Popup visible closeable closeIcon="success" onClickCloseIcon={onClickCloseIcon} />);
    const icon = document.querySelector('.rc-popup__close-icon');
    await fireEvent.click(icon);
    expect(onClickCloseIcon).toHaveBeenCalled();
  });

  it('should render correct close icon when using close-icon prop', () => {
    render(<Popup visible closeable closeIcon="success" />);
    expect(document.querySelector('.rc-popup')).toMatchSnapshot();
  });

  it('should render correct close icon when close-icon is JSX element', () => {
    render(<Popup visible closeable closeIcon={<Icon name="shop-o" />} />);
    expect(document.querySelector('.van-icon')).toBeTruthy();
  });

  it('should render correctly when using title prop', () => {
    render(<Popup visible title="标题" />);
    expect(document.querySelector('.rc-popup__title').textContent).toEqual('标题');
  });

  it('should render correctly when using description prop', () => {
    render(<Popup visible description="description" />);
    expect(document.querySelector('.rc-popup__description').textContent).toEqual('description');
  });

  it('should change icon class prefix when using icon-prefix prop', () => {
    render(<Popup visible closeable iconPrefix="my-icon" />);
    expect(document.querySelector('.rc-popup')).toMatchSnapshot();
  });

  it('should allow to prevent close with before-close prop', async () => {
    const onClickOverlay = jest.fn();
    const { rerender } = render(
      <Popup visible beforeClose={() => false} onClickOverlay={onClickOverlay} />,
    );

    const overlay = document.querySelector('.rc-overlay');
    await fireEvent.click(overlay);
    expect(overlay).toBeTruthy();

    rerender(<Popup visible beforeClose={() => true} onClickOverlay={onClickOverlay} />);

    await fireEvent.click(overlay);
    expect(overlay).toBeTruthy();
  });

  it('should not call before-close when visible prop becomes false', async () => {
    const beforeClose = jest.fn();
    const { rerender } = render(<Popup visible beforeClose={beforeClose} />);
    rerender(<Popup visible={false} beforeClose={beforeClose} />);
    expect(beforeClose).toHaveBeenCalledTimes(0);
  });

  it('should not bubble blur event when set preventDefaultMouseDown prop ', async () => {
    render(<Popup preventDefaultMouseDown visible />);
    const popupWrapper = document.querySelector('.rc-popup');
    await fireEvent.mouseDown(popupWrapper);
    expect(document.querySelector('.rc-popup')).toMatchSnapshot();
  });
});
