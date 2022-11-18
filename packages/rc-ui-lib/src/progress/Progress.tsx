import React, { CSSProperties, useContext, useMemo } from 'react';
import classnames from 'classnames';
import { ProgressProps } from './PropsType';
import { addUnit } from '../utils';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';

const Progress: React.FC<ProgressProps> = (props) => {
  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('progress', prefixCls);
  const { inactive, color, trackColor, percentage, strokeWidth } = props;

  const background = useMemo(() => {
    return inactive ? undefined : color;
  }, [inactive, color]);

  const renderPivot = () => {
    const { textColor, pivotText, pivotColor } = props;
    const text = pivotText ?? `${percentage}%`;

    if (props.showPivot && text) {
      const style = {
        color: textColor,
        left: `${+percentage}%`,
        transform: `translate(-${+percentage}%,-50%)`,
        background: pivotColor || background,
      };

      return (
        <span style={style} className={bem('pivot', { inactive: props.inactive }) as string}>
          {text}
        </span>
      );
    }
    return null;
  };

  const rootStyle: CSSProperties = {
    background: trackColor,
    height: addUnit(strokeWidth),
  };
  const portionStyle: CSSProperties = {
    width: `${percentage}%`,
    background,
  };
  return (
    <div className={classnames(props.className, bem())} style={rootStyle}>
      <span
        className={classnames(
          bem('portion', {
            inactive: props.inactive,
          }),
        )}
        style={portionStyle}
      />
      {renderPivot()}
    </div>
  );
};

Progress.defaultProps = {
  percentage: 0,
  strokeWidth: '4px',
  color: '#1989fa',
  trackColor: '#e5e5e5',
  pivotColor: '',
  textColor: 'white',
  inactive: false,
  showPivot: true,
};

export default Progress;
