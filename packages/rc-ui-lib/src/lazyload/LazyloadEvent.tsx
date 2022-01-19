import React, { useContext } from 'react';
import classNames from 'classnames';
import { DEFAULT_EVENTS } from './utils';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';
import { LazyloadEventProps } from './PropsType';
import useEventVisible from './utils/useEventVisible';

const Lazyload: React.FC<LazyloadEventProps> = (props) => {
  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('lazyload', prefixCls);

  const {
    children,
    loading,
    scrollContainer,
    listenEvents,
    offset,
    debounce,
    throttle,
    height,
    className,
    style,
  } = props;

  const [containerRef, visible] = useEventVisible({
    listenEvents,
    offset,
    scrollContainer,
    debounce,
    throttle,
  });

  return (
    <div className={classNames(bem(), className)} style={style} ref={containerRef}>
      {visible
        ? children
        : loading || <div style={{ height }} className={classNames(bem('placeholder'))} />}
    </div>
  );
};

Lazyload.defaultProps = {
  loading: null,
  className: '',
  height: 0,
  listenEvents: DEFAULT_EVENTS,
  scrollContainer: document.body,
  offset: 0,
  debounce: 300,
  throttle: 0,
};

export default Lazyload;
