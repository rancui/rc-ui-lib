import React, { useContext } from 'react';
import classNames from 'classnames';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';
import useVisible from './utils/useVisible';
import { LazyloadProps } from './PropsType';

const Lazyload: React.FC<LazyloadProps> = (props) => {
  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('lazyload', prefixCls);

  const { children, forceVisible = false, className = '', height = 0, style = {}, loading = null } = props;

  const [ref, hasLoaded] = useVisible(forceVisible);

  return (
    <div className={classNames(bem(), className)} style={style} ref={ref}>
      {hasLoaded
        ? children
        : loading || <div style={{ height }} className={classNames(bem('placeholder'))} />}
    </div>
  );
};

export default Lazyload;
