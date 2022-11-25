import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { sleep } from '../../../tests/utils';
import Icon from '../../icon';
import { Field } from '..';

describe('Field', () => {
  let wrapper;
  afterEach(() => {
    wrapper.unmount();
    jest.clearAllMocks();
  });

  it('should update value when after inputting', () => {
    const onChange = jest.fn();
    wrapper = mount(<Field onChange={onChange} />);
    const mockedEvent = {
      preventDefault: jest.fn(),
      target: { value: 'world' },
    };
    wrapper.find('input').simulate('change', mockedEvent);
    wrapper.update();
    expect(onChange).toHaveBeenCalledWith('world');
  });

  it('should emit onClickInput event when input is clicked', () => {
    const onClickInput = jest.fn();
    wrapper = mount(<Field onClickInput={onClickInput} />);
    wrapper.find('input').simulate('click');
    expect(onClickInput).toHaveBeenCalled();
  });

  it('should emit click-input event when using input slot', () => {
    const onClickInput = jest.fn();
    wrapper = mount(
      <Field onClickInput={onClickInput}>
        <input />
      </Field>,
    );
    wrapper.find('.rc-field__control').simulate('click');
    expect(onClickInput).toHaveBeenCalled();
  });

  it('should onClickLeftIcon event when left icon is clicked', () => {
    const onClickLeftIcon = jest.fn();
    wrapper = mount(
      <Field leftIcon="contact" onClickLeftIcon={onClickLeftIcon} iconPrefix="my-icon" />,
    );
    wrapper.find('.rc-field__left-icon').simulate('click');
    expect(onClickLeftIcon).toHaveBeenCalled();
  });

  it('should emit onClickRightIcon event when right icon is clicked', () => {
    const onClickRightIcon = jest.fn();
    wrapper = mount(<Field rightIcon="search" onClickRightIcon={onClickRightIcon} />);
    wrapper.find('.rc-field__right-icon').simulate('click');
    expect(onClickRightIcon).toHaveBeenCalled();
  });

  it('should format input value when type is number', () => {
    const onChange = jest.fn();
    wrapper = mount(<Field type="number" onChange={onChange} />);
    const input = wrapper.find('input');
    input.simulate('change', { preventDefault: jest.fn(), target: { value: '1' } });
    expect(onChange).toHaveBeenCalledWith('1');

    input.simulate('change', { preventDefault: jest.fn(), target: { value: '2' } });
    expect(onChange).toHaveBeenCalledWith('2');

    input.simulate('change', { preventDefault: jest.fn(), target: { value: '123abc' } });
    expect(onChange).toHaveBeenCalledWith('123');
  });

  it('should format input value when type is digit', () => {
    const onChange = jest.fn();
    wrapper = mount(<Field type="digit" value="" onChange={onChange} />);

    const input = wrapper.find('input');

    input.simulate('change', { preventDefault: jest.fn(), target: { value: '1' } });
    expect(onChange).toHaveBeenCalledWith('1');

    input.simulate('change', { preventDefault: jest.fn(), target: { value: '2' } });
    expect(onChange).toHaveBeenCalledWith('2');

    input.simulate('change', { preventDefault: jest.fn(), target: { value: '123abc' } });
    expect(onChange).toHaveBeenCalledWith('123');
  });

  it('should render textarea when type is textarea', async () => {
    wrapper = mount(<Field type="textarea" autosize />);
    await sleep(0);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should autosize textarea field', async () => {
    wrapper = mount(<Field type="textarea" autosize />);

    const value = '1'.repeat(20);
    const textarea = wrapper.find('.rc-field__control');

    await wrapper.setProps({ value });
    expect(textarea.text()).toEqual(value);
  });

  it('should allow autosize prop be be an object', async () => {
    window.scrollTo = jest.fn();
    const autosize = {
      maxHeight: 100,
      minHeight: 50,
    };

    wrapper = mount(<Field type="textarea" autosize={autosize} />);
    const textarea = wrapper.find('.rc-field__control');
    await sleep(0);
    expect(textarea.getDOMNode().style.height).toEqual('50px');
  });

  it('should onFocus call correctly', () => {
    const onFocus = jest.fn();
    wrapper = mount(<Field type="text" onFocus={onFocus} />);
    wrapper.find('input').simulate('focus');
    expect(onFocus).toHaveBeenCalled();
  });

  it('should onBlur called correctly', () => {
    const onBlur = jest.fn();
    wrapper = mount(<Field type="text" onBlur={onBlur} />);
    wrapper.find('input').simulate('blur');
    expect(onBlur).toHaveBeenCalled();
  });

  it('should limit maxlength of input value when using maxlength prop', async () => {
    const onChange = jest.fn();
    wrapper = mount(<Field type="number" maxlength={3} value="1234" onChange={onChange} />);
    const input = wrapper.find('input');
    await input.simulate('change');
    expect(onChange).toHaveBeenCalledWith('123');
  });

  it('should render clear icon when using clearable prop', async () => {
    const onFocus = jest.fn();
    wrapper = mount(<Field clearable type="text" value="test" onFocus={onFocus} />);
    expect(wrapper.find('.rc-field__clear').exists()).toBeFalsy();
    const input = wrapper.find('input');
    await input.simulate('focus');
    expect(wrapper.find('.rc-field__clear').exists()).toBeTruthy();
  });

  it('should always render clear icon when clear-trigger prop is always', async () => {
    wrapper = mount(<Field clearable type="text" value="test" />);
    expect(wrapper.find('.rc-field__clear').exists()).toBeFalsy();
    wrapper.setProps({ clearTrigger: 'always' });
    expect(wrapper.find('.rc-field__clear').exists()).toBeTruthy();
  });

  it('should render extra slot correctly', () => {
    wrapper = mount(<Field type="text" value="test" extra={<Icon name="success" />} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should change cell size when using size prop', () => {
    wrapper = mount(<Field type="text" value="test" size="large" />);
    expect(wrapper.find('.rc-cell--large').exists()).toBeTruthy();
  });

  it('should render label slot correctly', () => {
    wrapper = mount(<Field type="text" value="test" label="Lable" />);
    expect(toJson(wrapper.find('.rc-field__label'))).toMatchSnapshot();
  });

  it('should allow to set label width with unit', () => {
    wrapper = mount(<Field type="text" value="test" label="Lable" labelWidth="10rem" />);
    const label = wrapper.find('.rc-field__label');
    expect(label.getDOMNode().style.width).toEqual('10rem');
  });

  it('should allow to set label width without unit', () => {
    wrapper = mount(<Field type="text" value="test" label="Lable" labelWidth={100} />);
    const label = wrapper.find('.rc-field__label');
    expect(label.getDOMNode().style.width).toEqual('100px');
  });

  it('should render label class name when using labelClass prop', () => {
    wrapper = mount(<Field type="text" value="test" label="Lable" labelClass="custom-class" />);
    expect(wrapper.find('.rc-field__label').hasClass('custom-class')).toBeTruthy();
  });

  it('should change arrow direction when using arrow-direction prop', () => {
    wrapper = mount(<Field type="text" value="test" isLink arrowDirection="up" />);
    expect(wrapper.find('.van-icon-arrow-up').exists()).toBeTruthy();
  });

  it('should allow to format value with formatter prop', () => {
    const onChange = jest.fn();
    const formatter = (value) => value.replace(/\d/g, '');
    wrapper = mount(<Field type="text" formatter={formatter} onChange={onChange} />);
    wrapper
      .find('input')
      .simulate('change', { preventDefault: jest.fn(), target: { value: 'abc123' } });
    // expect(onChange).toHaveBeenCalledWith("abc") 功能同下;
    expect(onChange.mock.calls[0][0]).toEqual('abc');
  });

  it('should trigger format after blurring when format-trigger prop is blur', async () => {
    const onChange = jest.fn();
    const formatter = (value) => value.replace(/\d/g, '');
    wrapper = mount(
      <Field
        type="text"
        value="abc123"
        formatter={formatter}
        formatTrigger="onBlur"
        onChange={onChange}
      />,
    );

    wrapper
      .find('input')
      .simulate('change', { preventDefault: jest.fn(), target: { value: '123efg' } });
    expect(onChange.mock.calls[0][0]).toEqual('123efg');
    await wrapper.setProps({ value: '123efg' });

    wrapper.find('input').simulate('focus');
    wrapper.find('input').simulate('blur');
    expect(onChange).toHaveBeenCalledWith('efg');
  });

  it('should render word limit correctly', async () => {
    const onChange = jest.fn();
    wrapper = mount(<Field type="textarea" maxlength={3} showWordLimit onChange={onChange} />);
    wrapper.find('textarea').simulate('change', { target: { value: 'world' } });
    expect(onChange).toHaveBeenCalledWith('wor');
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render word limit correctly when value is undefined', () => {
    wrapper = mount(<Field type="text" value={undefined} maxlength={3} showWordLimit />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render input name when using name prop', () => {
    wrapper = mount(<Field type="text" name="world" />);
    expect(wrapper.find('input').props().name).toEqual('world');
  });

  it('should render colon when using colon prop', () => {
    wrapper = mount(<Field type="text" label="world" colon />);
    expect(wrapper.find('.rc-field__label').text()).toEqual('world:');
    expect(toJson(wrapper.find('.rc-field__label'))).toMatchSnapshot();
  });

  it('should blur search input after pressing enter', async () => {
    const onKeypress = jest.fn();
    const inputRef = jest.fn();
    wrapper = mount(<Field getInputRef={inputRef} type="search" onKeypress={onKeypress} />);
    await wrapper.find('input').simulate('keypress');
    expect(onKeypress).toHaveBeenCalledTimes(1);
  });

  it('should format value after mounted if initial value is null', () => {
    wrapper = mount(<Field type="text" value="" />);
    expect(wrapper.find('input').props().value).toEqual('');
  });

  it('should change clear icon when using clear-icon prop', async () => {
    const onFocus = jest.fn();
    wrapper = mount(
      <Field type="text" clearIcon="cross" clearable value="test" onFocus={onFocus} />,
    );
    const input = wrapper.find('input');
    await input.simulate('focus');
    expect(onFocus).toHaveBeenCalled();
    expect(toJson(wrapper.find('.rc-field__clear'))).toMatchSnapshot();
  });

  it('should render error-message slot correctly', async () => {
    wrapper = mount(<Field type="text" errorMessage="this is an error message" />);
    expect(wrapper.find('.rc-field__error-message').text()).toEqual('this is an error message');
    expect(toJson(wrapper.find('.rc-field__error-message'))).toMatchSnapshot();
  });

  it('should render correctly when tooltip is not vaildElement or string ', async () => {
    wrapper = mount(<Field type="text" label="label" tooltip={{ message: 'world' }} />);
    const tooltip = wrapper.find('.rc-field__tooltip');
    await tooltip.simulate('click');
    const dialogMessage = global.document.body.querySelector('.rc-dialog__message');
    expect(dialogMessage.textContent).toEqual('world');
  });

  it('should emit onClear event correctly', async () => {
    const onChange = jest.fn();
    const onClear = jest.fn();

    wrapper = mount(
      <Field
        type="text"
        label="label"
        value="abc"
        clearable
        onClear={onClear}
        onChange={onChange}
      />,
    );
    await wrapper.find('input').simulate('focus');
    wrapper.find(Icon).simulate('touchstart');
    expect(onChange).toHaveBeenCalled();
    expect(onClear).toHaveBeenCalled();
  });

  it('should render intro correctly', async () => {
    wrapper = mount(<Field type="text" label="label" value="abc" intro={<Icon name="shop-o" />} />);
    expect(wrapper.find('i').hasClass('van-icon-shop-o')).toBeTruthy();
  });

  it('should render correctly when readonly', async () => {
    wrapper = mount(<Field type="text" label="label" value="abc" readonly />);
    wrapper.find('input').simulate('focus');
  });
});
