import React, { useContext, useMemo, useRef } from 'react';
import classNames from 'classnames';

import ConfigProviderContext from '../config-provider/ConfigProviderContext';
import useClickAway from '../hooks/use-click-away';
import { PasswordInputProps } from '.';
import { BORDER_LEFT, BORDER_SURROUND } from '../utils/constant';
import { addUnit } from '../utils';

const PasswordInput: React.FC<PasswordInputProps> = (props) => {
  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('password-input', prefixCls);
  const { info } = props;

  const onTouchStart = (event) => {
    event.stopPropagation();
    props.onFocus?.(event);
  };

  const renderPoints = () => {
    const Points: JSX.Element[] = [];
    const { mask, value, length, gutter, focused } = props;

    for (let i = 0; i < length; i++) {
      const char = value[i];
      const showBorder = i !== 0 && !gutter;
      const showCursor = focused && i === value.length;

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
    <div className={classNames(bem(), { [BORDER_SURROUND]: !props.gutter })}>
      <ul className={classNames(bem('security'))} onTouchStart={onTouchStart}>
        {renderPoints()}
      </ul>
      {info && (
        <div className={classNames(bem(props.errorInfo ? 'error-info' : 'info'))}>{info}</div>
      )}
    </div>
  );
};

PasswordInput.defaultProps = {
  info: null,
  errorInfo: null,
  length: 6,
  gutter: 0,
  mask: true,
  focused: false,
};

export default PasswordInput;
