import React, { useMemo, useCallback } from 'react';
import classnames from 'classnames';
import { ButtonProps } from './props';
import Loading from '../loading';
import Icon from '../icon';
import './style/index.scss';

const baseClass = 'r-button';
const Button: React.FC<ButtonProps> = (props) => {
    const {
        type = 'default',
        plain = false,
        disabled = false,
        loading = false,
        round = false,
        square = false,
        block = false,
        hairline = false,
        size = 'normal',
        loadingType = 'circular',
        loadingText,
        loadingSize = '16px',
        text,
        color,
        className,
        tag = 'button',
        nativeType,
        onClick,
        icon,
        iconPrefix = 'r-icon',
        iconPosition = 'left',
        children
    } = props;
    const Tag: any = tag || 'button';
    const Cls = classnames(
        // `${baseClass}`],
        baseClass,
        {
            [`${baseClass}--${type}`]: !!type,
            [`${baseClass}--${size}`]: !!size,
            [`${baseClass}--plain`]: plain,
            [`${baseClass}--disabled`]: disabled,
            [`${baseClass}--loading`]: loading,
            [`${baseClass}--round`]: round,
            [`${baseClass}--square`]: square,
            [`${baseClass}--block`]: block,
            [`${baseClass}--hairline`]: hairline,
            [`${baseClass}__${icon}`]: !!icon
        },
        className
    );

    const renderIcon = useMemo(() => {
        if (loading) {
            return <Loading color={color} size={loadingSize} type={loadingType} />;
        }
        if (icon) {
            return (
                <Icon
                    className={classnames(`${baseClass}__icon`)}
                    classPrefix={iconPrefix}
                    color={color}
                    name={icon}
                />
            );
        }
    }, [loading, icon, loadingType, loadingSize, color, iconPrefix]);

    const renderContent = useMemo(() => {
        let content;
        if (loading) {
            content = loadingText;
        } else {
            content = children || text;
        }
        if (content) {
            return <span className={classnames(`${baseClass}__text`)}>{content}</span>;
        }
    }, [loading, loadingText, text, children]);

    const getStyle = useCallback(() => {
        if (color) {
            const style = {} as any;
            style.color = plain ? color : 'white';
            if (!plain) {
                // 为了使linear-gradient起作用，请用background 代替 backgroundColor
                style.background = color;
                style.border = 'none';
            }
            // 当是渐变色是，去掉边框。
            if (color.indexOf('gradient') !== -1) {
                style.border = 'none';
            } else {
                style.borderColor = color;
            }
            return style;
        }
        return null;
    }, [color, plain]);

    const handleClick = (e) => {
        if (!disabled || !loading) {
            onClick?.(e);
        }
    };

    return (
        <Tag
            className={Cls}
            disabled={disabled}
            onClick={handleClick}
            style={getStyle()}
            type={nativeType}
        >
            <div className={classnames(`${baseClass}__content`)}>
                {iconPosition === 'left' && renderIcon}
                {renderContent}
                {iconPosition === 'right' && renderIcon}
            </div>
        </Tag>
    );
};

export default Button;
