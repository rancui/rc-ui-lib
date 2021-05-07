import React from 'react';
import { ActionBarProps } from './Props';
import classnames from 'classnames';
import styles from './index.scss';

const baseClass = 'r-action-bar';
const ActionBar: React.FC<ActionBarProps> = (props) => {
    const { safeAreaInsetBottom = true, className, children } = props;
    return (
        <div
            className={classnames(
                styles[`${baseClass}`],
                { [styles[`${baseClass}--unshift`]]: !safeAreaInsetBottom },
                className
            )}
        >
            {children}
        </div>
    );
};

export default ActionBar;
