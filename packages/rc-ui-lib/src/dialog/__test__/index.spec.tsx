import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import Dialog from '..';
import Button from '../../button';

describe('Dialog', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('should change confirm button color when using confirm-button-color prop', () => {
    render(<Dialog visible confirmButtonColor="red" />);
    const confirmButton = document.querySelector('.rc-dialog__confirm');
    expect(getComputedStyle(confirmButton).color).toEqual('red');
  });

  it('should change cancel button color when using cancel-button-color prop', () => {
    render(<Dialog visible showCancelButton cancelButtonColor="red" />);
    const cancelButton = document.querySelector('.rc-dialog__cancel');
    expect(getComputedStyle(cancelButton).color).toEqual('red');
  });

  it('should render button text correctly', () => {
    render(
      <Dialog
        visible
        showCancelButton
        cancelButtonText="Custom Cancel"
        confirmButtonText="Custom Confirm"
      />,
    );
    expect(document.querySelector('.rc-dialog__footer')).toMatchSnapshot();
  });

  it('should render default slot correctly', () => {
    render(<Dialog visible message="Custom Message" />);
    expect(document.querySelector('.rc-dialog__message').textContent).toEqual('Custom Message');
    expect(document.querySelector('.rc-dialog__content')).toMatchSnapshot();
  });

  it('should render title slot correctly', () => {
    render(<Dialog visible title="Custom Title" />);
    expect(document.querySelector('.rc-dialog__header').textContent).toEqual('Custom Title');
    expect(document.querySelector('.rc-dialog__header')).toMatchSnapshot();
  });

  it('should emit open event when show prop is set to true', async () => {
    const onOpen = jest.fn();
    const { rerender } = render(<Dialog onOpen={onOpen} />);
    rerender(<Dialog onOpen={onOpen} visible />);
    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it('should emit close event when show prop is set to false', async () => {
    const onClose = jest.fn();
    const onClickCloseIcon = jest.fn();
    const { rerender } = render(
      <Dialog onClose={onClose} closeable onClickCloseIcon={onClickCloseIcon} />,
    );
    rerender(<Dialog onClose={onClose} closeable visible onClickCloseIcon={onClickCloseIcon} />);

    const close = document.querySelector('i');
    await fireEvent.click(close);
    rerender(
      <Dialog onClose={onClose} closeable visible={false} onClickCloseIcon={onClickCloseIcon} />,
    );
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should update width when using width prop', async () => {
    render(<Dialog visible width={200} />);
    const style = getComputedStyle(document.querySelector('.rc-dialog'));
    expect(style.width).toEqual('200px');
  });

  it('should render footer correctly', () => {
    render(<Dialog visible message="message" footer={<Button>Footer</Button>} />);
    expect(document.querySelector('.rc-dialog .rc-button__text').textContent).toEqual('Footer');
  });

  it('should correctly when showCancelButton prop is true', () => {
    render(<Dialog visible message="message" showCancelButton />);
    expect(
      document.querySelector('.rc-dialog .rc-dialog__cancel .rc-button__text').textContent,
    ).toEqual('取消');
  });

  it('should correctly when theme prop is round-button', () => {
    render(<Dialog visible message="message" theme="round-button" showCancelButton />);
    expect(document.querySelectorAll('.rc-dialog__footer .rc-button')).toHaveLength(2);
  });
});
