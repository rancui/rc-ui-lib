import React, { useRef } from 'react';
import { fireEvent, render, cleanup, waitFor } from '@testing-library/react';
import { PasswordInput, PasswordInputInstance, PasswordInputProps } from '..';
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

  // it('should emit onFocus event when security is touched', async () => {
  //   const onFocus = jest.fn();
  //   const props = {
  //     ...$props,
  //     onFocus,
  //   };

  //   const { container } = createPasswordInput(props);
  //   const wrapper = container.querySelector('.rc-password-input__security');
  //   await TestsEvent.triggerTouch(wrapper, 'touchstart', [[0, 0]]);
  //   expect(onFocus).toHaveBeenCalled();
  // });

  it('should emit onFocus event when wrapper is focused', async () => {
    const onFocus = jest.fn();
    const props = {
      ...$props,
      onFocus,
    };

    const { container } = createPasswordInput(props);
    const wrapper = container.querySelector('.rc-password-input');
    await fireEvent.focus(wrapper);
    expect(onFocus).toHaveBeenCalled();
  });

  it('should emit onBlur event after clicking outside', async () => {
    const onBlur = jest.fn();
    const props = {
      ...$props,
      focused: true,
      keyboard: <NumberKeyboard theme="custom" />,
      onBlur,
    };

    const { getAllByRole, container } = createPasswordInput(props);
    const keyBlur = getAllByRole('button')[9];
    const keyClose = getAllByRole('button')[12];
    const wrapper = container.querySelector('.rc-password-input');

    await clickKey(keyBlur);
    await clickKey(keyClose);
    await fireEvent.blur(wrapper);

    expect(onBlur).toHaveBeenCalled();
  });

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

  it('should emit onChange event after press delete button', async () => {
    const onChange = jest.fn();
    const props = {
      ...$props,
      value: '12',
      focused: true,
      onChange,
      keyboard: <NumberKeyboard />,
    };

    const { getAllByRole } = createPasswordInput(props);
    const key = getAllByRole('button')[11];
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

  it('should render correctly when using mask prop', async () => {
    const props = {
      ...$props,
      value: '1',
      mask: false,
    };

    const { getByText } = createPasswordInput(props);
    const item = getByText('1');
    expect(item).toMatchSnapshot();
  });

  it('should render correctly when using gutter prop', async () => {
    const props = {
      ...$props,
      gutter: 10,
    };

    const { container } = createPasswordInput(props);
    expect(container).toMatchSnapshot();
  });

  it('should render correctly when using length prop', async () => {
    const props = {
      ...$props,
      length: 4,
    };

    const { container, rerender } = createPasswordInput(props);
    expect(container).toMatchSnapshot();
    const props2 = {
      ...$props,
      length: 6,
      value: undefined,
    };
    await waitFor(() => rerender(<PasswordInput {...props2} />));
    expect(container).toMatchSnapshot();
  });

  it("test instance's function", async () => {
    const onBlur = jest.fn();
    const onFocus = jest.fn();
    const onChange = jest.fn();
    const Demo = () => {
      const passwordInputRef = useRef<PasswordInputInstance>(null);

      const handleFocus = () => {
        passwordInputRef.current?.focus();
      };

      const handleBlur = () => {
        passwordInputRef.current?.blur();
      };
      const props = {
        ...$props,
        onFocus,
        onBlur,
        onChange,
      };

      return (
        <div>
          <PasswordInput ref={passwordInputRef} {...props} />,
          <button type="button" data-testid="button1" onClick={handleFocus}>
            handleFocus
          </button>
          <button type="button" data-testid="button2" onClick={handleBlur}>
            handleBlur
          </button>
        </div>
      );
    };

    const { container, getByTestId } = render(<Demo />);

    const buttonBox1 = getByTestId('button1');
    const buttonBox2 = getByTestId('button2');

    await fireEvent.click(buttonBox1);
    expect(onFocus).toHaveBeenCalled();

    const input = container.querySelector('.rc-password-input__native-input');
    fireEvent.change(input, { target: { value: '123' } });
    expect(onChange).toHaveBeenCalledWith('123');

    fireEvent.click(buttonBox2);
    expect(onBlur).toHaveBeenCalled();
  });
});
