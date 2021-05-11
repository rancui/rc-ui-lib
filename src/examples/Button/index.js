import React, { PureComponent } from 'react';
import classnames from 'classnames';
import Button from '@/components/button';
import '../style/index.scss';
export default class ButtonComponent extends PureComponent {
    constructor() {
        super();
        this.state = {
            loading: true
        };
    }

    changeLoading = () => {
        this.setState({
            loading: !this.state.loading
        });
    };
    render() {
        return (
            <>
                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>按钮类型</h2>
                    <div className={classnames('demo-button-row')}>
                        <Button className={classnames('r-button--normal')} type="primary">
                            主要按钮
                        </Button>
                        <Button className={classnames('r-button--normal')} type="success">
                            成功按钮
                        </Button>
                        <Button className={classnames('r-button--normal')} type="default">
                            默认按钮
                        </Button>
                    </div>
                    <Button className={classnames('r-button--normal')} type="warning">
                        警告按钮
                    </Button>
                    <Button className={classnames('r-button--normal')} type="danger">
                        危险按钮
                    </Button>
                </div>

                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>朴素按钮</h2>
                    <Button className={classnames('r-button--normal')} plain type="primary">
                        朴素按钮
                    </Button>
                    <Button className={classnames('r-button--normal')} plain type="success">
                        朴素按钮
                    </Button>
                </div>

                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>细边框</h2>
                    <Button
                        className={classnames('r-button--normal')}
                        hairline
                        plain
                        type="primary"
                    >
                        细边框按钮
                    </Button>
                    <Button
                        className={classnames('r-button--normal')}
                        hairline
                        plain
                        type="success"
                    >
                        细边框按钮
                    </Button>
                </div>

                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>禁用状态</h2>
                    <Button className={classnames('r-button--normal')} disabled type="primary">
                        禁用状态
                    </Button>
                    <Button className={classnames('r-button--normal')} disabled type="success">
                        禁用状态
                    </Button>
                </div>

                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>加载状态</h2>
                    <Button className={classnames('r-button--normal')} loading type="primary" />
                    <Button
                        className={classnames('r-button--normal')}
                        loading={this.state.loading}
                        loadingType="spinner"
                        onClick={this.changeLoading}
                        type="primary"
                    />
                    <Button
                        className={classnames('r-button--normal')}
                        loading
                        loadingText="加载中..."
                        type="success"
                    />
                </div>

                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>按钮形状</h2>
                    <Button className={classnames('r-button--normal')} square type="primary">
                        方形按钮
                    </Button>
                    <Button className={classnames('r-button--normal')} round type="danger">
                        圆形按钮
                    </Button>
                </div>

                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>按钮图标</h2>
                    <Button className={classnames('r-button--normal')} icon="plus" type="primary" />
                    <Button className={classnames('r-button--normal')} icon="plus" type="primary">
                        按钮
                    </Button>
                    <Button
                        className={classnames('r-button--normal')}
                        icon={require('@/assets/images/user-active.png')}
                        plain
                        type="primary"
                    >
                        按钮
                    </Button>
                </div>

                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>按钮尺寸</h2>
                    <div className={classnames('demo-button-row')}>
                        <Button
                            className={classnames('r-button--normal')}
                            size="large"
                            type="primary"
                        >
                            大号按钮
                        </Button>
                    </div>
                    <Button className={classnames('r-button--normal')} size="normal" type="primary">
                        普通按钮
                    </Button>
                    <Button className={classnames('r-button--normal')} size="small" type="primary">
                        小型按钮
                    </Button>
                    <Button className={classnames('r-button--normal')} size="mini" type="primary">
                        迷你按钮
                    </Button>
                </div>

                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>自定义颜色</h2>
                    <Button className={classnames('r-button--normal')} color="#7232dd">
                        单色按钮
                    </Button>
                    <Button className={classnames('r-button--normal')} color="#7232dd" plain>
                        单色按钮
                    </Button>
                    <Button
                        className={classnames('r-button--normal')}
                        color="linear-gradient(to right, #ff6034, #ee0a24)"
                    >
                        单色按钮
                    </Button>
                </div>
            </>
        );
    }
}
