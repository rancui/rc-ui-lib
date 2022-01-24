/* eslint-disable no-nested-ternary */
export function compareMonth(date1: Date, date2: Date): number {
  const year1 = date1.getFullYear();
  const year2 = date2.getFullYear();

  if (year1 === year2) {
    const month1 = date1.getMonth();
    const month2 = date2.getMonth();
    return month1 === month2 ? 0 : month1 > month2 ? 1 : -1;
  }

  return year1 > year2 ? 1 : -1;
}

export function compareDay(day1: Date, day2: Date): number {
  const compareMonthResult = compareMonth(day1, day2);

  if (compareMonthResult === 0) {
    const date1 = day1.getDate();
    const date2 = day2.getDate();
    return date1 === date2 ? 0 : date1 > date2 ? 1 : -1;
  }

  return compareMonthResult;
}

export const cloneDate = (date: Date): Date => new Date(date);

export const cloneDates = (dates: Date | Date[]): Date | Date[] =>
  Array.isArray(dates) ? dates.map(cloneDate) : cloneDate(dates);

export function getDayByOffset(date: Date, offset: number): Date {
  const cloned = cloneDate(date);
  cloned.setDate(cloned.getDate() + offset);
  return cloned;
}

export const getPrevDay = (date: Date): Date => getDayByOffset(date, -1);
export const getNextDay = (date: Date): Date => getDayByOffset(date, 1);
export const getToday = (): Date => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

export function calcDateNum(date: [Date, Date]): number {
  const day1 = date[0].getTime();
  const day2 = date[1].getTime();
  return (day2 - day1) / (1000 * 60 * 60 * 24) + 1;
}

export const getMonthEndDay = (year: number, month: number): number =>
  32 - new Date(year, month - 1, 32).getDate();

const calendarLang = {
  end: '结束',
  start: '开始',
  title: '日期选择',
  confirm: '确定',
  startEnd: '开始/结束',
  weekdays: ['日', '一', '二', '三', '四', '五', '六'],
  monthTitle: (year: number, month: number) => `${year}年${month}月`,
  rangePrompt: (maxRange: number) => `最多选择 ${maxRange} 天`,
};

export const t = (key: string, ...args): string => {
  if (args.length) {
    return calendarLang[key](...args);
  }
  return calendarLang[key];
};

export const formatMonthTitle = (date: Date): string =>
  t('monthTitle', date.getFullYear(), date.getMonth() + 1);
