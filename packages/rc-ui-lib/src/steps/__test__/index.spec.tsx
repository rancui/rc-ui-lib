import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Steps } from '..';
import { Icon } from '../../icon';

describe('Steps', () => {
  let wrapper;
  afterEach(() => {
    wrapper?.unmount();
    jest.restoreAllMocks();
  });

  test('should render correctly', () => {
    wrapper = mount(
      <Steps active={0}>
        <Steps.Item>B</Steps.Item>
        <Steps.Item>A</Steps.Item>
      </Steps>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('should render custom icon correctly', () => {
    wrapper = mount(
      <Steps
        active={1}
        activeIcon={<Icon name="success" />}
        finishIcon={<Icon name="finish" />}
        inactiveIcon={<Icon name="fail" />}
      >
        <Steps.Item>B</Steps.Item>
        <Steps.Item>A</Steps.Item>
        <Steps.Item>C</Steps.Item>
      </Steps>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('should emit click-step event when step is clicked', () => {
    const onClickStep = jest.fn();
    wrapper = mount(
      <Steps active={1} onClickStep={onClickStep}>
        <Steps.Item>A</Steps.Item>
        <Steps.Item>B</Steps.Item>
        <Steps.Item>C</Steps.Item>
      </Steps>,
    );

    wrapper.find('.rc-step').at(0).simulate('click');
    expect(onClickStep).toHaveBeenCalledTimes(0);

    wrapper.find('.rc-step__title').at(0).simulate('click');
    expect(onClickStep).toHaveBeenCalledWith(0);

    wrapper.find('.rc-step__circle-container').at(2).simulate('click');
    expect(onClickStep).toHaveBeenCalledTimes(2);
    expect(onClickStep).toHaveBeenLastCalledWith(2);
  });

  test('should change inactive color when using inactive-color prop', () => {
    wrapper = mount(
      <Steps active={0} inactiveColor="red">
        <Steps.Item>A</Steps.Item>
        <Steps.Item>B</Steps.Item>
      </Steps>,
    );
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('should change inactive icon when using inactive-icon prop', () => {
    wrapper = mount(
      <Steps active={0} inactiveIcon="foo">
        <Steps.Item>A</Steps.Item>
        <Steps.Item>B</Steps.Item>
      </Steps>,
    );

    const steps = wrapper.find('.rc-step').at(1);
    expect(steps.find('.van-icon-foo').exists()).toBeTruthy();
    expect(steps.html()).toMatchSnapshot();
  });

  test('should change finish icon when using finish-icon prop', () => {
    wrapper = mount(
      <Steps active={1} finishIcon="foo">
        <Steps.Item>A</Steps.Item>
        <Steps.Item>B</Steps.Item>
      </Steps>,
    );

    const firstStep = wrapper.find('.rc-step');
    expect(firstStep.find('.van-icon-foo').exists()).toBeTruthy();
    expect(toJson(firstStep)).toMatchSnapshot();
  });

  test('should render icon-prefix correctly', () => {
    wrapper = mount(
      <Steps active={1} iconPrefix="custom-icon">
        <Steps.Item>A</Steps.Item>
        <Steps.Item>B</Steps.Item>
      </Steps>,
    );

    const steps = wrapper.find('.rc-step').at(1);
    expect(toJson(steps)).toMatchSnapshot();
  });
});
