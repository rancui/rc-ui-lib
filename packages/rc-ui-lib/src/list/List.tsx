import React, { useRef, forwardRef, useImperativeHandle, isValidElement, useContext } from 'react';
import classnames from 'classnames';

import Loading from '../loading';
import { getRect } from '../hooks/get-rect';
import useScrollParent from '../hooks/use-scroll-parent';
import useEventListener from '../hooks/use-event-listener';

import { isHidden } from '../utils';
import { ListInstance, ListProps } from './PropsType';
import { useSetState, useUpdateEffect } from '../hooks';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';

const List = forwardRef<ListInstance, ListProps>((props, ref) => {
  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('list', prefixCls);
  const {
    children,
    direction = 'down',
    offset = 300,
    immediateCheck = true,
    autoCheck = true,
    loadingText = '加载中...',
    finishedText = '没有更多了',
    loading: loadingProp,
    error: errorProp,
    finished,
    errorText,
    onLoad,
  } = props;
  const scrollOffset = offset;
  const scrollDirection = direction;

  const [state, updateState] = useSetState({
    loading: loadingProp,
    error: errorProp,
  });

  const errorRecent = useRef(errorProp);

  const root = useRef<HTMLDivElement>();
  const scrollParent = useRef(null);
  const placeholder = useRef<HTMLDivElement>();

  scrollParent.current = useScrollParent(root);

  // 判断是否需要加载
  const check = async () => {
    if (!onLoad) return;
    if (state.loading || finished || errorRecent.current) {
      return;
    }
    const scrollParentRect = getRect(scrollParent.current);

    if (!scrollParentRect.height || isHidden(root.current)) {
      return;
    }

    let isReachEdge = false;
    const placeholderRect = getRect(placeholder.current);
    if (scrollDirection === 'up') {
      isReachEdge = scrollParentRect.top - placeholderRect.top <= +scrollOffset;
    } else {
      isReachEdge = placeholderRect.bottom - scrollParentRect.bottom <= +scrollOffset;
    }
    if (isReachEdge) {
      try {
        updateState({ loading: true });
        if (onLoad) await onLoad();
        updateState({ loading: false });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn('onLoad error:', error);
        updateState({ loading: false, error: true });
        errorRecent.current = true;
      }
    }
  };

  const renderFinishedText = () => {
    if (finished && finishedText) {
      return <div className={classnames(bem('finished-text'))}>{finishedText}</div>;
    }
    return null;
  };

  const clickErrorText = () => {
    updateState({ error: false });
    errorRecent.current = false;
    check();
  };

  const renderErrorText = () => {
    if (state.error && errorText) {
      return (
        <div className={classnames(bem('error-text'))} onClick={clickErrorText}>
          {errorText}
        </div>
      );
    }
    return null;
  };

  const renderLoading = () => {
    if (state.loading && !finished) {
      return (
        <div className={classnames(bem('loading'))}>
          {isValidElement(loadingText) ? (
            loadingText
          ) : (
            <Loading className={classnames(bem('loading-icon'))} size={16}>
              {loadingText}
            </Loading>
          )}
        </div>
      );
    }
    return null;
  };

  useUpdateEffect(() => {
    if (autoCheck) {
      check();
    }
  }, [state.loading, finished, errorProp]);

  useUpdateEffect(() => {
    updateState({ loading: loadingProp, error: errorProp });
    errorRecent.current = errorProp;
  }, [loadingProp, errorProp]);

  useUpdateEffect(() => {
    if (scrollParent.current && immediateCheck) {
      check();
    }
  }, [scrollParent.current]);

  useEventListener('scroll', check, {
    target: scrollParent.current,
    depends: [state.loading, finished, state.error],
  });

  useImperativeHandle(ref, () => ({
    check,
    state,
  }));

  const Placeholder = <div ref={placeholder} className={classnames(bem('placeholder'))} />;

  return (
    <div ref={root} role="feed" className={classnames(bem())} aria-busy={state.loading}>
      {direction === 'down' ? children : Placeholder}
      {renderLoading()}
      {renderFinishedText()}
      {renderErrorText()}
      {direction === 'up' ? children : Placeholder}
    </div>
  );
});

export default List;
