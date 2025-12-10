import React, { CSSProperties, useContext, useMemo, useRef } from 'react';
import classnames from 'classnames';
import { SliderProps, SliderValue } from './PropsType';
import { addUnit, range, addNumber, getSizeStyle, stopPropagation } from '../utils';
import { useTouch } from '../hooks/use-touch';
import { getRect } from '../hooks/get-rect';
import usePassiveHandler from '../hooks/usePassiveHandler';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';

type NumberRange = [number, number];

const Slider: React.FC<SliderProps> = (props) => {
  const {
    min = 0,
    max = 100,
    step = 1,
    range: isRangeMode = false,
    value: valueProp,
    disabled,
    readonly,
    reverse,
    vertical,
    barHeight,
    inactiveColor,
    activeColor,
    buttonSize,
    button,
    leftButton,
    rightButton,
    onChange,
    onChangeAfter,
    onDragStart,
    onDragEnd,
    className,
    style: propStyle,
  } = props;

  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('slider', prefixCls);

  const buttonRef1 = useRef<HTMLDivElement>(null);
  const buttonRef2 = useRef<HTMLDivElement>(null);
  const buttonIndex = useRef<0 | 1>();
  const startValue = useRef<SliderValue>();
  const currentValue = useRef<SliderValue>(valueProp);

  const root = useRef<HTMLDivElement>();
  const dragStatus = useRef<'start' | 'dragging' | ''>();
  const touch = useTouch();

  const scope = useMemo(() => Number(max) - Number(min), [max, min]);

  const wrapperStyle = useMemo(() => {
    const crossAxis = vertical ? 'width' : 'height';
    return {
      background: inactiveColor,
      [crossAxis]: addUnit(barHeight),
      ...propStyle,
    };
  }, [vertical, barHeight, inactiveColor, propStyle]);

  const isRange = (val: unknown): val is [number, number] => isRangeMode && Array.isArray(val);

  // 计算选中条的长度百分比
  const calcMainAxis = () => {
    if (isRange(valueProp)) {
      return `${((valueProp[1] - valueProp[0]) * 100) / scope}%`;
    }
    return `${((+valueProp - Number(min)) * 100) / scope}%`;
  };

  // 计算选中条的开始位置的偏移量
  const calcOffset = () => {
    if (isRange(valueProp)) {
      return `${((valueProp[0] - Number(min)) * 100) / scope}%`;
    }
    return '0%';
  };

  const barStyle = useMemo<CSSProperties>(() => {
    const mainAxis = vertical ? 'height' : 'width';

    const style: CSSProperties = {
      [mainAxis]: calcMainAxis(),
      background: activeColor,
    };

    if (dragStatus.current) {
      style.transition = 'none';
    }
    const getPositionKey = () => {
      if (vertical) {
        return reverse ? 'bottom' : 'top';
      }
      return reverse ? 'right' : 'left';
    };

    style[getPositionKey()] = calcOffset();

    return style;
  }, [calcMainAxis, calcOffset, vertical, reverse, activeColor]);

  const format = (value: number) => {
    const minValue = +min;
    const maxValue = +max;
    const stepValue = +step;

    value = range(value, minValue, maxValue);
    const diff = Math.round((value - minValue) / stepValue) * stepValue;
    return addNumber(minValue, diff);
  };

  const isSameValue = (newValue: SliderValue, oldValue: SliderValue) =>
    JSON.stringify(newValue) === JSON.stringify(oldValue);

  const handleRangeValue = (value: NumberRange) => {
    // 设置默认值
    const left = value[0] ?? Number(min);
    const right = value[1] ?? Number(max);
    // 处理两个滑块重叠之后的情况
    return left > right ? [right, left] : [left, right];
  };

  const updateValue = (value: SliderValue, end?: boolean) => {
    if (isRange(value)) {
      value = handleRangeValue(value).map(format) as [number, number];
    } else {
      value = format(value) as number;
    }
    if (!isSameValue(value, valueProp)) {
      onChange?.(value as number & [number, number]);
    }
    if (end && !isSameValue(value, startValue.current)) {
      onChangeAfter?.(value as number & [number, number]);
    }
    return value;
  };

  const onClick = (event: React.MouseEvent) => {
    event.stopPropagation();

    if (disabled || readonly) {
      return;
    }

    const rect = getRect(root.current);

    const getDelta = () => {
      if (vertical) {
        if (reverse) {
          return rect.bottom - event.clientY;
        }

        return event.clientY - rect.top;
      }
      if (reverse) {
        return rect.right - event.clientX;
      }
      return event.clientX - rect.left;
    };

    const total = vertical ? rect.height : rect.width;
    const value = Number(min) + (getDelta() / total) * scope;
    if (isRange(valueProp)) {
      const [left, right] = valueProp;
      const middle = (left + right) / 2;
      if (value <= middle) {
        updateValue([value, right], true);
      } else {
        updateValue([left, value], true);
      }
    } else {
      updateValue(value, true);
    }
  };

  const onTouchStart = (event: React.TouchEvent) => {
    if (disabled || readonly) {
      return;
    }

    touch.start(event.nativeEvent);
    currentValue.current = JSON.parse(JSON.stringify(valueProp));

    if (isRange(currentValue.current)) {
      startValue.current = currentValue.current.map(format) as [number, number];
    } else {
      startValue.current = format(currentValue.current as number);
    }

    dragStatus.current = 'start';
  };

  const onTouchMove = (event: React.TouchEvent) => {
    if (disabled || readonly) {
      return;
    }

    if (dragStatus.current === 'start') {
      onDragStart?.(event, startValue.current as number & [number, number]);
    }
    touch.move(event.nativeEvent);
    dragStatus.current = 'dragging';

    const rect = getRect(root.current);
    const delta = vertical ? touch.deltaY.current : touch.deltaX.current;

    const total = vertical ? rect.height : rect.width;
    let diff = (delta / total) * scope;

    if (reverse) {
      diff = -diff;
    }

    if (isRange(startValue.current)) {
      const index = reverse ? 1 - buttonIndex.current : buttonIndex.current;
      (currentValue.current as [number, number])[index] = startValue.current[index] + diff;
    } else {
      currentValue.current = +startValue.current + diff;
    }
    updateValue(currentValue.current);
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    if (disabled || readonly) {
      return;
    }

    if (dragStatus.current === 'dragging') {
      const value = updateValue(currentValue.current, true);
      onDragEnd?.(event, value as number & [number, number]);
    }

    dragStatus.current = '';
  };

  const getButtonClassName = (index?: 0 | 1) => {
    if (typeof index === 'number') {
      const position = ['left', 'right'];
      return bem('button-wrapper', position[index]);
    }
    return bem('button-wrapper', reverse ? 'left' : 'right');
  };

  const renderButtonContent = (value: SliderValue, index?: 0 | 1) => {
    if (typeof index === 'number') {
      const slot = index === 0 ? leftButton : rightButton;
      if (slot) {
        return slot;
      }
    }

    if (typeof button === 'function') {
      return button({ value });
    }

    if (button) {
      return button;
    }

    return <div className={classnames(bem('button'))} style={getSizeStyle(buttonSize)} />;
  };

  const renderButton = (buttounRef: React.RefObject<HTMLDivElement>, index?: 0 | 1) => {
    const value =
      typeof index === 'number'
        ? (valueProp as [number, number])[index]
        : (valueProp as number);

    return (
      <div
        ref={buttounRef}
        key={index}
        role="slider"
        className={classnames(getButtonClassName(index))}
        tabIndex={disabled || readonly ? -1 : 0}
        aria-valuemin={min}
        aria-valuenow={value}
        aria-valuemax={max}
        aria-orientation={vertical ? 'vertical' : 'horizontal'}
        onTouchStart={(event) => {
          if (typeof index === 'number') {
            // save index of current button
            buttonIndex.current = index;
          }
          onTouchStart(event);
        }}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
        onClick={stopPropagation}
      >
        {renderButtonContent(currentValue.current, index)}
      </div>
    );
  };

  usePassiveHandler();

  return (
    <div
      ref={root}
      style={wrapperStyle}
      className={classnames(
        className,
        bem({
          vertical,
          disabled,
        }),
      )}
      onClick={onClick}
    >
      <div className={classnames(bem('bar'))} style={barStyle}>
        {isRangeMode
          ? [renderButton(buttonRef1, 0), renderButton(buttonRef2, 1)]
          : renderButton(buttonRef1)}
      </div>
    </div>
  );
};

export default Slider;
