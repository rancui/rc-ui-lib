/* eslint-disable @typescript-eslint/no-shadow */
import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import CalendarDay from './CalendarDay';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';
import { compareDay, formatMonthTitle, getMonthEndDay, getNextDay, getPrevDay, t } from './utils';
import { addUnit, setScrollTop } from '../utils';
import { getRect } from '../hooks/use-rect';
import {
  CalendarMonthInstance,
  CalendarMonthProps,
  CalendarDayItem,
  CalendarDayType,
} from './PropsType';

const CalendarMonth = forwardRef<CalendarMonthInstance, CalendarMonthProps>((props, ref) => {
  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('calendar', prefixCls);

  const [visible, setVisible] = useState(false);
  const { showMonthTitle, date, showMark, firstDayOfWeek } = props;

  const daysRef = useRef<HTMLDivElement>(null);
  const [monthRef, setMonthRef] = useState<HTMLDivElement>();
  const height = useRef(0);

  useEffect(() => {
    if (monthRef) {
      height.current = getRect(monthRef).height;
    }
  }, [monthRef]);

  const title = useMemo(() => {
    const formatterFn = props.formatMonthTitle || formatMonthTitle;
    return formatterFn(date);
  }, [date]);

  const rowHeight = useMemo(() => addUnit(props.rowHeight), [props.rowHeight]);
  const offset = useMemo(() => {
    const realDay = date.getDay();

    if (firstDayOfWeek) {
      return (realDay + 7 - firstDayOfWeek) % 7;
    }
    return realDay;
  }, [date, firstDayOfWeek]);

  const totalDay = useMemo(() => {
    return getMonthEndDay(date.getFullYear(), date.getMonth() + 1);
  }, [date]);

  const shouldRender = useMemo(() => visible || !props.lazyRender, [visible, props.lazyRender]);

  const getTitle = () => title;

  const onClick = (item) => {
    props.onClick?.(item);
  };

  const getMultipleDayType = (day: Date) => {
    const isSelected = (date: Date) =>
      (props.currentDate as Date[]).some((item) => compareDay(item, date) === 0);

    if (isSelected(day)) {
      const prevDay = getPrevDay(day);
      const nextDay = getNextDay(day);
      const prevSelected = isSelected(prevDay);
      const nextSelected = isSelected(nextDay);

      if (prevSelected && nextSelected) {
        return 'multiple-middle';
      }
      if (prevSelected) {
        return 'end';
      }
      if (nextSelected) {
        return 'start';
      }
      return 'multiple-selected';
    }

    return '';
  };

  const getRangeDayType = (day: Date) => {
    const [startDay, endDay] = props.currentDate as Date[];

    if (!startDay) {
      return '';
    }

    const compareToStart = compareDay(day, startDay);

    if (!endDay) {
      return compareToStart === 0 ? 'start' : '';
    }

    const compareToEnd = compareDay(day, endDay);

    if (props.allowSameDay && compareToStart === 0 && compareToEnd === 0) {
      return 'start-end';
    }
    if (compareToStart === 0) {
      return 'start';
    }
    if (compareToEnd === 0) {
      return 'end';
    }
    if (compareToStart > 0 && compareToEnd < 0) {
      return 'middle';
    }

    return '';
  };

  const getDayType = (day: Date): CalendarDayType => {
    const { type, minDate, maxDate, currentDate } = props;

    if (compareDay(day, minDate) < 0 || compareDay(day, maxDate) > 0) {
      return 'disabled';
    }

    if (Array.isArray(currentDate)) {
      if (type === 'multiple') {
        return getMultipleDayType(day);
      }
      if (type === 'range') {
        return getRangeDayType(day);
      }
    } else if (type === 'single') {
      return compareDay(day, currentDate as Date) === 0 ? 'selected' : '';
    }

    return '';
  };

  const getBottomInfo = (dayType: CalendarDayType): string => {
    if (props.type === 'range') {
      if (dayType === 'start' || dayType === 'end') {
        return t(dayType);
      }
      if (dayType === 'start-end') {
        return t('startEnd');
      }
    }
    return '';
  };

  const renderTitle = () => {
    return showMonthTitle ? <div className={classNames(bem('month-title'))}>{title}</div> : null;
  };

  const renderMark = () => {
    return showMark && shouldRender ? (
      <div className={classNames(bem('month-mark'))}>{props.date.getMonth() + 1}</div>
    ) : null;
  };

  const placeholders = useMemo(() => {
    const count = Math.ceil((totalDay + offset) / 7);
    return Array(count).fill({ type: 'placeholder' });
  }, [totalDay, offset]);

  const daysList = useMemo(() => {
    const days: CalendarDayItem[] = [];
    const year = props.date.getFullYear();
    const month = props.date.getMonth();

    for (let day = 1; day <= totalDay; day++) {
      const date = new Date(year, month, day);
      const type = getDayType(date);

      let config: CalendarDayItem = {
        date,
        type,
        text: day,
        bottomInfo: getBottomInfo(type),
      };

      if (props.formatter) {
        config = props.formatter(config);
      }

      days.push(config);
    }

    return days;
  }, [props.currentDate, props.date, props.formatter]);

  const disabledDays = useMemo(() => daysList.filter((day) => day.type === 'disabled'), [daysList]);

  const scrollToDate = (body: Element, targetDate: Date) => {
    if (daysRef.current) {
      const daysRect = getRect(daysRef.current);
      const totalRows = placeholders.length;
      const currentRow = Math.ceil((targetDate.getDate() + offset) / 7);
      const rowOffset = ((currentRow - 1) * daysRect.height) / totalRows;

      setScrollTop(body, daysRect.top + rowOffset + body.scrollTop - getRect(body).top);
    }
  };

  const renderDay = (item: CalendarDayItem, index: number) => {
    return (
      <CalendarDay
        key={String(index)}
        item={item}
        index={index}
        color={props.color}
        offset={offset}
        rowHeight={rowHeight}
        onClick={onClick}
      />
    );
  };

  const renderDays = () => {
    return (
      <div ref={daysRef} role="grid" className={classNames(bem('days'))}>
        {renderMark()}
        {(shouldRender ? daysList : placeholders).map(renderDay)}
      </div>
    );
  };

  useImperativeHandle(ref, () => ({
    getTitle,
    getHeight: () => height.current,
    setVisible,
    scrollToDate,
    disabledDays,
  }));

  return (
    <div className={classNames(bem('month'))} ref={setMonthRef}>
      {renderTitle()}
      {renderDays()}
    </div>
  );
});

CalendarMonth.defaultProps = {};

export default CalendarMonth;
