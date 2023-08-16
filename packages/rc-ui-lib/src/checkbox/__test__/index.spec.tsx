import React from 'react';
import { act } from 'react-dom/test-utils';
import { Checkbox } from '..';

import mountTest from '../../../tests/shared/mountTest';

import { sleep } from '../../../tests/utils';
import {
  CheckboxGroupInstance,
  CheckboxGroupToggleAllOptions,
  CheckboxInstance,
} from '../PropsType';
import { fireEvent, render } from '@testing-library/react';

describe('Checkbox', () => {
  mountTest(Checkbox);
  mountTest(() => (
    <Checkbox checked onChange={jest.fn()}>
      Label
    </Checkbox>
  ));

  it('renders correctly', () => {
    expect(
      <Checkbox defaultChecked onChange={jest.fn()}>
        Label
      </Checkbox>,
    ).toMatchRenderedSnapshot();
  });

  it('render Custom icon correctly', () => {
    const activeIcon = 'https://img.yzcdn.cn/vant/user-active.png';
    const inactiveIcon = 'https://img.yzcdn.cn/vant/user-inactive.png';
    expect(
      <Checkbox
        defaultChecked
        iconRender={({ checked: isActive }) => (
          <img alt="" src={isActive ? activeIcon : inactiveIcon} />
        )}
      >
        自定义图标
      </Checkbox>,
    ).toMatchRenderedSnapshot();
  });

  it('should emit change event when checkbox icon is clicked', async () => {
    const onChange = jest.fn();
    const { container, rerender } = render(<Checkbox onChange={onChange}>Label</Checkbox>);

    const icon = container.querySelector('.rc-checkbox__icon');
    await fireEvent.click(icon);
    expect(onChange).toBeCalledWith(true);

    rerender(
      <Checkbox onChange={onChange} checked>
        Label
      </Checkbox>,
    );
    await fireEvent.click(icon);
    expect(onChange).toBeCalledWith(false);
  });

  it('should emit toggle event when checkbox is clicked', async () => {
    // const onToggle = jest.fn();
    const checkboxRef = React.createRef<CheckboxInstance>();
    const toggle = (checked?: boolean) => {
      checkboxRef.current.toggle(checked);
    };
    const { container } = render(<Checkbox ref={checkboxRef}>Label</Checkbox>);

    await act(async () => {
      toggle();
    });
    await sleep();
    expect(container.querySelector('.rc-checkbox__icon--checked')).toBeTruthy();
    // expect(onToggle).toBeCalled();
  });

  it('should not emit "change" event when checkbox icon is disabled and clicked', async () => {
    const onChange = jest.fn();
    const { container } = render(
      <Checkbox defaultChecked disabled onChange={onChange}>
        Label
      </Checkbox>,
    );

    const icon = container.querySelector('.rc-checkbox__icon');
    await fireEvent.click(icon);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should render "rc-checkbox--label-disabled" class when using label-disabled prop', () => {
    const { container } = render(
      <Checkbox defaultChecked labelDisabled onChange={jest.fn()}>
        Label
      </Checkbox>,
    );

    expect(container.querySelector('.rc-checkbox--label-disabled')).toBeTruthy();
  });

  it('should emit "change" event when label is clicked', async () => {
    const onChange = jest.fn();
    const { container } = render(
      <Checkbox defaultChecked onChange={onChange}>
        Label
      </Checkbox>,
    );

    const icon = container.querySelector('.rc-checkbox__label');
    await fireEvent.click(icon);
    expect(onChange).toBeCalledWith(false);
  });

  it('should not emit "change" event when label is disabled and clicked', async () => {
    const onChange = jest.fn();
    const { container } = render(
      <Checkbox defaultChecked labelDisabled onChange={onChange}>
        Label
      </Checkbox>,
    );

    const icon = container.querySelector('.rc-checkbox__label');
    await fireEvent.click(icon);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should adjust label position when using label-position prop', () => {
    const { container } = render(
      <Checkbox defaultChecked labelPosition="left" onChange={jest.fn()}>
        Label
      </Checkbox>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should emit click event when checkbox icon is clicked', async () => {
    const onClick = jest.fn();
    const { container } = render(
      <Checkbox defaultChecked labelPosition="left" onClick={onClick}>
        Label
      </Checkbox>,
    );

    await fireEvent.click(container.querySelector('.rc-checkbox'));

    expect(onClick).toHaveBeenCalledTimes(1);

    const icon = container.querySelector('.rc-checkbox__icon');
    await fireEvent.click(icon);
    expect(onClick).toHaveBeenCalledTimes(2);
  });
});

describe('Checkbox.Group', () => {
  mountTest(Checkbox.Group);

  it('renders correctly', () => {
    const { container } = render(
      <Checkbox.Group value={['1']}>
        <Checkbox name="0">选项一</Checkbox>
        <Checkbox name="1" checked>
          选项二
        </Checkbox>
        <Checkbox name="2">选项三</Checkbox>
      </Checkbox.Group>,
    );
    expect(container).toMatchSnapshot();
  });

  it('render value correctly', () => {
    const { container } = render(
      <Checkbox.Group value={['0']}>
        <Checkbox name="0">选项一</Checkbox>
        <Checkbox name="1">选项二</Checkbox>
        <Checkbox name="2">选项三</Checkbox>
      </Checkbox.Group>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should change icon size when using icon-size prop', () => {
    const { container } = render(
      <Checkbox.Group value={['1']} iconSize="10rem">
        <Checkbox name="0">选项一</Checkbox>
        <Checkbox name="1" iconSize="5rem" checked>
          选项二
        </Checkbox>
      </Checkbox.Group>,
    );

    const icons = container.querySelectorAll('.rc-checkbox__icon');

    expect(getComputedStyle(icons[0]).fontSize).toEqual('10rem');
    expect(getComputedStyle(icons[1]).fontSize).toEqual('5rem');
  });

  it('should limit change num when using max prop', async () => {
    const onChange = jest.fn();
    const { container } = render(
      <Checkbox.Group value={['a', 'b']} max={2} onChange={onChange}>
        <Checkbox name="a">选项一</Checkbox>
        <Checkbox name="b">选项二</Checkbox>
        <Checkbox name="c">选项三</Checkbox>
      </Checkbox.Group>,
    );

    const icons = container.querySelectorAll('.rc-checkbox__icon');
    await fireEvent.click(icons[2]);
    expect(onChange).toHaveBeenCalledTimes(0);
    await fireEvent.click(icons[0]);
    expect(onChange).toHaveBeenCalledTimes(1);
    await fireEvent.click(icons[1]);
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it('should change checked color when using checked-color prop', () => {
    const { container } = render(
      <Checkbox.Group value={['a', 'b']} checkedColor="black">
        <Checkbox name="a">选项一</Checkbox>
        <Checkbox name="b" checkedColor="white">
          选项二
        </Checkbox>
      </Checkbox.Group>,
    );

    const icons = container.querySelectorAll('i.van-icon');
    expect(icons).toHaveLength(2);
    expect(getComputedStyle(icons[0]).backgroundColor).toEqual('black');
    expect(getComputedStyle(icons[1]).backgroundColor).toEqual('white');
  });

  it('should ignore Checkbox if bind-group is false', async () => {
    const onChange = jest.fn();
    const groupValue = [];
    const groupRef = React.createRef<CheckboxGroupInstance>();
    const toggleAll = (checked?: boolean) => {
      groupRef.current.toggleAll(checked);
    };
    const { container } = render(
      <Checkbox.Group value={groupValue} ref={groupRef} onChange={onChange}>
        <Checkbox checked={false} name="a" bindGroup={false} />
        <Checkbox name="b" />
        <Checkbox name="c" />
      </Checkbox.Group>,
    );

    const items = container.querySelector('.rc-checkbox');
    await fireEvent.click(items);
    // expect(container.props().value).toEqual([]);
    expect(onChange).not.toHaveBeenCalled();

    await act(async () => {
      toggleAll(true);
    });
    await sleep(0);
    expect(onChange).toBeCalledWith(['b', 'c']);
  });

  it('should toggle all checkboxes when toggleAll method is called', async () => {
    const onChange = jest.fn();
    const groupValue = [];
    const groupRef = React.createRef<CheckboxGroupInstance>();
    const toggleAll = (options?: CheckboxGroupToggleAllOptions) => {
      groupRef.current.toggleAll(options);
    };
    render(
      <Checkbox.Group value={groupValue} ref={groupRef} onChange={onChange}>
        <Checkbox name="a" />
        <Checkbox name="b" />
        <Checkbox name="c" disabled />
      </Checkbox.Group>,
    );

    await act(async () => {
      toggleAll();
    });
    await sleep(0);
    expect(onChange).toBeCalledWith(['a', 'b', 'c']);

    await act(async () => {
      toggleAll(false);
    });
    await sleep(0);
    expect(onChange).toBeCalledWith([]);

    await act(async () => {
      toggleAll(true);
    });
    await sleep(0);
    expect(onChange).toBeCalledWith(['a', 'b', 'c']);

    await act(async () => {
      toggleAll({ checked: true, skipDisabled: true });
    });
    await sleep(0);
    expect(onChange).toBeCalledWith(['a', 'b']);
  });
});
