import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { ActionSheet } from '..';
import { sleep } from '../../../tests/utils';

describe('Popup', () => {
  let wrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  test('should emit select event after clicking option', async () => {
    // const wrapper = mount(ActionSheet, {
    //     props: {
    //         show: true,
    //         actions: [{ name: 'Option' }],
    //     },
    // });
    const actions = [{ name: 'Option' }];
    const onSelect = jest.fn();
    wrapper = mount(<ActionSheet visible actions={actions} onSelect={onSelect} />);
    wrapper.find('.rc-action-sheet__item').simulate('click');
    await sleep(0);
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(
      {
        name: 'Option',
      },
      0,
    );
  });
  test('should call callback function after clicking option', () => {
    const callback = jest.fn();
    const actions = [{ name: 'Option', callback }];
    wrapper = mount(<ActionSheet visible actions={actions} />);
    wrapper.find('.rc-action-sheet__item').simulate('click');
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should not emit select event after clicking loading option', async () => {
    const onSelect = jest.fn();
    const actions = [{ name: 'Option', loading: true }];
    wrapper = mount(<ActionSheet visible actions={actions} onSelect={onSelect} />);
    wrapper.find('.rc-action-sheet__item').simulate('click');
    await sleep(0);
    expect(onSelect).not.toHaveBeenCalled();
  });

  test('should not emit select event after clicking disabled option', async () => {
    const onSelect = jest.fn();
    const actions = [{ name: 'Option', disabled: true }];
    wrapper = mount(<ActionSheet visible actions={actions} onSelect={onSelect} />);
    wrapper.find('.rc-action-sheet__item').simulate('click');
    await sleep(0);
    expect(onSelect).not.toHaveBeenCalled();
  });

  test('should emit cancel event after clicking cancel button', () => {
    const onCancel = jest.fn();
    const actions = [{ name: 'Option' }];
    wrapper = mount(
      <ActionSheet visible actions={actions} cancelText="Cancel" onCancel={onCancel} />,
    );
    wrapper.find('.rc-action-sheet__cancel').simulate('click');
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  test('should render subname correctly', () => {
    const actions = [{ name: 'Option', subname: 'Subname' }];
    wrapper = mount(<ActionSheet visible actions={actions} cancelText="Cancel" />);
    expect(wrapper.find('.rc-action-sheet__subname').text()).toEqual('Subname');
    expect(wrapper.find('.rc-action-sheet__item').html()).toMatchSnapshot();
  });

  test('should render default slot correctly', () => {
    wrapper = mount(
      <ActionSheet visible title="Title">
        Default
      </ActionSheet>,
    );
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('should have "van-popup--round" class when setting the round prop', () => {
    wrapper = mount(<ActionSheet visible round />);
    expect(wrapper.find('.rc-popup--round').exists()).toBeTruthy();
  });

  test('should change option color when using the color prop', () => {
    const actions = [{ name: 'Option', color: 'red' }];
    wrapper = mount(<ActionSheet visible actions={actions} />);
    const item = wrapper.find('.rc-action-sheet__item');
    expect(item.getDOMNode().style.color).toEqual('red');
  });

  test('should hide close icon when the closeable prop is false', async () => {
    wrapper = mount(<ActionSheet visible title="Title" />);
    expect(wrapper.find('.rc-action-sheet__close').exists()).toBeTruthy();

    await wrapper.setProps({ closeable: false });
    expect(wrapper.find('.rc-action-sheet__close').exists()).toBeFalsy();
  });

  test('should allow to custom close icon with closeIcon prop', () => {
    wrapper = mount(<ActionSheet visible title="Title" closeIcon="success" />);
    expect(toJson(wrapper.find('.rc-action-sheet__close'))).toMatchSnapshot();
  });

  test('should render description correctly', () => {
    wrapper = mount(<ActionSheet visible description="This is a description" />);
    expect(wrapper.find('.rc-action-sheet__description').text()).toEqual('This is a description');
    expect(toJson(wrapper.find('.rc-action-sheet__description'))).toMatchSnapshot();
  });

  // test('should close after clicking option if close-on-click-action prop is true', () => {
  //     const actions = [{ name: 'Option' }];
  //     wrapper = mount(<ActionSheet visible closeOnClickAction actions={actions} />);
  //     wrapper.find('.rc-action-sheet__item').simulate('click');
  //     console.log("============", wrapper.find(".rc-action-sheet").at(1).html());
  //     expect(wrapper.find(".rc-action-sheet").at(1).getDOMNode().style.display).toEqual("none");
  // });

  test('should emit click-overlay event and closed after clicking the overlay', () => {
    const onClickOverlay = jest.fn();
    const actions = [{ name: 'Option' }];
    wrapper = mount(<ActionSheet visible onClickOverlay={onClickOverlay} actions={actions} />);

    wrapper.find('.rc-overlay').simulate('click');
    // expect(wrapper.emitted('update:show')![0]).toEqual([false]);
    expect(onClickOverlay).toHaveBeenCalledTimes(1);
  });

  test('should allow to control safe-area with safe-area-inset-bottom prop', async () => {
    wrapper = mount(<ActionSheet visible />);
    expect(wrapper.find('.rc-action-sheet').at(1).hasClass('rc-safe-area-bottom')).toBeTruthy();

    await wrapper.setProps({
      safeAreaInsetBottom: false,
    });
    expect(wrapper.find('.rc-action-sheet').at(1).hasClass('rc-safe-area-bottom')).toBeFalsy();
  });
});
