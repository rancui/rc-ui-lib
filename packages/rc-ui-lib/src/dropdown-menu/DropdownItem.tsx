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
  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('dropdown-item', prefixCls);
  const parent = useContext(DropdownMenuContext);
  const [selectedValue, setSelectedValue] = useMergedState({
    defaultValue: props.defaultValue,
    value: props.value,
  });

  const currentValueRef = useRef(selectedValue);

  const [state, setState] = useSetState({
    showPopup: false,
    transition: true,
    showWrapper: false,
  });

  const onOpen = () => {
    props.onOpen?.();
  };

  const onOpened = () => {
    props.onOpened?.();
  };

  const onClose = () => {
    setState({
      showPopup: false,
    });
    parent.close();
    props.onClose?.();
  };

  const onClosed = () => {
    setState({ showWrapper: false });
    props.onClosed?.();
  };

  const onClickWrapper = (event) => {
    // 防止在使用teleport时被识别为在外面点击并关闭
    if (props.teleport) {
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
    if (props.title) {
      return props.title;
    }
    const match = props.options.find((option) => option.value === currentValueRef.current?.value);
    return match ? match.text : props.placeholder;
  };

  useImperativeHandle(ref, () => ({
    toggle,
    renderTitle,
    state,
    name: props.name,
    titleClass: props.titleClass,
    disabled: props.disabled,
  }));

  const renderOption = (option: DropdownItemOption) => {
    const { activeColor } = parent.props;
    const active = option.value === currentValueRef.current?.value;
    const onClick = () => {
      if (option.value !== currentValueRef.current?.value) {
        const newValue = { ...selectedValue, text: option.text, value: option.value };
        setSelectedValue(newValue);
        currentValueRef.current = newValue;
        props.onChange?.(newValue);
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
          {props.options?.map(renderOption)}
          {props.children}
        </Popup>
      </div>
    );
  };

  return props.teleport ? renderToContainer(props.teleport, renderContent()) : renderContent();
});

DropdownItem.defaultProps = {
  options: [],
  disabled: false,
  placeholder: '请选择',
};
DropdownItem.displayName = 'DropdownItem';
export default DropdownItem;
