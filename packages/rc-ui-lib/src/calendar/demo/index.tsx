/* eslint-disable @typescript-eslint/no-shadow */
import React, { useState } from 'react';
import { components } from 'site-mobile-demo';
import { Cell } from '../..';
import Calendar, { CalendarDayItem, CalendarType } from '..';

const DEFAULT_PROPS = {
  id: '',
  type: 'single',
  round: true,
  color: undefined,
  minDate: undefined,
  maxDate: undefined,
  maxRange: undefined,
  position: undefined,
  formatter: undefined,
  showConfirm: true,
  confirmText: undefined,
  confirmDisabledText: undefined,
  firstDayOfWeek: 0,
  currentDate: null,
};

export default (): React.ReactNode => {
  const { DemoBlock, DemoSection } = components;
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState({
    maxRange: [],
    selectSingle: null,
    selectRange: [],
    selectMultiple: [],
    quickSelect1: null,
    quickSelect2: [],
    customColor: [],
    customConfirm: [],
    customRange: null,
    customDayText: [],
    customPosition: null,
  });
  const [props, setProps] = useState({ ...DEFAULT_PROPS });

  const resetSettings = () => {
    setProps({ ...DEFAULT_PROPS });
  };

  const dayFormatter = (day: CalendarDayItem) => {
    if (!day.date) {
      return day;
    }

    const month = day.date.getMonth() + 1;
    const date = day.date.getDate();

    if (month === 5) {
      if (date === 1) {
        day.topInfo = '劳动节';
      } else if (date === 4) {
        day.topInfo = '青年节';
      } else if (date === 11) {
        day.text = '今天';
      }
    }

    if (day.type === 'start') {
      day.bottomInfo = '入店';
    } else if (day.type === 'end') {
      day.bottomInfo = '离店';
    }

    return day;
  };

  const show = (type: string, id: string) => {
    resetSettings();
    const state = { ...DEFAULT_PROPS };
    state.id = id;
    state.type = type;

    switch (id) {
      case 'quickSelect1':
      case 'quickSelect2':
        state.showConfirm = false;
        break;
      case 'customColor':
        state.color = '#1989fa';
        break;
      case 'customConfirm':
        state.confirmText = '完成';
        state.confirmDisabledText = '请选择结束时间';
        break;
      case 'customRange':
        state.minDate = new Date(2010, 0, 1);
        state.maxDate = new Date(2010, 0, 31);
        break;
      case 'customDayText':
        state.minDate = new Date(2010, 4, 1);
        state.maxDate = new Date(2010, 4, 31);
        state.formatter = dayFormatter;
        break;
      case 'customPosition':
        state.round = false;
        state.position = 'right';
        break;
      case 'maxRange':
      case 'selectMultiple':
        state.maxRange = 3;
        break;
      case 'firstDayOfWeek':
        state.firstDayOfWeek = 1;
        break;
      default:
        break;
    }
    setProps(state);
    setShowCalendar(true);
  };

  const formatDate = (date: Date) => {
    if (date) {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    }
    return '';
  };

  const formatFullDate = (date: Date) => {
    if (date) {
      return `${date.getFullYear()}/${formatDate(date)}`;
    }
    return '';
  };

  const formatMultiple = (dates: Date[]) => {
    if (dates.length) {
      return `选择了 ${dates.length} 个日期`;
    }
    return '';
  };

  const formatRange = (dateRange: Date[]) => {
    if (dateRange.length) {
      const [start, end] = dateRange;
      return `${formatDate(start)} - ${formatDate(end)}`;
    }
    return '';
  };

  const onClose = () => {
    setShowCalendar(false);
  };
  const onConfirm = (value: Date | Date[]) => {
    onClose();
    setDate({
      ...date,
      [props.id]: value,
    });
  };

  return (
    <DemoSection className="demo-cascader">
      <DemoBlock card title="基础用法">
        <Cell
          isLink
          title="选择单个日期"
          value={formatFullDate(date.selectSingle)}
          onClick={() => show('single', 'selectSingle')}
        />
        <Cell
          isLink
          title="选择多个日期"
          value={formatMultiple(date.selectMultiple)}
          onClick={() => show('multiple', 'selectMultiple')}
        />
        <Cell
          isLink
          title="选择日期区间"
          value={formatRange(date.selectRange)}
          onClick={() => show('range', 'selectRange')}
        />
      </DemoBlock>
      <DemoBlock card title="快捷选择">
        <Cell
          isLink
          title="选择单个日期"
          value={formatFullDate(date.quickSelect1)}
          onClick={() => show('single', 'quickSelect1')}
        />
        <Cell
          isLink
          title="选择日期区间"
          value={formatRange(date.quickSelect2)}
          onClick={() => show('range', 'quickSelect2')}
        />
      </DemoBlock>
      <DemoBlock card title="自定义日历">
        <Cell
          isLink
          title="自定义颜色"
          value={formatRange(date.customColor)}
          onClick={() => show('range', 'customColor')}
        />
        <Cell
          isLink
          title="自定义日期范围"
          value={formatFullDate(date.customRange)}
          onClick={() => show('single', 'customRange')}
        />
        <Cell
          isLink
          title="自定义按钮文字"
          value={formatRange(date.customConfirm)}
          onClick={() => show('range', 'customConfirm')}
        />
        <Cell
          isLink
          title="自定义日期文案"
          value={formatRange(date.customDayText)}
          onClick={() => show('range', 'customDayText')}
        />
        <Cell
          isLink
          title="自定义弹出位置"
          value={formatFullDate(date.customPosition)}
          onClick={() => show('single', 'customPosition')}
        />
        <Cell
          isLink
          title="日期区间最大范围"
          value={formatRange(date.maxRange)}
          onClick={() => show('range', 'maxRange')}
        />
        <Cell isLink title="自定义周起始日" onClick={() => show('single', 'firstDayOfWeek')} />
      </DemoBlock>
      <DemoBlock card title="平铺模式">
        <Calendar
          type="single"
          poppable={false}
          round
          showConfirm={false}
          style={{ height: '500px' }}
        />
      </DemoBlock>
      <Calendar
        show={showCalendar}
        type={props.type as CalendarType}
        color={props.color}
        round={props.round}
        position={props.position}
        minDate={props.minDate}
        maxDate={props.maxDate}
        maxRange={props.maxRange}
        formatter={props.formatter}
        showConfirm={props.showConfirm}
        confirmText={props.confirmText}
        confirmDisabledText={props.confirmDisabledText}
        firstDayOfWeek={props.firstDayOfWeek}
        onConfirm={onConfirm}
        onClose={onClose}
      />
    </DemoSection>
  );
};
