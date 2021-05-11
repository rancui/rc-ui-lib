import React, { useMemo } from 'react';
import { ActionBarButtonProps } from './props';
import Button from '@/components/button';
import classnames from 'classnames';
import './style/index.scss';

const baseClass = 'r-action-bar-button';

const ActionBarButton: React.FC<ActionBarButtonProps> = (props) => {
    const {
        type,
        icon,
        text,
        color,
        loading = false,
        disabled = false,
        indexPostion,
        onClick
    } = props;

    const isFirst = useMemo(() => {
        if (indexPostion === 'first') {
            return true;
        }
        return false;
    }, [indexPostion]);

    const isLast = useMemo(() => {
        if (indexPostion === 'last') {
            return true;
        }
        return false;
    }, [indexPostion]);

    const handleClick = () => {
        onClick?.();
    };

    return (
        <Button
            className={classnames(baseClass, `${baseClass}--${type}`, {
                [`${baseClass}--first`]: isFirst,
                [`${baseClass}--last`]: isLast
            })}
            size="large"
            type={type}
            icon={icon}
            color={color}
            loading={loading}
            disabled={disabled}
            onClick={handleClick}
        >
            {text ? text : ''}
        </Button>
    );
};
export default ActionBarButton;
