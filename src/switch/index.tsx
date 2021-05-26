import React, { forwardRef, MouseEventHandler, MutableRefObject } from 'react';
import classnames from 'classnames';
import Loading from '../loading';
import { addUnit } from '../utils';
import { SwitchProps } from './props';
import './style/index.scss';

const baseClass = 'r-switch';

const Switch = forwardRef<unknown, SwitchProps>((props, ref) => {
  const {
    model = false,
    loading = false,
    disabled = false,
    size = '30',
    activeColor = '#1989fa',
    inactiveColor = '#ffffff',
    activeValue = true,
    inactiveValue = false,
    onChange,
    onClick,
  } = props;

  const isChecked = () => model === activeValue;

  const renderLoading = () => {
    if (loading) {
      const color = isChecked() ? activeColor : inactiveColor;
      return <Loading className={classnames(`${baseClass}__loading`)} color={color} />;
    }
    return null;
  };

  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (!disabled && !loading) {
      const newValue = isChecked() ? inactiveValue : activeValue;
      onChange?.(newValue);
      onClick?.(e);
    }
  };

  const checked = isChecked();

  const style = {
    fontSize: addUnit(size),
    backgroundColor: checked ? activeColor : inactiveColor,
  };

  const classString = classnames(baseClass, {
    [`${baseClass}--on`]: checked,
    [`${baseClass}--loading`]: loading,
    [`${baseClass}--disabled`]: disabled,
  });

  return (
    <div
      ref={ref as MutableRefObject<HTMLDivElement>}
      role="switch"
      className={classString}
      style={style}
      aria-checked={checked}
      onClick={handleClick}
    >
      <div className={classnames(`${baseClass}__node`)}>{renderLoading()}</div>
    </div>
  );
});
Switch.displayName = 'Switch';
export default Switch;
