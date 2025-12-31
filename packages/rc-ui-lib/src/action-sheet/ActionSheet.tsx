import React, { useContext } from 'react';
import classnames from 'classnames';
import { ActionSheetProps, ActionSheetAction } from './PropsType';
import { pick } from '../utils';
import Icon from '../icon';
import Loading from '../loading';
import Popup from '../popup';
import { sharedPopupProps } from '../popup/Popup';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';

const ActionSheet: React.FC<ActionSheetProps> = ({
  // 这里是 ActionSheet 自身逻辑直接用到的 props
  title,
  description,
  cancelText,
  actions,
  visible,
  children,
  closeOnClickAction,
  onClose,
  onCancel,
  onSelect,

  // 这些是原来 defaultProps 里的字段，在这里直接写默认值
  closeIcon = 'cross',
  closeable = true,
  safeAreaInsetBottom = true,
  round = true,
  lockScroll = true,
  overlay = true,
  closeOnClickOverlay = true,

  // 其他传给 Popup 的属性，保持透传
  ...restProps
}: ActionSheetProps) => {
  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('action-sheet', prefixCls);

  const onCancelClick = () => {
    onClose?.();
    onCancel?.();
  };

  const renderHeader = () => {
    if (!title) return null;
    return (
      <div className={classnames(bem('header'))}>
        {title}
        {closeable &&
          (typeof closeIcon === 'string' ? (
            <Icon name={closeIcon} className={classnames(bem('close'))} onClick={onCancelClick} />
          ) : (
            <div className={classnames(bem('close'))} onClick={onCancelClick}>
              {closeIcon}
            </div>
          ))}
      </div>
    );
  };

  const renderCancel = () => {
    if (!cancelText) return null;
    return [
      <div key="cancel-gap" className={classnames(bem('gap'))} />,
      <button
        key="cancel-btn"
        type="button"
        className={classnames(bem('cancel'))}
        onClick={onCancelClick}
      >
        {cancelText}
      </button>,
    ];
  };

  const renderOption = (item: ActionSheetAction, index: number) => {
    const { name, color, subname, loading, callback, disabled, className, style } = item;

    const Content = loading ? (
      <Loading className={classnames(bem('loading-icon'))} />
    ) : (
      [
        <span key={`${index}-1`} className={classnames(bem('name'))}>
          {name}
        </span>,
        subname && (
          <div key={`${index}-2`} className={classnames(bem('subname'))}>
            {subname}
          </div>
        ),
      ]
    );

    const onClick = () => {
      if (disabled || loading) {
        return;
      }

      if (callback) {
        callback(item);
      }

      if (closeOnClickAction) {
        onCancel();
      }
      setTimeout(() => {
        onSelect?.(item, index);
      }, 0);
    };

    return (
      <button
        key={index}
        type="button"
        style={{ color, ...style }}
        className={classnames(bem('item', { loading, disabled }), className)}
        onClick={onClick}
      >
        {Content}
      </button>
    );
  };

  const renderDescription = () => {
    if (description) {
      return <div className={classnames(bem('description'))}>{description}</div>;
    }
    return null;
  };

  const renderOptions = () => {
    if (actions) {
      return actions.map(renderOption);
    }
    return null;
  };

  // 这里组装一个带默认值的 props 对象，再交给 pick 过滤出 Popup 需要的那一部分
  const popupPropsSource = {
    visible,
    closeIcon,
    closeable,
    safeAreaInsetBottom,
    round,
    lockScroll,
    overlay,
    closeOnClickOverlay,
    onClose,
    ...restProps,
  };


  return (
    <Popup
      visible={visible}
      className={classnames(bem())}
      position="bottom"
      {...pick(popupPropsSource, sharedPopupProps)}
      onClose={onCancel}
      closeable={false}
    >
      {renderHeader()}
      {renderDescription()}
      <div className={classnames(bem('content'))}>
        {renderOptions()}
        {children}
      </div>
      {renderCancel()}
    </Popup>
  );
};

export default ActionSheet;
