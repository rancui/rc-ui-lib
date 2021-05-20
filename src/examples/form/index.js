import React, { useRef } from 'react';
import Form from '@/components/form';
import Field from '@/components/field';
import Button from '@/components/button';
import classnames from 'classnames';
import '../style/index.scss';

const FormComponent = () => {
    const usernameRef = useRef();

    const onFocus = () => {
        usernameRef.current.focus();
    };
    const onBlur = () => {
        usernameRef.current.blur();
    };
    const onSubmit = (values) => {
        console.log('submit', values);
    };
    const rules1 = [{ required: true, message: '请填写用户名' }];

    return (
        <>
            <div className={classnames('r-doc-demo-block')}>
                <h2 className={classnames('r-doc-demo-block__title')}>基础用法</h2>
                <p className={classnames(styles.subTitle)}>
                    可以通过 model 绑定输入框的值，通过 placeholder 设置占位提示文字。
                </p>
                <Form onSubmit={onSubmit}>
                    <Field
                        label="用户名"
                        model=""
                        name="用户名"
                        onBlur={onBlur}
                        onFocus={onFocus}
                        placeholder="用户名"
                        ref={usernameRef}
                        rules={rules1}
                    />
                    {/* <Field 
               model=""
               type="password"
               name="密码"
               label="密码"
               placeholder="密码"
               rules= {this.state.rules2} 
            /> */}
                    <div style={{ margin: '16px' }}>
                        <Button block nativeType="submit" round type="primary">
                            提交
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    );
};

export default FormComponent;
