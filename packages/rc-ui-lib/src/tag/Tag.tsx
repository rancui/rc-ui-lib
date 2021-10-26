import React, { useMemo, MouseEvent, useRef, useContext } from 'react';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';

import Icon from '../icon';
import { TagProps } from './PropsType';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';

const Tag: React.FC<TagProps> = (props) => {
  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('tag', prefixCls);

  const nodeRef = useRef(null);

  const {
    visible,
    plain,
    textColor,
    color,
    type,
    mark,
    round,
    size,
    closeable,
    onClick,
    onClose,
    children,
  } = props;

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
        style={{ ...getStyle, ...props.style }}
        className={classnames(props.className, bem([classes, type]))}
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

Tag.defaultProps = {
  visible: true,
  type: 'default',
};

export default Tag;
