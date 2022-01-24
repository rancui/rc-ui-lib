import React from 'react';
import { render, cleanup, fireEvent, act } from '@testing-library/react';
import { Calendar, CalendarDayItem, CalendarInstance, CalendarProps } from '..';
import { now, minDate, maxDate } from './utils';
import { getNextDay, getPrevDay } from '../utils';

const $props = {
  minDate,
  maxDate,
  poppable: false,
  lazyRender: false,
};

describe('Calendar', () => {
  function createCalendar(props: CalendarProps) {
    const calendarRef = React.createRef<CalendarInstance>();
    const { baseElement, container, rerender, debug } = render(
      <Calendar ref={calendarRef} {...props} />,
    );

    return {
      calendarRef,
      baseElement,
      container,
      rerender,
      debug,
    };
  }

  afterEach(() => {
    cleanup();
  });

  test('should reset to default date when calling reset method', async () => {
    const onConfirm = jest.fn();
    const onSelect = jest.fn();
    const defaultDate = [getPrevDay(minDate), getNextDay(minDate)];
    const props: CalendarProps = {
      ...$props,
      type: 'range',
      defaultDate,
      onConfirm,
      onSelect,
    };
    const { container, calendarRef } = createCalendar(props);

    const days = container.querySelectorAll('.rc-calendar__day');
    await fireEvent.click(days[1]);
    expect(onSelect).not.toBeCalled();
    await fireEvent.click(days[15]);
    await fireEvent.click(days[18]);

    act(() => {
      calendarRef.current.reset();
    });

    const confirm = container.querySelector('.rc-calendar__confirm');
    await fireEvent.click(confirm);

    expect(onConfirm).toHaveBeenCalledWith([minDate, getNextDay(minDate)]);
  });

  test('should reset to specific date when calling reset method with date', async () => {
    const onConfirm = jest.fn();
    const defaultDate = [minDate, getNextDay(minDate)];
    const props: CalendarProps = {
      ...$props,
      type: 'range',

      defaultDate,
      onConfirm,
    };
    const { container, calendarRef } = createCalendar(props);

    const days = container.querySelectorAll('.rc-calendar__day');
    await fireEvent.click(days[15]);
    await fireEvent.click(days[18]);

    const newDate = [getPrevDay(maxDate), maxDate];
    act(() => {
      calendarRef.current.reset(newDate);
    });

    const confirm = container.querySelector('.rc-calendar__confirm');
    await fireEvent.click(confirm);

    expect(onConfirm).toHaveBeenCalledWith(newDate);
  });

  // scrollToDate
  test('should render correctly when using scrollToDate method', async () => {
    const onConfirm = jest.fn();
    const defaultDate = [minDate, getNextDay(minDate)];
    const props: CalendarProps = {
      ...$props,
      defaultDate,
      onConfirm,
    };
    const { container, calendarRef } = createCalendar(props);

    act(() => {
      calendarRef.current.scrollToDate(minDate);
    });

    expect(container).toMatchSnapshot();
  });

  test('select event when type is single', async () => {
    const onSelect = jest.fn();
    const props: CalendarProps = {
      ...$props,

      onSelect,
    };
    const { container } = createCalendar(props);

    const days = container.querySelectorAll('.rc-calendar__day');
    await fireEvent.click(days[15]);

    expect(onSelect).toHaveBeenCalledWith(new Date(2010, 0, 16));
  });

  test('select event when type is range', async () => {
    const onSelect = jest.fn();
    const props: CalendarProps = {
      ...$props,
      type: 'range',

      onSelect,
    };
    const { container } = createCalendar(props);

    const days = container.querySelectorAll('.rc-calendar__day');
    await fireEvent.click(days[15]);
    await fireEvent.click(days[15]);
    await fireEvent.click(days[16]);
    await fireEvent.click(days[15]);
    await fireEvent.click(days[12]);
    expect(onSelect).toHaveBeenNthCalledWith(1, [new Date(2010, 0, 16)]);
    // expect(onSelect).toHaveBeenCalledWith(new Date(2010, 0, 16));
  });

  test('select event when type is multiple', async () => {
    const onUnselect = jest.fn();
    const props: CalendarProps = {
      ...$props,
      type: 'multiple',

      onUnselect,
    };
    const { container } = createCalendar(props);

    const days = container.querySelectorAll('.rc-calendar__day');
    await fireEvent.click(days[15]);
    await fireEvent.click(days[15]);
    expect(onUnselect).toHaveBeenCalledWith(new Date(2010, 0, 16));
  });

  test('should not trigger select event when click disabled day', async () => {
    const onSelect = jest.fn();
    const props: CalendarProps = {
      ...$props,

      onSelect,
    };
    const { container } = createCalendar(props);

    const days = container.querySelectorAll('.rc-calendar__day');
    await fireEvent.click(days[1]);
    expect(onSelect).not.toHaveBeenCalled();
  });

  test('confirm event when type is single', async () => {
    const onConfirm = jest.fn();
    const props: CalendarProps = {
      ...$props,

      onConfirm,
    };
    const { container } = createCalendar(props);

    const days = container.querySelectorAll('.rc-calendar__day');
    await fireEvent.click(days[15]);

    const confirm = container.querySelector('.rc-calendar__confirm');
    await fireEvent.click(confirm);

    expect(onConfirm).toHaveBeenCalledWith(new Date(2010, 0, 16));
  });

  test('confirm event when type is range', async () => {
    const onConfirm = jest.fn();
    const props: CalendarProps = {
      ...$props,
      type: 'range',

      onConfirm,
    };
    const { container } = createCalendar(props);

    const days = container.querySelectorAll('.rc-calendar__day');
    await fireEvent.click(days[15]);
    await fireEvent.click(days[18]);

    expect(onConfirm).not.toHaveBeenCalled();

    const confirm = container.querySelector('.rc-calendar__confirm');
    await fireEvent.click(confirm);

    expect(onConfirm).toHaveBeenCalledWith([new Date(2010, 0, 16), new Date(2010, 0, 19)]);
  });

  test('confirm event when type is range', async () => {
    const onConfirm = jest.fn();
    const props: CalendarProps = {
      type: 'range',
      poppable: false,

      onConfirm,
    };
    const { container } = createCalendar(props);

    const confirm = container.querySelector('.rc-calendar__confirm');
    await fireEvent.click(confirm);

    expect(onConfirm).toHaveBeenCalledWith([now, getNextDay(now)]);
  });

  test('default single date', async () => {
    const onConfirm = jest.fn();
    const props: CalendarProps = {
      poppable: false,

      onConfirm,
    };
    const { container } = createCalendar(props);

    const confirm = container.querySelector('.rc-calendar__confirm');
    await fireEvent.click(confirm);

    expect(onConfirm).toHaveBeenCalledWith(now);
  });

  test('set showConfirm to false', async () => {
    const onConfirm = jest.fn();
    const props: CalendarProps = {
      ...$props,
      type: 'range',
      showConfirm: false,

      onConfirm,
    };
    const { container } = createCalendar(props);

    const days = container.querySelectorAll('.rc-calendar__day');
    await fireEvent.click(days[15]);
    await fireEvent.click(days[18]);

    expect(onConfirm).toHaveBeenCalledWith([new Date(2010, 0, 16), new Date(2010, 0, 19)]);
  });

  test('should render correctly when using rowHeight prop', async () => {
    const props: CalendarProps = {
      ...$props,
      rowHeight: 50,
      defaultDate: minDate,
    };
    const { container } = createCalendar(props);

    expect(container).toMatchSnapshot();
  });

  test('should render correctly when using color prop', async () => {
    const props: CalendarProps = {
      ...$props,
      color: 'blue',
      defaultDate: minDate,
    };
    const { container } = createCalendar(props);

    expect(container).toMatchSnapshot();
  });

  test('should render correctly when using formatter prop', async () => {
    const props: CalendarProps = {
      ...$props,
      defaultDate: minDate,

      formatter(day: CalendarDayItem) {
        const date = day.date?.getDate();

        switch (date) {
          case 11:
            day.topInfo = 'Top Info';
            break;
          case 12:
            day.bottomInfo = 'Bottom Info';
            break;
          case 13:
            day.text = 'Text';
            break;
          case 14:
            day.className = 'test';
            break;
          default:
            break;
        }

        return day;
      },
    };
    const { container } = createCalendar(props);

    expect(container).toMatchSnapshot();
  });

  test('should render correctly when using title、footer、subtitle prop', async () => {
    const props: CalendarProps = {
      ...$props,
      defaultDate: minDate,

      title: 'Custom Title',
      subtitle: 'Custom subtitle',
      footer: 'custom footer',
    };
    const { container } = createCalendar(props);

    expect(container).toMatchSnapshot();
  });

  test('should reset when type changed', async () => {
    const onConfirm = jest.fn();
    const props: CalendarProps = {
      ...$props,
      defaultDate: minDate,
      poppable: false,

      onConfirm,
    };
    const { container, rerender } = createCalendar(props);

    const confirm = container.querySelector('.rc-calendar__confirm');
    await fireEvent.click(confirm);

    expect(onConfirm).toHaveBeenCalledWith(new Date(2010, 0, 10));

    const props2: CalendarProps = {
      ...props,
      type: 'range',
      defaultDate: [minDate, getNextDay(minDate)],
    };

    rerender(<Calendar {...props2} />);
    await fireEvent.click(confirm);
    expect(onConfirm).toHaveBeenCalledWith([new Date(2010, 0, 10), new Date(2010, 0, 11)]);
  });

  test('should render top-info and bottom-info slot correctly', async () => {
    const props: CalendarProps = {
      ...$props,
      defaultDate: minDate,
      poppable: false,
      topInfoRender: (item) => `top: ${item.text}`,
      bottomInfoRender: (item) => `bottom: ${item.text}`,
    };
    const { container } = createCalendar(props);
    expect(container).toMatchSnapshot();
  });

  test('should render correctly when using confirmText prop', async () => {
    const props: CalendarProps = {
      ...$props,
      defaultDate: minDate,
      poppable: false,
      confirmText: 'Custom confirm text',
    };
    const { container } = createCalendar(props);
    expect(container).toMatchSnapshot();
  });

  test('should emit onClickSubtitle event when clicking the subtitle', async () => {
    const onClickSubtitle = jest.fn();
    const props: CalendarProps = {
      ...$props,
      poppable: false,
      onClickSubtitle,
    };
    const { container } = createCalendar(props);

    const subtitle = container.querySelector('.rc-calendar__header-subtitle');
    await fireEvent.click(subtitle);

    expect(onClickSubtitle).toHaveBeenCalled();
  });

  test('should emit onClose event when clicking the popup-close-icon', async () => {
    const onClose = jest.fn();
    const props: CalendarProps = {
      ...$props,
      defaultDate: minDate,
      show: false,
      poppable: true,
      onClose,
    };
    const { container, rerender, baseElement } = createCalendar(props);

    expect(container).toMatchSnapshot();

    const props2: CalendarProps = {
      ...props,
      show: true,
    };

    rerender(<Calendar {...props2} />);

    const closeIcon = baseElement.querySelector('.rc-popup__close-icon');
    await fireEvent.click(closeIcon);

    expect(onClose).toHaveBeenCalled();
  });
});
