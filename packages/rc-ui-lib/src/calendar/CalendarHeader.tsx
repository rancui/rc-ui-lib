import React, { MouseEvent, useContext } from 'react';
import classNames from 'classnames';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';

type CalendarHeaderProps = {
  title: React.ReactNode | string;
  subtitle: React.ReactNode | string;
  showTitle: boolean;
  showSubtitle: boolean;
  firstDayOfWeek: number;
  onClickSubtitle: (ev: MouseEvent<HTMLDivElement>) => void;
};

const CalendarHeader: React.FC<CalendarHeaderProps> = (props) => {
  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('calendar', prefixCls);

  const { onClickSubtitle, showTitle, showSubtitle, firstDayOfWeek } = props;

  const renderTitle = () => {
    const { title } = props;
    return showTitle ? <div className={classNames(bem('header-title'))}>{title}</div> : null;
  };

  const renderSubtitle = () => {
    const title = props.subtitle;
    return showSubtitle ? (
      <div className={classNames(bem('header-subtitle'))} onClick={onClickSubtitle}>
        {title}
      </div>
    ) : null;
  };

  const renderWeekDays = () => {
    const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
    const renderWeekDaysArr = [
      ...weekdays.slice(firstDayOfWeek, 7),
      ...weekdays.slice(0, firstDayOfWeek),
    ];
    return (
      <div className={classNames(bem('weekdays'))}>
        {renderWeekDaysArr.map((text, index) => (
          <span key={index} className={classNames(bem('weekday'))}>
            {text}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className={classNames(bem('header'))}>
      {renderTitle()}
      {renderSubtitle()}
      {renderWeekDays()}
    </div>
  );
};

export default CalendarHeader;
