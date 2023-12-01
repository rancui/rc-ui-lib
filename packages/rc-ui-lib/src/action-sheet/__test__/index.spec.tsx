import React, { StrictMode } from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { ActionSheet } from '..';
import { sleep } from '../../../tests/utils';

describe('Popup', () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  test('should emit select event after clicking option', async () => {
    const actions = [{ name: 'Option' }];
    const onSelect = jest.fn();
    render(<ActionSheet visible actions={actions} onSelect={onSelect} />, {
      wrapper: StrictMode,
    });

    const item = document.querySelector('.rc-action-sheet__item');
    await fireEvent.click(item);
    await sleep(0);
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(
      {
        name: 'Option',
      },
      0,
    );
  });
  test('should call callback function after clicking option', async () => {
    const callback = jest.fn();
    const actions = [{ name: 'Option', callback }];
    render(<ActionSheet visible actions={actions} />);
    const item = document.querySelector('.rc-action-sheet__item');
    await fireEvent.click(item);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should not emit select event after clicking loading option', async () => {
    const onSelect = jest.fn();
    const actions = [{ name: 'Option', loading: true }];
    render(<ActionSheet visible actions={actions} onSelect={onSelect} />);
    const item = document.querySelector('.rc-action-sheet__item');
    await fireEvent.click(item);
    expect(onSelect).not.toHaveBeenCalled();
  });

  test('should not emit select event after clicking disabled option', async () => {
    const onSelect = jest.fn();
    const actions = [{ name: 'Option', disabled: true }];
    render(<ActionSheet visible actions={actions} onSelect={onSelect} />);
    const item = document.querySelector('.rc-action-sheet__item');
    await fireEvent.click(item);
    expect(onSelect).not.toHaveBeenCalled();
  });

  test('should emit cancel event after clicking cancel button', async () => {
    const onCancel = jest.fn();
    const actions = [{ name: 'Option' }];
    render(<ActionSheet visible actions={actions} cancelText="Cancel" onCancel={onCancel} />);
    const cancel = document.querySelector('.rc-action-sheet__cancel');
    await fireEvent.click(cancel);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  test('should render subname correctly', () => {
    const actions = [{ name: 'Option', subname: 'Subname' }];
    render(<ActionSheet visible actions={actions} cancelText="Cancel" />);
    expect(document.querySelector('.rc-action-sheet__subname').textContent).toEqual('Subname');
    expect(document.querySelector('.rc-action-sheet')).toMatchSnapshot();
  });

  test('should render default slot correctly', () => {
    render(
      <ActionSheet visible title="Title">
        Default
      </ActionSheet>,
    );
    expect(document.querySelector('.rc-action-sheet')).toMatchSnapshot();
  });

  test('should have "rc-popup--round" class when setting the round prop', () => {
    render(<ActionSheet visible round />);
    expect(document.querySelector('.rc-popup--round')).toBeTruthy();
  });

  test('should change option color when using the color prop', () => {
    const actions = [{ name: 'Option', color: 'red' }];
    render(<ActionSheet visible actions={actions} />);
    const item = document.querySelector('.rc-action-sheet__item');
    const style = getComputedStyle(item);
    expect(style.color).toEqual('red');
  });

  test('should hide close icon when the closeable prop is false', async () => {
    const { rerender } = render(<ActionSheet visible title="Title" />);
    expect(document.querySelector('.rc-action-sheet__close')).toBeTruthy();

    rerender(<ActionSheet visible title="Title" closeable={false} />);

    expect(document.querySelector('.rc-action-sheet__close')).toBeFalsy();
  });

  test('should allow to custom close icon with closeIcon prop', () => {
    const { rerender } = render(<ActionSheet visible title="Title" closeIcon="success" />);
    expect(document.querySelector('.rc-action-sheet')).toMatchSnapshot();

    rerender(<ActionSheet visible title="Title" closeIcon={<i>X</i>} />);
    expect(document.querySelector('.rc-action-sheet')).toMatchSnapshot();
  });

  test('should render description correctly', () => {
    render(<ActionSheet visible description="This is a description" />);
    expect(document.querySelector('.rc-action-sheet__description').textContent).toEqual(
      'This is a description',
    );
    expect(document.querySelector('.rc-action-sheet')).toMatchSnapshot();
  });

  test('should emit click-overlay event and closed after clicking the overlay', () => {
    const onClickOverlay = jest.fn();
    const actions = [{ name: 'Option' }];
    render(<ActionSheet visible onClickOverlay={onClickOverlay} actions={actions} />);

    const overlay = document.querySelector('.rc-overlay');
    fireEvent.click(overlay);
    expect(onClickOverlay).toHaveBeenCalledTimes(1);
  });

  test('should emit cancel event and closed after clicking the option when set closeOnClickAction prop', () => {
    const onCancel = jest.fn();
    const actions = [{ name: 'Option' }];
    render(<ActionSheet visible onCancel={onCancel} closeOnClickAction actions={actions} />);

    const item = document.querySelector('.rc-action-sheet__item');
    fireEvent.click(item);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  test('should allow to control safe-area with safe-area-inset-bottom prop', async () => {
    render(<ActionSheet visible />);
    expect(
      document.querySelector('.rc-action-sheet').classList.contains('rc-safe-area-bottom'),
    ).toBeTruthy();
  });

  test('should not allow to control safe-area with set safe-area-inset-bottom prop is false', async () => {
    render(<ActionSheet visible safeAreaInsetBottom={false} />);
    expect(
      document.querySelector('.rc-action-sheet').classList.contains('rc-safe-area-bottom'),
    ).toBeFalsy();
  });
});
