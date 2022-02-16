import React from 'react';
import { render, cleanup, act, fireEvent } from '@testing-library/react';
import TestsEvent from '../../../tests/events';
import { sleep } from '../../../tests/utils';
import TimePicker from '../TimePicker';
import { DateTimePickerInstance, TimePickerProps } from '../PropsType';

function filter(type: string, options: string[]): string[] {
  const mod = type === 'minute' ? 10 : 5;
  return options.filter((option) => Number(option) % mod === 0);
}

function formatter(type: string, value: string): string {
  return `${value} ${type}`;
}

describe('DateTimePicker', () => {
  function createTimePicker(props?: Partial<TimePickerProps>) {
    const pickerRef = React.createRef<DateTimePickerInstance>();

    const { queryByTestId, container, rerender, debug } = render(
      <TimePicker ref={pickerRef} {...props} />,
    );

    return {
      container,
      rerender,
      debug,
      queryByTestId,
      pickerRef,
    };
  }

  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('format initial value', () => {
    const { container } = createTimePicker({
      minHour: 22,
      minMinute: 58,
    });

    expect(container).toMatchSnapshot();
  });

  it('max-hour & max-minute', () => {
    const { container } = createTimePicker({
      value: '23:59',
      maxHour: 2,
      maxMinute: 2,
    });

    expect(container).toMatchSnapshot();
  });

  it('filter prop', () => {
    const { container } = createTimePicker({
      value: '12:00',
      filter,
    });

    expect(container).toMatchSnapshot();
  });

  it('formatter prop', async () => {
    const onConfirm = jest.fn();

    const { container, pickerRef } = createTimePicker({
      value: '12:00',
      filter,
      formatter,
      onConfirm,
    });
    expect(container).toMatchSnapshot();

    const confirmBtn = container.querySelector('.rc-picker__confirm');
    const columnWrapper = container.querySelector('.rc-picker-column');
    await TestsEvent.triggerDrag(columnWrapper, [0, -100]);
    await sleep(100);
    fireEvent.click(confirmBtn);

    expect(pickerRef.current.getPicker().getValues()).toEqual(['20 hour', '00 minute']);
  });

  it('should emit confirm event after clicking the confirm button', async () => {
    const onConfirm = jest.fn();

    const { container } = createTimePicker({
      onConfirm,
      value: '12:00',
    });

    const columnWrapper = container.querySelector('.rc-picker-column');
    await TestsEvent.triggerDrag(columnWrapper, [0, -300]);

    const confirmBtn = container.querySelector('.rc-picker__confirm');
    fireEvent.click(confirmBtn);

    expect(onConfirm.mock.calls[0][0]).toEqual('23:00');
  });

  it('should emit cancel event after clicking the cancel button', async () => {
    const onCancel = jest.fn();

    const { container } = createTimePicker({
      onCancel,
    });

    const cancelBtn = container.querySelector('.rc-picker__cancel');
    fireEvent.click(cancelBtn);

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('dynamic set value', async () => {
    const onConfirm = jest.fn();

    const { container, rerender } = createTimePicker({
      onConfirm,
    });

    await sleep(100);

    const props: TimePickerProps = {
      value: '00:00',
      onConfirm,
    };
    rerender(<TimePicker {...props} />);

    await sleep(100);

    const confirmBtn = container.querySelector('.rc-picker__confirm');
    fireEvent.click(confirmBtn);

    expect(onConfirm.mock.calls[0][0]).toEqual('00:00');
  });

  it('should emit value correctly when dynamic change min-date', async () => {
    const onConfirm = jest.fn();

    const { container, rerender } = createTimePicker({
      onConfirm,
      value: '12:00',
      minMinute: 0,
    });

    await sleep(100);

    const props: TimePickerProps = {
      minMinute: 30,
      value: '12:00',
      onConfirm,
    };
    rerender(<TimePicker {...props} />);

    await sleep(100);

    const confirmBtn = container.querySelector('.rc-picker__confirm');
    fireEvent.click(confirmBtn);

    await sleep(100);

    expect(onConfirm.mock.calls[0][0]).toEqual('12:30');
  });

  it('set max-hour & max-minute smaller than current then emit correct value', async () => {
    const onConfirm = jest.fn();

    const { container, rerender } = createTimePicker({
      onConfirm,
      value: '23:59',
    });

    await sleep(100);

    const props: TimePickerProps = {
      maxHour: 2,
      maxMinute: 2,
      onConfirm,
    };
    rerender(<TimePicker {...props} />);

    await sleep(100);

    const confirmBtn = container.querySelector('.rc-picker__confirm');
    fireEvent.click(confirmBtn);

    expect(onConfirm.mock.calls[0][0]).toEqual('00:00');
  });
});
