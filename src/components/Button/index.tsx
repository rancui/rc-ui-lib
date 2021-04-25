import React, { useMemo, useCallback } from 'react';
import classnames from 'classnames';
import { ButtonProps } from './Props';
import Loading from '../Loading';
import Icon from '../Icon';
import styles from './index.scss';

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
        // touchstart,
        icon,
        iconPrefix = 'r-icon',
        iconPosition = 'left',
        children
    } = props;
    const Tag: any = tag || 'button';
    const Cls = classnames(
        styles[`${baseClass}`],
        {
            [styles[`${baseClass}--${type}`]]: !!type,
            [styles[`${baseClass}--${size}`]]: !!size,
            [styles[`${baseClass}--plain`]]: plain,
            [styles[`${baseClass}--disabled`]]: disabled,
            [styles[`${baseClass}--loading`]]: loading,
            [styles[`${baseClass}--round`]]: round,
            [styles[`${baseClass}--square`]]: square,
            [styles[`${baseClass}--block`]]: block,
            [styles[`${baseClass}--hairline`]]: hairline,
            [styles[`${baseClass}__${icon}`]]: !!icon
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
                    className={classnames(styles[`${baseClass}__icon`])}
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
            return <span className={classnames(styles[`${baseClass}__text`])}>{content}</span>;
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

    const handleClick = (e: TouchEvent | MouseEvent) => {
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
            <div className={classnames(styles[`${baseClass}__content`])}>
                {iconPosition === 'left' && renderIcon}
                {/* {renderContent()} */}
                {renderContent}
                {iconPosition === 'right' && renderIcon}
            </div>
        </Tag>
    );
};

export default Button;
