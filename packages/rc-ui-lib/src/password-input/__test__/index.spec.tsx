import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { NumberKeyboard, NumberKeyboardProps } from '../../number-keyboard';
import { NumberKeyboardTheme } from '../../number-keyboard/PropsType';
import TestsEvent from '../../../tests/events';

const clickKey = async (target) => {
  await TestsEvent.triggerTouch(target, 'touchstart', [[0, 0]]);
  await TestsEvent.triggerTouch(target, 'touchend', [[0, 0]]);
};

const $props = {
  visible: true,
};

describe('NumberKeyboard', () => {
  function createNumberKeyboard(props: NumberKeyboardProps) {
    const { baseElement, getAllByRole, getByText, container, rerender, debug } = render(
      <NumberKeyboard {...props} />,
    );

    return {
      baseElement,
      container,
      rerender,
      getByText,
      getAllByRole,
      debug,
    };
  }

  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('should emit input event after clicking number key', async () => {
    const onInput = jest.fn();
    const props = {
      ...$props,
      onInput,
    };

    const { getAllByRole } = createNumberKeyboard(props);
    const key = getAllByRole('button')[0];
    await clickKey(key);
    expect(onInput).toHaveBeenCalledWith('1');
  });

  it('should emit onDelete event after clicking delete key', async () => {
    const onDelete = jest.fn();
    const props = {
      ...$props,
      onDelete,
    };

    const { getAllByRole } = createNumberKeyboard(props);
    const key = getAllByRole('button')[11];
    await clickKey(key);
    expect(onDelete).toHaveBeenCalled();
  });

  it('should emit onBlur event after clicking collapse key', async () => {
    const onBlur = jest.fn();
    const props = {
      ...$props,
      onBlur,
    };

    const { getAllByRole } = createNumberKeyboard(props);
    const key = getAllByRole('button')[9];
    await clickKey(key);
    expect(onBlur).toHaveBeenCalled();
  });

  it('should emit close event after clicking close button', async () => {
    const onBlur = jest.fn();
    const onClose = jest.fn();
    const props = {
      ...$props,
      theme: 'custom' as NumberKeyboardTheme,
      onBlur,
      onClose,
    };

    const { getAllByRole } = createNumberKeyboard(props);
    const key = getAllByRole('button')[12];
    await clickKey(key);
    expect(onBlur).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it('should render title and close button correctly', () => {
    const props = {
      ...$props,
      title: 'Title',
      closeButtonText: 'Close',
    };

    const { baseElement } = createNumberKeyboard(props);
    expect(baseElement.querySelector('.rc-number-keyboard__header')).toMatchSnapshot();
  });

  it('should render titleLeft prop correctly', () => {
    const props = {
      ...$props,
      titleLeft: <span>Custom Title Left</span>,
    };

    const { baseElement } = createNumberKeyboard(props);
    expect(baseElement.querySelector('.rc-number-keyboard__header')).toMatchSnapshot();
  });

  it('should render loading icon when using close-button-loading prop', () => {
    const props = {
      ...$props,
      theme: 'custom' as NumberKeyboardTheme,
      closeButtonLoading: true,
    };

    const { baseElement } = createNumberKeyboard(props);

    expect(baseElement.querySelector('.rc-key__loading-icon')).toBeTruthy();
  });

  it('should render extra key correctly when using extraKey prop', () => {
    const props = {
      ...$props,
      extraKey: 'foo',
    };

    const { baseElement } = createNumberKeyboard(props);
    expect(baseElement.querySelectorAll('.rc-key')[9]).toMatchSnapshot();
  });

  it('should render extra key correctly when using extraKey prop and extraKey is an array', async () => {
    const props = {
      ...$props,
      theme: 'custom' as NumberKeyboardTheme,
      extraKey: ['00', '.'],
    };

    const { baseElement } = createNumberKeyboard(props);

    expect(baseElement.querySelector('.rc-number-keyboard')).toMatchSnapshot();
  });

  it('should emit blur event after clicking outside', async () => {
    const onBlur = jest.fn();
    const props = {
      ...$props,
      onBlur,
    };

    createNumberKeyboard(props);
    await clickKey(document.body);
    expect(onBlur).toHaveBeenCalled();
  });

  it('should not emit blur event after clicking outside when hideOnClickOutside is false', async () => {
    const onBlur = jest.fn();
    const props = {
      ...$props,
      hideOnClickOutside: false,
      onBlur,
    };

    createNumberKeyboard(props);
    await clickKey(document.body);
    expect(onBlur).not.toHaveBeenCalled();
  });

  it('should add "rc-key--active" className to key when focused', async () => {
    const { getAllByRole } = createNumberKeyboard($props);
    const key = getAllByRole('button')[0];

    await TestsEvent.triggerTouch(key, 'touchstart', [[0, 0]]);

    expect(key.classList.contains('rc-key--active')).toBeTruthy();

    await TestsEvent.triggerTouch(key, 'touchend', [[0, 0]]);

    expect(key.classList.contains('rc-key--active')).toBeFalsy();
  });

  it('should remove "rc-key--active" className from key when touch moved', async () => {
    const { getAllByRole } = createNumberKeyboard($props);
    const key = getAllByRole('button')[0];

    await TestsEvent.triggerTouch(key, 'touchstart', [[0, 0]]);

    expect(key.classList.contains('rc-key--active')).toBeTruthy();

    await TestsEvent.triggerTouch(key, 'touchmove', [[0, 0]]);

    expect(key.classList.contains('rc-key--active')).toBeTruthy();

    await TestsEvent.triggerTouch(key, 'touchmove', [[100, 0]]);

    expect(key.classList.contains('rc-key--active')).toBeFalsy();

    await TestsEvent.triggerTouch(key, 'touchend', [[0, 0]]);

    expect(key.classList.contains('rc-key--active')).toBeFalsy();
  });

  it('should not render delete key when show-delete-key prop is false', () => {
    const props = {
      ...$props,
      showDeleteKey: true,
    };

    const { container } = createNumberKeyboard(props);

    expect(container.querySelector('.rc-key--delete')).toBeFalsy();
  });

  test('should shuffle key order when using random-key-order prop', () => {
    const props = {
      ...$props,
      randomKeyOrder: true,
    };

    const { getAllByRole } = createNumberKeyboard(props);

    const keys: number[] = [];
    const clickKeys: number[] = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 9; i++) {
      keys.push(i + 1);
      clickKeys.push(Number(getAllByRole('button')[i].innerText));
    }

    expect(keys.every((v, k) => keys[k] === clickKeys[k])).toEqual(false);
  });
});
