import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { sleep } from '../../../tests/utils';
import Icon from '../../icon';
import { Field } from '..';

describe('Field', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('should update value when after inputting', async () => {
    const onChange = jest.fn();
    const { container } = render(<Field onChange={onChange} />);
    const mockedEvent = {
      preventDefault: jest.fn(),
      target: { value: 'world' },
    };
    const input = container.querySelector('input');
    await fireEvent.change(input, mockedEvent);

    expect(onChange).toHaveBeenCalledWith('world');
  });

  it('should emit onClickInput event when input is clicked', async () => {
    const onClickInput = jest.fn();
    const { container } = render(<Field onClickInput={onClickInput} />);
    const input = container.querySelector('input');
    await fireEvent.click(input);
    expect(onClickInput).toHaveBeenCalled();
  });

  it('should emit click-input event when using input slot', async () => {
    const onClickInput = jest.fn();
    const { container } = render(
      <Field onClickInput={onClickInput}>
        <input />
      </Field>,
    );
    const control = container.querySelector('.rc-field__control');
    await fireEvent.click(control);
    expect(onClickInput).toHaveBeenCalled();
  });

  it('should onClickLeftIcon event when left icon is clicked', async () => {
    const onClickLeftIcon = jest.fn();
    const { container } = render(
      <Field leftIcon="contact" onClickLeftIcon={onClickLeftIcon} iconPrefix="my-icon" />,
    );
    const icon = container.querySelector('.rc-field__left-icon');
    await fireEvent.click(icon);
    expect(onClickLeftIcon).toHaveBeenCalled();
  });

  it('should emit onClickRightIcon event when right icon is clicked', async () => {
    const onClickRightIcon = jest.fn();
    const { container } = render(<Field rightIcon="search" onClickRightIcon={onClickRightIcon} />);
    const icon = container.querySelector('.rc-field__right-icon');
    await fireEvent.click(icon);
    expect(onClickRightIcon).toHaveBeenCalled();
  });

  it('should format input value when type is number', async () => {
    const onChange = jest.fn();
    const { container } = render(<Field type="number" onChange={onChange} />);
    const input = container.querySelector('input');
    await fireEvent.change(input, { preventDefault: jest.fn(), target: { value: '1' } });

    expect(onChange).toHaveBeenCalledWith('1');

    await fireEvent.change(input, { preventDefault: jest.fn(), target: { value: '2' } });
    expect(onChange).toHaveBeenCalledWith('2');

    await fireEvent.change(input, { preventDefault: jest.fn(), target: { value: '123abc' } });
    expect(onChange).toHaveBeenCalledWith('123');
  });

  it('should format input value when type is digit', async () => {
    const onChange = jest.fn();
    const { container } = render(<Field type="digit" value="" onChange={onChange} />);

    const input = container.querySelector('input');

    await fireEvent.change(input, { preventDefault: jest.fn(), target: { value: '1' } });
    expect(onChange).toHaveBeenCalledWith('1');

    await fireEvent.change(input, { preventDefault: jest.fn(), target: { value: '2' } });
    expect(onChange).toHaveBeenCalledWith('2');

    await fireEvent.change(input, { preventDefault: jest.fn(), target: { value: '123abc' } });
    expect(onChange).toHaveBeenCalledWith('123');
  });

  it('should render textarea when type is textarea', async () => {
    const { container } = render(<Field type="textarea" autosize />);
    await sleep(0);
    expect(container).toMatchSnapshot();
  });

  it('should autosize textarea field', async () => {
    const { container, rerender } = render(<Field type="textarea" autosize />);

    const value = '1'.repeat(20);
    const textarea = container.querySelector('.rc-field__control');

    rerender(<Field type="textarea" autosize value={value} />);
    expect(textarea.textContent).toEqual(value);
  });

  it('should allow autosize prop be be an object', async () => {
    window.scrollTo = jest.fn();
    const autosize = {
      maxHeight: 100,
      minHeight: 50,
    };

    const { container } = render(<Field type="textarea" autosize={autosize} />);
    const textarea = container.querySelector('.rc-field__control');
    await sleep(0);
    expect(getComputedStyle(textarea).height).toEqual('50px');
  });

  it('should onFocus call correctly', async () => {
    const onFocus = jest.fn();
    const { container } = render(<Field type="text" onFocus={onFocus} />);
    const input = container.querySelector('input');
    await fireEvent.focus(input);
    expect(onFocus).toHaveBeenCalled();
  });

  it('should onBlur called correctly', async () => {
    const onBlur = jest.fn();
    const { container } = render(<Field type="text" onBlur={onBlur} />);
    const input = container.querySelector('input');
    await fireEvent.blur(input);
    expect(onBlur).toHaveBeenCalled();
  });

  it('should limit maxlength of input value when using maxlength prop', async () => {
    const onChange = jest.fn();
    const { container } = render(
      <Field type="number" maxlength={3} value="1234" onChange={onChange} />,
    );
    const input = container.querySelector('input');
    await fireEvent.change(input, { target: { value: '12345' } });
    expect(onChange).toHaveBeenCalledWith('123');
  });

  it('should render clear icon when using clearable prop', async () => {
    const onFocus = jest.fn();
    const { container } = render(<Field clearable type="text" value="test" onFocus={onFocus} />);
    expect(container.querySelector('.rc-field__clear')).toBeFalsy();
    const input = container.querySelector('input');
    await fireEvent.focus(input);
    expect(container.querySelector('.rc-field__clear')).toBeTruthy();
  });

  it('should always render clear icon when clear-trigger prop is always', async () => {
    const { container, rerender } = render(<Field clearable type="text" value="test" />);
    expect(container.querySelector('.rc-field__clear')).toBeFalsy();
    rerender(<Field clearable type="text" value="test" clearTrigger="always" />);
    expect(container.querySelector('.rc-field__clear')).toBeTruthy();
  });

  it('should render extra slot correctly', () => {
    const { container } = render(
      <Field type="text" value="test" extra={<Icon name="success" />} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should change cell size when using size prop', () => {
    const { container } = render(<Field type="text" value="test" size="large" />);
    expect(container.querySelector('.rc-cell--large')).toBeTruthy();
  });

  it('should render label slot correctly', () => {
    const { container } = render(<Field type="text" value="test" label="Lable" />);
    expect(container.querySelector('.rc-field__label')).toMatchSnapshot();
  });

  it('should allow to set label width with unit', () => {
    const { container } = render(
      <Field type="text" value="test" label="Lable" labelWidth="10rem" />,
    );
    const label = container.querySelector('.rc-field__label');
    expect(getComputedStyle(label).width).toEqual('10rem');
  });

  it('should allow to set label width without unit', () => {
    const { container } = render(<Field type="text" value="test" label="Lable" labelWidth={100} />);
    const label = container.querySelector('.rc-field__label');
    expect(getComputedStyle(label).width).toEqual('100px');
  });

  it('should render label class name when using labelClass prop', () => {
    const { container } = render(
      <Field type="text" value="test" label="Lable" labelClass="custom-class" />,
    );
    expect(
      container.querySelector('.rc-field__label').classList.contains('custom-class'),
    ).toBeTruthy();
  });

  it('should change arrow direction when using arrow-direction prop', () => {
    const { container } = render(<Field type="text" value="test" isLink arrowDirection="up" />);
    expect(container.querySelector('.van-icon-arrow-up')).toBeTruthy();
  });

  it('should allow to format value with formatter prop', async () => {
    const onChange = jest.fn();
    const formatter = (value) => value.replace(/\d/g, '');
    const { container } = render(<Field type="text" formatter={formatter} onChange={onChange} />);
    const input = container.querySelector('input');
    await fireEvent.change(input, { preventDefault: jest.fn(), target: { value: 'abc123' } });
    // expect(onChange).toHaveBeenCalledWith("abc") 功能同下;
    expect(onChange.mock.calls[0][0]).toEqual('abc');
  });

  it('should trigger format after blurring when format-trigger prop is blur', async () => {
    const onChange = jest.fn();
    const formatter = (value) => value.replace(/\d/g, '');
    const { container, rerender } = render(
      <Field
        type="text"
        value="abc123"
        formatter={formatter}
        formatTrigger="onBlur"
        onChange={onChange}
      />,
    );

    const input = container.querySelector('input');
    await fireEvent.change(input, { preventDefault: jest.fn(), target: { value: '123efg' } });
    expect(onChange.mock.calls[0][0]).toEqual('123efg');

    rerender(
      <Field
        type="text"
        value="123efg"
        formatter={formatter}
        formatTrigger="onBlur"
        onChange={onChange}
      />,
    );

    await fireEvent.focus(input);
    await fireEvent.blur(input);

    expect(onChange).toHaveBeenCalledWith('efg');
  });

  it('should render word limit correctly', async () => {
    const onChange = jest.fn();
    const { container } = render(
      <Field type="textarea" maxlength={3} showWordLimit onChange={onChange} />,
    );
    const input = container.querySelector('textarea');
    await fireEvent.change(input, { target: { value: 'world' } });
    expect(onChange).toHaveBeenCalledWith('wor');
    expect(container).toMatchSnapshot();
  });

  it('should render word limit correctly when value is undefined', () => {
    const { container } = render(
      <Field type="text" value={undefined} maxlength={3} showWordLimit />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render input name when using name prop', () => {
    const { container } = render(<Field type="text" name="world" />);
    expect(container.querySelector('input').name).toEqual('world');
  });

  it('should render colon when using colon prop', () => {
    const { container } = render(<Field type="text" label="world" colon />);
    expect(container.querySelector('.rc-field__label').textContent).toEqual('world:');
    expect(container.querySelector('.rc-field__label')).toMatchSnapshot();
  });

  it('should blur search input after pressing enter', async () => {
    const onKeypress = jest.fn();
    const inputRef = jest.fn();
    const { container } = render(
      <Field getInputRef={inputRef} type="search" onKeypress={onKeypress} />,
    );
    const input = container.querySelector('input');
    await fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });
    expect(onKeypress).toHaveBeenCalledTimes(1);
  });

  it('should format value after mounted if initial value is null', () => {
    const { container } = render(<Field type="text" value="" />);
    expect(container.querySelector('input').value).toEqual('');
  });

  it('should change clear icon when using clear-icon prop', async () => {
    const onFocus = jest.fn();
    const { container } = render(
      <Field type="text" clearIcon="cross" clearable value="test" onFocus={onFocus} />,
    );
    const input = container.querySelector('input');
    await fireEvent.focus(input);
    expect(onFocus).toHaveBeenCalled();
    expect(container.querySelector('.rc-field__clear')).toMatchSnapshot();
  });

  it('should render error-message slot correctly', async () => {
    const { container } = render(<Field type="text" errorMessage="this is an error message" />);
    expect(container.querySelector('.rc-field__error-message').textContent).toEqual(
      'this is an error message',
    );
    expect(container.querySelector('.rc-field__error-message')).toMatchSnapshot();
  });

  it('should render correctly when tooltip is not vaildElement or string ', async () => {
    const { container } = render(
      <Field type="text" label="label" tooltip={{ message: 'world' }} />,
    );
    const tooltip = container.querySelector('.rc-field__tooltip');
    await fireEvent.click(tooltip);
    const dialogMessage = global.document.body.querySelector('.rc-dialog__message');
    expect(dialogMessage.textContent).toEqual('world');
  });

  it('should emit onClear event correctly', async () => {
    const onChange = jest.fn();
    const onClear = jest.fn();

    const { container } = render(
      <Field
        type="text"
        label="label"
        value="abc"
        clearable
        onClear={onClear}
        onChange={onChange}
      />,
    );
    const input = container.querySelector('input');
    await fireEvent.focus(input);
    const icon = container.querySelector('.van-icon');
    const touchStartEvent = { touches: [{ clientX: 0, clientY: 0 }] } as unknown as TouchEvent;
    await fireEvent.touchStart(icon, touchStartEvent);
    expect(onChange).toHaveBeenCalled();
    expect(onClear).toHaveBeenCalled();
  });

  it('should render intro correctly', async () => {
    const { container } = render(
      <Field type="text" label="label" value="abc" intro={<Icon name="shop-o" />} />,
    );
    expect(container.querySelector('i').classList.contains('van-icon-shop-o')).toBeTruthy();
  });

  it('should render correctly when readonly', async () => {
    const { container } = render(<Field type="text" label="label" value="abc" readonly />);
    const input = container.querySelector('input');
    await fireEvent.focus(input);
    expect(container).toMatchSnapshot();
  });
});
