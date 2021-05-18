import React, {
    useRef,
    useMemo,
    useCallback,
    ReactElement,
    ReactNode,
    MutableRefObject,
    forwardRef,
    useImperativeHandle
} from 'react';
import { CheckerProps } from './props';
import { addUnit } from '@/utils';
import Icon from '../icon';
import classnames from 'classnames';
import './style/index.scss';

const Checker = forwardRef<unknown, CheckerProps>((props, ref) => {
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
    const iconStyle = useCallback(() => {
        const checkedStatusColor = getParentProp('checkedColor') || checkedColor;
        if (checked && checkedStatusColor && !disabledStatus) {
            return {
                borderColor: checkedStatusColor,
                backgroundColor: checkedStatusColor
            };
        }
    }, [checkedColor, checked, disabledStatus, getParentProp]);

    // 外层样式
    const iconWrapperClassString = classnames(`${baseClass}__icon`, {
        [`${baseClass}__icon--round`]: shape === 'round',
        [`${baseClass}__icon--disabled`]: disabledStatus,
        [`${baseClass}__icon--checked`]: checked,
        [`${baseClass}__icon--double`]: disabledStatus && checked
    });

    const classString = classnames(baseClass, `${baseClass}--${directionVal()}`, {
        [`${baseClass}--label-disabled`]: labelDisabled,
        [`${baseClass}--disabled`]: disabledStatus
    });

    const renderIcon = useMemo(() => {
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
    }, [iconSize, parent?.iconSize, checked, iconWrapperClassString, imgUrl, baseClass, iconStyle]);

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

    const nodes: ReactNode[] = [renderIcon];
    labelPosition === 'left' ? nodes.unshift(renderLabel) : nodes.push(renderLabel);

    useImperativeHandle(ref, () => ({
        handleClick
    }));

    // 点击checkbox
    const handleClick = (e) => {
        const { target } = e;
        const icon = iconRef.current;
        // 当点击的是复选框 或者 点击的区域包括复选框
        const iconClicked = icon === target || icon?.contains(target as Node);
        // 复选框没被禁用，并且（复选框被点击或者文本内容没被禁用的情况下）
        if (!disabledStatus && (iconClicked || !labelDisabled)) {
            // 状态取反
            onToggle?.(!checked);
        }
        // 触发onClick事件
        onClick?.(e);
    };

    return (
        <div
            ref={ref as MutableRefObject<HTMLDivElement>}
            onClick={handleClick}
            className={classString}
            role={role}
            tabIndex={disabledStatus ? -1 : 0}
            aria-checked={checked}
        >
            {nodes.map((item, index) => {
                return React.cloneElement(item as ReactElement, {
                    key: index
                });
            })}
        </div>
    );
});
Checker.displayName = 'Checker';
export default Checker;
