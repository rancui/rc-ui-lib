import React, {
  forwardRef,
  useContext,
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
} from 'react';
import classNames from 'classnames';

import ConfigProviderContext from '../config-provider/ConfigProviderContext';
import { PasswordInputInstance, PasswordInputProps } from '.';
import { BORDER_LEFT, BORDER_SURROUND } from '../utils/constant';
import { addUnit } from '../utils';
import useUpdateEffect from '../hooks/use-update-effect';
import { NumberKeyboardProps } from '../number-keyboard';

const DEFAULT_CELL_LENGTH = 6;

const PasswordInput = forwardRef<PasswordInputInstance, PasswordInputProps>((props, ref) => {
  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('password-input', prefixCls);

  const rootRef = useRef<HTMLDivElement>(null);
  const nativeInputRef = useRef<HTMLInputElement>(null);

  const [inputValue, setInputValue] = useState(props.value);

  const { length, value, focused } = props;

  const info = props.errorInfo || props.info;

  const cellLength = length > 0 && length < Infinity ? Math.floor(length) : DEFAULT_CELL_LENGTH;

  useUpdateEffect(() => {
    if (['', undefined].includes(value)) {
      setInputValue('');
    }
    setInputValue(value.slice(0, cellLength));
  }, [value, cellLength]);

  useEffect(() => {
    if (inputValue.length >= cellLength) {
      props.onFill?.(inputValue);
    }
    props.onChange?.(inputValue.slice(0, cellLength));
  }, [props.onChange, props.onFill, inputValue, cellLength]);

  const onFocus = () => {
    if (!props.keyboard) {
      nativeInputRef.current?.focus();
    }
    props.onFocus?.();
  };

  const onBlur = () => {
    props.onBlur?.();
  };

  useImperativeHandle(ref, () => ({
    focus: () => onFocus(),
    blur: () => {
      onBlur();
      nativeInputRef.current?.blur();
    },
    resetValue: () => {
      setInputValue('');
    },
  }));

  const onTouchStart = (event) => {
    event.stopPropagation();
    props.onFocus?.();
  };

  const renderPoints = () => {
    const Points: JSX.Element[] = [];
    const { mask, gutter } = props;

    for (let i = 0; i < length; i++) {
      const char = inputValue[i];
      const showBorder = i !== 0 && !gutter;
      const showCursor = focused && i === inputValue.length;

      let style;
      if (i !== 0 && gutter) {
        style = { marginLeft: addUnit(gutter) };
      }

      Points.push(
        <li
          key={i}
          className={classNames({ [BORDER_LEFT]: showBorder }, bem('item', { focus: showCursor }))}
          style={style}
        >
          {mask ? <i style={{ visibility: char ? 'visible' : 'hidden' }} /> : char}
          {showCursor && <div className={classNames(bem('cursor'))} />}
        </li>,
      );
    }

    return Points;
  };

  return (
    <>
      <div
        ref={rootRef}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        onFocus={onFocus}
        onBlur={onBlur}
        className={classNames(bem())}
      >
        <ul
          className={classNames(bem('security'), { [BORDER_SURROUND]: !props.gutter })}
          onTouchStart={onTouchStart}
        >
          {renderPoints()}
        </ul>
        {info && (
          <div className={classNames(bem(props.errorInfo ? 'error-info' : 'info'))}>{info}</div>
        )}
        <input
          ref={nativeInputRef}
          className={classNames(bem('native-input'))}
          value={inputValue}
          type="text"
          pattern="[0-9]*"
          inputMode="numeric"
          onChange={(e) => {
            setInputValue(e.target.value.slice(0, props.length));
          }}
        />
      </div>
      {props.keyboard &&
        React.cloneElement(props.keyboard, {
          visible: focused,
          onInput: (v) => {
            if (inputValue.length < cellLength) {
              setInputValue((inputValue + v).slice(0, props.length));
            }
          },
          onDelete: () => {
            setInputValue(inputValue.slice(0, -1));
          },
          onClose: () => {
            rootRef.current?.blur();
          },
          onBlur: () => {
            rootRef.current?.blur();
          },
        } as NumberKeyboardProps)}
    </>
  );
});

PasswordInput.defaultProps = {
  value: '',
  info: null,
  errorInfo: null,
  length: DEFAULT_CELL_LENGTH,
  gutter: 0,
  mask: true,
  focused: false,
  onChange: () => {},
};

export default PasswordInput;
