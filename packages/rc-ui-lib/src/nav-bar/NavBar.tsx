import React, { useContext, CSSProperties, useRef } from 'react';
import classnames from 'classnames';
import Icon from '../icon';

import { getZIndexStyle } from '../utils';
import { BORDER_BOTTOM, HAPTICS_FEEDBACK } from '../utils/constant';
import useHeight from '../hooks/use-height';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';
import type { NavBarProps } from './PropsType';

const NavBar: React.FC<NavBarProps> = (props) => {
  const {
    title = '',
    leftArea = '',
    rightArea = '',
    leftArrow = false,
    border = true,
    fixed = false,
    placeholder = false,
    zIndex = 1,
    safeAreaInsetTop = false,
    onClickLeft,
    onClickRight,
  } = props;

  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('nav-bar', prefixCls);

  const navBarRef = useRef<HTMLDivElement>();
  const height = useHeight(navBarRef);

  const handleClickLeft = (event: React.MouseEvent) => onClickLeft?.(event);
  const handleClickRight = (event: React.MouseEvent) => onClickRight?.(event);

  const renderLeft = () => {
    return [
      leftArrow && <Icon key="icon" className={classnames(bem('arrow'))} name="arrow-left" />,
      leftArea && (
        <span key="left-area" className={classnames(bem('text'))}>
          {leftArea}
        </span>
      ),
    ];
  };

  const renderRight = () => {
    return <span className={classnames(bem('text'))}>{rightArea}</span>;
  };

  const renderNavBar = () => {
    const style: CSSProperties = getZIndexStyle(zIndex);

    const hasLeft = leftArrow || leftArea;
    const hasRight = rightArea;
    return (
      <div
        ref={navBarRef}
        style={style}
        className={classnames(bem({ fixed, 'safe-area-inset-top': safeAreaInsetTop }), {
          [BORDER_BOTTOM]: border,
        })}
      >
        <div className={classnames(bem('content'))}>
          {hasLeft && (
            <div className={classnames(bem('left'), HAPTICS_FEEDBACK)} onClick={handleClickLeft}>
              {renderLeft()}
            </div>
          )}
          <div className={classnames(bem('title'), 'van-ellipsis')}>{title}</div>
          {hasRight && (
            <div className={classnames(bem('right'), HAPTICS_FEEDBACK)} onClick={handleClickRight}>
              {renderRight()}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderPlaceholder = () => (
    <div
      className={classnames(bem('placeholder'))}
      style={{ height: height ? `${height}px` : undefined }}
    >
      {renderNavBar()}
    </div>
  );

  if (fixed && placeholder) {
    return renderPlaceholder();
  }
  return renderNavBar();
};

export default NavBar;
