import React, { useRef, useEffect, useImperativeHandle, forwardRef, useContext } from 'react';
import classnames from 'classnames';

import Icon from '../icon';

import { getRect } from '../hooks/get-rect';
import useEventListener from '../hooks/use-event-listener';

import { NoticeBarInstance, NoticeBarProps } from './PropsType';
import { isDef, noop } from '../utils';
import { raf, doubleRaf } from '../utils/raf';
import { useSetState, useUpdateEffect } from '../hooks';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';
import PopupContext from '../popup/PopupContext';

const NoticeBar = forwardRef<NoticeBarInstance, NoticeBarProps>((props, ref) => {
  const {
    text,
    color,
    background,
    wrapable,
    scrollable,
    speed = 60,
    delay = 1,
    leftIcon,
    rightIcon,
    mode,
    onClose = noop,
    onClick = noop,
    onReplay,
    children,
    className,
    style,
  } = props;
  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const popupContext = useContext(PopupContext);
  const [bem] = createNamespace('notice-bar', prefixCls);

  const [state, setState] = useSetState({
    show: true,
    offset: 0,
    duration: 0,
  });

  const wrapRef = useRef();
  const contentRef = useRef();

  const wrapWidth = useRef(0);
  const contentWidth = useRef(0);
  const startTimer = useRef(null);

  const renderLeftIcon = () => {
    if (typeof leftIcon !== 'string' && React.isValidElement(leftIcon)) {
      return leftIcon;
    }
    if (leftIcon) {
      return <Icon className={classnames(bem('left-icon'))} name={leftIcon as string} />;
    }
    return null;
  };

  const getRightIconName = () => {
    if (mode === 'closeable') {
      return 'cross';
    }
    if (mode === 'link') {
      return 'arrow';
    }
    return '';
  };

  const handleClickRightIcon = (event: React.MouseEvent) => {
    if (mode === 'closeable') {
      setState({ show: false });
      onClose(event);
    }
  };

  //  右侧图标
  const renderRightIcon = () => {
    if (rightIcon) {
      return rightIcon;
    }
    const name = getRightIconName();
    if (name) {
      return (
        <Icon name={name} className={classnames(bem('right-icon'))} onClick={handleClickRightIcon} />
      );
    }
    return null;
  };

  //  动画结束
  const onTransitionEnd = () => {
    setState({
      offset: wrapWidth.current,
      duration: 0,
    });

    raf(() => {
      // use double raf to ensure animation can start
      doubleRaf(() => {
        setState({
          offset: -contentWidth.current,
          duration: (contentWidth.current + wrapWidth.current) / speed,
        });

        if (onReplay) {
          onReplay();
        }
      });
    });
  };

  //  文字部分
  const renderMarquee = () => {
    const ellipsis = scrollable === false && !wrapable;

    const marqueeStyle = {
      transform: state.offset ? `translateX(${state.offset}px)` : '',
      transitionDuration: `${state.duration}s`,
    };

    return (
      <div className={classnames(bem('wrap'))} ref={wrapRef}>
        <div
          className={classnames(bem('content'), { 'rc-ellipsis': ellipsis })}
          ref={contentRef}
          style={marqueeStyle}
          onTransitionEnd={onTransitionEnd}
        >
          {children || text}
        </div>
      </div>
    );
  };

  const reset = () => {
    const ms = isDef(delay) ? +delay * 1000 : 0;
    wrapWidth.current = 0;
    contentWidth.current = 0;

    setState({
      offset: 0,
      duration: 0,
    });

    clearTimeout(startTimer.current);
    startTimer.current = setTimeout(() => {
      if (!wrapRef.current || !contentRef.current || scrollable === false) {
        return;
      }

      const wrapRefWidth = getRect(wrapRef.current).width;
      const contentRefWidth = getRect(contentRef.current).width;

      if (scrollable || contentRefWidth > wrapRefWidth) {
        doubleRaf(() => {
          wrapWidth.current = wrapRefWidth;
          contentWidth.current = contentRefWidth;

          setState({
            offset: -contentWidth.current,
            duration: contentWidth.current / speed,
          });
        });
      }
    }, ms);
  };

  // fix cache issues with forwards and back history in safari
  // see: https://guwii.com/cache-issues-with-forwards-and-back-history-in-safari/
  useEventListener('pageshow', reset);

  useEffect(() => {
    reset();
  }, [text, scrollable]);

  useUpdateEffect(() => {
    reset();
  }, [popupContext.visible]);

  useImperativeHandle(ref, () => ({
    reset,
  }));

  return (
    state.show && (
      <div
        role="alert"
        className={classnames(bem({ wrapable }), className)}
        style={{ color, background, ...style }}
        onClick={onClick}
      >
        {renderLeftIcon()}
        {renderMarquee()}
        {renderRightIcon()}
      </div>
    )
  );
});

export default NoticeBar;
