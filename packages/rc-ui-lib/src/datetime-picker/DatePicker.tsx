import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  useCallback,
} from 'react';

import Picker, { PickerInstance } from '../picker';

import { DatePickerProps, DatetimePickerColumnType, DateTimePickerInstance } from './PropsType';
import { getMonthEndDay, getTrueValue, times } from './utils';
import { useMount, useUpdateEffect } from '../hooks';
import { isDate } from '../utils/validate/date';
import { padZero } from '../utils';
import { doubleRaf } from '../utils/raf';

const DatePicker = forwardRef<DateTimePickerInstance, DatePickerProps>((props, ref) => {
  const {
    value,
    formatter,
    columnsOrder,
    type: datePickerType,
    filter,
    minDate: datePickerMinDate,
    maxDate: datePickerMaxDate,
    ...pickerProps
  } = props;

  const formatValue = (date) => {
    if (!isDate(date)) {
      date = props.minDate;
    }

    date = Math.max(date, props.minDate.getTime());
    date = Math.min(date, props.maxDate.getTime());

    return new Date(date);
  };

  const pickerRef = useRef<PickerInstance>(null);
  const [currentDate, setCurrentDate] = useState(formatValue(value));
  const currentDateRef = useRef<Date>(currentDate);

  const getBoundary = (type: 'max' | 'min', dateValue: Date) => {
    const boundary = props[`${type}Date`];
    const year = boundary.getFullYear();
    let month = 1;
    let date = 1;
    let hour = 0;
    let minute = 0;

    if (type === 'max') {
      month = 12;
      date = getMonthEndDay(dateValue.getFullYear(), dateValue.getMonth() + 1);
      hour = 23;
      minute = 59;
    }

    if (dateValue.getFullYear() === year) {
      month = boundary.getMonth() + 1;
      if (dateValue.getMonth() + 1 === month) {
        date = boundary.getDate();
        if (dateValue.getDate() === date) {
          hour = boundary.getHours();
          if (dateValue.getHours() === hour) {
            minute = boundary.getMinutes();
          }
        }
      }
    }

    return {
      [`${type}Year`]: year,
      [`${type}Month`]: month,
      [`${type}Date`]: date,
      [`${type}Hour`]: hour,
      [`${type}Minute`]: minute,
    };
  };
  const ranges = useMemo(() => {
    const { maxYear, maxDate, maxMonth, maxHour, maxMinute } = getBoundary(
      'max',
      currentDateRef.current,
    );
    const { minYear, minDate, minMonth, minHour, minMinute } = getBoundary(
      'min',
      currentDateRef.current,
    );

    let result = [
      {
        type: 'year',
        range: [minYear, maxYear],
      },
      {
        type: 'month',
        range: [minMonth, maxMonth],
      },
      {
        type: 'day',
        range: [minDate, maxDate],
      },
      {
        type: 'hour',
        range: [minHour, maxHour],
      },
      {
        type: 'minute',
        range: [minMinute, maxMinute],
      },
    ];

    switch (props.type) {
      case 'date':
        result = result.slice(0, 3);
        break;
      case 'year-month':
        result = result.slice(0, 2);
        break;
      case 'month-day':
        result = result.slice(1, 3);
        break;
      case 'datehour':
        result = result.slice(0, 4);
        break;
      default:
        break;
    }

    if (columnsOrder) {
      const columnsOrderArr = columnsOrder.concat(result.map((column) => column.type));
      result.sort((a, b) => columnsOrderArr.indexOf(a.type) - columnsOrderArr.indexOf(b.type));
    }

    return result;
  }, [columnsOrder, props.type]);

  const originColumns = useMemo(
    () =>
      ranges.map(({ type, range: rangeArr }) => {
        // 根据范围获取每列的值
        let values = times(rangeArr[1] - rangeArr[0] + 1, (index: number) => {
          return padZero(rangeArr[0] + index);
        }) as string[];

        if (filter) {
          values = filter(type, values);
        }

        return {
          type,
          values,
        };
      }),
    [filter, ranges],
  );

  const columns = useMemo(() => {
    return originColumns.map((column) => ({
      values: column.values.map((e) => formatter(column.type, e)),
    }));
  }, [originColumns, formatter]);

  const updateColumnValue = useCallback(() => {
    const values = originColumns.map((column) => {
      switch (column.type) {
        case 'year':
          return formatter('year', `${currentDate.getFullYear()}`);
        case 'month':
          return formatter('month', padZero(currentDate.getMonth() + 1));
        case 'day':
          return formatter('day', padZero(currentDate.getDate()));
        case 'hour':
          return formatter('hour', padZero(currentDate.getHours()));
        case 'minute':
          return formatter('minute', padZero(currentDate.getMinutes()));
        default:
          // no default
          return null;
      }
    });

    doubleRaf(() => {
      pickerRef.current?.setValues(values);
    });
  }, [currentDate, formatter, originColumns]);

  const updateInnerValue = (indexes: number[]) => {
    const { type } = props;
    const getValue = (datetimePickerColumnType: DatetimePickerColumnType) => {
      let index = 0;
      originColumns.forEach((column, columnIndex) => {
        if (datetimePickerColumnType === column.type) {
          index = columnIndex;
        }
      });
      const { values } = originColumns[index];
      return getTrueValue(values[indexes[index]]);
    };

    let year = null;
    let month = null;
    let day = null;
    if (type === 'month-day') {
      year = (currentDate || props.minDate).getFullYear();
      month = getValue('month');
      day = getValue('day');
    } else {
      year = getValue('year');
      month = getValue('month');
      day = type === 'year-month' ? 1 : getValue('day');
    }

    const maxDay = getMonthEndDay(year, month);
    day = day > maxDay ? maxDay : day;

    let hour = 0;
    let minute = 0;

    if (type === 'datehour') {
      hour = +getValue('hour');
    }

    if (type === 'datetime') {
      hour = +getValue('hour');
      minute = +getValue('minute');
    }

    return formatValue(new Date(year, month - 1, day, hour, minute));
  };

  const onChange = () => {
    if (pickerRef.current) {
      const indexes = pickerRef.current.getIndexes();
      const nextValue = updateInnerValue(indexes);
      setCurrentDate(nextValue);
      currentDateRef.current = nextValue;
      props.onChange?.(nextValue);
    }
  };

  const onConfirm = () => {
    props.onConfirm?.(currentDate);
  };

  useMount(() => {
    setTimeout(() => {
      if (pickerRef.current) {
        const indexes = pickerRef.current?.getIndexes();
        const nextValue = updateInnerValue(indexes);
        setCurrentDate(nextValue);
        currentDateRef.current = nextValue;
      }
    }, 0);
  });

  useEffect(() => {
    updateColumnValue();
  }, [updateColumnValue]);

  const { minDate, maxDate } = props;

  useUpdateEffect(() => {
    const nextValue = formatValue(value);

    if (nextValue && nextValue.valueOf() !== currentDate?.valueOf()) {
      setCurrentDate(nextValue);
      currentDateRef.current = nextValue;
    }
  }, [value, filter, minDate, maxDate]);

  useImperativeHandle(ref, () => ({
    getPicker: () => pickerRef.current,
  }));

  return (
    <Picker
      {...pickerProps}
      ref={pickerRef}
      columns={columns}
      onChange={onChange}
      onConfirm={onConfirm}
      onCancel={props.onCancel}
    />
  );
});

const currentYear = new Date().getFullYear();

DatePicker.defaultProps = {
  type: 'datetime',
  minDate: new Date(currentYear - 10, 0, 1),
  maxDate: new Date(currentYear + 10, 11, 31),
  formatter: (type: string, value: string) => value,
} as const;

DatePicker.displayName = 'DatePicker';

export default DatePicker;
