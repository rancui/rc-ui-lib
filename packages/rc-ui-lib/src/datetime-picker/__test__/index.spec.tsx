import React from 'react';
import { render, cleanup, act, fireEvent } from '@testing-library/react';
import { sleep } from '../../../tests/utils';
import DateTimePicker, { DateTimePickerInstance, DateTimePickerProps } from '..';
import { getTrueValue } from '../utils';

describe('DateTimePicker', () => {
  function createDatePicker(props?: Partial<DateTimePickerProps>) {
    const pickerRef = React.createRef<DateTimePickerInstance>();

    const { queryByTestId, container, rerender, debug } = render(
      <DateTimePicker ref={pickerRef} {...props} />,
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

  it('should emit confirm event after clicking the confirm button', async () => {
    const onConfirm = jest.fn();

    const { container } = createDatePicker({
      onConfirm,
    });

    const confirmBtn = container.querySelector('.rc-picker__confirm');
    fireEvent.click(confirmBtn);

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('should emit cancel event after clicking the cancel button', async () => {
    const onCancel = jest.fn();

    const { container } = createDatePicker({
      onCancel,
    });

    const cancelBtn = container.querySelector('.rc-picker__cancel');
    fireEvent.click(cancelBtn);

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('should render time type correctly', async () => {
    const { container } = createDatePicker({
      type: 'time',
      minHour: 22,
      minMinute: 58,
    });

    expect(container).toMatchSnapshot();
  });

  it('should allow to call getPicker method', async () => {
    const { pickerRef } = createDatePicker({
      type: 'time',
    });

    expect(pickerRef.current.getPicker()).toBeTruthy();
  });

  it('should emit value correctly when dynamic change min-date', async () => {
    const onConfirm = jest.fn();
    const date = new Date(2020, 10, 2, 10, 30);
    const minDate = new Date(2010, 0, 1, 10, 30);

    const { container, rerender } = createDatePicker({
      value: date,
      minDate,
      onConfirm,
    });

    await sleep(100);

    const props: DateTimePickerProps = {
      value: date,
      minDate: date,
      onConfirm,
    };
    rerender(<DateTimePicker {...props} />);

    await sleep(100);

    const confirmBtn = container.querySelector('.rc-picker__confirm');
    fireEvent.click(confirmBtn);

    expect(onConfirm.mock.calls[0][0]).toEqual(date);
  });

  it('should update value correctly after calling setColumnIndex method', async () => {
    const onConfirm = jest.fn();
    const defaultDate = new Date(2020, 0, 1);

    const { container, pickerRef } = createDatePicker({
      type: 'date',
      value: defaultDate,
      minDate: defaultDate,
      maxDate: new Date(2020, 0, 30),
      onConfirm,
    });

    await sleep(100);

    act(() => {
      pickerRef.current.getPicker().setColumnIndex(2, 14);
    });
    await sleep(100);
    const confirmBtn = container.querySelector('.rc-picker__confirm');
    fireEvent.click(confirmBtn);

    expect(onConfirm.mock.calls[0][0]).toEqual(new Date(2020, 0, 15));
  });

  it('should update value correctly after calling setColumnValue method', async () => {
    const onConfirm = jest.fn();
    const defaultDate = new Date(2020, 0, 1);

    const { container, pickerRef } = createDatePicker({
      type: 'date',
      value: defaultDate,
      minDate: defaultDate,
      maxDate: new Date(2020, 0, 30),
      onConfirm,
    });

    await sleep(100);

    act(() => {
      pickerRef.current.getPicker().setColumnValue(2, '15');
    });
    await sleep(100);
    const confirmBtn = container.querySelector('.rc-picker__confirm');
    fireEvent.click(confirmBtn);

    expect(onConfirm.mock.calls[0][0]).toEqual(new Date(2020, 0, 15));
  });

  it('test getTrueValue', () => {
    expect(getTrueValue('')).toEqual(0);
    expect(getTrueValue('rainbow')).toEqual(0);
    expect(getTrueValue('rainbow7')).toEqual(7);
    expect(getTrueValue('10')).toEqual(10);
  });
});
