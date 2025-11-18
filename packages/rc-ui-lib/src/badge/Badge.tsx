import React, { CSSProperties, useContext } from 'react';
import classnames from 'classnames';
import { BadgeProps } from './PropsType';
import { isDef, addUnit } from '../utils';
import { isNumeric } from '../utils/validate/number';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';

const Badge: React.FC<BadgeProps> = ({
  content,
  max,
  dot,
  showZero = true,          // 原defaultProps
  tag = 'div',              // 原defaultProps
  position = 'top-right',   // 原defaultProps
  color,
  offset,
  children,
  style,
  className,
  onClick,
  onTouchStart,
}: BadgeProps) => {
  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('badge', prefixCls);

  const hasContent = () => {
    return isDef(content) && content !== '' && (showZero || +content !== 0);
  };

  const renderContent = () => {
    if (!dot && hasContent()) {
      if (isDef(max) && isNumeric(content?.toString()) && +content > +max) {
        return `${max}+`;
      }

      return content;
    }
    return null;
  };

  const getOffsetWithMinusString = (val: string) =>
    val.startsWith('-') ? val.replace('-', '') : `-${val}`;

  const renderBadge = () => {
    if (hasContent() || dot) {
      let badgeStyle: CSSProperties = {
        background: color,
      };

      if (offset) {
        const [x, y] = offset;
        const [offsetY, offsetX] = position.split('-') as ['top' | 'bottom', 'left' | 'right'];

        if (children) {
          if (typeof y === 'number') {
            badgeStyle[offsetY] = addUnit(offsetY === 'top' ? y : -y);
          } else {
            badgeStyle[offsetY] = offsetY === 'top' ? addUnit(y) : getOffsetWithMinusString(y);
          }

          if (typeof x === 'number') {
            badgeStyle[offsetX] = addUnit(offsetX === 'left' ? x : -x);
          } else {
            badgeStyle[offsetX] = offsetX === 'left' ? addUnit(x) : getOffsetWithMinusString(x);
          }
        } else {
          badgeStyle.marginTop = addUnit(y);
          badgeStyle.marginLeft = addUnit(x);
        }
      }

      // 没有 children 的情况，外层就直接是这个 badge，本身要合并传进来的 style
      if (!children) {
        badgeStyle = { ...style, ...badgeStyle };
      }

      return (
        <div
          className={classnames(
            {
              [className!]: className && !children,
            },
            bem([position, { dot, fixed: !!children }]),
          )}
          style={badgeStyle}
        >
          {renderContent()}
        </div>
      );
    }
    return null;
  };

  if (children) {
    return React.createElement(
      tag,
      {
        className: classnames(bem('wrapper'), className),
        onClick,
        onTouchStart,
        style,
      },
      children,
      renderBadge(),
    );
  }

  return renderBadge();
};

export default Badge;
