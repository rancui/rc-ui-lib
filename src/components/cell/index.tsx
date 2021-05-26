import React, { useMemo, forwardRef, MutableRefObject, MouseEventHandler } from 'react';
import classnames from 'classnames';
import { isDef } from '../../utils';
import { CellProps } from './props';
import Icon from '../icon';
import './style/index.scss';

const baseClass = 'r-cell';

const Cell = forwardRef<unknown, CellProps>((props, ref) => {
  const {
    icon,
    size,
    title,
    value,
    label,
    center = false,
    isLink = false,
    required = false,
    iconPrefix = 'r-icon',
    valueClass,
    labelClass,
    titleClass,
    titleStyle,
    arrowDirection = 'right',
    border = true,
    clickable = true,
    className,
    onClick,
    children,
  } = props;

  const isClickable = clickable ?? isLink;

  const renderLabel = useMemo(() => {
    const showLabel = isDef(label);
    if (showLabel) {
      return <div className={classnames(`${baseClass}__label`, labelClass)}>{label}</div>;
    }
    return null;
  }, [label, labelClass]);

  const renderTitle = useMemo(() => {
    if (isDef(title)) {
      return (
        <div className={classnames(`${baseClass}__title`, titleClass)} style={titleStyle}>
          <span>{title}</span>
          {renderLabel}
        </div>
      );
    }
    return null;
  }, [title, titleStyle, titleClass, renderLabel]);

  const renderValue = useMemo(() => {
    const hasValue = children || isDef(value);
    if (hasValue) {
      const hasTitle = isDef(title);
      return (
        <div
          className={classnames(
            `${baseClass}__value`,
            { [`${baseClass}__value--alone`]: !hasTitle },
            valueClass,
          )}
        >
          {children || <span>{value}</span>}
        </div>
      );
    }
    return null;
  }, [valueClass, title, value, children]);

  const renderLeftIcon = useMemo(() => {
    if (icon) {
      return (
        <Icon
          name={icon}
          className={classnames(`${baseClass}__left-icon`)}
          classPrefix={iconPrefix}
        />
      );
    }
    return null;
  }, [icon, iconPrefix]);

  const renderRightIcon = useMemo(() => {
    if (isLink) {
      const name = arrowDirection ? `arrow-${arrowDirection}` : 'arrow';
      return <Icon name={name} className={classnames(`${baseClass}__right-icon`)} />;
    }
    return null;
  }, [isLink, arrowDirection]);

  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    onClick?.(e);
  };

  return (
    <div
      ref={ref as MutableRefObject<HTMLDivElement>}
      className={classnames(
        baseClass,
        {
          [`${baseClass}--large`]: !!size,
          [`${baseClass}--center`]: center,
          [`${baseClass}--required`]: required,
          [`${baseClass}--clickable`]: isClickable,
          [`${baseClass}--borderless`]: !border,
        },
        className,
      )}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      onClick={handleClick}
    >
      {renderLeftIcon}
      {renderTitle}
      {renderValue}
      {renderRightIcon}
    </div>
  );
});

Cell.displayName = 'Cell';
export default Cell;
