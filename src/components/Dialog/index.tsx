import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { DialogProps } from './Props';
import Popup from '../Popup';
import Button from '../Button';
import ActionBar from '../ActionBar';
import { callIntercepter } from '../../utils/callIntercepter';
import { addUnit } from '@/utils';
import classnames from 'classnames';
import styles from './index.scss';

const baseClass = 'r-dialog';

const Dialog: React.FC<DialogProps> = (props) => {
    const {
        show = false,
        title,
        theme = 'default',
        width = '320px',
        message = '',
        className,
        onBeforeClose,
        messageAlign = 'center',
        showCancelButton = false,
        cancelButtonText = '取消',
        cancelButtonColor = '#000000',
        confirmButtonText = '确认',
        confirmButtonColor = '#ee0a24',
        showConfirmButton = true,
        onClickOverlay,
        onConfirm,
        onCancel,
        onOpen,
        onOpened,
        onClose,
        onClosed,
        updateShow
    } = props;

    const [visible, setVisible] = useState(false);
    const [loadingConfirm, setLoadingConfirm] = useState(false);
    const [loadingCancel, setLoadingCancel] = useState(false);

    useEffect(() => {
        setVisible(show);
    }, [show]);

    const handleLoadingStatus = (action: string, status: boolean) => {
        action === 'confirm' ? setLoadingConfirm(status) : setLoadingCancel(status);
    };

    // 处理按钮的点击事件
    const handleAction = useCallback(
        (action) => {
            if (!show) {
                return;
            }
            action === 'confirm' ? onConfirm?.() : onCancel?.();
            if (onBeforeClose) {
                handleLoadingStatus(action, true);
                callIntercepter({
                    interceptor: onBeforeClose,
                    args: [action],
                    done: () => {
                        updateShow?.(false);
                        handleLoadingStatus(action, false);
                    },
                    canceled: () => {
                        handleLoadingStatus(action, false);
                    }
                });
            } else {
                updateShow?.(false);
            }
        },
        [show, onBeforeClose, onConfirm, onCancel]
    );

    const renderTitle = useMemo(() => {
        const titleCls = classnames(styles[`${baseClass}__header`], {
            [styles[`${baseClass}__header--isolated`]]: !message
        });
        if (title) {
            return <div className={titleCls}>{title}</div>;
        }
    }, [title, message]);

    const renderContent = useMemo(() => {
        const classStringWrapper = classnames(styles[`${baseClass}__content`], {
            [styles[`${baseClass}__content--isolated`]]: !title
        });
        const classStringInner = classnames(styles[`${baseClass}__message`], {
            [styles[`${baseClass}__message--has-title`]]: title,
            [styles[`${baseClass}__message--${messageAlign}`]]: messageAlign
        });
        if (message) {
            return (
                <div className={classStringWrapper}>
                    <div className={classStringInner}>{message}</div>
                </div>
            );
        }
    }, [message, title, messageAlign]);

    const renderButtons = useMemo(() => {
        return (
            <div
                className={classnames(
                    styles[`${baseClass}__footer`],
                    styles[`${baseClass}__border--top`]
                )}
            >
                {showCancelButton && (
                    <Button
                        size="large"
                        text={cancelButtonText}
                        className={classnames(styles[`${baseClass}__cancel`])}
                        style={{ color: cancelButtonColor }}
                        loading={loadingCancel}
                        onClick={() => handleAction('cancel')}
                    />
                )}
                {showConfirmButton && (
                    <Button
                        size="large"
                        text={confirmButtonText}
                        className={classnames(styles[`${baseClass}__confirm`], {
                            [styles[`${baseClass}__border--left`]]: showCancelButton
                        })}
                        style={{ color: confirmButtonColor }}
                        loading={loadingConfirm}
                        onClick={() => handleAction('confirm')}
                    />
                )}
            </div>
        );
    }, [
        showCancelButton,
        loadingCancel,
        cancelButtonText,
        cancelButtonColor,
        showConfirmButton,
        loadingConfirm,
        confirmButtonText,
        confirmButtonColor,
        handleAction
    ]);

    const renderRoundButtons = useMemo(() => {
        return (
            <ActionBar className={classnames(styles[`${baseClass}__footer`])}>
                {showCancelButton && (
                    <Button
                        size="large"
                        type="warning"
                        text={cancelButtonText}
                        className={classnames(
                            styles[`${baseClass}__cancel`],
                            styles[`${baseClass}__cancel__space-around`]
                        )}
                        round
                        color={cancelButtonColor}
                        loading={loadingCancel}
                        onClick={() => handleAction('cancel')}
                    />
                )}
                {showConfirmButton && (
                    <Button
                        size="large"
                        type="danger"
                        text={confirmButtonText}
                        round
                        className={classnames(
                            styles[`${baseClass}__confirm`],
                            styles[`${baseClass}__confirm__space-around`]
                        )}
                        color={confirmButtonColor}
                        loading={loadingConfirm}
                        onClick={() => handleAction('confirm')}
                    />
                )}
            </ActionBar>
        );
    }, [
        showCancelButton,
        loadingCancel,
        cancelButtonText,
        cancelButtonColor,
        showConfirmButton,
        loadingConfirm,
        confirmButtonText,
        confirmButtonColor,
        handleAction
    ]);

    return (
        <Popup
            show={visible}
            className={classnames(
                styles[`${baseClass}`],
                { [styles[`${baseClass}--${theme}`]]: !!theme },
                className
            )}
            style={{ width: addUnit(width) }}
            onClickOverlay={onClickOverlay}
            onOpen={onOpen}
            onOpened={onOpened}
            onClose={onClose}
            onClosed={onClosed}
        >
            {renderTitle}
            {renderContent}
            {theme === 'round-button' ? renderRoundButtons : renderButtons}
        </Popup>
    );
};

export default Dialog;
