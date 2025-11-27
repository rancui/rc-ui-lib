import React, { useContext, useEffect, useMemo, useImperativeHandle, forwardRef } from 'react';
import classnames from 'classnames';
import { CountDownInstance, CountDownProps } from './PropsType';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';
import { parseFormat } from './utils';
import { CurrentTime, useCountDown } from '../hooks/use-count-down';

const CountDown = forwardRef<CountDownInstance, CountDownProps>((props, ref) => {
  const { 
    time = 0, 
    format = 'HH:mm:ss', 
    autoStart = true, 
    millisecond = false, 
    renderChildren,
    onChange,
    onFinish,
  } = props;

  const { start, pause, reset, current } = useCountDown({
    time: +time,
    millisecond,
    onChange: (value: CurrentTime) => onChange?.(value),
    onFinish,
  });
  const timeText = useMemo(() => parseFormat(format, current), [format, current]);

  const resetTime = () => {
    reset(+time);

    if (autoStart) {
      start();
    }
  };

  useEffect(() => {
    resetTime();
  }, [time]);

  useImperativeHandle(ref, () => ({
    start,
    pause,
    reset: resetTime,
  }));

  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('count-down', prefixCls);

  return (
    <div role="timer" className={classnames(bem())}>
      {renderChildren ? renderChildren(current) : timeText}
    </div>
  );
});

export default CountDown;
