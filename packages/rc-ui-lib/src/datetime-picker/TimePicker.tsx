import React, {
  forwardRef,
  useRef,
  useState,
  useMemo,
  useEffect,
  useImperativeHandle,
} from 'react';
import { Picker, useUpdateEffect } from '..';
import { DateTimePickerInstance, TimePickerProps } from './PropsType';
import { PickerInstance } from '../picker';
import { padZero, range } from '../utils';
import { times } from './utils';

const TimePicker = forwardRef<DateTimePickerInstance, TimePickerProps>((props, ref) => {
  const formatValue = (value?: string): string => {
    const { minHour, maxHour, minMinute, maxMinute } = props;

    if (!value) {
      value = `${padZero(minHour)}:${padZero(minHour)}`;
    }

    let [hour, minute] = value.split(':');
    hour = padZero(range(+hour, +minHour, +maxHour));
    minute = padZero(range(+minute, +minMinute, +maxMinute));

    return `${hour}:${minute}`;
  };

  const picker = useRef<PickerInstance>(null);
  const [currentDate, setCurrentDate] = useState(formatValue(props.value as string));
  const currentDateRef = useRef<string>(null);
  currentDateRef.current = currentDate;

  const ranges = useMemo(
    () => [
      {
        type: 'hour',
        range: [+props.minHour, +props.maxHour],
      },
      {
        type: 'minute',
        range: [+props.minMinute, +props.maxMinute],
      },
    ],
    [props.minHour, props.maxHour, props.minMinute, props.maxMinute],
  );

  const originColumns = useMemo(
    () =>
      ranges.map(({ type, range: rangeArr }) => {
        let values = times(rangeArr[1] - rangeArr[0] + 1, (index) => padZero(rangeArr[0] + index));

        if (props.filter) {
          values = props.filter(type, values);
        }

        return {
          type,
          values,
        };
      }),
    [ranges, props.filter],
  );

  const columns = useMemo(
    () =>
      originColumns.map((column) => ({
        values: column.values.map((value) => props.formatter(column.type, value)),
      })),
    [originColumns],
  );

  const updateColumnValue = (date?: string) => {
    const pair = date ? date.split(':') : currentDate.split(':');
    const values = [props.formatter('hour', pair[0]), props.formatter('minute', pair[1])];

    setTimeout(() => {
      picker.current?.setValues(values);
    }, 0);
  };

  const updateInnerValue = () => {
    const [hourIndex, minuteIndex] = picker.current.getIndexes();
    const [hourColumn, minuteColumn] = originColumns;

    const hour = hourColumn.values[hourIndex] || hourColumn.values[0];
    const minute = minuteColumn.values[minuteIndex] || minuteColumn.values[0];

    setCurrentDate(formatValue(`${hour}:${minute}`));
    updateColumnValue(formatValue(`${hour}:${minute}`));
  };

  const onConfirm = () => props.onConfirm?.(currentDate as unknown as Date);
  const onCancel = () => props.onCancel();

  const onChange = (_) => {
    updateInnerValue();
    setTimeout(() => {
      props.onChange?.(currentDateRef as unknown as Date);
    }, 0);
  };

  useEffect(() => {
    updateColumnValue();
  }, [columns]);

  useUpdateEffect(() => {
    updateInnerValue();
  }, [props.filter, props.maxHour, props.minMinute, props.maxMinute]);

  useUpdateEffect(() => {
    setTimeout(updateInnerValue, 0);
  }, [props.minHour]);

  useUpdateEffect(() => {
    const value = formatValue(props.value as string);

    if (value !== currentDate) {
      setCurrentDate(value);
      updateColumnValue(value);
    }
  }, [props.value]);

  useImperativeHandle(ref, () => ({
    getPicker: () => picker.current,
  }));

  return (
    <Picker
      ref={picker}
      columns={columns}
      readonly={props.readonly}
      onChange={onChange}
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
});

TimePicker.defaultProps = {
  minHour: 0,
  maxHour: 23,
  minMinute: 0,
  maxMinute: 59,
  formatter: (type: string, value: string) => value,
};

export default TimePicker;
