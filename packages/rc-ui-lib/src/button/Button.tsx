import React, { isValidElement, useContext } from 'react';
import classnames from 'classnames';
import Icon from '../icon';
import Loading from '../loading';
import { ButtonProps } from './PropsType';
import { BORDER_SURROUND, WHITE } from '../utils/constant';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';

const Button: React.FC<ButtonProps> = ({
  // —— 原先在 Button.defaultProps 中的默认值 —— //
  size = 'normal',          // 原：defaultProps.size
  type = 'default',         // 原：defaultProps.type
  tag = 'button',           // 原：defaultProps.tag
  iconPosition = 'left',    // 原：defaultProps.iconPosition

  // —— 其它 props 按需解构 —— //
  color,
  plain,
  disabled,
  loading,
  hairline,
  className,
  iconPrefix,
  loadingText,
  style: styleProp,
  nativeType,
  icon,
  block,
  round,
  square,
  shadow,
  children,
  text,
  loadingSize = '20px',   // 原先在 renderLoadingIcon 里用解构默认值，现在直接在参数上给默认值
  loadingType,
  onClick,
}: ButtonProps) => {

  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('button', prefixCls);

  const classes = classnames(
    className,
    bem([
      type,
      size,
      {
        plain,
        loading,
        disabled,
        hairline,
        block,
        round,
        square,
        shadow,
        [`shadow-${+shadow}`]: shadow,
      },
    ]),
    { [BORDER_SURROUND]: hairline },
  );
  // 内联样式处理:使用解构出来的 styleProp 初始化本地 style
  const style: Record<string, string | number> = { ...(styleProp || {}) };

  if (color) {
    style.color = plain ? color : WHITE;

    if (!plain) {
      // Use background instead of backgroundColor to make linear-gradient work
      style.background = color;
    }

    // hide border when color is linear-gradient
    if (color.indexOf('gradient') !== -1) {
      style.border = 0;
    } else {
      style.borderColor = color;
    }
  }

  function handleClick(event) {
    if (!loading && !disabled && onClick) {
      onClick(event);
    }
  }

  const renderLoadingIcon = () => {
    return (
      <Loading
        className={classnames(bem('loading'))}
        size={loadingSize}
        type={loadingType}
        color={type === 'default' ? undefined : ''}
      />
    );
  };

  const renderIcon = () => {
    if (loading) {
      return renderLoadingIcon();
    }

    if (typeof icon === 'string') {
      return (
        <Icon name={icon} className={classnames(bem('icon'))} classPrefix={iconPrefix} />
      );
    }

    if (isValidElement(icon)) {
      return icon;
    }

    return null;
  };

  const renderText = () => {
    let textContent;
    if (loading) {
      textContent = loadingText;
    } else {
      textContent = children || text;
    }

    if (textContent) {
      return (
        <span key="text" className={classnames(bem('text'))}>
          {textContent}
        </span>
      );
    }
    return null;
  };

  const renderContent = () => (
    <div className={classnames(bem('content'))}>
      {iconPosition === 'left' && renderIcon()}
      {renderText()}
      {iconPosition === 'right' && renderIcon()}
    </div>
  );

  return React.createElement(
    tag,
    {
      style,
      className: classes,
      type: nativeType,
      disabled,
      onClick: handleClick,
    },
    renderContent(),
  );
};

export default Button;
