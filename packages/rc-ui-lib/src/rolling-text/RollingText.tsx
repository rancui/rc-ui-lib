import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import classnames from 'classnames';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';
import { RollingTextInstance, RollingTextProps } from './PropsType';
import RollingTextItem from './RollingTextItem';
import { padZero } from '../utils';
import { raf } from '../utils/raf';

const CIRCLE_NUM = 2;

const RollingText = forwardRef<RollingTextInstance, RollingTextProps>((props, ref) => {
  const {
    height = 40,
    startNum = 0,
    textList = [],
    duration = 2,
    autoStart = true,
    direction = 'down',
    stopOrder = 'ltr',
    targetNum,
    className,
  } = props;

  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('rolling-text', prefixCls);

  const [rolling, setRolling] = useState(autoStart);

  const isCustomType = useMemo(() => Array.isArray(textList) && textList.length, [textList]);

  const itemLength = useMemo(() => {
    if (isCustomType) return textList[0].length;
    return `${Math.max(startNum, targetNum || 0)}`.length;
  }, [startNum, targetNum, isCustomType, textList]);

  const getTextArrByIdx = (idx: number) => {
    const result = [];
    for (let i = 0; i < textList.length; i++) {
      result.push(textList[i][idx]);
    }
    return result;
  };

  const targetNumArr = useMemo(() => {
    if (isCustomType) return new Array(itemLength).fill('');
    return padZero(targetNum || 0, itemLength).split('');
  }, [isCustomType, itemLength, targetNum]);

  const startNumArr = useMemo(
    () => padZero(startNum, itemLength).split(''),
    [startNum, itemLength],
  );

  const getFigureArr = (i: number) => {
    const start = +startNumArr[i];
    const target = +targetNumArr[i];
    const result = [];
    for (let index = start; index <= 9; index++) {
      result.push(index);
    }
    for (let index2 = 0; index2 <= CIRCLE_NUM; index2++) {
      for (let j = 0; j <= 9; j++) {
        result.push(j);
      }
    }
    for (let index3 = 0; index3 <= target; index3++) {
      result.push(index3);
    }
    return result;
  };

  const getDelay = (i: number, len: number) => {
    if (stopOrder === 'ltr') return 0.2 * i;
    return 0.2 * (len - 1 - i);
  };

  const start = () => {
    setRolling(true);
  };

  const reset = () => {
    setRolling(false);

    if (autoStart) {
      raf(() => start());
    }
  };

  useEffect(() => {
    if (autoStart) {
      start();
    }
  }, [autoStart]);

  useImperativeHandle(ref, () => ({
    start,
    reset,
  }));

  return (
    <div className={classnames(bem(''), className)}>
      {targetNumArr.map((_, i) => (
        <RollingTextItem
          key={String(i)}
          figureArr={isCustomType ? getTextArrByIdx(i) : getFigureArr(i)}
          duration={duration}
          direction={direction}
          isStart={rolling}
          height={height}
          delay={getDelay(i, itemLength)}
        />
      ))}
    </div>
  );
});

export default RollingText;
