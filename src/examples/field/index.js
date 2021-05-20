import React, { Component } from 'react';
import classnames from 'classnames';
import CellGroup from '@/components/cell-group';
import Field from '@/components/field';
import Button from '@/components/button';
import '../style/index.scss';

export default class FieldComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            model1: '',
            model2: '',
            message: '',
            message2: '',
            errorMessage: '',
            iconValue1: '',
            iconValue2: '',
            text: '',
            tel: '',
            digit: '',
            number: '',
            password: '',
            phone: '',
            value: '',
            sms: ''
        };
        this.formatter = this.formatter.bind(this);
        this.onUpdateModel = this.onUpdateModel.bind(this);
        this.onUpdateModel2 = this.onUpdateModel2.bind(this);
    }
    // 过滤输入的数字
    formatter(value) {
        return value.replace(/\d/g, '');
    }
    onUpdateModel(v) {
        console.log('onUpdateModel', v);
        this.setState({
            model1: v
        });
    }
    onUpdateModel2(v) {
        this.setState({
            message2: v
        });
    }
    render() {
        return (
            <>
                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>基础用法</h2>
                    <p className={classnames('subTitle')}>
                        可以通过 model 绑定输入框的值，通过 placeholder 设置占位提示文字。
                    </p>
                    <CellGroup>
                        <Field
                            formatter={this.formatter}
                            label="文本"
                            model={this.state.username}
                            placeholder="请输入用户名"
                        />
                    </CellGroup>
                </div>

                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>自定义类型</h2>
                    <p className={classnames('subTitle')}>
                        根据 type 属性定义不同类型的输入框，默认值为 text。
                    </p>
                    {/* <!-- 输入任意文本 --> */}
                    <Field label="文本" model={this.state.text} placeholder="请输入文本" />
                    {/* <!-- 输入手机号，调起手机号键盘 --> */}
                    <Field
                        label="手机号"
                        model={this.state.tel}
                        placeholder="请输入手机号"
                        type="tel"
                    />
                    {/* <!-- 允许输入正整数，调起纯数字键盘 --> */}
                    <Field
                        label="整数"
                        model={this.state.digit}
                        placeholder="请输入整数"
                        type="digit"
                    />
                    {/* <!-- 允许输入数字，调起带符号的纯数字键盘 --> */}
                    <Field
                        label="数字"
                        model={this.state.number}
                        placeholder="请输入数字（支持小数）"
                        type="number"
                    />
                    {/* <!-- 输入密码 --> */}
                    <Field
                        label="密码"
                        model={this.state.password}
                        placeholder="请输入密码"
                        type="password"
                    />
                </div>

                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>禁用输入框</h2>
                    <p className={classnames('subTitle')}>
                        通过 readonly 将输入框设置为只读状态，通过 disabled 将输入框设置为禁用状态。
                    </p>
                    <CellGroup>
                        <Field label="文本" readonly value="输入框只读" />
                        <Field disabled label="文本" value="输入框已禁用" />
                    </CellGroup>
                </div>

                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>显示图标</h2>
                    <p className={classnames('subTitle')}>
                        通过 leftIcon 和 rightIcon 配置输入框两侧的图标，通过设置 clearable
                        在输入过程中展示清除图标。
                    </p>
                    <CellGroup>
                        <Field
                            label="文本"
                            leftIcon="smile-o"
                            model={this.state.iconValue1}
                            placeholder="显示图标"
                            rightIcon="warning-o"
                        />
                        <Field
                            clearable
                            label="文本"
                            leftIcon="music-o"
                            model={this.state.iconValue2}
                            placeholder="显示清除图标"
                        />
                    </CellGroup>
                </div>

                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>错误提示</h2>
                    <p className={classnames('subTitle')}>
                        设置 required 属性表示这是一个必填项，可以配合 error 或 errorMessage
                        属性显示对应的错误提示。
                    </p>
                    <CellGroup>
                        <Field
                            error
                            label="用户名"
                            model={this.state.errorMessage}
                            placeholder="请输入用户名"
                            required
                        />
                        <Field
                            errorMessage="手机号格式错误"
                            label="手机号"
                            model={this.state.phone}
                            placeholder="请输入手机号"
                            required
                        />
                    </CellGroup>
                </div>

                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>插入按钮</h2>
                    <p className={classnames('subTitle')}>可以在输入框尾部插入按钮。</p>

                    <Field
                        center
                        clearable
                        label="短信验证码"
                        model={this.state.sms}
                        placeholder="请输入短信验证码"
                    >
                        <Button size="small" type="success">
                            发送验证码
                        </Button>
                    </Field>
                </div>

                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>格式化输入内容</h2>
                    <p className={classnames('subTitle')}>
                        通过 formatter 属性可以对输入的内容进行格式化，通过 formatTrigger
                        属性可以指定执行格式化的时机，默认在输入时进行格式化。
                    </p>
                    <Field
                        formatter={this.formatter}
                        label="文本"
                        model={this.state.model1}
                        placeholder="在输入时执行格式化"
                        onUpdateModel={this.onUpdateModel}
                    />
                    <Field
                        formatTrigger="onBlur"
                        formatter={this.formatter}
                        label="文本"
                        model={this.state.model2}
                        placeholder="在输入时执行格式化"
                    />
                </div>

                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>高度自适应</h2>
                    <p className={classnames('subTitle')}>
                        对于 textarea，可以通过 autosize 属性设置高度自适应。
                    </p>
                    <Field
                        autosize
                        label="留言"
                        model={this.state.message}
                        placeholder="请输入留言"
                        rows="1"
                        type="textarea"
                    />
                </div>
                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>输入框内容对齐</h2>
                    <p className={classnames('subTitle')}>
                        通过 inputAlign 属性可以设置输入框内容的对齐方式。
                    </p>
                    <Field
                        inputAlign="right"
                        label="文本"
                        model={this.state.value}
                        placeholder="输入框内容右对齐"
                    />
                </div>
                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>显示字数统计</h2>
                    <p className={classnames('subTitle')}>
                        设置 maxlength 和 showWordLimit 属性后会在底部显示字数统计。
                    </p>
                    <Field
                        autosize
                        label="留言"
                        maxlength="30"
                        model={this.state.message2}
                        placeholder="请输入留言"
                        rows="2"
                        showWordLimit
                        type="textarea"
                    />
                </div>
            </>
        );
    }
}
