import React, { useContext, useEffect, useMemo, useImperativeHandle, forwardRef } from 'react';
import classnames from 'classnames';
import { CountDownInstance, CountDownProps } from './PropsType';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';
import { parseFormat } from './utils';
import { CurrentTime, useCountDown } from '../hooks/use-count-down';

const CountDown = forwardRef<CountDownInstance, CountDownProps>((props, ref) => {
  const { time, format, autoStart, millisecond, renderChildren } = props;

  const { start, pause, reset, current } = useCountDown({
    time: +time,
    millisecond,
    onChange: (value: CurrentTime) => props.onChange?.(value),
    onFinish: props.onFinish,
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

CountDown.defaultProps = {
  time: 0,
  format: 'HH:mm:ss',
  autoStart: true,
  millisecond: false,
};

export default CountDown;
