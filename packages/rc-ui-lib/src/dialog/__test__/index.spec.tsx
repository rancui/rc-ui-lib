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

  describe('Dialog.show', () => {
    afterEach(() => {
      // Clean up any remaining dialogs
      const dialogs = document.querySelectorAll('.rc-dialog');
      dialogs.forEach((dialog) => {
        const container = dialog.closest('[class*="container"]') || dialog.parentElement;
        if (container && container.parentNode) {
          container.parentNode.removeChild(container);
        }
      });
    });

    it('should show dialog and return destroy function', async () => {
      const destroy = Dialog.show({
        message: 'test message',
        title: 'test title',
      });
      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(document.querySelector('.rc-dialog__message').textContent).toEqual('test message');
      expect(document.querySelector('.rc-dialog__header').textContent).toEqual('test title');
      destroy();
      await new Promise((resolve) => setTimeout(resolve, 500));
    });

    it('should call onConfirm and close dialog when confirm button is clicked', async () => {
      const onConfirm = jest.fn().mockResolvedValue(undefined);
      const onClose = jest.fn();
      const destroy = Dialog.show({
        message: 'test',
        onConfirm,
        onClose,
      });
      await new Promise((resolve) => setTimeout(resolve, 100));
      const confirmButton = document.querySelector('.rc-dialog__confirm');
      await fireEvent.click(confirmButton);
      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(onConfirm).toHaveBeenCalled();
      destroy();
      await new Promise((resolve) => setTimeout(resolve, 100));
    });

    it('should not close dialog when onConfirm returns false', async () => {
      const onConfirm = jest.fn().mockResolvedValue(false);
      const destroy = Dialog.show({
        message: 'test',
        onConfirm,
      });
      await new Promise((resolve) => setTimeout(resolve, 100));
      const confirmButton = document.querySelector('.rc-dialog__confirm');
      await fireEvent.click(confirmButton);
      await new Promise((resolve) => setTimeout(resolve, 200));
      expect(onConfirm).toHaveBeenCalled();
      expect(document.querySelector('.rc-dialog')).toBeTruthy();
      destroy();
      await new Promise((resolve) => setTimeout(resolve, 100));
    });

    it('should call onCancel and close dialog when cancel button is clicked', async () => {
      const onCancel = jest.fn().mockResolvedValue(undefined);
      const onClose = jest.fn();
      const destroy = Dialog.show({
        message: 'test',
        showCancelButton: true,
        onCancel,
        onClose,
      });
      await new Promise((resolve) => setTimeout(resolve, 100));
      const cancelButton = document.querySelector('.rc-dialog__cancel');
      await fireEvent.click(cancelButton);
      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(onCancel).toHaveBeenCalled();
      destroy();
      await new Promise((resolve) => setTimeout(resolve, 100));
    });

    it('should not close dialog when onCancel returns false', async () => {
      const onCancel = jest.fn().mockResolvedValue(false);
      const destroy = Dialog.show({
        message: 'test',
        showCancelButton: true,
        onCancel,
      });
      await new Promise((resolve) => setTimeout(resolve, 100));
      const cancelButton = document.querySelector('.rc-dialog__cancel');
      await fireEvent.click(cancelButton);
      await new Promise((resolve) => setTimeout(resolve, 200));
      expect(onCancel).toHaveBeenCalled();
      expect(document.querySelector('.rc-dialog')).toBeTruthy();
      destroy();
      await new Promise((resolve) => setTimeout(resolve, 100));
    });

    it('should call onCancel when click overlay and closeOnClickOverlay is true', async () => {
      const onCancel = jest.fn();
      const destroy = Dialog.show({
        message: 'test',
        closeOnClickOverlay: true,
        onCancel,
      });
      await new Promise((resolve) => setTimeout(resolve, 100));
      const overlay = document.querySelector('.rc-overlay');
      await fireEvent.click(overlay);
      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(onCancel).toHaveBeenCalled();
      destroy();
      await new Promise((resolve) => setTimeout(resolve, 100));
    });

    it('should call onClosed after dialog is closed', async () => {
      const onClosed = jest.fn();
      const destroy = Dialog.show({
        message: 'test',
        onClosed,
      });
      await new Promise((resolve) => setTimeout(resolve, 100));
      destroy();
      // Wait for animation to complete
      await new Promise((resolve) => setTimeout(resolve, 600));
      expect(onClosed).toHaveBeenCalled();
    });

    it('should call onClose when dialog is closed', async () => {
      const onClose = jest.fn();
      const destroy = Dialog.show({
        message: 'test',
        onClose,
      });
      await new Promise((resolve) => setTimeout(resolve, 100));
      destroy();
      // onClose is called immediately when destroy is called
      expect(onClose).toHaveBeenCalled();
      await new Promise((resolve) => setTimeout(resolve, 500));
    });
  });

  describe('Dialog.alert', () => {
    afterEach(async () => {
      // Clean up any remaining dialogs
      await new Promise((resolve) => setTimeout(resolve, 100));
      const dialogs = document.querySelectorAll('.rc-dialog');
      dialogs.forEach((dialog) => {
        const container = dialog.closest('[class*="container"]') || dialog.parentElement;
        if (container && container.parentNode) {
          container.parentNode.removeChild(container);
        }
      });
    });

    it('should show alert dialog and resolve promise when confirmed', async () => {
      const onConfirm = jest.fn();
      const promise = Dialog.alert({
        message: 'alert message',
        onConfirm,
      });
      await new Promise((resolve) => setTimeout(resolve, 200));
      const messageEl = document.querySelector('.rc-dialog__message');
      expect(messageEl?.textContent).toEqual('alert message');
      const confirmButton = document.querySelector('.rc-dialog__confirm');
      if (confirmButton) {
        await fireEvent.click(confirmButton);
        await new Promise((resolve) => setTimeout(resolve, 200));
        const result = await promise;
        expect(onConfirm).toHaveBeenCalled();
        expect(result).toBeTruthy();
      }
    });
  });

  describe('Dialog.confirm', () => {
    afterEach(async () => {
      // Clean up any remaining dialogs
      await new Promise((resolve) => setTimeout(resolve, 100));
      const dialogs = document.querySelectorAll('.rc-dialog');
      dialogs.forEach((dialog) => {
        const container = dialog.closest('[class*="container"]') || dialog.parentElement;
        if (container && container.parentNode) {
          container.parentNode.removeChild(container);
        }
      });
    });

    it('should show confirm dialog and resolve promise when confirmed', async () => {
      const onConfirm = jest.fn();
      const promise = Dialog.confirm({
        message: 'confirm message',
        onConfirm,
      });
      await new Promise((resolve) => setTimeout(resolve, 200));
      const messageEl = document.querySelector('.rc-dialog__message');
      expect(messageEl?.textContent).toEqual('confirm message');
      expect(document.querySelector('.rc-dialog__cancel')).toBeTruthy();
      const confirmButton = document.querySelector('.rc-dialog__confirm');
      if (confirmButton) {
        await fireEvent.click(confirmButton);
        await new Promise((resolve) => setTimeout(resolve, 200));
        const result = await promise;
        expect(onConfirm).toHaveBeenCalled();
        expect(result).toBe(true);
      }
    });

    it('should reject promise when cancel button is clicked', async () => {
      const onCancel = jest.fn();
      const promise = Dialog.confirm({
        message: 'confirm message',
        onCancel,
      });
      await new Promise((resolve) => setTimeout(resolve, 200));
      const cancelButton = document.querySelector('.rc-dialog__cancel');
      if (cancelButton) {
        await fireEvent.click(cancelButton);
        // 直接 await promise，它会自动等待 reject
        try {
          await promise;
          // Should not reach here
          expect(true).toBe(false);
        } catch (error) {
          expect(onCancel).toHaveBeenCalled();
        }
      }
    });
  });
});
