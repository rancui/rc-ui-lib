import React, {
    createContext,
    forwardRef,
    useImperativeHandle,
    FormEventHandler,
    MutableRefObject
} from 'react';
import { FieldValidateError } from '../field/types';
import { FormProps } from './props';
import classnames from 'classnames';
import './style/index.scss';

// 创建组件间共享上下文
export const FormContenxt = createContext(null);
const baseClass = 'r-form';

const Form = forwardRef<unknown, FormProps>((props, ref) => {
    const { validateFirst = false, scrollToError = false, onFailed, onSubmit, children } = props;

    const getFieldsByNames = (names?: string[]) => {
        if (names) {
            return React.Children.toArray(children).filter(
                (field) => names.indexOf((field as any).name) !== -1
            );
        }
        return children;
    };

    // 按顺序校验
    const validateSeq = (names?: string[]) => {
        return new Promise<void>((resolve, reject) => {
            const errors: FieldValidateError[] = [];
            const fields = getFieldsByNames(names) as any;
            fields
                .reduce(
                    (promise, field) =>
                        promise.then(() => {
                            if (!errors.length) {
                                return field.ref?.current
                                    ?.validate()
                                    .then((error?: FieldValidateError) => {
                                        if (error) {
                                            errors.push(error);
                                        }
                                    });
                            }
                        }),
                    Promise.resolve()
                )
                .then(() => {
                    if (errors.length) {
                        reject(errors);
                    } else {
                        resolve();
                    }
                });
        });
    };

    const validateAll = (names?: string[]) => {
        return new Promise<void>((resolve, reject) => {
            const fields = getFieldsByNames(names) as any;
            Promise.all(fields?.map((item) => item.ref?.current?.validate())).then((errors) => {
                // errors = errors.filter((item) => item);
                errors.filter((item) => item);
                if (errors.length) {
                    reject(errors);
                } else {
                    resolve();
                }
            });
        });
    };

    const validateField = (name: string) => {
        const matched = React.Children.map(
            children,
            (item) => (item as any)?.props?.name === name
        ) as any;

        if (matched.length) {
            return new Promise<void>((resolve, reject) => {
                matched[0].ref?.current?.validate().then((error?: FieldValidateError) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve();
                    }
                });
            });
        }
        return Promise.reject();
    };

    const getValues = () => {
        return React.Children.toArray(children).reduce((form, item) => {
            const field = item as any;
            if (field?.type?.displayName === 'Field') {
                form[field?.props.name] = field.ref.current?.formValue();
                return form;
            }
        }, {} as Record<string, unknown>);
    };

    const validate = (name?: string | string[]) => {
        if (typeof name === 'string') {
            return validateField(name);
        }
        return validateFirst ? validateSeq(name) : validateAll(name);
    };

    const resetValidation = (name?: string | string[]) => {
        if (typeof name === 'string') {
            name = [name];
        }
        const fields = getFieldsByNames(name) as any;
        fields.forEach((item) => {
            item.ref?.current?.resetValidation();
        });
    };

    const scrollToField = (name: string, options?: boolean | ScrollIntoViewOptions) => {
        React.Children.toArray(children).some((child) => {
            const item = child as any;
            if (item?.props?.name === name) {
                item.ref?.current?.scrollIntoView(options);
                return true;
            }
            return false;
        });
    };

    const submit = () => {
        const values = getValues() as any;
        validate()
            .then(() => {
                onSubmit?.(values);
            })
            .catch((errors: FieldValidateError[]) => {
                onFailed?.({ values, errors });

                if (scrollToError && errors[0].name) {
                    scrollToField(errors[0].name);
                }
            });
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        submit();
    };

    useImperativeHandle(ref, () => ({
        resetValidation,
        submit,
        validate,
        scrollToField
    }));

    return (
        <form
            className={classnames(baseClass)}
            onSubmit={handleSubmit}
            ref={ref as MutableRefObject<HTMLFormElement>}
        >
            <FormContenxt.Provider value={props as any}>{children}</FormContenxt.Provider>
        </form>
    );
});
Form.displayName = 'Form';
export default Form;
