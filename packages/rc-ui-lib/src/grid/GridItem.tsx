import React, { useContext, useMemo } from 'react';
import classnames from 'classnames';
import { addUnit } from '../utils';
import { GridProps, GridItemProps } from './PropsType';
import { BORDER } from '../utils/constant';
import Badge from '../badge';
import Icon from '../icon';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';

type InternalProps = {
  parent?: GridProps;
  index?: number;
};

const GridItem: React.FC<GridItemProps & InternalProps> = ({
  children,
  className,
  style,
  index = 0,
  parent = {},
  icon,
  badge,
  iconPrefix,
  iconColor,
  text,
  contentStyle: contentStyleProp,
  contentClassName,
  onClick,
  ...props
}) => {
  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('grid-item', prefixCls);
  if (!parent) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error('[rc-ui-lib] <GridItem> must be a child component of <Grid>.');
    }
  }
  const rootStyle = useMemo(() => {
    const { square, gutter, columnNum } = parent;
    const percent = `${100 / +columnNum}%`;
    const internalStyle: React.CSSProperties = {
      ...style,
      flexBasis: percent,
    };

    if (square) {
      internalStyle.paddingTop = percent;
    } else if (gutter) {
      const gutterValue = addUnit(gutter);
      internalStyle.paddingRight = gutterValue;
      if (index >= columnNum) {
        internalStyle.marginTop = gutterValue;
      }
    }

    return internalStyle;
  }, [parent.style, parent.gutter, parent.columnNum]);

  const contentStyle = useMemo(() => {
    const { square, gutter } = parent;

    if (square && gutter) {
      const gutterValue = addUnit(gutter);
      return {
        ...contentStyleProp,
        right: gutterValue,
        bottom: gutterValue,
        height: 'auto',
      };
    }
    return contentStyleProp;
  }, [parent.gutter, parent.columnNum, contentStyleProp]);

  const renderIcon = () => {
    if (typeof icon === 'string') {
      return (
        <Icon
          badge={badge}
          name={icon as string}
          size={parent.iconSize}
          className={classnames(bem('icon'))}
          classPrefix={iconPrefix}
          color={iconColor}
        />
      );
    }
    if (React.isValidElement(icon)) {
      return <Badge {...badge}>{icon}</Badge>;
    }
    return null;
  };

  const renderText = () => {
    if (React.isValidElement(text)) {
      return text;
    }
    if (text) {
      return <span className={classnames(bem('text'))}>{text}</span>;
    }
    return null;
  };

  const renderContent = () => {
    if (children) {
      return children;
    }
    return (
      <>
        {renderIcon()}
        {renderText()}
      </>
    );
  };

  const { center, border, square, gutter, reverse, direction } = parent;

  const classes = classnames(
    contentClassName,
    bem('content', [
      direction,
      {
        center,
        square,
        reverse,
        clickable: !!onClick,
        surround: border && gutter,
      },
    ]),
    { [BORDER]: border },
  );

  return (
    <div className={classnames(className, bem({ square }))} style={rootStyle}>
      <div
        role={onClick ? 'button' : undefined}
        className={classes}
        style={contentStyle}
        onClick={onClick}
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default GridItem;
