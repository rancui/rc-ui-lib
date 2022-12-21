import React, {
  useEffect,
  useContext,
  useRef,
  useState,
  useMemo,
  Context,
  createContext,
  forwardRef,
  useImperativeHandle,
} from 'react';
import classnames from 'classnames';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';
import { HAPTICS_FEEDBACK } from '../utils/constant';
import { isDef } from '../utils';
import useScrollParent from '../hooks/use-scroll-parent';
import useClickAway from '../hooks/use-click-away';
import useEventListener from '../hooks/use-event-listener';
import useRefs from '../hooks/use-refs';
import getRect from '../hooks/get-rect';
import {
  DropdownMenuProps,
  DropdownMenuContextProps,
  DropdownMenuInstance,
  DropdownItemInstance,
} from './PropsType';

export const DropdownMenuContext: Context<DropdownMenuContextProps> = createContext({});
const DropdownMenu = forwardRef<DropdownMenuInstance, DropdownMenuProps>((props, ref) => {
  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('dropdown-menu', prefixCls);
  const [titleFlag, setTitleFlag] = useState(props.shouldRenderTitle);
  const [showPopupIndex, setShowPopupIndex] = useState(null);
  const showPopupIndexRef = useRef<number>(null);
  const rect = useRef<{ bottom: number; top: number }>({ bottom: 0, top: 0 });
  const root = useRef<HTMLDivElement>();
  const barRef = useRef<HTMLDivElement>();
  const offsetRef = useRef<number>(0);
  const [childrenRefs, setChildrenRefs] = useRefs<DropdownItemInstance>();
  const scrollParent = useScrollParent(root);

  const opened = useMemo(() => {
    return showPopupIndex !== null;
  }, [showPopupIndex]);

  const barStyle = () => {
    if (opened && isDef(props.zIndex)) {
      return {
        zIndex: +props.zIndex + 1,
      };
    }
    return {};
  };

  const updateShowPopupIndex = (current: number) => {
    showPopupIndexRef.current = current;
    setShowPopupIndex(current);
  };

  const updateOffset = () => {
    if (barRef.current) {
      rect.current = getRect(barRef.current);
      if (props.direction === 'down') {
        offsetRef.current = rect.current.bottom;
      } else {
        offsetRef.current = window.innerHeight - rect.current.top;
      }
    }
  };

  const closeAll = () => {
    childrenRefs.forEach((item) => {
      item.toggle(false);
    });
    updateShowPopupIndex(null);
  };

  useImperativeHandle(ref, () => ({
    close: closeAll,
  }));

  const onClickAway = () => {
    if (props.closeOnClickOutside) {
      closeAll();
    }
  };

  useEffect(() => {
    if (barRef.current) {
      updateOffset();
    }
  }, [barRef.current]);

  const onScroll = () => {
    if (opened) {
      updateOffset();
    }
  };

  const showItem = (index: number) => {
    const item = childrenRefs[index];
    updateOffset();
    updateShowPopupIndex(index);
    item.toggle(true);
  };

  const onToggleItem = (active: number) => {
    childrenRefs.forEach((child: DropdownItemInstance, index: number) => {
      if (index === active) {
        // 且连续点击同一个dropdown-menu__bar时，显示or隐藏
        if (active === showPopupIndexRef.current) {
          updateShowPopupIndex(null);
          child.toggle();
          return;
        }
        showItem(active);
      } else {
        child.toggle(false, { immediate: false });
      }
    });
  };

  const renderTitle = (item, index: number) => {
    const showPopup = showPopupIndex === index;
    const { disabled, titleClass } = item;

    return (
      <div
        key={index}
        role="button"
        tabIndex={disabled ? -1 : 0}
        className={classnames(bem('item', { disabled }), { [HAPTICS_FEEDBACK]: !disabled })}
        onClick={() => {
          if (!disabled) {
            onToggleItem(index);
          }
        }}
      >
        <span
          className={classnames(
            bem('title', {
              down: showPopup === (props.direction === 'down'),
              active: showPopup,
            }),
            titleClass,
          )}
          style={{ color: showPopup ? props.activeColor : '' }}
        >
          <div className="rc-ellipsis">{item.renderTitle()}</div>
        </span>
      </div>
    );
  };

  useClickAway(root, onClickAway);
  useEventListener('scroll', onScroll, { target: scrollParent });

  const handleChange = (value) => {
    if (titleFlag) {
      setTitleFlag(false);
    } else {
      setTitleFlag(true);
    }
    updateShowPopupIndex(null);
    props.onChange?.(value);
  };

  return (
    <DropdownMenuContext.Provider
      value={{
        props,
        offset: offsetRef.current,
        onChange: handleChange,
        close: closeAll,
      }}
    >
      <div ref={root} className={classnames(bem(), props.className)} style={{ ...props.style }}>
        <div ref={barRef} style={barStyle()} className={classnames(bem('bar', { opened }))}>
          {childrenRefs.map(renderTitle)}
        </div>
        {React.Children.toArray(props.children)
          .filter(Boolean)
          .map((child: React.ReactElement, index: number) =>
            React.cloneElement(child, {
              ref: setChildrenRefs(index),
            }),
          )}
      </div>
    </DropdownMenuContext.Provider>
  );
});

DropdownMenu.defaultProps = {
  duration: 200,
  overlay: true,
  direction: 'down',
  zIndex: 2000,
  closeOnClickOutside: true,
  closeOnClickOverlay: true,
  shouldRenderTitle: false,
};

DropdownMenu.displayName = 'DropdownMenu';

export default DropdownMenu;
