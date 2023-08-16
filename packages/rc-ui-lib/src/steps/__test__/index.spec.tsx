import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Steps } from '..';
import { Icon } from '../../icon';

describe('Steps', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should render correctly', () => {
    const { container } = render(
      <Steps active={0}>
        <Steps.Item>B</Steps.Item>
        <Steps.Item>A</Steps.Item>
      </Steps>,
    );
    expect(container).toMatchSnapshot();
  });

  test('should render custom icon correctly', () => {
    const { container } = render(
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
    expect(container).toMatchSnapshot();
  });

  test('should emit click-step event when step is clicked', async () => {
    const onClickStep = jest.fn();
    const { container } = render(
      <Steps active={1} onClickStep={onClickStep}>
        <Steps.Item>A</Steps.Item>
        <Steps.Item>B</Steps.Item>
        <Steps.Item>C</Steps.Item>
      </Steps>,
    );

    await fireEvent.click(container.querySelector('.rc-step'));
    expect(onClickStep).toHaveBeenCalledTimes(0);

    await fireEvent.click(container.querySelector('.rc-step__title'));
    expect(onClickStep).toHaveBeenCalledWith(0);

    await fireEvent.click(container.querySelectorAll('.rc-step__circle-container')[2]);
    expect(onClickStep).toHaveBeenCalledTimes(2);
    expect(onClickStep).toHaveBeenLastCalledWith(2);
  });

  test('should change inactive color when using inactive-color prop', () => {
    const { container } = render(
      <Steps active={0} inactiveColor="red">
        <Steps.Item>A</Steps.Item>
        <Steps.Item>B</Steps.Item>
      </Steps>,
    );
    expect(container).toMatchSnapshot();
  });

  test('should change inactive icon when using inactive-icon prop', () => {
    const { container } = render(
      <Steps active={0} inactiveIcon="foo">
        <Steps.Item>A</Steps.Item>
        <Steps.Item>B</Steps.Item>
      </Steps>,
    );

    expect(container.querySelector('.van-icon-foo')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('should change finish icon when using finish-icon prop', () => {
    const { container } = render(
      <Steps active={1} finishIcon="foo">
        <Steps.Item>A</Steps.Item>
        <Steps.Item>B</Steps.Item>
      </Steps>,
    );

    const firstStep = container.querySelector('.rc-step');
    expect(firstStep.querySelector('.van-icon-foo')).toBeTruthy();
    expect(firstStep).toMatchSnapshot();
  });

  test('should render icon-prefix correctly', () => {
    const { container } = render(
      <Steps active={1} iconPrefix="custom-icon">
        <Steps.Item>A</Steps.Item>
        <Steps.Item>B</Steps.Item>
      </Steps>,
    );

    const steps = container.querySelector('.rc-step');
    expect(steps).toMatchSnapshot();
  });
});
