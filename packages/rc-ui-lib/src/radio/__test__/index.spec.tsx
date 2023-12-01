import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { Radio } from '..';

describe('Radio', () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('should emit "update:modelValue" event when radio icon or label is clicked', async () => {
    const onClick = jest.fn();
    const { container, rerender } = render(
      <Radio name="a" onClick={onClick} defaultChecked={false}>
        单选框
      </Radio>,
    );

    const icon = container.querySelector('.rc-radio__icon');
    const label = container.querySelector('.rc-radio__label');
    await fireEvent.click(icon);
    expect(onClick).toHaveBeenCalledTimes(1);
    rerender(
      <Radio name="a" onClick={onClick} defaultChecked={false} checked={false}>
        单选框
      </Radio>,
    );
    await fireEvent.click(label);
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('should not emit "update:modelValue" event when radio icon is disabled and clicked', async () => {
    const onChange = jest.fn();
    const { container } = render(
      <Radio name="a" onChange={onChange} defaultChecked disabled>
        单选框
      </Radio>,
    );

    const icon = container.querySelector('.rc-radio__icon');
    await fireEvent.click(icon);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should render "rc-radio--label-disabled" class when using label-disabled prop', () => {
    const { container } = render(
      <Radio name="a" defaultChecked labelDisabled>
        单选框
      </Radio>,
    );
    expect(container.querySelector('.rc-radio--label-disabled')).toBeTruthy();
  });

  it('should not emit "update:modelValue" event when label is disabled and clicked', async () => {
    const onChange = jest.fn();
    const { container } = render(
      <Radio name="a" onChange={onChange} defaultChecked labelDisabled>
        单选框
      </Radio>,
    );

    const label = container.querySelector('.rc-radio__label');
    await fireEvent.click(label);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should adjust label position when using label-position prop', () => {
    const { container } = render(
      <Radio name="a" defaultChecked labelPosition="left">
        单选框
      </Radio>,
    );
    expect(container.querySelector('.rc-radio__label--left')).toBeTruthy();
  });

  it('should emit click event when radio icon is clicked', async () => {
    const onClick = jest.fn();
    const { container } = render(
      <Radio name="a" defaultChecked onClick={onClick}>
        单选框
      </Radio>,
    );
    await fireEvent.click(container.querySelector('.rc-radio'));
    expect(onClick).toHaveBeenCalled();
  });

  it('should emit click event when radio icon is clicked', async () => {
    const onClick = jest.fn();
    const { container } = render(
      <Radio name="a" defaultChecked onClick={onClick}>
        单选框
      </Radio>,
    );
    await fireEvent.click(container.querySelector('.rc-radio'));
    expect(onClick).toHaveBeenCalled();
  });

  it('should render Radio.Group correctly when using defaultValue prop', async () => {
    const { container } = render(
      <Radio.Group defaultValue="1">
        <Radio name="1">单选框 1</Radio>
        <Radio name="2">单选框 2</Radio>
      </Radio.Group>,
    );

    expect(container.querySelector('.rc-radio .rc-radio__icon--checked')).toBeTruthy();
  });

  it('should render Radio.Group correctly when using direction prop', async () => {
    const { container } = render(
      <div>
        <Radio.Group direction="horizontal" />
      </div>,
    );
    expect(container.querySelector('.rc-radio-group--horizontal')).toBeTruthy();
  });

  it('should render Radio.Group correctly when using disabled prop', async () => {
    const onClick = jest.fn();
    const onChange = jest.fn();
    const { container } = render(
      <Radio.Group defaultValue="1" disabled onChange={onChange}>
        <Radio name="1">单选框 1</Radio>
        <Radio name="2" onClick={onClick}>
          单选框 2
        </Radio>
      </Radio.Group>,
    );

    const radio = container.querySelectorAll('.rc-radio')[1];
    await fireEvent.click(radio);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should render Radio.Group correctly when using iconSize prop', async () => {
    const { container } = render(
      <Radio.Group defaultValue="1" iconSize="30">
        <Radio name="1">单选框 1</Radio>
        <Radio name="2">单选框 2</Radio>
      </Radio.Group>,
    );
    container.querySelectorAll('.rc-radio__icon').forEach((element) => {
      expect(getComputedStyle(element).fontSize).toEqual('30px');
    });
  });

  it('should render Radio.Group correctly when using checkedColor prop', async () => {
    const { container } = render(
      <Radio.Group defaultValue="1" checkedColor="red">
        <Radio name="1">单选框 1</Radio>
        <Radio name="2">单选框 2</Radio>
      </Radio.Group>,
    );
    expect(getComputedStyle(container.querySelector('.van-icon')).backgroundColor).toEqual('red');

    await fireEvent.click(container.querySelectorAll('.van-icon')[1]);
    expect(getComputedStyle(container.querySelector('.van-icon')).backgroundColor).toBeFalsy();
  });

  it('should emit onChange event in Radio.Group', async () => {
    const onChange = jest.fn();
    const { container } = render(
      <Radio.Group defaultValue="1" onChange={onChange}>
        <Radio name="1">单选框 1</Radio>
        <Radio name="2">单选框 2</Radio>
      </Radio.Group>,
    );
    await fireEvent.click(container.querySelectorAll('.van-icon')[1]);
    expect(onChange).toHaveBeenCalledWith('2');
  });
});
