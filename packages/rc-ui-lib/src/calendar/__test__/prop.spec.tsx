import React from 'react';
import { render, cleanup, fireEvent, act, waitFor, screen } from '@testing-library/react';
import { sleep } from '../../../tests/utils';
import { Calendar, CalendarInstance, CalendarProps } from '..';
import { minDate, maxDate } from './utils';
import { getNextDay } from '../utils';

const $props = {
  minDate,
  maxDate,
  poppable: false,
  lazyRender: false,
};

describe('Calendar prop', () => {
  function createCalendar(props: CalendarProps) {
    const calendarRef = React.createRef<CalendarInstance>();
    const { baseElement, container, rerender, debug, unmount, getByText } = render(
      <Calendar ref={calendarRef} {...props} />,
    );

    return {
      calendarRef,
      baseElement,
      container,
      rerender,
      debug,
      unmount,
      getByText,
    };
  }

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(async () => {
    cleanup();
    jest.useRealTimers();
  });

  test('should limit max range when using max-range prop and type is range', async () => {
    const onConfirm = jest.fn();
    const onSelect = jest.fn();
    const props: CalendarProps = {
      ...$props,
      type: 'range',
      maxRange: 3,
      onConfirm,
      onSelect,
    };
    jest.useFakeTimers();
    const { container } = createCalendar(props);

    const days = container.querySelectorAll('.rc-calendar__day');

    await waitFor(() => {
      screen.getByText('13');
    });
    await act(async () => {
      await fireEvent.click(days[12]);
    });
    await act(async () => {
      await fireEvent.click(days[18]);
    });

    act(() => {
      jest.runAllTimers();
    });
    expect(onSelect).toHaveBeenNthCalledWith(1, [new Date(2010, 0, 13)]);
    expect(onSelect).toHaveBeenNthCalledWith(2, [new Date(2010, 0, 13), new Date(2010, 0, 15)]);

    expect(onConfirm).not.toHaveBeenCalled();
  });

  test('should limit max range when using max-range prop and type is multiple', async () => {
    const onSelect = jest.fn();
    const props: CalendarProps = {
      ...$props,
      type: 'multiple',
      maxRange: 3,
      showConfirm: false,
      onSelect,
    };
    const { container } = createCalendar(props);
    await waitFor(() => {
      screen.getByText('13');
    });
    const days = container.querySelectorAll('.rc-calendar__day');
    await act(async () => {
      await fireEvent.click(days[13]);
    });
    await act(async () => {
      await fireEvent.click(days[14]);
    });
    await act(async () => {
      await fireEvent.click(days[15]);
    });
    // await act(() => {
    //   jest.runAllTimers();
    // });

    await waitFor(() => {
      expect(onSelect).toBeCalledTimes(2);
    });
  });

  test('showtitle prop', async () => {
    const props: CalendarProps = {
      show: true,
      showTitle: false,
    };
    const { container } = createCalendar(props);

    expect(container).toMatchSnapshot();
  });

  test('showSubtitle prop', async () => {
    const props: CalendarProps = {
      show: true,
      showSubtitle: false,
    };
    const { container } = createCalendar(props);

    expect(container).toMatchSnapshot();
  });

  test('should render correctly when using allowSameDay prop', async () => {
    const onSelect = jest.fn();
    const props: CalendarProps = {
      ...$props,
      type: 'range',
      allowSameDay: true,
      onSelect,
    };
    const { container } = createCalendar(props);

    const days = container.querySelectorAll('.rc-calendar__day');
    await fireEvent.click(days[9]);
    await fireEvent.click(days[9]);

    expect(onSelect).toHaveBeenLastCalledWith([minDate, minDate]);
  });

  test('min-date after current time', async () => {
    const onConfirm = jest.fn();
    const props: CalendarProps = {
      ...$props,
      minDate: new Date(2200, 0, 1),
      maxDate: new Date(2200, 0, 2),
      onConfirm,
    };
    const { container } = createCalendar(props);

    const confirm = container.querySelector('.rc-calendar__confirm');
    await act(async () => {
      await fireEvent.click(confirm);
    });

    expect(onConfirm).toHaveBeenCalledWith(new Date(2200, 0, 1));
  });

  test('min-date before current time', async () => {
    const onConfirm = jest.fn();
    const props: CalendarProps = {
      ...$props,
      minDate: new Date(1800, 0, 1),
      maxDate: new Date(1800, 0, 2),
      onConfirm,
    };
    const { container } = createCalendar(props);

    const confirm = container.querySelector('.rc-calendar__confirm');
    await act(async () => {
      await fireEvent.click(confirm);
    });
    expect(onConfirm).toHaveBeenCalledWith(new Date(1800, 0, 2));
  });

  test('month-show event', async () => {
    const onMonthShow = jest.fn();
    const props: CalendarProps = {
      show: true,
      onMonthShow,
    };
    jest.useFakeTimers();
    createCalendar(props);

    act(() => {
      jest.runAllTimers();
    });

    expect(onMonthShow).toHaveBeenCalled();
  });

  test('should render correctly when using firstDayOfWeek prop', async () => {
    const props: CalendarProps = {
      ...$props,
      defaultDate: minDate,
      poppable: false,
      firstDayOfWeek: 2,
    };
    const { container } = createCalendar(props);
    expect(container).toMatchSnapshot();
  });

  test('should render correctly when using readonly prop', async () => {
    const onSelect = jest.fn();
    const props: CalendarProps = {
      ...$props,
      type: 'multiple',
      defaultDate: [minDate, getNextDay(minDate)],
      readonly: true,
      onSelect,
    };
    const { container, rerender } = createCalendar(props);

    const days = container.querySelectorAll('.rc-calendar__day');
    await act(async () => {
      await fireEvent.click(days[13]);
    });
    expect(onSelect).not.toBeCalled();

    const props2: CalendarProps = {
      ...props,
      readonly: false,
    };

    rerender(<Calendar {...props2} />);
    await act(async () => {
      await fireEvent.click(days[13]);
    });
    expect(onSelect).toHaveBeenCalled();
  });

  test('should emit over-range when exceeded max range', async () => {
    const onOverRange = jest.fn();
    const props: CalendarProps = {
      ...$props,
      type: 'range',
      maxRange: 3,
      poppable: false,
      onOverRange,
    };
    const { container } = createCalendar(props);

    const days = container.querySelectorAll('.rc-calendar__day');
    await fireEvent.click(days[12]);
    await fireEvent.click(days[18]);
    expect(onOverRange).toHaveBeenCalledTimes(1);
  });
});
