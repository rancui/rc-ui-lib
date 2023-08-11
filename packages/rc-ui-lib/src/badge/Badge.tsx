import React, { CSSProperties, useContext } from 'react';
import classnames from 'classnames';
import { BadgeProps } from './PropsType';
import { isDef, addUnit } from '../utils';
import { isNumeric } from '../utils/validate/number';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';

const Badge: React.FC<BadgeProps> = (props) => {
  const { content, max, dot, showZero, tag } = props;

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
    if (hasContent() || props.dot) {
      let style: CSSProperties = {
        background: props.color,
      };

      if (props.offset) {
        const [x, y] = props.offset;
        const { position } = props;
        const [offsetY, offsetX] = position.split('-') as ['top' | 'bottom', 'left' | 'right'];

        if (props.children) {
          if (typeof y === 'number') {
            style[offsetY] = addUnit(offsetY === 'top' ? y : -y);
          } else {
            style[offsetY] = offsetY === 'top' ? addUnit(y) : getOffsetWithMinusString(y);
          }

          if (typeof x === 'number') {
            style[offsetX] = addUnit(offsetX === 'left' ? x : -x);
          } else {
            style[offsetX] = offsetX === 'left' ? addUnit(x) : getOffsetWithMinusString(x);
          }
        } else {
          style.marginTop = addUnit(y);
          style.marginLeft = addUnit(x);
        }
      }

      if (!props.children) {
        style = { ...props.style, ...style };
      }
      return (
        <div
          className={classnames(
            {
              [props.className]: props.className && !props.children,
            },
            bem([props.position, { dot: props.dot, fixed: !!props.children }]),
          )}
          style={style}
        >
          {renderContent()}
        </div>
      );
    }
    return null;
  };

  if (props.children) {
    return React.createElement(
      tag,
      {
        className: classnames(bem('wrapper'), props.className),
        onClick: props.onClick,
        onTouchStart: props.onTouchStart,
        style: props.style,
      },
      props.children,
      renderBadge(),
    );
  }

  return renderBadge();
};

Badge.defaultProps = {
  tag: 'div',
  showZero: true,
  position: 'top-right',
};

export default Badge;
