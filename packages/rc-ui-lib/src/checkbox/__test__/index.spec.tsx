import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { Checkbox } from '..';

import mountTest from '../../../tests/shared/mountTest';

import { sleep } from '../../../tests/utils';
import {
  CheckboxGroupInstance,
  CheckboxGroupToggleAllOptions,
  CheckboxInstance,
} from '../PropsType';

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
    const wrapper = mount(<Checkbox onChange={onChange}>Label</Checkbox>);

    const icon = wrapper.find('.rc-checkbox__icon');
    icon.simulate('click');
    expect(onChange).toBeCalledWith(true);

    await wrapper.setProps({ checked: true });
    icon.simulate('click');
    expect(onChange).toBeCalledWith(false);
  });

  it('should emit toggle event when checkbox is clicked', async () => {
    // const onToggle = jest.fn();
    const checkboxRef = React.createRef<CheckboxInstance>();
    const toggle = (checked?: boolean) => {
      checkboxRef.current.toggle(checked);
    };
    const wrapper = mount(<Checkbox ref={checkboxRef}>Label</Checkbox>);

    await act(async () => {
      toggle();
    });
    wrapper.update();
    await sleep();
    expect(wrapper.childAt(0).props().checked).toEqual(true);
    // expect(onToggle).toBeCalled();
  });

  it('should not emit "change" event when checkbox icon is disabled and clicked', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Checkbox defaultChecked disabled onChange={onChange}>
        Label
      </Checkbox>,
    );

    wrapper.find('.rc-checkbox__icon').simulate('click');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should render "rc-checkbox--label-disabled" class when using label-disabled prop', () => {
    const wrapper = mount(
      <Checkbox defaultChecked labelDisabled onChange={jest.fn()}>
        Label
      </Checkbox>,
    );

    expect(wrapper.find('.rc-checkbox--label-disabled')).toBeTruthy();
  });

  it('should emit "change" event when label is clicked', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Checkbox defaultChecked onChange={onChange}>
        Label
      </Checkbox>,
    );

    const icon = wrapper.find('.rc-checkbox__label');
    icon.simulate('click');
    expect(onChange).toBeCalledWith(false);
  });

  it('should not emit "change" event when label is disabled and clicked', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Checkbox defaultChecked labelDisabled onChange={onChange}>
        Label
      </Checkbox>,
    );

    const icon = wrapper.find('.rc-checkbox__label');
    icon.simulate('click');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should adjust label position when using label-position prop', () => {
    const wrapper = mount(
      <Checkbox defaultChecked labelPosition="left" onChange={jest.fn()}>
        Label
      </Checkbox>,
    );

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should emit click event when checkbox icon is clicked', async () => {
    const onClick = jest.fn();
    const wrapper = mount(
      <Checkbox defaultChecked labelPosition="left" onClick={onClick}>
        Label
      </Checkbox>,
    );

    wrapper.simulate('click');
    expect(onClick).toHaveBeenCalledTimes(1);

    const icon = wrapper.find('.rc-checkbox__icon');
    icon.simulate('click');
    expect(onClick).toHaveBeenCalledTimes(2);
  });
});

describe('Checkbox.Group', () => {
  mountTest(Checkbox.Group);

  it('renders correctly', () => {
    const wrapper = mount(
      <Checkbox.Group value={['1']}>
        <Checkbox name="0">选项一</Checkbox>
        <Checkbox name="1" checked>
          选项二
        </Checkbox>
        <Checkbox name="2">选项三</Checkbox>
      </Checkbox.Group>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('render value correctly', () => {
    const wrapper = mount(
      <Checkbox.Group value={['0']}>
        <Checkbox name="0">选项一</Checkbox>
        <Checkbox name="1">选项二</Checkbox>
        <Checkbox name="2">选项三</Checkbox>
      </Checkbox.Group>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should change icon size when using icon-size prop', () => {
    const wrapper = mount(
      <Checkbox.Group value={['1']} iconSize="10rem">
        <Checkbox name="0">选项一</Checkbox>
        <Checkbox name="1" iconSize="5rem" checked>
          选项二
        </Checkbox>
      </Checkbox.Group>,
    );

    const icons = wrapper.find('.rc-checkbox__icon');
    // expect(icons).toHaveLength(2);
    // console.log(icons.debug());
    // console.log(icons.at(0).getDOMNode());
    // console.log(icons.at(0).getDOMNode());
    expect(icons.at(0).getDOMNode().style.fontSize).toEqual('10rem');
    expect(icons.at(1).getDOMNode().style.fontSize).toEqual('5rem');
  });

  it('should limit change num when using max prop', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Checkbox.Group value={['a', 'b']} max={2} onChange={onChange}>
        <Checkbox name="a">选项一</Checkbox>
        <Checkbox name="b">选项二</Checkbox>
        <Checkbox name="c">选项三</Checkbox>
      </Checkbox.Group>,
    );

    const icons = wrapper.find('.rc-checkbox__icon');
    icons.at(2).simulate('click');
    expect(onChange).toHaveBeenCalledTimes(0);
    icons.at(0).simulate('click');
    expect(onChange).toHaveBeenCalledTimes(1);
    icons.at(1).simulate('click');
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it('should change checked color when using checked-color prop', () => {
    const wrapper = mount(
      <Checkbox.Group value={['a', 'b']} checkedColor="black">
        <Checkbox name="a">选项一</Checkbox>
        <Checkbox name="b" checkedColor="white">
          选项二
        </Checkbox>
      </Checkbox.Group>,
    );

    const icons = wrapper.find('i.van-icon');
    // console.log(icons.at(0).getDOMNode().style);
    // console.log(icons.at(1).getDOMNode().style);
    expect(icons).toHaveLength(2);
    expect(icons.at(0).getDOMNode().style.backgroundColor).toEqual('black');
    expect(icons.at(1).getDOMNode().style.backgroundColor).toEqual('white');
  });

  it('should ignore Checkbox if bind-group is false', async () => {
    const onChange = jest.fn();
    const groupValue = [];
    const groupRef = React.createRef<CheckboxGroupInstance>();
    const toggleAll = (checked?: boolean) => {
      groupRef.current.toggleAll(checked);
    };
    const wrapper = mount(
      <Checkbox.Group value={groupValue} ref={groupRef} onChange={onChange}>
        <Checkbox checked={false} name="a" bindGroup={false} />
        <Checkbox name="b" />
        <Checkbox name="c" />
      </Checkbox.Group>,
    );

    const items = wrapper.find('.rc-checkbox');
    items.at(0).simulate('click');
    expect(wrapper.props().value).toEqual([]);
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
    mount(
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
