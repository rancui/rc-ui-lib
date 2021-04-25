import { useEffect } from 'react';
import { noop } from './index';

export let supportsPassive = false;

if (typeof window !== 'undefined') {
    try {
        const opts = {};
        Object.defineProperty(opts, 'passive', {
            get() {
                supportsPassive = true;
                return true;
            }
        });
        window.addEventListener('test-passive', noop, opts);
    } catch (error) {}
}

export type useEventListenerOptions = {
    target?: EventTarget;
    capture?: boolean;
    passive?: boolean;
};

export const useEventListener = (
    type: string,
    listener: EventListener,
    options: useEventListenerOptions = {}
): any => {
    if (typeof window === 'undefined') {
        //  非浏览器环境
        return;
    }
    const { target = window, capture = false, passive = false } = options;

    let attached: boolean;

    const add = () => {
        if (target && !attached) {
            target.addEventListener(
                type,
                listener,
                supportsPassive ? { capture, passive } : capture
            );
            attached = true;
        }
    };

    const remove = () => {
        if (target && attached) {
            target.removeEventListener(type, listener, capture);
            attached = false;
        }
    };

    useEffect(() => {
        add();
        return () => {
            remove();
        };
    }, []);
};
