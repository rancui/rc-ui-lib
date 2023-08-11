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

const RollingText = forwardRef<RollingTextInstance, RollingTextProps>(
  ({ duration, direction, height, textList, startNum, targetNum, autoStart, ...props }, ref) => {
    const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
    const [bem] = createNamespace('rolling-text', prefixCls);

    const [rolling, setRolling] = useState(autoStart);

    const isCustomType = useMemo(() => Array.isArray(textList) && textList.length, [textList]);

    const itemLength = useMemo(() => {
      if (isCustomType) return textList[0].length;
      return `${Math.max(startNum, targetNum)}`.length;
    }, [startNum, targetNum]);

    const getTextArrByIdx = (idx: number) => {
      const result = [];
      for (let i = 0; i < textList.length; i++) {
        result.push(textList[i][idx]);
      }
      return result;
    };

    const targetNumArr = useMemo(() => {
      if (isCustomType) return new Array(itemLength).fill('');
      return padZero(targetNum, itemLength).split('');
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
      if (props.stopOrder === 'ltr') return 0.2 * i;
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
      <div className={classnames(bem(''), props.className)}>
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
  },
);

RollingText.defaultProps = {
  height: 40,
  startNum: 0,
  textList: [],
  duration: 2,
  autoStart: true,
  direction: 'down',
  stopOrder: 'ltr',
};

export default RollingText;
