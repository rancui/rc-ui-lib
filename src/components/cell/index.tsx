import React, { useMemo, forwardRef, MutableRefObject } from 'react';
import { CellProps } from './props';
import Icon from '../icon';
import { isDef } from '@/utils';
import classnames from 'classnames';
import './style/index.scss';

const baseClass = 'r-cell';

const Cell = forwardRef<HTMLDivElement, CellProps>((props, ref) => {
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
        children
    } = props;

    const isClickable = clickable ?? isLink;

    const renderLabel = useMemo(() => {
        const showLabel = isDef(label);
        if (showLabel) {
            return <div className={classnames(`${baseClass}__label`, labelClass)}>{label}</div>;
        }
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
    }, [title, titleStyle, titleClass, renderLabel]);

    const renderValue = useMemo(() => {
        const hasTitle = isDef(title);
        const hasValue = isDef(value);

        if (hasValue) {
            return (
                <div
                    className={classnames(
                        `${baseClass}__value`,
                        { [`${baseClass}__value--alone`]: !hasTitle },
                        valueClass
                    )}
                >
                    <span>{value}</span>
                </div>
            );
        }

        if (children) {
            return children;
        }
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
    }, [icon, iconPrefix]);

    const renderRightIcon = useMemo(() => {
        if (isLink) {
            const name = arrowDirection ? `arrow-${arrowDirection}` : 'arrow';
            return <Icon name={name} className={classnames(`${baseClass}__right-icon`)} />;
        }
    }, [isLink, arrowDirection]);

    const handleClick = (e) => {
        onClick?.(e);
    };

    return (
        <div
            className={classnames(
                `${baseClass}`,
                {
                    [`${baseClass}--large`]: !!size,
                    [`${baseClass}--center`]: center,
                    [`${baseClass}--required`]: required,
                    [`${baseClass}--clickable`]: isClickable,
                    [`${baseClass}--borderless`]: !border
                },
                className
            )}
            role={clickable ? 'button' : undefined}
            tabIndex={clickable ? 0 : undefined}
            onClick={handleClick}
            ref={ref as MutableRefObject<HTMLDivElement>}
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
