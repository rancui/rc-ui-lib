import React, { useRef, useMemo, useCallback, ReactElement, MutableRefObject } from 'react';
import { CheckerProps } from './props';
import { addUnit } from '@/utils';
import Icon from '../icon';
import classnames from 'classnames';
import './style/index.scss';

const Checker: React.FC<CheckerProps> = (props) => {
    const {
        shape = 'round',
        imgUrl,
        disabled = false,
        labelDisabled = false,
        labelPosition = 'right',
        iconSize = '16px',
        bindGroup = true,
        checked,
        checkedColor = '#1989fa',
        parent,
        role,
        onClick,
        onToggle,
        children,
        baseClass
    } = props;

    const iconRef = useRef<HTMLElement>(null);

    const getParentProp = useCallback(
        (arg: string) => {
            if (parent && bindGroup) {
                return parent[arg];
            }
        },
        [parent, bindGroup]
    );
    // 父组件传递的排列方向
    const directionVal = () => {
        return getParentProp('direction') || null;
    };

    // 是否禁用
    const disabledStatus = useMemo(() => {
        return getParentProp('disabled') || disabled;
    }, [getParentProp, disabled]);

    // icon行内样式
    const iconStyle = () => {
        const checkedStatusColor = getParentProp('checkedColor') || checkedColor;
        if (checked && checkedStatusColor && !disabledStatus) {
            return {
                borderColor: checkedStatusColor,
                backgroundColor: checkedStatusColor
            };
        }
    };

    // 点击checkbox
    const handleClick = (e) => {
        const { target } = e;
        const icon = iconRef.current;
        // 当点击的是复选框 或者 点击的区域包括复选框
        const iconClicked = icon === target || icon?.contains(target as Node);
        // 复选框没被禁用，并且（复选框被点击或者文本内容没被禁用的情况下）
        if (!disabledStatus && (iconClicked || !labelDisabled)) {
            onToggle?.(!checked);
        }
        // 触发onClick事件
        onClick?.(e);
    };

    // 外层样式
    const iconWrapperClassString = classnames(`${baseClass}__icon`, {
        [`${baseClass}__icon--round`]: shape === 'round',
        [`${baseClass}__icon--disabled`]: disabledStatus,
        [`${baseClass}__icon--checked`]: checked,
        [`${baseClass}__icon--double`]: disabledStatus && checked
    });
    // 内层样式
    // const iconInnerClassString = classnames('r-icon', {
    //     [styles['r-icon']]: checked,
    //     [styles['r-icon']]: shape === 'round',
    //     [styles['r-icon']]: disabledStatus,
    //     [styles['r-icon']]: disabledStatus && checked
    // });

    const renderIcon = () => {
        return (
            <div
                ref={iconRef as MutableRefObject<HTMLDivElement>}
                className={iconWrapperClassString}
                style={{ fontSize: addUnit(parent?.iconSize || iconSize) }}
            >
                {imgUrl ? (
                    <img
                        src={checked ? imgUrl.activeIcon : imgUrl.inactiveIcon}
                        className={classnames(`${baseClass}__imgUrl`)}
                    />
                ) : (
                    <Icon name="success" className={classnames('r-icon')} style={iconStyle()} />
                )}
            </div>
        );
    };

    const renderLabel = useMemo(() => {
        const classString = classnames(
            `${baseClass}__label`,
            `${baseClass}__label--${labelPosition}`,
            {
                [`${baseClass}__label--disabled`]: disabledStatus
            }
        );
        return <>{children && <span className={classString}>{children}</span>}</>;
    }, [labelPosition, disabledStatus, children, baseClass]);

    const nodes: (ReactElement | undefined)[] = [renderIcon()];
    labelPosition === 'left' ? nodes.unshift(renderLabel) : nodes.push(renderLabel);

    const classString = classnames(baseClass, `${baseClass}--${directionVal()}`, {
        [`${baseClass}--label-disabled`]: labelDisabled,
        [`${baseClass}--disabled`]: disabledStatus
    });

    return (
        <div
            onClick={handleClick}
            className={classString}
            role={role}
            tabIndex={disabledStatus ? -1 : 0}
            aria-checked={checked}
        >
            {nodes.map((item, index) => {
                return React.cloneElement(item as React.ReactElement, {
                    key: index
                });
            })}
        </div>
    );
};

export default Checker;
