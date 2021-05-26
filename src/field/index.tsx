import React, {
  useState,
  useRef,
  useContext,
  useMemo,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
  MouseEventHandler,
  FocusEventHandler,
  CompositionEventHandler,
  FormEventHandler,
  AllHTMLAttributes,
  HTMLAttributes,
  KeyboardEventHandler,
  MutableRefObject,
} from 'react';
import classnames from 'classnames';
import Cell from '../cell';
import Icon from '../icon';
import { FormContenxt } from '../form';
import { resetScroll } from '../utils/scroll';
import {
  isDef,
  isPromise,
  isFunction,
  runSyncRule,
  formatNumber,
  addUnit,
  trigger,
  isObject,
} from '../utils';

import { FieldRule, FieldValidateError, FieldValidateTrigger, FieldFormatTrigger } from './types';
import { FieldProps } from './props';
import './style/index.scss';

const baseClass = 'r-field';

export const useRefCallback = <T extends (...args: any[]) => any>(callback: T): any => {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;
  return useCallback((...args: any[]) => callbackRef.current(...args), []) as T;
};

const Field = forwardRef<unknown, FieldProps>((props, ref) => {
  const {
    model,
    name,
    rules,
    type = 'text',
    maxlength,
    clearable = false,
    clearTrigger = 'focus',
    formatter,
    formatTrigger = 'onChange',
    error = false,
    rows,
    autosize = false,
    leftIcon,
    rightIcon,
    iconPrefix = 'r-icon',
    showWordLimit = false,
    errorMessage,
    label,
    center = false,
    border = true,
    isLink = false,
    required = false,
    clickable = false,
    labelClass,
    arrowDirection = 'right',
    size,
    disabled = false,
    labelAlign = 'left',
    placeholder,
    autocomplete,
    autofocus = false,
    onFocus,
    onBlur,
    onKeyPress,
    onClickInput,
    onUpdateModel,
    onClickRightIcon,
    onClear,
    children,
  } = props;

  const [modelValue, setModelValue] = useState(model);
  const [focused, setFocused] = useState(false);
  const [validateFailed, setValidateFailed] = useState(false);
  const [validateMessage, setValidateMessage] = useState('');
  const [composing, setComposing] = useState(false);

  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const childFieldValue = useRef<() => unknown>(null);
  const parent = useContext(FormContenxt) as any;

  const getModelValue = () => String(modelValue ?? '');

  const getProp = (key: keyof typeof props) => {
    if (isDef(props[key])) {
      return props[key];
    }
    if (parent && isDef(parent[key])) {
      return parent[key];
    }
    return null;
  };

  const showClear = useMemo(() => {
    const readonly = getProp('readonly');
    if (clearable && !readonly) {
      const hasValue = getModelValue() !== '';
      const trigger = clearTrigger === 'always' || (clearTrigger === 'focus' && focused);

      return hasValue && trigger;
    }
    return null;
  }, [clearable, clearTrigger, focused, getProp, getModelValue]);

  const runValidator = (value: unknown, rule: FieldRule) => {
    // eslint-disable-next-line consistent-return
    new Promise((resolve) => {
      const returnVal = rule.validator?.(value, rule);
      if (isPromise(returnVal)) {
        return (returnVal as any).then(resolve);
      }
      resolve(returnVal);
    });
  };

  const getRuleMessage = (value: unknown, rule: FieldRule) => {
    const { message } = rule;
    if (isFunction(message)) {
      return message(value, rule);
    }
    return message || '';
  };

  const runRules = (rules: FieldRule[]) =>
    rules.reduce(
      (promise, rule) =>
        promise.then(() => {
          if (validateFailed) {
            return;
          }
          // let { current } = formValue;
          let { current } = childFieldValue;
          if (rule.formatter) {
            current = rule.formatter(current, rule) as any;
          }

          if (!runSyncRule(current, rule)) {
            setValidateFailed(true);
            setValidateMessage(getRuleMessage(current, rule));
            return;
          }

          if (rule.validator) {
            return (runValidator(current, rule) as any).then((result: any) => {
              if (result && typeof result === 'string') {
                setValidateFailed(true);
                setValidateMessage(result);
              } else if (result === false) {
                setValidateFailed(true);
                setValidateMessage(getRuleMessage(current, rule));
              }
            });
          }
        }),
      Promise.resolve(),
    );

  const resetValidation = () => {
    if (validateFailed) {
      setValidateFailed(false);
      setValidateMessage('');
    }
  };

  const validate = (rules: FieldRule[]) => {
    new Promise<FieldValidateError | void>((resolve) => {
      resetValidation();
      if (rules) {
        runRules(rules).then(() => {
          if (validateFailed) {
            resolve({
              name,
              message: validateMessage,
            });
          } else {
            resolve();
          }
        });
      } else {
        resolve();
      }
    });
  };

  const validateWithTrigger = (trigger: FieldValidateTrigger) => {
    if (parent && rules) {
      const defaultTrigger = parent.validateTrigger === trigger;
      const results = rules.filter((rule) => {
        if (rule.trigger) {
          return rule.trigger === trigger;
        }
        return defaultTrigger;
      });
      validate(results);
    }
  };

  const limitValueLength = (value: string): string => {
    if (isDef(maxlength) && value.length > maxlength) {
      if ((modelValue as string).length === +maxlength) {
        return modelValue as string;
      }
      return value.slice(0, +maxlength);
    }
    return value;
  };

  const updateValue = (value: string, trigger: FieldFormatTrigger = 'onChange') => {
    value = limitValueLength(value);

    if (type === 'number' || type === 'digit') {
      const isNumber = type === 'number';
      value = formatNumber(value, isNumber, isNumber);
    }

    if (formatter && trigger === formatTrigger) {
      value = formatter(value);
    }

    if (inputRef.current && value !== inputRef.current.value) {
      inputRef.current.value = value;
    }

    if (value !== modelValue) {
      console.log('formatter', value);
      setModelValue(value);
      onUpdateModel?.(value);
    }
  };

  const handleInput: FormEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    if (!composing) {
      console.log('event.currentTarget.value', event.currentTarget.value);
      updateValue(event.currentTarget.value);
    }
  };

  const handleBlur: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    setFocused(false);
    updateValue(event.currentTarget.value, 'onBlur');
    onBlur?.(event);
    validateWithTrigger('onBlur');
    resetScroll();
  };

  const handleClickInput: MouseEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    onClickInput?.(event);
  };

  // const handleClickLeftIcon = (event: MouseEvent) => {
  //   onClickLeftIcon?.(event);
  // };

  const handleClickRightIcon: MouseEventHandler<HTMLDivElement> = (event) => {
    onClickRightIcon?.(event);
  };

  const handleClear: MouseEventHandler<HTMLElement> = (event) => {
    event.preventDefault();
    setModelValue('');
    onClear?.(event);
  };

  const showError = () => {
    if (typeof error === 'boolean') {
      return error;
    }
    if (parent?.props?.showError && validateFailed) {
      return true;
    }
    return false;
  };

  const labelStyle = useMemo(() => {
    const labelWidth = getProp('labelWidth');
    if (labelWidth) {
      return { width: addUnit(labelWidth) };
    }
    return { width: '' };
  }, [getProp]);

  const handleCompositionStart: CompositionEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
    event,
  ) => {
    if (event.currentTarget) {
      setComposing(true);
    }
  };

  const handleCompositionEnd: CompositionEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
    event,
  ) => {
    const { currentTarget } = event;
    if (composing) {
      // currentTarget.composing = false;
      setComposing(false);
      trigger(currentTarget as Element, 'onInput');
    }
  };

  const adjustSize = () => {
    const input = inputRef.current;
    if (!(type === 'textarea' && autosize) || !input) {
      return;
    }
    input.style.height = 'auto';
    let height = input.scrollHeight;
    if (isObject(autosize as Record<string, unknown>)) {
      const { maxHeight, minHeight } = autosize as any;
      if (maxHeight !== void 0) {
        height = Math.min(height, maxHeight);
      }
      if (minHeight !== void 0) {
        height = Math.max(height, minHeight);
      }
    }
    if (height) {
      input.style.height = `${height}px`;
    }
  };

  // const renderLeftIcon = () => {
  //   if (leftIcon) {
  //     return (
  //       <div className={classnames(`${baseClass}__left-icon`])} onClick={handleClickLeftIcon}>
  //         <Icon name={leftIcon} classPrefix={iconPrefix} className={classnames({ [`r-icon`]]: !!leftIcon })} />
  //       </div>
  //     );
  //   }
  // };

  const renderRightIcon = () => {
    if (rightIcon) {
      return (
        <div className={classnames(`${baseClass}__right-icon`)} onClick={handleClickRightIcon}>
          <Icon
            name={rightIcon}
            classPrefix={iconPrefix}
            className={classnames({ [`r-icon`]: !!rightIcon })}
          />
        </div>
      );
    }
    return null;
  };

  const renderWordLimit = () => {
    if (showWordLimit && maxlength) {
      const count = (getModelValue() as string).length;
      return (
        <div className={classnames(`${baseClass}__word-limit`)}>
          <span className={classnames(`${baseClass}__word-num`)}>{count}</span>/
          {maxlength as number}
        </div>
      );
    }
    return null;
  };

  const renderMessage = () => {
    if (parent && parent.showErrorMessage === false) {
      return;
    }

    const message = errorMessage || validateMessage;

    if (message) {
      const errorMessageAlign = getProp('errorMessageAlign');
      return (
        <div
          className={classnames(
            `${baseClass}__error-message`,
            `${baseClass}__error-message--${errorMessageAlign}`,
          )}
        >
          {message}
        </div>
      );
    }

    return null;
  };

  const formValue = () => {
    if (childFieldValue.current) {
      return childFieldValue.current;
    }
    return modelValue;
  };

  const focus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const blur = () => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleFocus: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    setFocused(true);
    onFocus?.(event);
    const readonly = getProp('readonly');
    if (readonly) {
      blur();
    }
  };

  const handleKeypress: KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    if (event.key === 'Enter') {
      const submitOnEnter = parent?.props?.submitOnEnter;
      if (!submitOnEnter && props.type !== 'textarea') {
        event.preventDefault();
      }
      // trigger blur after click keyboard search button
      if (type === 'search') {
        blur();
      }
    }
    onKeyPress?.(event);
  };

  const renderInput = () => {
    const disabled = getProp('disabled');
    const readonly = getProp('readonly');
    const inputAlign = getProp('inputAlign');

    const inputProps: AllHTMLAttributes<HTMLElement> = {
      name,
      rows: rows !== undefined ? +rows : undefined,
      className: classnames(`${baseClass}__control`, `${baseClass}__control--${inputAlign}`),
      value: modelValue,
      disabled,
      readOnly: readonly,
      placeholder,
      autoComplete: autocomplete,
      autoFocus: autofocus,
      onBlur: handleBlur,
      onFocus: handleFocus,
      onInput: handleInput,
      onClick: handleClickInput,
      onChange: handleCompositionEnd,
      onKeyPress: handleKeypress,
      onCompositionStart: handleCompositionStart,
      onCompositionEnd: handleCompositionEnd,
    };

    let inputType = type;
    let mode: HTMLAttributes<HTMLElement>['inputMode'];

    if (type === 'textarea') {
      return <textarea ref={inputRef as MutableRefObject<HTMLTextAreaElement>} {...inputProps} />;
    }

    // type="number" is weired in iOS, and can't prevent dot in Android
    // so use inputmode to set keyboard in mordern browers
    if (type === 'number') {
      inputType = 'text';
      mode = 'decimal';
    }

    if (type === 'digit') {
      inputType = 'tel';
      mode = 'numeric';
    }

    return (
      <input
        type={inputType}
        ref={inputRef as MutableRefObject<HTMLInputElement>}
        inputMode={mode}
        {...inputProps}
      />
    );
  };

  useImperativeHandle(ref, () => ({
    focus,
    blur,
    formValue,
    validate,
    resetValidation,
  }));

  useEffect(() => {
    resetValidation();
    validateWithTrigger('onChange');
    adjustSize();
  }, [modelValue]);

  return (
    <Cell
      ref={ref}
      title={label}
      size={size}
      icon={leftIcon}
      className={classnames(baseClass, {
        [`${baseClass}--error`]: showError(),
        [`${baseClass}--disabled`]: disabled,
        [`${baseClass}__label--${labelAlign}`]: !!labelAlign,
        [`${baseClass}--min-height}`]: type === 'textarea' && !autosize,
      })}
      center={center}
      border={border}
      isLink={isLink}
      required={required}
      clickable={clickable}
      titleStyle={labelStyle}
      valueClass={classnames(`${baseClass}__value`)}
      titleClass={classnames(
        `${baseClass}__label`,
        `${baseClass}__label--${labelAlign}`,
        labelClass,
      )}
      arrowDirection={arrowDirection}
    >
      <div className={classnames(`${baseClass}__body`)}>
        {renderInput()}
        {showClear && (
          <Icon name="clear" className={classnames(`${baseClass}__clear`)} onClick={handleClear} />
        )}
        {renderRightIcon()}
        {React.Children.map(children as any, (child: JSX.Element) => {
          if (child?.type?.name === 'Button') {
            return <div className={classnames(`${baseClass}__button`)}>{children}</div>;
          }
          return null;
        })}
      </div>
      {renderWordLimit()}
      {renderMessage()}
    </Cell>
  );
});

Field.displayName = 'Field';
export default Field;
