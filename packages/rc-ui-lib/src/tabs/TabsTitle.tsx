import React, { useMemo, CSSProperties, forwardRef, useContext } from 'react';
import classnames from 'classnames';

import { TabsTitleProps } from './PropsType';
import { isDef } from '../utils';
import Badge from '../badge';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';

const TabsTitle = forwardRef<HTMLDivElement, TabsTitleProps>((props, ref) => {
  const {
    type,
    color,
    isActive,
    activeColor,
    inactiveColor,
    disabled,
    className,
    scrollable,
    renderTitle,
    title,
    dot,
    badge,
    showZeroBadge = true,
    onClick,
  } = props;

  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('tab', prefixCls);

  const customStyle = useMemo(() => {
    const style: CSSProperties = {};
    const isCard = type === 'card';

    // card theme color
    if (color && isCard) {
      style.borderColor = color;

      if (!disabled) {
        if (isActive) {
          style.backgroundColor = color;
        } else {
          style.color = color;
        }
      }
    }

    const titleColor = isActive ? activeColor : inactiveColor;
    if (titleColor) {
      style.color = titleColor;
    }

    return style;
  }, [type, color, disabled, isActive, activeColor, inactiveColor]);

  const renderText = () => {
    const Text = (
      <span className={classnames(bem('text', { ellipsis: !scrollable }))}>
        {(() => {
          if (typeof renderTitle === 'function') {
            return renderTitle(isActive);
          }
          return renderTitle || title;
        })()}
      </span>
    );

    if (dot || (isDef(badge) && badge !== '')) {
      return (
        <Badge dot={dot} content={badge} showZero={showZeroBadge}>
          {Text}
        </Badge>
      );
    }

    return Text;
  };

  return (
    <div
      ref={ref}
      className={classnames([
        bem({
          active: isActive,
          disabled,
        }),
        className,
      ])}
      style={customStyle}
      aria-selected={isActive}
      onClick={onClick}
    >
      {renderText()}
    </div>
  );
});

export default TabsTitle;
