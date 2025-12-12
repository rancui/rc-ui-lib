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

const PasswordInput = forwardRef<PasswordInputInstance, PasswordInputProps>(
  (
    {
      value = '',
      info = null,
      errorInfo = null,
      length = DEFAULT_CELL_LENGTH,
      gutter = 0,
      mask = true,
      focused = false,
      onChange = () => {},
      onFocus,
      onBlur,
      onFill,
      keyboard,
    },
    ref,
  ) => {
    const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
    const [bem] = createNamespace('password-input', prefixCls);

    const rootRef = useRef<HTMLDivElement>(null);
    const nativeInputRef = useRef<HTMLInputElement>(null);

    const [inputValue, setInputValue] = useState(value);

    const displayInfo = errorInfo || info;

    const cellLength = length > 0 && length < Infinity ? Math.floor(length) : DEFAULT_CELL_LENGTH;

    useUpdateEffect(() => {
      if (['', undefined].includes(value)) {
        setInputValue('');
      }
      setInputValue(value.slice(0, cellLength));
    }, [value, cellLength]);

    useEffect(() => {
      if (inputValue.length >= cellLength) {
        onFill?.(inputValue);
      }
      onChange(inputValue.slice(0, cellLength));
    }, [onChange, onFill, inputValue, cellLength]);

    const handleFocus = () => {
      if (!keyboard) {
        nativeInputRef.current?.focus();
      }
      onFocus?.();
    };

    const handleBlur = () => {
      onBlur?.();
    };

    useImperativeHandle(ref, () => ({
      focus: () => handleFocus(),
      blur: () => {
        handleBlur();
        nativeInputRef.current?.blur();
      },
      resetValue: () => {
        setInputValue('');
      },
    }));

    const renderPoints = () => {
      const Points: JSX.Element[] = [];

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
            className={classNames(
              { [BORDER_LEFT]: showBorder },
              bem('item', { focus: showCursor }),
            )}
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
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={classNames(bem())}
        >
          <ul className={classNames(bem('security'), { [BORDER_SURROUND]: !gutter })}>
            {renderPoints()}
          </ul>
          {displayInfo && (
            <div className={classNames(bem(errorInfo ? 'error-info' : 'info'))}>{displayInfo}</div>
          )}
          <input
            ref={nativeInputRef}
            className={classNames(bem('native-input'))}
            value={inputValue}
            type="text"
            pattern="[0-9]*"
            inputMode="numeric"
            onChange={(e) => {
              setInputValue(e.target.value.slice(0, length));
            }}
          />
        </div>
        {keyboard &&
          React.cloneElement(keyboard, {
            visible: focused,
            onInput: (v) => {
              if (inputValue.length < cellLength) {
                setInputValue((inputValue + v).slice(0, length));
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
  },
);

export default PasswordInput;
