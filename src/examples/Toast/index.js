import React, { Component } from 'react';
import classnames from 'classnames';
import Button from '@/components/button';
import Toast from '@/components/toast';
import './index.scss';
class ToastComponent extends Component {
    constructor() {
        super();
        this.state = {
            message: 'wwww'
        };
    }

    showWord = () => {
        Toast.show({
            // icon: require('../../assets/images/user-active.png'),
            message: 'hello,world!',
            duration: 2000
            // onClose: () => {
            //     console.log('onclose');
            // }
        });
    };

    showLoading = () => {
        Toast.show({
            type: 'loading',
            message: 'hello,world!',
            duration: 2000
            // loadingType: 'spinner'
        });
    };

    showCustomization = () => {
        Toast.show({
            icon: require('../../assets/images/user-active.png'),
            message: 'hello,world!',
            duration: 2000
        });
    };
    showPosition = () => {
        Toast.show({
            icon: 'chat-o',
            message: 'hello,world!',
            duration: 2000,
            position: 'top'
        });
    };
    showDynamic = () => {
        const toast = Toast.show({
            icon: 'chat-o',
            message: this.state.message,
            duration: 0
        });

        console.log('toast', toast);

        let second = 3;
        const timer = setInterval(() => {
            second--;
            console.log(1);
            if (second) {
                // toast.props.message = `倒计时 ${second} 秒`;
                // console.log(2);
                this.setState({
                    message: `hahha`
                });
            } else {
                console.log(3);
                clearInterval(timer);
                Toast.close();
            }
        }, 1000);
    };

    render() {
        return (
            <>
                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>异步关闭</h2>
                    <p className={classnames('subTitle')}>通过传入message。</p>
                    <div className={classnames('dialogOptions')}>
                        <Button onClick={this.showWord} type="primary">
                            文字提示
                        </Button>
                    </div>
                </div>
                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>加载提示</h2>
                    <p className={classnames('subTitle')}>
                        通过设置type:loading 展示加载提示，通过loadingType
                        属性可以自定义加载图标类型。
                    </p>
                    <div className={classnames('dialogOptions')}>
                        <Button onClick={this.showLoading} type="primary">
                            加载提示
                        </Button>
                    </div>
                </div>
                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>自定义图标</h2>
                    <p className={classnames('subTitle')}>
                        通过 icon 选项可以自定义图标，支持传入图标名称或图片链接。
                    </p>
                    <div className={classnames('dialogOptions')}>
                        <Button onClick={this.showCustomization} type="primary">
                            自定义图标
                        </Button>
                    </div>
                </div>
                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>自定义位置</h2>
                    <p className={classnames('subTitle')}>
                        Toast 默认渲染在屏幕正中位置，通过 position 属性可以控制 Toast 展示的位置。
                    </p>
                    <div className={classnames('dialogOptions')}>
                        <Button onClick={this.showPosition} type="primary">
                            自定义位置
                        </Button>
                    </div>
                </div>
                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>动态更新提示</h2>
                    <p className={classnames('subTitle')}>
                        执行 Toast 方法时会返回对应的 Toast 实例，通过修改实例上的 message
                        属性可以实现动态更新提示的效果。
                    </p>
                    <div className={classnames('dialogOptions')}>
                        <Button onClick={this.showDynamic} type="primary">
                            动态更新提示
                        </Button>
                    </div>
                </div>
            </>
        );
    }
}

export default ToastComponent;
