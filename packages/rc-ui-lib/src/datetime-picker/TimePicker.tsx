import React, {
  forwardRef,
  useRef,
  useMemo,
  useEffect,
  useImperativeHandle,
  useCallback,
} from 'react';
import { Picker } from '../picker';
import { DateTimePickerInstance, TimePickerProps } from './PropsType';
import { useUpdateEffect } from '../hooks';
import { padZero, range } from '../utils';
import { times } from './utils';
import useRefState from '../hooks/use-ref-state';
import { doubleRaf } from '../utils/raf';

import type { PickerInstance } from '../picker';


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
  const [currentDate, setCurrentDate, currentDateRef] = useRefState(
    formatValue(props.value as string),
  );

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

  const updateColumnValue = useCallback(() => {
    const pair = currentDate.split(':');
    const values = [props.formatter('hour', pair[0]), props.formatter('minute', pair[1])];

    doubleRaf(() => {
      picker.current?.setValues(values);
    });
  }, [currentDate, props.formatter]);

  const updateInnerValue = (indexes: number[]) => {
    const [hourIndex, minuteIndex] = indexes;
    const [hourColumn, minuteColumn] = originColumns;

    const hour = hourColumn.values[hourIndex] || hourColumn.values[0];
    const minute = minuteColumn.values[minuteIndex] || minuteColumn.values[0];

    return formatValue(`${hour}:${minute}`);
  };

  const onConfirm = () => props.onConfirm?.(currentDate as unknown as Date);
  const onCancel = () => props.onCancel();

  const onChange = (_) => {
    if (picker.current) {
      const indexes = picker.current.getIndexes();
      const nextValue = updateInnerValue(indexes);
      setCurrentDate(nextValue);
      props.onChange?.(nextValue);
    }
  };

  useEffect(() => {
    updateColumnValue();
  }, [updateColumnValue]);

  useUpdateEffect(() => {
    const nextValue = formatValue(props.value as string);

    if (nextValue !== currentDate) {
      setCurrentDate(nextValue);
    }
  }, [props.value, props.filter, props.minHour, props.maxHour, props.minMinute, props.maxMinute]);

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
