import React from 'react';
import { fireEvent, render, cleanup, act } from '@testing-library/react';
import { PasswordInput, PasswordInputProps } from '..';
import { NumberKeyboard } from '../../number-keyboard';
import TestsEvent from '../../../tests/events';

const clickKey = async (target) => {
  await TestsEvent.triggerTouch(target, 'touchstart', [[0, 0]]);
  await TestsEvent.triggerTouch(target, 'touchend', [[0, 0]]);
};

const $props = {
  focused: false,
};

describe('PasswordInput', () => {
  function createPasswordInput(props: PasswordInputProps) {
    const { baseElement, getAllByRole, getByText, container, rerender, debug } = render(
      <PasswordInput {...props} />,
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

  it('should emit onFocus event when security is touched', async () => {
    const onFocus = jest.fn();
    const props = {
      ...$props,
      onFocus,
    };

    const { container } = createPasswordInput(props);
    const wrapper = container.querySelector('.rc-password-input__security');
    await TestsEvent.triggerTouch(wrapper, 'touchstart', [[0, 0]]);
    expect(onFocus).toHaveBeenCalled();
  });

  // it('should emit onBlur event after clicking outside', async () => {
  //   const onBlur = jest.fn();
  //   const props = {
  //     ...$props,
  //     onBlur,
  //   };

  //   const { container } = createPasswordInput(props);
  //   const wrapper = container.querySelector('.rc-password-input__security');
  //   await TestsEvent.triggerTouch(wrapper, 'touchstart', [[0, 0]]);

  //   await clickKey(document.body);

  //   expect(onBlur).toHaveBeenCalled();
  // });

  it('should emit onChange event after input number', async () => {
    const onChange = jest.fn();
    const props = {
      ...$props,
      focused: true,
      onChange,
      keyboard: <NumberKeyboard />,
    };

    const { getAllByRole } = createPasswordInput(props);
    const key = getAllByRole('button')[0];
    await clickKey(key);
    expect(onChange).toHaveBeenCalledWith('1');
  });

  it('should emit onFill event after input number', async () => {
    const onFill = jest.fn();
    const props = {
      ...$props,
      focused: true,
      onFill,
      keyboard: <NumberKeyboard />,
    };

    const { getAllByRole } = createPasswordInput(props);
    const key = getAllByRole('button');
    await clickKey(key[0]);
    await clickKey(key[1]);
    await clickKey(key[2]);
    await clickKey(key[3]);
    await clickKey(key[4]);
    await clickKey(key[5]);
    expect(onFill).toHaveBeenCalledWith('123456');
  });

  it('should render error info correctly', async () => {
    const props = {
      ...$props,
      errorInfo: 'error!',
    };

    const { container } = createPasswordInput(props);

    expect(container).toMatchSnapshot();
  });

  // it('should emit onDelete event after clicking delete key', async () => {
  //   const onDelete = jest.fn();
  //   const props = {
  //     ...$props,
  //     onDelete,
  //   };

  //   const { getAllByRole } = createPasswordInput(props);
  //   const key = getAllByRole('button')[11];
  //   await clickKey(key);
  //   expect(onDelete).toHaveBeenCalled();
  // });
});
