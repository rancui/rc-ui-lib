import React, { Component } from 'react';
// import BaseDialog from '@/components/Dialog/BaseDialog';
import Dialog from '@/components/Dialog';
import Button from '@/components/Button';
import styles from './index.scss';
import classnames from 'classnames';

export default class DialogComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            showCancelButton: false,
            showRoundButton: false,
            asyncShow: false,
            showConfirmWithRoundButton: false
        };

        this.onClickRoundBtn = this.onClickRoundBtn.bind(this);
        this.updateShow = this.updateShow.bind(this);
        this.showCancelButton = this.showCancelButton.bind(this);
        this.updateCancelButtonShow = this.updateCancelButtonShow.bind(this);
        this.showRoundButton = this.showRoundButton.bind(this);
        this.updateRoundButtonShow = this.updateRoundButtonShow.bind(this);
        this.updateAsyncShow = this.updateAsyncShow.bind(this);
        this.asyncButtonClose = this.asyncButtonClose.bind(this);
        this.onBeforeClose = this.onBeforeClose.bind(this);
        this.showConfirmWithRoundButton = this.showConfirmWithRoundButton.bind(this);
        this.updateConfirmWithRoundButtonShow = this.updateConfirmWithRoundButtonShow.bind(this);
    }

    onClickRoundBtn() {
        this.setState({
            show: true
        });
    }

    updateShow(v) {
        this.setState({
            show: v
        });
    }
    showCancelButton() {
        this.setState({
            showCancelButton: true
        });
    }
    updateCancelButtonShow(v) {
        this.setState({
            showCancelButton: v
        });
    }
    showRoundButton() {
        this.setState({
            showRoundButton: true
        });
    }
    updateRoundButtonShow(v) {
        this.setState({
            showRoundButton: v
        });
    }
    asyncButtonClose() {
        this.setState({
            asyncShow: true
        });
    }
    updateAsyncShow(v) {
        this.setState({
            asyncShow: v
        });
    }

    onBeforeClose(action) {
        new Promise((resolve) => {
            setTimeout(() => resolve(action === 'confirm'), 1000);
        });
    }
    showConfirmWithRoundButton() {
        this.setState({
            showConfirmWithRoundButton: true
        });
    }

    updateConfirmWithRoundButtonShow(v) {
        this.setState({
            showConfirmWithRoundButton: v
        });
    }

    render() {
        return (
            <>
                <div className={classnames(styles['r-doc-demo-block'])}>
                    <h2 className={classnames(styles['r-doc-demo-block__title'])}>消息提示</h2>
                    <p className={classnames(styles.subTitle)}>
                        用于提示一些消息，只包含一个确认按钮。
                    </p>
                    <div className={classnames(styles['dialogOptions'])}>
                        <Button onClick={this.onClickRoundBtn} type="primary">
                            消息提示
                        </Button>
                        <Dialog
                            show={this.state.show}
                            title="标题"
                            message="内容"
                            updateShow={this.updateShow}
                        />
                    </div>
                </div>
                <div className={classnames(styles['r-doc-demo-block'])}>
                    <h2 className={classnames(styles['r-doc-demo-block__title'])}>消息确认</h2>
                    <p className={classnames(styles.subTitle)}>
                        用于确认消息，包含取消 和 确认按钮。
                    </p>
                    <div className={classnames(styles['dialogOptions'])}>
                        <Button onClick={this.showCancelButton} type="primary">
                            确认弹窗
                        </Button>
                        <Dialog
                            show={this.state.showCancelButton}
                            title="标题"
                            message="内容"
                            updateShow={this.updateCancelButtonShow}
                            showCancelButton
                        />
                    </div>
                </div>

                <div className={classnames(styles['r-doc-demo-block'])}>
                    <h2 className={classnames(styles['r-doc-demo-block__title'])}>圆角按钮风格</h2>
                    <p className={classnames(styles.subTitle)}>
                        将 theme 选项设置为 round-button 可以展示圆角按钮风格的弹窗。
                    </p>
                    <div className={classnames(styles['dialogOptions'])}>
                        <Button onClick={this.showRoundButton} type="primary">
                            圆角按钮
                        </Button>
                        <Dialog
                            show={this.state.showRoundButton}
                            title="标题"
                            message="内容"
                            updateShow={this.updateRoundButtonShow}
                            theme="round-button"
                        />
                    </div>
                </div>
                <div className={classnames(styles['r-doc-demo-block'])}>
                    <h2 className={classnames(styles['r-doc-demo-block__title'])}>
                        消息确认-圆角按钮
                    </h2>
                    <p className={classnames(styles.subTitle)}>
                        用于确认消息，包含取消 和 确认按钮。
                    </p>
                    <div className={classnames(styles['dialogOptions'])}>
                        <Button onClick={this.showConfirmWithRoundButton} type="primary">
                            确认弹窗-圆角按钮
                        </Button>
                        <Dialog
                            show={this.state.showConfirmWithRoundButton}
                            title="标题"
                            message="内容"
                            updateShow={this.updateConfirmWithRoundButtonShow}
                            theme="round-button"
                            showCancelButton
                        />
                    </div>
                </div>

                <div className={classnames(styles['r-doc-demo-block'])}>
                    <h2 className={classnames(styles['r-doc-demo-block__title'])}>异步关闭</h2>
                    <p className={classnames(styles.subTitle)}>
                        通过 onBeforeClose 属性可以传入一个回调函数，在弹窗关闭前进行特定操作。
                    </p>
                    <div className={classnames(styles['dialogOptions'])}>
                        <Button onClick={this.asyncButtonClose} type="primary">
                            异步关闭
                        </Button>
                        <Dialog
                            show={this.state.asyncShow}
                            title="标题"
                            message="内容"
                            updateShow={this.updateAsyncShow}
                            showCancelButton
                            onBeforeClose={this.onBeforeClose}
                        />
                    </div>
                </div>
            </>
        );
    }
}
