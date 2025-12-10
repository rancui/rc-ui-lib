import React, { useContext } from 'react';
import classnames from 'classnames';
import { SkeletonProps } from './PropsType';
import { addUnit, getSizeStyle } from '../utils';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';

const DEFAULT_ROW_WIDTH = '100%';
const DEFAULT_LAST_ROW_WIDTH = '60%';

const Skeleton: React.FC<SkeletonProps> = (props) => {
  const {
    children,
    className,
    style,
    loading = true,
    animate = true,
    round = true,
    row = 3,
    avatarShape = 'round',
    rowWidth = DEFAULT_ROW_WIDTH,
    rowHeight,
    title,
    titleWidth,
    avatar,
    avatarSize,
  } = props;

  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('skeleton', prefixCls);

  const getRowWidth = (index: number) => {
    if (rowWidth === DEFAULT_ROW_WIDTH && index === +row - 1) {
      return DEFAULT_LAST_ROW_WIDTH;
    }

    if (Array.isArray(rowWidth)) {
      return rowWidth[index];
    }

    return rowWidth;
  };
  const getRowHeight = (index: number) => {
    if (Array.isArray(rowHeight)) {
      return rowHeight[index];
    }

    return rowHeight;
  };

  const renderAvatar = () => {
    if (avatar) {
      return (
        <div
          className={classnames(bem('avatar', avatarShape))}
          style={getSizeStyle(avatarSize)}
        />
      );
    }
    return null;
  };

  const renderTitle = () => {
    if (title) {
      const width = addUnit(titleWidth);
      const height = addUnit(getRowHeight(0));
      return <div className={classnames(bem('title'))} style={{ width, height }} />;
    }
    return null;
  };

  const renderRows = () =>
    Array(row)
      .fill('')
      .map((_, i) => {
        const width = addUnit(getRowWidth(i));
        const height = addUnit(getRowHeight(i));
        // eslint-disable-next-line react/no-array-index-key
        return <div key={i} className={classnames(bem('row'))} style={{ width, height }} />;
      });

  if (!loading) return children;
  return (
    <div
      className={classnames(className, bem({ animate, round }))}
      style={style}
    >
      {renderAvatar()}
      <div className={classnames(bem('content'))}>
        {renderTitle()}
        {renderRows()}
      </div>
    </div>
  );
};

export default Skeleton;
