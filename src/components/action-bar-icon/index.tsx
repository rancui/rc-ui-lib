import React, { useMemo } from 'react';
import classnames from 'classnames';
import Icon from '../icon';
import { ActionBarIconProps } from './props';
import './style/index.scss';

const baseClass = 'r-action-bar-icon';

const ActionBarIcon: React.FC<ActionBarIconProps> = (props) => {
  const { text, icon, color = '#323233', dot = false, badge, className } = props;

  const renderIcon = useMemo(() => {
    return (
      <Icon
        tag="div"
        dot={dot}
        name={icon}
        badge={badge}
        color={color}
        className={classnames(`${baseClass}__icon`, className)}
      />
    );
  }, [dot, icon, badge, color, className]);

  return (
    <div role="button" className={classnames(`${baseClass}`)} tabIndex={0}>
      {renderIcon}
      {text || ''}
    </div>
  );
};

export default ActionBarIcon;
