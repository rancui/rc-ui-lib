import React, { useContext, useMemo } from 'react';
import classNames from 'classnames';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';
import { CalendarDayProps } from './PropsType';

const CalendarDay: React.FC<CalendarDayProps> = (props) => {
  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('calendar', prefixCls);
  const { item, index, color, offset = 0, rowHeight } = props;

  const calcStyle = useMemo(() => {
    const style: React.CSSProperties = {
      height: rowHeight,
    };

    if (item.type === 'placeholder') {
      style.width = '100%';
      return style;
    }

    if (index === 0) {
      style.marginLeft = `${(100 * offset) / 7}%`;
    }

    if (color) {
      switch (item.type) {
        case 'end':
        case 'start':
        case 'start-end':
        case 'multiple-middle':
        case 'multiple-selected':
          style.background = color;
          break;
        case 'middle':
          style.color = color;
          break;
        default:
          break;
      }
    }

    return style;
  }, [item, index, color, offset, rowHeight]);

  const onClick = () => {
    if (props.item.type !== 'disabled') {
      props.onClick?.(item);
    }
  };

  const renderTopInfo = () => {
    const { topInfo } = props.item;

    return topInfo || props.topInfoRender ? (
      <div key={String(index)} className={classNames(bem('top-info'))}>
        {props.topInfoRender ? props.topInfoRender(props.item) : topInfo}
      </div>
    ) : null;
  };

  const renderBottomInfo = () => {
    const { bottomInfo } = props.item;

    return bottomInfo || props.bottomInfoRender ? (
      <div key={String(index)} className={classNames(bem('bottom-info'))}>
        {props.bottomInfoRender ? props.bottomInfoRender(props.item) : bottomInfo}
      </div>
    ) : null;
  };

  const renderContent = () => {
    const { type, text } = item;

    const Nodes = [renderTopInfo(), text, renderBottomInfo()];

    if (type === 'selected') {
      return (
        <div
          className={classNames(bem('selected-day'))}
          style={{
            width: rowHeight,
            height: rowHeight,
            background: color,
          }}
        >
          {Nodes}
        </div>
      );
    }

    return Nodes;
  };
  const { type, className } = props.item;
  return type === 'placeholder' ? (
    <div key={String(index)} className={classNames(bem('day'))} style={calcStyle} />
  ) : (
    <div
      role="gridcell"
      style={calcStyle}
      className={classNames(bem('day', type), className)}
      tabIndex={type === 'disabled' ? undefined : -1}
      onClick={onClick}
    >
      {renderContent()}
    </div>
  );
};

export default CalendarDay;
