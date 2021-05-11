import React from 'react';
import { ActionBarProps } from './props';
import classnames from 'classnames';
import './style/index.scss';

const baseClass = 'r-action-bar';
const ActionBar: React.FC<ActionBarProps> = (props) => {
    const { safeAreaInsetBottom = true, className, children } = props;
    return (
        <div
            className={classnames(
                baseClass,
                { [`${baseClass}--unshift`]: !safeAreaInsetBottom },
                className
            )}
        >
            {children}
        </div>
    );
};

export default ActionBar;
