import React, { ReactElement, useMemo } from 'react';
import { LoadingProps } from './Props';
import { addUnit, getSizeStyle } from '@/utils';
import classnames from 'classnames';
import styles from './index.scss';

const Loading: React.FC<LoadingProps> = (props) => {
    const baseClass = 'r-loading';
    const {
        color,
        type = 'circular',
        size = '30px',
        text = '',
        textSize = '14px',
        textColor,
        vertical = false,
        className
    } = props;

    const SpinIcon: ReactElement[] = [];
    for (let i = 0; i < 12; i++) {
        SpinIcon.push(<i key={i} />);
    }
    const spinnerStyle = () => ({
        color,
        ...getSizeStyle(size)
    });

    const CircularIcon = (
        <svg className={classnames(styles[`${baseClass}__circular`])} viewBox="25 25 50 50">
            <circle cx="50" cy="50" fill="none" r="20" />
        </svg>
    );

    const renderText = useMemo(() => {
        return (
            <span
                className={classnames(styles[`${baseClass}__text`])}
                style={{
                    fontSize: addUnit(textSize),
                    color: textColor ?? color
                }}
            >
                {text}
            </span>
        );
    }, [text, textSize, textColor, color]);

    const classStringWrapper = classnames(
        styles[`${baseClass}`],
        styles[`${baseClass}__spinner--${type}`],
        {
            [styles[`${baseClass}--vertical`]]: !!vertical
        },
        className
    );
    const classStringInner = classnames(
        styles[`${baseClass}__spinner`],
        styles[`${baseClass}__spinner--${type}`]
    );
    return (
        <div className={classStringWrapper}>
            <span className={classStringInner} style={spinnerStyle()}>
                {type === 'spinner' ? SpinIcon : CircularIcon}
            </span>
            {renderText}
        </div>
    );
};

export default Loading;
