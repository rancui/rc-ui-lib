import React, { useState, useRef, useContext, useEffect } from 'react';
import classnames from 'classnames';
import type { MouseEvent } from 'react';
import { TextEllipsisProps } from './PropsType';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';
import useEventListener from '../../es/hooks/use-event-listener';

const TextEllipsis: React.FC<TextEllipsisProps> = (props) => {
  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('text-ellipsis', prefixCls);

  const [expanded, setExpanded] = useState(false);
  const [hasAction, setHasAction] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  const [text, setText] = useState('');

  const pxToNum = (value: string | null) => {
    if (!value) return 0;
    const match = value.match(/^\d*(\.\d*)?/);
    return match ? Number(match[0]) : 0;
  };

  const calcEllipsis = () => {
    const cloneContainer = () => {
      if (!root.current) return;

      const originStyle = window.getComputedStyle(root.current);
      const container = document.createElement('div');
      const styleNames: string[] = Array.prototype.slice.apply(originStyle);
      styleNames.forEach((name) => {
        container.style.setProperty(name, originStyle.getPropertyValue(name));
      });

      container.style.position = 'fixed';
      container.style.zIndex = '-9999';
      container.style.top = '-9999px';
      container.style.height = 'auto';
      container.style.minHeight = 'auto';
      container.style.maxHeight = 'auto';

      container.innerText = props.content;
      document.body.appendChild(container);
      // eslint-disable-next-line consistent-return
      return container;
    };

    const calcEllipsisText = (container: HTMLDivElement, maxHeight: number) => {
      const { content, expandText } = props;
      const dot = '...';
      let left = 0;
      let right = content.length;
      let res = -1;

      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        container.innerText = content.slice(0, mid) + dot + expandText;
        if (container.offsetHeight <= maxHeight) {
          left = mid + 1;
          res = mid;
        } else {
          right = mid - 1;
        }
      }
      return content.slice(0, res) + dot;
    };

    const container = cloneContainer();
    if (!container) return;

    const { paddingBottom, paddingTop, lineHeight } = container.style;
    const maxHeight =
      (Number(props.rows) + 0.5) * pxToNum(lineHeight) +
      pxToNum(paddingTop) +
      pxToNum(paddingBottom);
    if (maxHeight < container.offsetHeight) {
      setHasAction(true);
      setText(calcEllipsisText(container, maxHeight));
    } else {
      setHasAction(false);
      setText(props.content);
    }

    document.body.removeChild(container);
  };

  const onClickAction = (event: MouseEvent) => {
    setExpanded((e) => !e);
    props.onClick?.(event);
  };

  const renderAction = () => (
    <span className={classnames(bem('action'))} onClick={onClickAction}>
      {expanded ? props.collapseText : props.expandText}
    </span>
  );

  useEffect(() => {
    calcEllipsis();
  }, [props.content, props.rows]);

  useEventListener('resize', calcEllipsis);

  return (
    <div ref={root} className={classnames(props.className, bem())}>
      {expanded ? props.content : text}
      {hasAction ? renderAction() : null}
    </div>
  );
};

TextEllipsis.defaultProps = {
  rows: 1,
  expandText: '',
  collapseText: ''
};

export default TextEllipsis;
