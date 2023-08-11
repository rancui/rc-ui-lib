import React, { useContext, useMemo } from 'react';
import classnames from 'classnames';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';
import { RollingTextItemProps } from './PropsType';
import { addUnit } from '../utils';

const RollingTextItem: React.FC<RollingTextItemProps> = ({
  direction,
  figureArr,
  isStart,
  height,
  duration,
  delay,
}) => {
  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('rolling-text-item', prefixCls);

  const newFigureArr = useMemo(() => {
    return direction === 'down' ? figureArr.slice().reverse() : figureArr;
  }, [direction, figureArr]);

  const translatePx = useMemo(() => {
    const totalHeight = height * (figureArr.length - 1);
    return `-${totalHeight}px`;
  }, [height, figureArr]);
  const itemStyle = useMemo(
    () => ({
      lineHeight: addUnit(height),
    }),
    [height],
  );
  const rootStyle = useMemo(
    () => ({
      height: addUnit(height),
      '--rc-translate': translatePx,
      '--rc-duration': `${duration  }s`,
      '--rc-delay': `${delay  }s`,
    }),
    [duration, delay, translatePx],
  );

  return (
    <div className={classnames(bem([direction]))} style={rootStyle}>
      <div className={classnames(bem('box', { animate: isStart }))}>
        {Array.isArray(newFigureArr) &&
          newFigureArr.map((figure, index) => (
            <div className={classnames(bem('item'))} key={String(index)} style={itemStyle}>
              {figure}
            </div>
          ))}
      </div>
    </div>
  );
};

RollingTextItem.defaultProps = {
  duration: 2,
  direction: 'down',
  height: 40,
};

export default RollingTextItem;
