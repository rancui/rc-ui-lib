import React, { useContext, useMemo } from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';

import useMergedState from '../hooks/use-merged-state';
import Loading from '../loading';

import { SwitchProps } from './PropsType';
import { addUnit } from '../utils';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';

const Swtich: React.FC<SwitchProps> = (props) => {
  const {
    loading,
    disabled,
    size,
    activeColor,
    inactiveColor,
    activeValue = true,
    inactiveValue = false,
    checked: checkedProp,
    defaultChecked,
    onChange,
    onClick,
    className,
    style: propStyle,
  } = props;

  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('switch', prefixCls);

  const [checked, setChecked] = useMergedState({
    value: checkedProp,
    defaultValue: defaultChecked,
  });

  const isChecked = useMemo(() => checked === activeValue, [checked, activeValue]);

  const style: CSSProperties = {
    fontSize: addUnit(size),
    backgroundColor: isChecked ? activeColor : inactiveColor,
    ...propStyle,
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!disabled) {
      onClick?.(e);
    }
    if (!disabled && !loading) {
      const newValue = isChecked ? inactiveValue : activeValue;

      setChecked(newValue);
      onChange?.(newValue);
    }
  };

  const renderLoading = () => {
    if (loading) {
      const color = isChecked ? activeColor : inactiveColor;
      return <Loading className={classnames(bem('loading'))} color={color} />;
    }
    return null;
  };

  return (
    <div
      role="switch"
      tabIndex={0}
      className={classnames(
        className,
        bem({
          on: isChecked,
          loading,
          disabled,
        }),
      )}
      style={style}
      aria-checked={isChecked}
      onClick={handleClick}
    >
      <div className={classnames(bem('node'))}>{renderLoading()}</div>
    </div>
  );
};

export default Swtich;
