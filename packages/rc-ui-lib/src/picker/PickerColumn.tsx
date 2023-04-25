import React, {
  forwardRef,
  memo,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import classNames from 'classnames';
import { useSetState, useUpdateEffect } from '../hooks';
import { isObject, range } from '../utils';
import { deepClone } from '../utils/deep-clone';
import { rubberbandIfOutOfBounds } from '../utils/rubberband';
import { PickerColumnExpose, PickerColumnProps, PickerOption } from './PropsType';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';

function isOptionDisabled(option) {
  return isObject(option) && option.disabled;
}

const DEFAULT_DURATION = 200;
const MOMENTUM_LIMIT_DISTANCE = 15;

const PickerColumn = memo<PickerColumnProps & { ref?: React.ForwardedRef<PickerColumnExpose> }>(
  forwardRef<PickerColumnExpose, PickerColumnProps>((props, ref) => {
    const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
    const [bem] = createNamespace('picker-column', prefixCls);

    const { itemHeight, visibleItemCount, defaultIndex, initialOptions } = props;

    const root = useRef<HTMLDivElement>(null);
    const wrapper = useRef<HTMLUListElement>(null);

    const indexRef = useRef<number>(defaultIndex);
    const optionsRef = useRef<PickerOption[]>(
      deepClone(initialOptions) as unknown as PickerOption[],
    );

    const [state, updateState] = useSetState({
      offset: 0,
      duration: 0,
      options: deepClone(initialOptions),
    });

    const count = useMemo(() => optionsRef.current.length, [optionsRef.current.length]);

    const baseOffset = useMemo(() => {
      // 默认转入第一个选项的位置
      return (itemHeight * (+visibleItemCount - 1)) / 2;
    }, [itemHeight, visibleItemCount]);

    const draggingRef = useRef(false);

    const [{ y }, api] = useSpring(() => ({
      from: { y: defaultIndex * -itemHeight + baseOffset },
      config: {
        tension: 400,
        mass: 0.8,
      },
    }));

    const adjustIndex = (index: number): number | null => {
      index = range(index, 0, count);
      for (let i = index; i < count; i += 1) {
        if (!isOptionDisabled(optionsRef.current[i])) return i;
      }
      // for (let i = index - 1; i >= 0; i -= 1) {
      //   if (!isOptionDisabled(optionsRef.current[i])) return i;
      // }

      return null;
    };

    const setIndex = (index: number, emitChange?: boolean) => {
      index = adjustIndex(index) || 0;

      const offset = index * -itemHeight;
      api.start({ y: offset + baseOffset });

      if (index !== indexRef.current) {
        indexRef.current = index;
        // updateState({ index });
        if (emitChange && props.onChange) {
          setTimeout(() => {
            props.onChange(index);
          }, 0);
        }
      }

      updateState({ offset });
    };
    const setOptions = (options: PickerOption[]) => {
      if (JSON.stringify(options) !== JSON.stringify(optionsRef.current)) {
        optionsRef.current = options;
        setIndex(props.defaultIndex);
      }
    };

    const onClickItem = (index: number) => {
      if (draggingRef.current || props.readonly) {
        return;
      }
      updateState({ duration: DEFAULT_DURATION });
      setIndex(index, true);
    };

    function isOption(option: string | PickerOption): option is PickerOption {
      return isObject(option) && props.textKey in option;
    }

    const getOptionText = (option: string | PickerOption): string => {
      if (isOption(option)) {
        return option[props.textKey];
      }
      return option;
    };

    const getIndexByOffset = (offset: number) =>
      range(Math.round(-offset / props.itemHeight), 0, count - 1);

    const bind = useDrag(
      (dragState) => {
        if (props.readonly) {
          return;
        }
        draggingRef.current = true;
        if (dragState.tap) {
          updateState({ duration: 0, offset: dragState.offset[1] });
        } else if (dragState.last) {
          const allowMomentum =
            Math.abs(dragState.velocity[1] * dragState.direction[1] * 50) > MOMENTUM_LIMIT_DISTANCE;
          const position =
            dragState.offset[1] + dragState.velocity[1] * dragState.direction[1] * 50 - baseOffset;
          const targetIndex = getIndexByOffset(position);
          updateState({
            duration: allowMomentum ? +props.swipeDuration : DEFAULT_DURATION,
            offset: position + baseOffset,
          });
          setIndex(targetIndex, true);
        } else {
          const position = dragState.offset[1];
          const max = baseOffset;
          const min = -(count * itemHeight) + baseOffset;
          // const offset = range(position, -(count * itemHeight), itemHeight);
          const offset = rubberbandIfOutOfBounds(position, min, max, itemHeight * 50, 0.2);
          api.start({
            y: offset,
          });
        }
      },
      {
        axis: 'y',
        from: () => [0, y.get()],
        filterTaps: true,
        pointer: { touch: true },
      },
    );

    const renderOptions = useMemo(() => {
      const optionStyle = {
        height: `${props.itemHeight}px`,
      };

      return optionsRef.current.map((option, index: number) => {
        const text = getOptionText(option);
        const disabled = isOptionDisabled(option);

        const data = {
          role: 'button',
          key: index,
          style: optionStyle,
          tabIndex: disabled ? -1 : 0,
          className: classNames(
            bem('item', {
              disabled,
              selected: index === indexRef.current,
            }),
          ),
          onClick: () => {
            draggingRef.current = false;
            onClickItem(index);
          },
        };

        const childData = {
          className: 'rc-ellipsis',
          children: text,
        };

        return (
          <li {...data}>
            {props.optionRender ? props.optionRender(option) : <div {...childData} />}
          </li>
        );
      });
    }, [optionsRef.current, indexRef.current, onClickItem, props.optionRender]);

    const setValue = (value: string) => {
      const options = optionsRef.current;
      for (let i = 0; i < options.length; i += 1) {
        if (getOptionText(options[i]) === value) {
          return setIndex(i);
        }
      }
      return null;
    };

    const getValue = useCallback<() => PickerOption>(
      () => optionsRef.current[indexRef.current],
      [indexRef.current, optionsRef.current],
    );

    useEffect(() => {
      setIndex(defaultIndex);
    }, [defaultIndex]);

    useUpdateEffect(() => {
      setOptions(deepClone(initialOptions) as unknown as PickerOption[]);
    }, [initialOptions]);

    useImperativeHandle(ref, () => ({
      state,
      getIndex: () => indexRef.current,
      getOptions: () => optionsRef.current,
      setIndex,
      getValue,
      setValue,
      setOptions,
    }));

    return (
      <div ref={root} className={classNames(bem(), props.className)} {...bind()}>
        <animated.ul
          ref={wrapper}
          className={classNames(bem('wrapper'))}
          style={{
            y,
            transitionDuration: `${state.duration}ms`,
            transitionProperty: state.duration ? 'all' : 'none',
          }}
          aria-hidden
        >
          {renderOptions}
        </animated.ul>
      </div>
    );
  }),
  (prev, next) => {
    if (prev.index !== next.index) return false;
    if (prev.textKey !== next.textKey) {
      return false;
    }
    if (JSON.stringify(prev.initialOptions) !== JSON.stringify(next.initialOptions)) {
      return false;
    }
    return true;
  },
);

// PickerColumn.defaultProps = {
//   initialOptions: [],
//   defaultIndex: 0,
// };

PickerColumn.displayName = 'PickerColumn';

export default PickerColumn;
