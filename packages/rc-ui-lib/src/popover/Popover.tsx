import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { Instance, createPopper, offsetModifier } from '@vant/popperjs';
// component
import Popup from '../popup';
import Icon from '../icon';
// utils
import { extend, pick } from '../utils';
import { BORDER_BOTTOM } from '../utils/constant';
// hook
import useClickAway from '../hooks/use-click-away';
// type
import { PopupInstanceType } from '../popup/PropsType';
import { PopoverAction, PopoverInstance, PopoverProps } from './PropsType';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';

const popupProps = [
  'overlay',
  'duration',
  'overlayStyle',
  'overlayClass',
  'closeOnClickOverlay',
  'teleport',
  'onClose',
  'onOpen',
  'onClosed',
  'onOpened',
  'onClickOverlay',
] as const;

const Popover = forwardRef<PopoverInstance, PopoverProps>((props, ref) => {
  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('popover', prefixCls);

  const [visible, updateShow] = useState(false);

  const popper = useRef<Instance>(null);
  const wrapperRef = useRef<HTMLElement>();
  const popoverRef = useRef<PopupInstanceType>();

  const createPopperInstance = () =>
    createPopper(wrapperRef.current, popoverRef.current.popupRef.current, {
      placement: props.placement,
      modifiers: [
        {
          name: 'computeStyles',
          options: {
            adaptive: false,
            gpuAcceleration: false,
          },
        },
        extend({}, offsetModifier, {
          options: {
            offset: props.offset,
          },
        }),
      ],
    });

  const onClickWrapper = () => {
    if (props.trigger === 'click') {
      updateShow((e) => !e);
    }
  };

  const onClickAction = (action: PopoverAction, index: number) => {
    if (action.disabled) {
      return;
    }

    props.onSelect?.(action, index);

    if (props.closeOnClickAction) {
      updateShow(false);
    }
  };

  const onClickAway = () => {
    if (!props.overlay || props.closeOnClickOverlay) {
      updateShow(false);
    }
  };

  const renderAction = (action: PopoverAction, index: number) => {
    const { icon, text, color, disabled, className: actionClassname } = action;
    return (
      <div
        // role="menuitem"
        key={index}
        className={classNames(bem('action', { disabled, 'with-icon': icon }), actionClassname)}
        style={{ color }}
        tabIndex={disabled ? undefined : 0}
        aria-disabled={disabled || undefined}
        onClick={() => onClickAction(action, index)}
      >
        {icon && (
          <Icon
            name={icon}
            classPrefix={props.iconPrefix}
            className={classNames(bem('action-icon'))}
          />
        )}
        <div className={classNames(bem('action-text'), BORDER_BOTTOM)}>{text}</div>
      </div>
    );
  };

  useEffect(() => {
    return () => {
      if (popper.current) {
        popper.current?.destroy();
        popper.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const updateLocation = () => {
      if (!visible) {
        return;
      }

      if (!popper.current) {
        popper.current = createPopperInstance();
      } else {
        popper.current?.setOptions({
          placement: props.placement,
        });
      }
    };
    updateLocation();
  }, [visible, props.placement]);

  useEffect(() => {
    let popupTarget;
    const prevent = (e) => e.stopPropagation();

    if (popoverRef.current && popoverRef.current.popupRef.current) {
      popupTarget = popoverRef.current.popupRef.current;
      popupTarget.addEventListener('touchstart', prevent);
    }
    return () => {
      if (popupTarget) popupTarget.removeEventListener('touchstart', prevent);
    };
  }, [popoverRef.current]);

  useImperativeHandle(ref, () => ({
    show: () => {
      if (visible) {
        updateShow(false);
        setTimeout(() => updateShow(true), 0);
        return;
      }
      updateShow(true);
    },
    hide: () => updateShow(false),
  }));

  useClickAway(wrapperRef, onClickAway, 'touchstart', props.closeOnClickOutside);

  return (
    <>
      <span ref={wrapperRef} className={classNames(bem('wrapper'))} onClick={onClickWrapper}>
        {props.reference}
      </span>
      <Popup
        ref={popoverRef}
        visible={visible}
        className={classNames(bem([props.theme]))}
        position=""
        transition="rc-zoom"
        lockScroll={false}
        {...pick(props, popupProps)}
      >
        <div className={classNames(bem('arrow'))} />
        <div role="menu" className={classNames(bem('content'))}>
          {props.children || props.actions.map(renderAction)}
        </div>
      </Popup>
    </>
  );
});

Popover.defaultProps = {
  overlay: false,
  duration: 300,
  closeOnClickAction: true,
  closeOnClickOverlay: true,
  closeOnClickOutside: true,
  offset: [0, 8] as [number, number],
  theme: 'light',
  trigger: 'click',
  actions: [],
  placement: 'bottom',
};

Popover.displayName = 'Popover';

export default Popover;
