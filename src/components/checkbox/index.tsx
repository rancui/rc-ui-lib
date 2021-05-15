import React, { useState, useEffect, useContext, forwardRef, useImperativeHandle } from 'react';
import { CheckboxGroupContext } from '../checkbox-group';
import Checker from './checker';
import { CheckerProps } from './props';

// checkbox 属性集合
interface CheckboxProps extends CheckerProps {
    // bindGroup?: boolean;
    onChange?: (val: boolean) => void;
}
const Checkbox = forwardRef<unknown, CheckboxProps>((props, ref) => {
    const { name, model = false, bindGroup = true, onChange } = props;

    // 获取共享上下文
    const parent = useContext(CheckboxGroupContext) as any;

    // 初始化状态
    const [modelValue, setModelValue] = useState(model);

    useEffect(() => {
        onChange?.(modelValue);
    }, [modelValue]);

    // 更新父组件的model值(当有父组件时)
    const updateParentModel = (checked) => {
        const { model, max, onChange } = parent;
        if (checked) {
            // 判断父组件的model值的数量是否大于设置的max值
            const overLimit = (max as number) && model?.length >= max;
            if (!overLimit && model?.indexOf(name) === -1) {
                setModelValue(checked);
                model.push(name);
                if (bindGroup) {
                    onChange?.(model);
                }
            } else {
                return;
            }
        } else {
            const index = model.indexOf(name);
            if (index !== -1) {
                setModelValue(checked);
                model.splice(index, 1);
                if (bindGroup) {
                    onChange?.(model);
                }
            }
        }
    };

    const toggle = (newVal = !modelValue) => {
        if (parent && bindGroup) {
            updateParentModel(newVal);
        } else {
            setModelValue(newVal);
        }
    };

    useImperativeHandle(ref, () => ({
        toggle
    }));

    return (
        <Checker
            ref={ref}
            baseClass="r-checkbox"
            role="checkbox"
            parent={parent}
            checked={modelValue}
            onToggle={toggle}
            {...props}
        />
    );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
