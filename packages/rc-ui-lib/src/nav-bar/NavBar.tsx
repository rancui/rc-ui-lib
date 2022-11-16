import React, { useContext, CSSProperties, useRef } from 'react';
import classnames from 'classnames';
import Icon from '../icon';

import { getZIndexStyle } from '../utils';
import { BORDER_BOTTOM, HAPTICS_FEEDBACK } from '../utils/constant';
import useHeight from '../hooks/use-height';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';
import type { NavBarProps } from './PropsType';

const NavBar: React.FC<NavBarProps> = (props) => {
  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('nav-bar', prefixCls);

  const navBarRef = useRef<HTMLDivElement>();
  const height = useHeight(navBarRef);

  const onClickLeft = (event) => props.onClickLeft?.(event);
  const onClickRight = (event) => props.onClickRight?.(event);

  const renderLeft = () => {
    return [
      props.leftArrow && <Icon key="icon" className={classnames(bem('arrow'))} name="arrow-left" />,
      props.leftArea && (
        <span key="left-area" className={classnames(bem('text'))}>
          {props.leftArea}
        </span>
      ),
    ];
  };

  const renderRight = () => {
    return <span className={classnames(bem('text'))}>{props.rightArea}</span>;
  };

  const renderNavBar = () => {
    const { title, fixed, border, zIndex } = props;
    const style: CSSProperties = getZIndexStyle(zIndex);

    const hasLeft = props.leftArrow || props.leftArea;
    const hasRight = props.rightArea;
    return (
      <div
        ref={navBarRef}
        style={style}
        className={classnames(bem({ fixed, 'safe-area-inset-top': props.safeAreaInsetTop }), {
          [BORDER_BOTTOM]: border,
        })}
      >
        <div className={classnames(bem('content'))}>
          {hasLeft && (
            <div className={classnames(bem('left'), HAPTICS_FEEDBACK)} onClick={onClickLeft}>
              {renderLeft()}
            </div>
          )}
          <div className={classnames(bem('title'), 'van-ellipsis')}>{title}</div>
          {hasRight && (
            <div className={classnames(bem('right'), HAPTICS_FEEDBACK)} onClick={onClickRight}>
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

  if (props.fixed && props.placeholder) {
    return renderPlaceholder();
  }
  return renderNavBar();
};

NavBar.defaultProps = {
  title: '',
  leftArea: '',
  rightArea: '',
  leftArrow: false,
  border: true,
  fixed: false,
  placeholder: false,
  zIndex: 1,
  safeAreaInsetTop: false,
};

export default NavBar;
