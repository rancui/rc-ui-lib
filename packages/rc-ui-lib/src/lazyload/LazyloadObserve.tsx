import React, { useContext } from 'react';
import classNames from 'classnames';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';
import useVisible from './utils/useVisible';
import { LazyloadProps } from './PropsType';

const Lazyload: React.FC<LazyloadProps> = (props) => {
  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('lazyload', prefixCls);

  const { children, forceVisible, className, height, style, loading } = props;

  const [ref, hasLoaded] = useVisible(forceVisible);

  return (
    <div className={classNames(bem(), className)} style={style} ref={ref}>
      {hasLoaded
        ? children
        : loading || <div style={{ height }} className={classNames(bem('placeholder'))} />}
    </div>
  );
};

Lazyload.defaultProps = {
  loading: null,
  forceVisible: false,
  height: 0,
  className: '',
  style: {},
};

export default Lazyload;
