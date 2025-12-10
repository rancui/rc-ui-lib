import React, { useContext, useMemo } from 'react';
import classnames from 'classnames';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';
import { RollingTextItemProps } from './PropsType';
import { addUnit } from '../utils';

const RollingTextItem: React.FC<RollingTextItemProps> = (props) => {
  const {
    direction = 'down',
    figureArr,
    isStart,
    height = 40,
    duration = 2,
    delay,
  } = props;

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
      '--rc-duration': `${duration}s`,
      '--rc-delay': delay !== undefined ? `${delay}s` : undefined,
    }),
    [duration, delay, translatePx, height],
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

export default RollingTextItem;
