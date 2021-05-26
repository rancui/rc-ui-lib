import React, { MouseEventHandler } from 'react';
import classnames from 'classnames';
import { addUnit } from '../utils';
import { IconProps } from './props';
import Badge from '../badge';
import './style/index.scss';

export const isImage = (name?: string): boolean => {
  return name ? name.indexOf('/') !== -1 : false;
};
const baseClass = 'r-icon';

const Icon: React.FC<IconProps> = (props) => {
  const {
    tag = 'i',
    name,
    badge,
    classPrefix = 'r-icon',
    color,
    size,
    dot = false,
    className,
    onClick,
    children,
  } = props;

  const isImageIcon = isImage(name);

  const handleClick: MouseEventHandler<HTMLElement> = (e) => {
    onClick?.(e);
  };

  return (
    <Badge
      className={classnames(classPrefix, { [`${classPrefix}-${name}`]: !isImageIcon }, className)}
      content={badge}
      dot={dot}
      onClick={handleClick}
      style={{
        color,
        fontSize: addUnit(size),
      }}
      tag={tag}
    >
      {children}
      {isImageIcon && <img alt="badge" className={classnames(`${baseClass}__image`)} src={name} />}
    </Badge>
  );
};

export default Icon;