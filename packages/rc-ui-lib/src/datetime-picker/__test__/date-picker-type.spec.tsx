import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import TestsEvent from '../../../tests/events';
import { sleep } from '../../../tests/utils';
import DatePicker from '../DatePicker';
import type { DatePickerProps, DateTimePickerInstance } from '../PropsType';

describe('DatePicker type', () => {
  function createDatePicker(props?: Partial<DatePickerProps>) {
    const pickerRef = React.createRef<DateTimePickerInstance>();

    const { queryByTestId, container, rerender, debug, unmount } = render(
      <DatePicker ref={pickerRef} {...props} />,
    );

    return {
      container,
      rerender,
      debug,
      queryByTestId,
      pickerRef,
      unmount,
    };
  }

  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  // it('default type', async () => {
  //   const onConfirm = jest.fn();
  //   const date = new Date(2020, 10, 1, 0, 0);

  //   const { container } = createDatePicker({
  //     value: date,
  //     minDate: new Date(2020, 0, 1),
  //     maxDate: new Date(2025, 10, 1),
  //     onConfirm,
  //   });

  //   const confirmBtn = container.querySelector('.rc-picker__confirm');
  //   fireEvent.click(confirmBtn);

  //   expect(onConfirm.mock.calls[0][0].getFullYear()).toEqual(2020);

  //   const columnWrapper = container.querySelector('.rc-picker-column');
  //   await TestsEvent.triggerDrag(columnWrapper, [0, -100]);
  //   await sleep(100);
  //   fireEvent.click(confirmBtn);

  //   expect(onConfirm.mock.calls[1][0].getFullYear()).toEqual(2023);
  // });

  it('month-day type', async () => {
    const onConfirm = jest.fn();
    const date = new Date(2020, 10, 1, 0, 0);

    const { container } = createDatePicker({
      type: 'month-day',
      value: date,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      swipeDuration: 50,
      onConfirm,
    });

    await sleep(100);

    const confirmBtn = container.querySelector('.rc-picker__confirm');
    if (confirmBtn) {
      await fireEvent.click(confirmBtn);
    }

    expect(onConfirm.mock.calls[0][0].getMonth()).toEqual(10);
    expect(onConfirm.mock.calls[0][0].getDate()).toEqual(1);
    expect(onConfirm.mock.calls[0][0]).toEqual(date);

    await TestsEvent.triggerDrag(container.querySelectorAll('.rc-picker-column')[0], [0, -800]);
    await sleep(100);

    if (confirmBtn) {
      await fireEvent.click(confirmBtn);
    }
    expect(onConfirm.mock.calls[1][0].getMonth()).toEqual(11);
    expect(onConfirm.mock.calls[1][0].getDate()).toEqual(1);
  });

  it('year-month type', async () => {
    const onConfirm = jest.fn();
    const date = new Date(2020, 10, 1, 0, 0);

    const { container } = createDatePicker({
      type: 'year-month',
      value: date,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      swipeDuration: 50,
      onConfirm,
    });

    await sleep(100);

    const confirmBtn = container.querySelector('.rc-picker__confirm');
    if (confirmBtn) {
      await fireEvent.click(confirmBtn);
    }
    expect(onConfirm.mock.calls[0][0].getFullYear()).toEqual(2020);
    expect(onConfirm.mock.calls[0][0].getMonth()).toEqual(10);

    await TestsEvent.triggerDrag(container.querySelectorAll('.rc-picker-column')[0], [0, -300]);
    await sleep(100);
    await TestsEvent.triggerDrag(container.querySelectorAll('.rc-picker-column')[1], [0, -300]);
    await sleep(100);
    if (confirmBtn) {
      await fireEvent.click(confirmBtn);
    }
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
      swipeDuration: 50,
      onConfirm,
    });

    await sleep(100);

    const confirmBtn = container.querySelector('.rc-picker__confirm');
    if (confirmBtn) {
      await fireEvent.click(confirmBtn);
    }

    expect(onConfirm.mock.calls[0][0].getHours()).toEqual(0);

    const columnWrapper = container.querySelectorAll('.rc-picker-column')[3];
    await TestsEvent.triggerDrag(columnWrapper, [0, -800]);
    if (confirmBtn) {
      await fireEvent.click(confirmBtn);
    }

    expect(onConfirm.mock.calls[1][0].getHours()).toEqual(23);
  });
});
