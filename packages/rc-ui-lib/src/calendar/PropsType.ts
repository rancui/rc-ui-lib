import React, { MouseEvent } from 'react';
import { PopupPosition } from '../popup';
import { BaseTypeProps, TeleportType } from '../utils';

export type CalendarType = 'single' | 'range' | 'multiple';

export type CalendarDayType =
  | ''
  | 'start'
  | 'start-end'
  | 'middle'
  | 'end'
  | 'selected'
  | 'multiple-middle'
  | 'multiple-selected'
  | 'disabled'
  | 'placeholder';

export type CalendarDayItem = {
  date?: Date;
  text?: string | number;
  type?: CalendarDayType;
  topInfo?: string;
  className?: string;
  bottomInfo?: string;
};

export type CalendarDayProps = {
  item: CalendarDayItem;
  color: string;
  index: number;
  offset?: number;
  rowHeight: string;
  topInfoRender?: (day: CalendarDayItem) => React.ReactNode;
  bottomInfoRender?: (day: CalendarDayItem) => React.ReactNode;
  onClick?: (item: CalendarDayItem) => void;
};

export type CalendarInstance = {
  reset: (date?: Date | Date[]) => void;
  scrollToDate: (targetDate: Date) => void;
};

export interface CalendarProps extends BaseTypeProps {
  position?: PopupPosition;
  round?: boolean;
  closeOnPopstate?: boolean;
  closeOnClickOverlay?: boolean;
  safeAreaInsetBottom?: boolean;
  teleport?: TeleportType;
  show?: boolean;
  type?: CalendarType;
  title?: React.ReactNode | string;
  subtitle?: React.ReactNode | string;
  color?: string;
  readonly?: boolean;
  poppable?: boolean;
  maxRange?: string | number;
  showMark?: boolean;
  showTitle?: boolean;
  formatter?: (item: CalendarDayItem) => CalendarDayItem;
  rowHeight?: string | number;
  confirmText?: string;
  rangePrompt?: string;
  lazyRender?: boolean;
  showConfirm?: boolean;
  defaultDate?: Date | Date[] | null;
  allowSameDay?: boolean;
  showSubtitle?: boolean;
  showRangePrompt?: boolean;
  confirmDisabledText?: string;
  minDate?: Date;
  maxDate?: Date;
  firstDayOfWeek?: number;
  footer?: React.ReactNode | string;
  topInfoRender?: (day: CalendarDayItem) => React.ReactNode;
  bottomInfoRender?: (day: CalendarDayItem) => React.ReactNode;
  onClickSubtitle?: (ev: MouseEvent) => void;
  /** 点击确认后的回调 */
  onConfirm?: (v: Date | Date[]) => void;
  onOverRange?: () => void;
  onSelect?: (v: Date | Date[]) => void;
  onUnselect?: (v: Date | Date[]) => void;
  onMonthShow?: (obj: { date: Date; title: string }) => void;
  onClose?: () => void;
}

export type CalendarMonthProps = {
  date?: Date;
  type?: CalendarType;
  color?: string;
  minDate?: Date;
  maxDate?: Date;
  showMark?: boolean;
  rowHeight?: number | string;
  formatter?: (item: CalendarDayItem) => CalendarDayItem;
  formatMonthTitle?: (date: Date) => React.ReactNode;
  lazyRender?: boolean;
  currentDate?: Date | Date[];
  allowSameDay?: boolean;
  showSubtitle?: boolean;
  showMonthTitle?: boolean;
  firstDayOfWeek?: number;
  topInfoRender?: (day: CalendarDayItem) => React.ReactNode;
  bottomInfoRender?: (day: CalendarDayItem) => React.ReactNode;
  onClick?: (item: CalendarDayItem) => void;
};

export type CalendarMonthInstance = {
  showed?: boolean;
  getTitle: () => string | React.ReactNode;
  getHeight: () => number;
  setVisible: (value?: boolean | undefined) => void;
  scrollToDate: (body: Element, targetDate: Date) => void;
};
