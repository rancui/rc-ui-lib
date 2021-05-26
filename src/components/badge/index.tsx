import React, { MouseEventHandler, useRef } from 'react';
import classnames from 'classnames';
import { isDef } from '../../utils';
import { BadgeProps } from './props';
import './style/index.scss';

const baseClass = 'r-badge';
const Badge: React.FC<BadgeProps> = (props) => {
  const {
    dot,
    max,
    content,
    color,
    tag = 'div',
    className,
    offset,
    style,
    children,
    onClick,
  } = props;

  const Tag: any = tag;
  const isIcon = useRef<boolean>(false);

  const hasContent = () => {
    if (isIcon.current) {
      return true;
    }
    return isDef(content) && content !== '';
  };
  const renderContent = () => {
    if (!dot && hasContent()) {
      if (isIcon.current) {
        return React.Children.map(children as any, (child: JSX.Element) => {
          if (child?.type?.name === 'Icon') {
            return child;
          }
          return null;
        });
      }
    }
    if (isDef(max) && isDef(content) && Number(content) > Number(max)) {
      const maxNum = Number(max);
      return `${maxNum}+`;
    }

    return content;
  };

  const renderBadge = () => {
    if (hasContent() || dot) {
      const style: React.CSSProperties = {
        background: color,
      };
      if (offset) {
        const [x, y] = offset;
        if (content) {
          style.top = `${y}px`;
          style.right = `${-x}px`;
        } else {
          style.marginTop = `${y}px`;
          style.marginLeft = `${x}px`;
        }
      }

      return (
        <div
          className={classnames(baseClass, {
            [`${baseClass}--fixed`]: !!children,
            [`${baseClass}--dot`]: dot,
          })}
          style={style}
        >
          {renderContent()}
        </div>
      );
    }
    return null;
  };

  const withoutChildren = () => {
    return renderBadge();
  };

  const handleClick: MouseEventHandler<HTMLElement> = (e) => {
    onClick?.(e);
  };

  const hasChildren = () => {
    return (
      <Tag
        className={classnames(`${baseClass}__wrapper`, className)}
        onClick={handleClick}
        style={style}
      >
        {React.Children.map(children as any, (child: JSX.Element) => {
          if (child?.type?.name === 'Icon') {
            isIcon.current = true;
          }
          return child;
        })}
        {renderBadge()}
      </Tag>
    );
  };

  return <>{children ? hasChildren() : withoutChildren()}</>;
};

export default Badge;
