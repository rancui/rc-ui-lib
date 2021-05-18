import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ActionSheetProps } from './props';
import Icon from '../icon';
import Loading from '../loading';
import Popup from '../popup';
import { defultPopupSharedProps } from '../popup/props';
import { isDef, pick } from '../../utils';
import classnames from 'classnames';
import './style/index.scss';

const baseClass = 'r-action-sheet';

const ActionSheet: React.FC<ActionSheetProps> = (props) => {
    const {
        show = false,
        actions,
        title,
        cancelText,
        description,
        closeOnClickAction = true,
        round = true,
        closeable = true,
        closeIcon = 'cross',
        safeAreaInsetBottom,
        onSelect,
        onCancel,
        onOpen,
        onOpened,
        onClose,
        onClosed,
        onClickOverlay,
        children
    } = props;

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(show);
    }, [show]);

    // const popupDefaultPropKeys = Object.keys(defultProps);
    const popupDefaultPropKeys = Object.keys(defultPopupSharedProps);

    const handleCancel = useCallback(() => {
        setVisible(false);
        onCancel?.();
    }, [onCancel]);

    const renderHeader = useMemo(() => {
        if (title) {
            return (
                <div className={classnames(`${baseClass}__header`)}>
                    {title}
                    {closeable && (
                        <Icon
                            name={closeIcon}
                            className={classnames(`${baseClass}__close`)}
                            onClick={handleCancel}
                        />
                    )}
                </div>
            );
        }
    }, [title, closeable, closeIcon, handleCancel]);

    const renderCancelBtn = useMemo(() => {
        if (cancelText) {
            return (
                <>
                    <div className={classnames(`${baseClass}__gap`)}></div>
                    <button
                        type="button"
                        className={classnames(`${baseClass}__cancel`)}
                        onClick={handleCancel}
                    >
                        {cancelText}
                    </button>
                </>
            );
        }
    }, [cancelText, handleCancel]);

    const renderOption = useCallback(
        (item, index) => {
            const { name, color, subname, loading, callback, disabled, className } = item;

            const Content = loading ? (
                <Loading className={classnames(`${baseClass}__loading-icon`)} />
            ) : (
                <>
                    <span className={classnames(`${baseClass}__name`)}>{name}</span>
                    {subname && (
                        <div className={classnames(`${baseClass}__subname`)}>{subname}</div>
                    )}
                </>
            );
            // 点击选项
            const onClickItem = () => {
                if (disabled || loading) {
                    return;
                }
                callback?.(item);
                // 点击选项后触发
                onSelect?.(item, index);
                //在点击选项后关闭
                if (closeOnClickAction) {
                    // 设置actionsheet的show的状态
                    setVisible(false);
                }
            };

            return (
                <button
                    type="button"
                    style={{ color }}
                    className={classnames(
                        `${baseClass}__item`,
                        {
                            [`${baseClass}__item--loading`]: loading,
                            [`${baseClass}__item--disabled`]: disabled
                        },
                        className
                    )}
                    onClick={onClickItem}
                    key={name}
                >
                    {Content}
                </button>
            );
        },
        [onSelect, closeOnClickAction]
    );

    const renderOptions = useMemo(() => {
        if (actions) {
            return actions.map(renderOption);
        }
    }, [actions, renderOption]);

    const renderDescription = useMemo(() => {
        return isDef(description) && description !== '' ? (
            <div className={classnames(`${baseClass}__description`)}>{description}</div>
        ) : (
            <></>
        );
    }, [description]);

    return (
        <Popup
            className={classnames(`${baseClass}`)}
            {...pick(props, popupDefaultPropKeys)}
            show={visible}
            round={round}
            position="bottom"
            safeAreaInsetBottom={safeAreaInsetBottom}
            onClickOverlay={onClickOverlay}
            onOpen={onOpen}
            onOpened={onOpened}
            onClose={onClose}
            onClosed={onClosed}
        >
            {renderHeader}
            {renderDescription}
            <div className={classnames(`${baseClass}__content`)}>
                {renderOptions}
                {children}
            </div>
            {renderCancelBtn}
        </Popup>
    );
};

export default ActionSheet;
