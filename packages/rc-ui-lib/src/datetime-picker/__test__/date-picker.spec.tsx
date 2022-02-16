import React from 'react';
import { render, cleanup, act, fireEvent } from '@testing-library/react';
import TestsEvent from '../../../tests/events';
import { sleep } from '../../../tests/utils';
import DatePicker from '../DatePicker';
import { DatePickerProps, DateTimePickerInstance } from '../PropsType';

function filter(type: string, options: string[]): string[] {
  const mod = type === 'year' ? 10 : 5;
  return options.filter((option: string) => Number(option) % mod === 0);
}

function formatter(type: string, value: string): string {
  return `${value} ${type}`;
}

describe('DatePicker', () => {
  function createDatePicker(props?: Partial<DatePickerProps>) {
    const pickerRef = React.createRef<DateTimePickerInstance>();

    const { queryByTestId, container, rerender, debug } = render(
      <DatePicker ref={pickerRef} {...props} />,
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

  it('default type', async () => {
    const onConfirm = jest.fn();
    const date = new Date(2020, 10, 1, 0, 0);

    const { container } = createDatePicker({
      value: date,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      onConfirm,
    });

    const confirmBtn = container.querySelector('.rc-picker__confirm');
    fireEvent.click(confirmBtn);

    expect(onConfirm.mock.calls[0][0].getFullYear()).toEqual(2020);

    const columnWrapper = container.querySelector('.rc-picker-column');
    await TestsEvent.triggerDrag(columnWrapper, [0, -100]);
    await sleep(100);
    fireEvent.click(confirmBtn);

    expect(onConfirm.mock.calls[1][0].getFullYear()).toEqual(2025);
  });

  it('month-day type', async () => {
    const onConfirm = jest.fn();
    const date = new Date(2020, 10, 1, 0, 0);

    const { container } = createDatePicker({
      type: 'month-day',
      value: date,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      onConfirm,
    });

    const confirmBtn = container.querySelector('.rc-picker__confirm');
    fireEvent.click(confirmBtn);

    expect(onConfirm.mock.calls[0][0].getMonth()).toEqual(10);
    expect(onConfirm.mock.calls[0][0].getDate()).toEqual(1);

    const columnWrapper = container.querySelector('.rc-picker-column');
    await TestsEvent.triggerDrag(columnWrapper, [0, -500]);
    await sleep(100);
    fireEvent.click(confirmBtn);

    expect(onConfirm.mock.calls[1][0].getMonth()).toEqual(11);
    expect(onConfirm.mock.calls[1][0].getDate()).toEqual(1);

    const columnWrapper2 = container.querySelectorAll('.rc-picker-column')[1];
    await TestsEvent.triggerDrag(columnWrapper2, [0, -300]);
    await sleep(100);
    fireEvent.click(confirmBtn);
    expect(onConfirm.mock.calls[2][0].getMonth()).toEqual(11);
    expect(onConfirm.mock.calls[2][0].getDate()).toEqual(31);
  });

  it('year-month type', async () => {
    const onConfirm = jest.fn();
    const date = new Date(2020, 10, 1, 0, 0);

    const { container } = createDatePicker({
      type: 'year-month',
      value: date,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      onConfirm,
    });

    const confirmBtn = container.querySelector('.rc-picker__confirm');
    fireEvent.click(confirmBtn);
    await sleep(100);
    expect(onConfirm.mock.calls[0][0].getFullYear()).toEqual(2020);
    expect(onConfirm.mock.calls[0][0].getMonth()).toEqual(10);

    // const columnWrapper = container.querySelector('.rc-picker-column');
    // await TestsEvent.triggerDrag(columnWrapper, [0, -300]);
    // await sleep(100);
    // fireEvent.click(confirmBtn);
    // await sleep(100);
    // expect(onConfirm.mock.calls[1][0].getFullYear()).toEqual(2025);
    // expect(onConfirm.mock.calls[1][0].getMonth()).toEqual(0);

    await TestsEvent.triggerDrag(container.querySelectorAll('.rc-picker-column')[0], [0, -300]);
    await sleep(100);
    await TestsEvent.triggerDrag(container.querySelectorAll('.rc-picker-column')[1], [0, -300]);
    await sleep(100);
    fireEvent.click(confirmBtn);
    expect(onConfirm.mock.calls[1][0].getFullYear()).toEqual(2025);
    expect(onConfirm.mock.calls[1][0].getMonth()).toEqual(10);
  });

  it('datehour type', async () => {
    const onConfirm = jest.fn();
    const date = new Date(2020, 10, 1, 0, 0);

    const { container } = createDatePicker({
      type: 'datehour',
      value: date,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      onConfirm,
    });

    const confirmBtn = container.querySelector('.rc-picker__confirm');
    fireEvent.click(confirmBtn);

    expect(onConfirm.mock.calls[0][0].getHours()).toEqual(0);

    const columnWrapper = container.querySelectorAll('.rc-picker-column')[3];
    await TestsEvent.triggerDrag(columnWrapper, [0, -500]);
    await sleep(100);
    fireEvent.click(confirmBtn);

    expect(onConfirm.mock.calls[1][0].getHours()).toEqual(23);
  });

  it('value has an initial value', async () => {
    const onConfirm = jest.fn();
    const date = new Date(2020, 10, 1, 0, 0);

    const { container } = createDatePicker({
      type: 'month-day',
      value: date,
      onConfirm,
    });

    const confirmBtn = container.querySelector('.rc-picker__confirm');
    fireEvent.click(confirmBtn);

    expect(onConfirm.mock.calls[0][0]).toEqual(date);
  });

  it('minDate', async () => {
    const onConfirm = jest.fn();
    const minDate = new Date(2030, 0, 0, 0, 3);

    const { container } = createDatePicker({
      minDate,
      onConfirm,
    });

    const confirmBtn = container.querySelector('.rc-picker__confirm');
    fireEvent.click(confirmBtn);

    expect(onConfirm.mock.calls[0][0]).toEqual(minDate);
  });

  it('value has an initial value', async () => {
    const onConfirm = jest.fn();
    const defaultValue = new Date(2030, 0, 0, 0, 3);

    const { container } = createDatePicker({
      value: defaultValue,
      onConfirm,
    });

    const confirmBtn = container.querySelector('.rc-picker__confirm');
    fireEvent.click(confirmBtn);

    expect(onConfirm.mock.calls[0][0]).toEqual(defaultValue);
  });

  it('columnsOrder prop', async () => {
    const { container } = createDatePicker({
      columnsOrder: ['month', 'day', 'year'],
      value: new Date(2020, 10, 1, 0, 0),
    });

    expect(container).toMatchSnapshot();
  });

  it('filter prop', async () => {
    const { container } = createDatePicker({
      filter,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      value: new Date(2020, 10, 1, 0, 0),
    });

    expect(container).toMatchSnapshot();
  });

  it('formatter prop', async () => {
    const { container, pickerRef } = createDatePicker({
      filter,
      formatter,
      minDate: new Date(2010, 0, 1),
      maxDate: new Date(2025, 10, 1),
      value: new Date(2020, 10, 1, 0, 0),
    });

    expect(container).toMatchSnapshot();

    const columnWrapper = container.querySelector('.rc-picker-column');
    await TestsEvent.triggerDrag(columnWrapper, [0, -100]);

    expect(pickerRef.current.getPicker().getValues()).toEqual([
      '2020 year',
      '05 month',
      '05 day',
      '00 hour',
      '00 minute',
    ]);
  });

  it('cancel event', async () => {
    const onCancel = jest.fn();

    const { container } = createDatePicker({
      onCancel,
    });

    const confirmBtn = container.querySelector('.rc-picker__cancel');
    fireEvent.click(confirmBtn);

    expect(onCancel).toHaveBeenCalled();
  });

  it('max-date prop', async () => {
    const onConfirm = jest.fn();
    const maxDate = new Date(2010, 5, 0, 0, 0);

    const { container } = createDatePicker({
      value: new Date(2020, 10, 30, 30, 30),
      maxDate,
      onConfirm,
    });

    const confirmBtn = container.querySelector('.rc-picker__confirm');
    fireEvent.click(confirmBtn);

    expect(onConfirm.mock.calls[0][0]).toEqual(maxDate);
  });

  it('min-date prop', async () => {
    const onConfirm = jest.fn();
    const minDate = new Date(2030, 0, 0, 0, 0);

    const { container } = createDatePicker({
      value: new Date(2020, 10, 30, 30, 30),
      minDate,
      onConfirm,
    });

    const confirmBtn = container.querySelector('.rc-picker__confirm');
    fireEvent.click(confirmBtn);

    expect(onConfirm.mock.calls[0][0]).toEqual(minDate);
  });

  it('use min-date with filter', async () => {
    const onConfirm = jest.fn();
    const minDate = new Date(2030, 0, 0, 0, 3);
    const maxDate = new Date(2040, 0, 0, 0, 0);

    const { container } = createDatePicker({
      value: new Date(2020, 0, 0, 0, 0),
      maxDate,
      minDate,
      onConfirm,
      filter(type: string, values: string[]) {
        if (type === 'minute') {
          return values.filter((value) => Number(value) % 30 === 0);
        }

        return values;
      },
    });

    await sleep(100);
    const confirmBtn = container.querySelector('.rc-picker__confirm');
    fireEvent.click(confirmBtn);

    expect(onConfirm.mock.calls[0][0]).toEqual(new Date(2030, 0, 0, 0, 30));
  });

  it('should emit value correctly when change value', async () => {
    const onConfirm = jest.fn();
    const date = new Date(2020, 10, 1, 0, 0);

    const { container, rerender } = createDatePicker({
      onConfirm,
      value: new Date(2020, 0, 0, 0, 0),
    });

    await sleep(100);

    const props: DatePickerProps = {
      value: date,
      onConfirm,
    };
    rerender(<DatePicker {...props} />);

    await sleep(100);

    const confirmBtn = container.querySelector('.rc-picker__confirm');
    fireEvent.click(confirmBtn);

    await sleep(100);

    expect(onConfirm.mock.calls[0][0]).toEqual(date);
  });
});
