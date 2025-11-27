import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import classnames from 'classnames';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';
import { getZIndexStyle } from '../utils';
import { renderToContainer } from '../utils/dom/renderToContainer';
import { useSetState } from '../hooks';
import useMergedState from '../hooks/use-merged-state';
import { Icon } from '../icon';
import { Cell } from '../cell';
import Popup from '../popup';
import { DropdownItemInstance, DropdownItemOption, DropdownItemProps } from './PropsType';
import { DropdownMenuContext } from './DropdownMenu';

const DropdownItem = forwardRef<DropdownItemInstance, DropdownItemProps>((props, ref) => {
  const { 
    options = [], 
    disabled = false, 
    placeholder = '请选择',
    defaultValue,
    value,
    title,
    name,
    titleClass,
    teleport,
    onChange: onChangeCallback,
    onOpen: onOpenCallback,
    onOpened: onOpenedCallback,
    onClose: onCloseCallback,
    onClosed: onClosedCallback,
    children,
  } = props;

  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('dropdown-item', prefixCls);
  const parent = useContext(DropdownMenuContext);
  const [selectedValue, setSelectedValue] = useMergedState({
    defaultValue,
    value,
  });

  const currentValueRef = useRef(selectedValue);

  const [state, setState] = useSetState({
    showPopup: false,
    transition: true,
    showWrapper: false,
  });

  const onOpen = () => {
    onOpenCallback?.();
  };

  const onOpened = () => {
    onOpenedCallback?.();
  };

  const onClose = () => {
    setState({
      showPopup: false,
    });
    parent.close();
    onCloseCallback?.();
  };

  const onClosed = () => {
    setState({ showWrapper: false });
    onClosedCallback?.();
  };

  const onClickWrapper = (event) => {
    // 防止在使用teleport时被识别为在外面点击并关闭
    if (teleport) {
      event.stopPropagation();
    }
  };

  const toggle = (show = !state.showPopup, options: { immediate?: boolean } = {}) => {
    if (show === state.showPopup) {
      return;
    }
    const newState = {} as typeof state;
    newState.showPopup = show;
    newState.transition = !options.immediate;

    if (show) {
      state.showWrapper = true;
    }
    setState(newState);
  };

  const renderTitle = () => {
    if (title) {
      return title;
    }
    const match = options.find((option) => option.value === currentValueRef.current?.value);
    return match ? match.text : placeholder;
  };

  useImperativeHandle(ref, () => ({
    toggle,
    renderTitle,
    state,
    name,
    titleClass,
    disabled,
  }));

  const renderOption = (option: DropdownItemOption) => {
    const { activeColor } = parent.props;
    const active = option.value === currentValueRef.current?.value;
    const onClick = () => {
      if (option.value !== currentValueRef.current?.value) {
        const newValue = { ...selectedValue, text: option.text, value: option.value };
        setSelectedValue(newValue);
        currentValueRef.current = newValue;
        onChangeCallback?.(newValue);
        parent.onChange?.(newValue);
        onClose();
      }
    };

    const renderIcon = () => {
      if (active) {
        return <Icon className={classnames(bem('icon'))} color={activeColor} name="success" />;
      }
      return null;
    };

    return (
      <Cell
        key={option.value}
        icon={option.icon}
        title={option.text}
        className={classnames(bem('option', { active }))}
        style={{ color: active ? activeColor : '' }}
        clickable
        onClick={onClick}
      >
        {renderIcon()}
      </Cell>
    );
  };
  const renderContent = () => {
    const { offset } = parent;
    const { zIndex, overlay, duration, direction, closeOnClickOverlay } = parent.props;
    const style: React.CSSProperties = getZIndexStyle(zIndex);
    if (direction === 'down') {
      style.top = `${offset}px`;
    } else {
      style.bottom = `${offset}px`;
    }

    return (
      <div
        style={{ ...style, display: state.showWrapper ? 'block' : 'none' }}
        className={classnames(bem([direction]))}
        onClick={onClickWrapper}
      >
        <Popup
          visible={state.showPopup}
          className={classnames(bem('content'))}
          overlay={overlay}
          position={direction === 'down' ? 'top' : 'bottom'}
          duration={state.transition ? +duration : 0}
          overlayStyle={{ position: 'absolute' }}
          closeOnClickOverlay={closeOnClickOverlay}
          teleport={null}
          onOpen={onOpen}
          onClose={onClose}
          onOpened={onOpened}
          onClosed={onClosed}
        >
          {options?.map(renderOption)}
          {children}
        </Popup>
      </div>
    );
  };

  return teleport ? renderToContainer(teleport, renderContent()) : renderContent();
});

DropdownItem.displayName = 'DropdownItem';
export default DropdownItem;
