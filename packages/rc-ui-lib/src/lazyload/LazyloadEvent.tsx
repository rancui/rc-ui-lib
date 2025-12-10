import React, { useContext } from 'react';
import classNames from 'classnames';
import { DEFAULT_EVENTS } from './utils';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';
import { LazyloadEventProps } from './PropsType';
import useEventVisible from './utils/useEventVisible';

const Lazyload: React.FC<LazyloadEventProps> = ({
  children,
  loading = null,
  scrollContainer = document.body,
  listenEvents = DEFAULT_EVENTS,
  offset = 0,
  debounce = 300,
  throttle = 0,
  height = 0,
  className = '',
  style,
}) => {
  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('lazyload', prefixCls);

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

export default Lazyload;
