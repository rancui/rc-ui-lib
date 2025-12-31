import React, { useContext } from 'react';
import classnames from 'classnames';
import { ShareSheetOption, ShareSheetProps } from './PropsType';
import Popup from '../popup';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';

const PRESET_ICONS = [
  'qq',
  'link',
  'weibo',
  'wechat',
  'poster',
  'qrcode',
  'weapp-qrcode',
  'wechat-moments',
];

function getIconURL(icon: string) {
  if (PRESET_ICONS.includes(icon)) {
    return `https://img.yzcdn.cn/vant/share-sheet-${icon}.png`;
  }
  return icon;
}

const ShareSheet: React.FC<ShareSheetProps> = (props) => {
  const {
    cancelText = '取消',
    options = [],
    closeOnPopstate = true,
    safeAreaInsetBottom = true,
    closeOnClickOverlay = true,
    title,
    description,
    onCancel,
    onSelect,
    visible,
    overlay,
    duration,
    lockScroll,
    overlayStyle,
    overlayClass,
    className,
  } = props;

  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('share-sheet', prefixCls);

  const handleCancel = () => {
    onCancel?.();
  };

  const handleSelect = (option: ShareSheetOption, index: number) => {
    onSelect?.(option, index);
  };

  const renderHeader = () => {
    if (title || description) {
      return (
        <div className={classnames(bem('header'))}>
          {title && <div className={classnames(bem('title'))}>{title}</div>}
          {description && <div className={classnames(bem('description'))}>{description}</div>}
        </div>
      );
    }
    return null;
  };

  const renderOption = (option: ShareSheetOption, index: number) => {
    const { name, icon, className: optionClassName, description: optionDescription } = option;
    return (
      <div
        key={index}
        role="button"
        tabIndex={0}
        className={classnames([bem('option'), optionClassName])}
        onClick={() => handleSelect(option, index)}
      >
        <img alt="share sheet icon" src={getIconURL(icon)} className={classnames(bem('icon'))} />
        {name && <span className={classnames(bem('name'))}>{name}</span>}
        {optionDescription && (
          <span className={classnames(bem('option-description'))}>{optionDescription}</span>
        )}
      </div>
    );
  };

  const renderOptions = (optionsList: ShareSheetOption[], border?: boolean, key?: React.Key) => (
    <div key={key} className={classnames(bem('options', { border }))}>
      {optionsList.map(renderOption)}
    </div>
  );

  const renderRows = () => {
    if (Array.isArray(options[0])) {
      return (options as ShareSheetOption[][]).map((item, index) =>
        renderOptions(item, index !== 0, index),
      );
    }
    return renderOptions(options as unknown as ShareSheetOption[]);
  };

  const renderCancelButton = () => {
    if (cancelText) {
      return (
        <button type="button" className={classnames(bem('cancel'))} onClick={handleCancel}>
          {cancelText}
        </button>
      );
    }
    return null;
  };
  return (
    <Popup
      round
      className={classnames(bem(), className)}
      position="bottom"
      onClose={handleCancel}
      closeOnPopstate={closeOnPopstate}
      safeAreaInsetBottom={safeAreaInsetBottom}
      visible={visible}
      overlay={overlay}
      duration={duration}
      lockScroll={lockScroll}
      overlayStyle={overlayStyle}
      overlayClass={overlayClass}
      closeOnClickOverlay={closeOnClickOverlay}
    >
      {renderHeader()}
      {renderRows()}
      {renderCancelButton()}
    </Popup>
  );
};

export default ShareSheet;
