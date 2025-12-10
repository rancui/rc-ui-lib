import React, { useMemo, MouseEvent, useRef, useContext } from 'react';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';

import Icon from '../icon';
import { TagProps } from './PropsType';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';

const Tag: React.FC<TagProps> = (props) => {
  const {
    visible = true,
    type = 'default',
    plain,
    textColor,
    color,
    mark,
    round,
    size,
    closeable,
    onClick,
    onClose,
    children,
    className,
    style: propStyle,
  } = props;

  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('tag', prefixCls);

  const nodeRef = useRef(null);

  const handleClose = (event: MouseEvent) => {
    event.stopPropagation();
    onClose?.(event);
  };

  const getStyle = useMemo(() => {
    if (plain) {
      return {
        color: textColor || color,
        borderColor: color,
      };
    }
    return {
      color: textColor,
      background: color,
    };
  }, [textColor, color, plain]);

  const renderTag = () => {
    const classes: Record<string, unknown> = {
      mark,
      plain,
      round,
    };
    if (size) {
      classes[size] = size;
    }

    const CloseIcon = closeable && (
      <Icon name="cross" className={classnames(bem('close'))} onClick={handleClose} />
    );

    return (
      <span
        ref={nodeRef}
        style={{ ...getStyle, ...propStyle }}
        className={classnames(className, bem([classes, type]))}
        onClick={onClick}
      >
        {children}
        {CloseIcon}
      </span>
    );
  };

  return (
    <CSSTransition nodeRef={nodeRef} classNames="rc-fade" in={visible} timeout={300} unmountOnExit>
      {renderTag()}
    </CSSTransition>
  );
};

export default Tag;
