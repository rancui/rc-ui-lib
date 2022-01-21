/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-plusplus */
import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import classnames from 'classnames';
import { Popup } from '../popup';
import Button from '../button';
import Toast from '../toast/index';
import CalendarHeader from './CalendarHeader';
import CalendarMonth from './CalendarMonth';
import { useUpdateEffect } from '../hooks';
import { getRect } from '../hooks/use-rect';
import useRefs from '../hooks/use-refs';
import {
  calcDateNum,
  cloneDate,
  cloneDates,
  compareDay,
  compareMonth,
  getDayByOffset,
  getNextDay,
  getPrevDay,
  getToday,
  t,
} from './utils';
import { getScrollTop, pick } from '../utils';
import { raf } from '../utils/raf';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';
import { CalendarInstance, CalendarProps, CalendarDayItem, CalendarType } from './PropsType';

const Calendar = forwardRef<CalendarInstance, CalendarProps>((props, ref) => {
  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('calendar', prefixCls);

  const {
    type,
    title,
    showTitle,
    showSubtitle,
    firstDayOfWeek,
    minDate,
    maxDate,
    safeAreaInsetBottom,
    footer,
    showConfirm,
    className,
    style,
  } = props;

  const limitDateRange = (date: Date, minDate = props.minDate, maxDate = props.maxDate) => {
    if (compareDay(date, minDate) === -1) {
      return minDate;
    }
    if (compareDay(date, maxDate) === 1) {
      return maxDate;
    }
    return date;
  };

  const getInitialDate = (defaultDate = props.defaultDate): Date | Date[] => {
    console.log(defaultDate);
    if (defaultDate === null) {
      return defaultDate;
    }

    const now = getToday();

    if (type === 'range') {
      if (!Array.isArray(defaultDate)) {
        defaultDate = [];
      }
      const start = limitDateRange(defaultDate[0] || now, minDate, getPrevDay(maxDate));
      const end = limitDateRange(defaultDate[1] || now, getNextDay(minDate));
      return [start, end];
    }

    if (type === 'multiple') {
      if (Array.isArray(defaultDate)) {
        return defaultDate.map((date) => limitDateRange(date));
      }
      return [limitDateRange(now)];
    }

    if (!defaultDate || Array.isArray(defaultDate)) {
      defaultDate = now;
    }
    return limitDateRange(defaultDate);
  };

  const bodyRef = useRef<HTMLDivElement>(null);
  const bodyHeightRef = useRef<number>(0);

  const [subtitle, setSubtitle] = useState('');
  const [currentDate, setCurrentDate] = useState(getInitialDate());

  const [monthRefs, setMonthRefs] = useRefs();

  const dayOffset = useMemo(() => (firstDayOfWeek ? +firstDayOfWeek % 7 : 0), [firstDayOfWeek]);

  const monthsList = useMemo(() => {
    const months: Date[] = [];
    const cursor = new Date(minDate);

    cursor.setDate(1);

    do {
      months.push(new Date(cursor));
      cursor.setMonth(cursor.getMonth() + 1);
    } while (compareMonth(cursor, maxDate) !== 1);

    return months;
  }, [minDate, maxDate]);

  const buttonDisabled = useMemo(() => {
    if (currentDate) {
      if (props.type === 'range') {
        return !(currentDate as Date[])[0] || !(currentDate as Date[])[1];
      }
      if (props.type === 'multiple') {
        return !(currentDate as Date[]).length;
      }
    }
    return !currentDate;
  }, [props.type, currentDate]);

  const onScroll = () => {
    const top = getScrollTop(bodyRef.current);
    const bottom = top + bodyHeightRef.current;

    const heights = monthsList.map((_, index) => monthRefs[index].getHeight());
    const heightSum = heights.reduce((a, b) => a + b, 0);

    // iOS scroll bounce may exceed the range
    if (bottom > heightSum && top > 0) {
      return;
    }

    let height = 0;
    let currentMonth;
    const visibleRange = [-1, -1];

    for (let i = 0; i < monthsList.length; i++) {
      const month = monthRefs[i];
      const visible = height <= bottom && height + heights[i] >= top;

      if (visible) {
        visibleRange[1] = i;

        if (!currentMonth) {
          currentMonth = month;
          visibleRange[0] = i;
        }

        if (!monthRefs[i].showed) {
          monthRefs[i].showed = true;
          props.onMonthShow?.({
            date: month.date,
            title: month.getTitle(),
          });
        }
      }

      height += heights[i];
    }

    monthsList.forEach((_, index) => {
      const visible = index >= visibleRange[0] - 1 && index <= visibleRange[1] + 1;
      console.log(visible);
      monthRefs[index].setVisible(visible);
    });

    /* istanbul ignore else */
    if (currentMonth) {
      setSubtitle(currentMonth.getTitle());
    }
  };

  const scrollToDate = (targetDate: Date) => {
    raf(() => {
      monthsList.some((month, index) => {
        if (compareMonth(month, targetDate) === 0) {
          if (bodyRef.current) {
            monthRefs[index].scrollToDate(bodyRef.current, targetDate);
          }
          return true;
        }
        return false;
      });
      console.log('to run onScroll');
      onScroll();
    });
  };

  const scrollToCurrentDate = (date?: Date | Date[]) => {
    if (props.poppable && !props.show) {
      return;
    }

    const currentDate = date || getInitialDate();
    console.log(`currentDate: ${currentDate}`);
    console.log(`props.type: ${props.type}`);
    if (currentDate) {
      const targetDate =
        props.type === 'single' ? (currentDate as Date) : (currentDate as Date[])[0];
      scrollToDate(targetDate);
    } else {
      raf(onScroll);
    }
  };

  const init = () => {
    if (props.poppable && !props.show) {
      return;
    }

    raf(() => {
      bodyHeightRef.current = Math.floor(getRect(bodyRef.current).height);
      scrollToCurrentDate();
    });
  };

  const reset = (date = getInitialDate()) => {
    console.log('reset date:', date);
    setCurrentDate(date);
    scrollToCurrentDate(date);
  };

  const onConfirm = () => {
    props.onConfirm?.(cloneDates(currentDate));
  };

  const checkRange = (date: [Date, Date]) => {
    const { maxRange, rangePrompt, showRangePrompt } = props;

    if (maxRange && calcDateNum(date) > maxRange) {
      if (showRangePrompt) {
        Toast(rangePrompt || t('rangePrompt', maxRange));
      }
      props.onOverRange?.();
      return false;
    }

    return true;
  };

  const select = (date: Date | Date[], complete?: boolean) => {
    const toSetCurrentDate = (date: Date | Date[]) => {
      console.log(date);
      setCurrentDate(date);
      props.onSelect?.(cloneDates(date));
    };

    if (complete && props.type === 'range') {
      const valid = checkRange(date as [Date, Date]);

      if (!valid) {
        // auto selected to max range
        toSetCurrentDate([
          (date as Date[])[0],
          getDayByOffset((date as Date[])[0], +props.maxRange - 1),
        ]);
        return;
      }
    }

    toSetCurrentDate(date);

    if (complete && !props.showConfirm) {
      onConfirm();
    }
  };

  // get first disabled calendarDay between date range
  const getDisabledDate = (
    disabledDays: CalendarDayItem[],
    startDay: Date,
    date: Date,
  ): Date | undefined =>
    disabledDays.find(
      (day) => compareDay(startDay, day.date!) === -1 && compareDay(day.date!, date) === -1,
    )?.date;

  // disabled calendarDay
  const disabledDays = useMemo(
    () =>
      monthRefs.reduce((arr, ref) => {
        arr.push(...(ref.disabledDays ?? []));
        return arr;
      }, [] as CalendarDayItem[]),
    [monthRefs],
  );

  const onClickDay = (item: CalendarDayItem) => {
    if (props.readonly || !item.date) {
      return;
    }

    const { date } = item;
    const { type } = props;
    if (type === 'range') {
      if (!currentDate) {
        select([date]);
        return;
      }

      const [startDay, endDay] = currentDate as [Date, Date];

      if (startDay && !endDay) {
        const compareToStart = compareDay(date, startDay);

        if (compareToStart === 1) {
          const disabledDay = getDisabledDate(disabledDays, startDay, date);

          if (disabledDay) {
            const endDay = getPrevDay(disabledDay);
            if (compareDay(startDay, endDay) === -1) {
              select([startDay, endDay]);
            } else {
              select([date]);
            }
          } else {
            select([startDay, date], true);
          }
        } else if (compareToStart === -1) {
          select([date]);
        } else if (props.allowSameDay) {
          select([date, date], true);
        }
      } else {
        select([date]);
      }
    } else if (type === 'multiple') {
      console.log(currentDate);
      if (!currentDate) {
        select([date]);
        return;
      }
      const dates = currentDate as Date[];

      const selectedIndex = dates.findIndex((dateItem: Date) => compareDay(dateItem, date) === 0);

      if (selectedIndex !== -1) {
        const [unselectedDate] = dates.splice(selectedIndex, 1);
        props.onUnselect?.(cloneDate(unselectedDate));
        console.log('选中已选, 重新设置', dates);
        setCurrentDate([...dates]);
      } else if (props.maxRange && dates.length >= props.maxRange) {
        Toast(props.rangePrompt || t('rangePrompt', props.maxRange));
      } else {
        select([...dates, date]);
      }
    } else {
      select(date, true);
    }
  };

  const renderMonth = (date: Date, index: number) => {
    const showMonthTitle = index !== 0 || !props.showSubtitle;
    return (
      <CalendarMonth
        key={index}
        ref={setMonthRefs(index)}
        date={date}
        currentDate={currentDate}
        showMonthTitle={showMonthTitle}
        firstDayOfWeek={dayOffset}
        {...pick(props, [
          'type',
          'color',
          'minDate',
          'maxDate',
          'showMark',
          'formatter',
          'rowHeight',
          'lazyRender',
          'showSubtitle',
          'allowSameDay',
        ])}
        onClick={onClickDay}
      />
    );
  };

  const renderFooter = () => {
    const disabled = buttonDisabled;
    const text = disabled ? props.confirmDisabledText : props.confirmText;
    return (
      <div className={classnames(bem('footer'), { 'rc-safe-area-bottom': safeAreaInsetBottom })}>
        {footer ||
          (showConfirm ? (
            <Button
              round
              block
              type="danger"
              color={props.color}
              className={classnames(bem('confirm'))}
              disabled={buttonDisabled}
              nativeType="button"
              onClick={onConfirm}
            >
              {text || '确认'}
            </Button>
          ) : null)}
      </div>
    );
  };

  const renderCalendar = () => (
    <div className={classnames(bem(), className)} style={style}>
      <CalendarHeader
        title={title}
        subtitle={subtitle}
        showTitle={showTitle}
        showSubtitle={showSubtitle}
        firstDayOfWeek={firstDayOfWeek}
        onClickSubtitle={(event) => {
          props.onClickSubtitle?.(event);
        }}
      />
      <div ref={bodyRef} className={classnames(bem('body'))} onScroll={onScroll}>
        {monthsList.map(renderMonth)}
      </div>
      {renderFooter()}
    </div>
  );

  useEffect(() => {
    init();
  }, [props.show]);

  useUpdateEffect(() => {
    console.log('reset currentDate:', currentDate, props.type);
    reset(getInitialDate());
  }, [props.type, props.minDate, props.maxDate]);

  useUpdateEffect(() => {
    setCurrentDate(props.defaultDate);
    scrollToCurrentDate();
  }, [props.defaultDate]);

  useImperativeHandle(ref, () => ({
    reset,
    scrollToDate,
  }));

  return props.poppable ? (
    <Popup
      visible={props.show}
      className={classnames(bem('popup'))}
      round={props.round}
      position={props.position}
      closeable={props.showTitle || props.showSubtitle}
      teleport={props.teleport}
      closeOnClickOverlay={props.closeOnClickOverlay}
      closeOnPopstate={props.closeOnPopstate}
      onClose={() => props.onClose?.()}
    >
      {renderCalendar()}
    </Popup>
  ) : (
    <>{renderCalendar()}</>
  );
});

Calendar.defaultProps = {
  type: 'single' as CalendarType,
  title: '日期选择',
  color: '#ee0a24',
  rowHeight: 64,
  poppable: true,
  lazyRender: true,
  showMark: true,
  showTitle: true,
  showSubtitle: true,
  showConfirm: true,
  readonly: false,
  firstDayOfWeek: 0,
  footer: null,
  minDate: getToday(),
  maxDate: (() => {
    const now = getToday();
    return new Date(now.getFullYear(), now.getMonth() + 6, now.getDate());
  })(),
  show: false,
  position: 'bottom',
  round: true,
  closeOnPopstate: true,
  closeOnClickOverlay: true,
  safeAreaInsetBottom: true,
  maxRange: null,
  allowSameDay: false,
};

export default Calendar;
