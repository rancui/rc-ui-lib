import React, { Component } from 'react';
import Switch from '@/components/switch';
import Dialog from '@/components/dialog';
import classnames from 'classnames';
import '../style/index.scss';

export default class SwitchComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model1: true,
            model2: true,
            model3: true,
            model4: false,
            model5: false,
            model6: false
        };
    }

    onClick1 = () => {
        console.log(1234);
        this.setState({
            model1: !this.state.model1
        });
    };
    onClick2 = () => {
        this.setState({
            model2: !this.state.model2
        });
    };

    onClick3 = () => {
        this.setState({
            model3: !this.state.model3
        });
    };

    onClick4 = () => {
        this.setState({
            model4: !this.state.model4
        });
    };

    onClick5 = () => {
        this.setState({
            model5: !this.state.model5
        });
    };

    onClick6 = () => {
        this.setState({
            model6: !this.state.model6
        });
    };

    showDialog = () => {
        Dialog.show({
            title: '提醒',
            message: '是否切换开关？',
            theme: 'round',
            showCancelButton: true,
            onConfirm: this.onClickConfirmBtn,
            onCancel: this.onClickCancelBtn,
            onBeforeClose: this.beforeClose
        }).then((res) => {
            console.log('==res==', res);
        });
    };

    beforeClose = (action) => {
        return new Promise((reslove) => {
            action === 'onConfirm' ? reslove(true) : reslove(false);
        });
    };

    onClickConfirmBtn = () => {
        this.setState({
            model: !this.state.model
        });
    };

    onClick = () => {
        this.setState({
            model: !this.state.model
        });
    };

    render() {
        return (
            <>
                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>基础用法</h2>
                    <p className={classnames('subTitle')}>
                        通过 model 绑定开关的选中状态，true 表示开，false 表示关。
                    </p>
                    <Switch model={this.state.model1} onClick={this.onClick1} />
                </div>
                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>禁用状态</h2>
                    <p className={classnames('subTitle')}>
                        通过 disabled 属性来禁用开关，禁用状态下开关不可点击。
                    </p>
                    <Switch disabled model={this.state.model2} onClick={this.onClick2} />
                </div>
                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>加载状态</h2>
                    <p className={classnames('subTitle')}>
                        通过 loading 属性设置开关为加载状态，加载状态下开关不可点击。
                    </p>
                    <Switch loading model={this.state.model3} onClick={this.onClick3} />
                </div>
                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>自定义大小</h2>
                    <p className={classnames('subTitle')}>通过 size 属性自定义开关的大小。</p>
                    <Switch model={this.state.model4} size="24px" onClick={this.onClick4} />
                </div>

                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>自定义颜色</h2>
                    <p className={classnames('subTitle')}>
                        activeColor 属性表示打开时的背景色，inactiveColor 表示关闭时的背景色。
                    </p>
                    <Switch
                        activeColor="#ee0a24"
                        inactiveColor="#dcdee0"
                        model={this.state.model5}
                        onClick={this.onClick5}
                    />
                </div>
            </>
        );
    }
}
