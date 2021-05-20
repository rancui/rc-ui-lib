import React, { PureComponent } from 'react';
import Button from '@/components/button';
import ActionSheet from '@/components/action-sheet';
import classnames from 'classnames';
import '../style/index.scss';

export default class ActionSheetComponent extends PureComponent {
    constructor() {
        super();
        this.state = {
            show: false,
            show2: false,
            show3: false,
            show4: false,
            show5: false,
            actions: [
                { name: '选项一' },
                { name: '选项二', subname: '描述信息' },
                { name: '选项三' }
            ],
            actions2: [
                { name: '着色选项', color: '#ee0a24' },
                { name: '禁用选项', disabled: true },
                { name: '加载选项', loading: true }
            ]
        };
    }

    show = () => {
        this.setState({
            show: true
        });
    };

    show2 = () => {
        this.setState({
            show2: true
        });
    };

    show3 = () => {
        this.setState({
            show3: true
        });
    };

    show4 = () => {
        this.setState({
            show4: true
        });
    };

    show5 = () => {
        this.setState({
            show5: true
        });
    };

    onClose = () => {
        console.log('actionsheet is closed');
    };

    onSelect = (item, index) => {
        this.setState({
            show: false
        });
    };

    onSelect2 = () => {
        this.setState({
            show2: false
        });
    };

    onSelect3 = (item, index) => {
        this.setState({
            show3: false
        });
    };

    onCancel = () => {
        this.setState({
            show: false
        });
    };

    onCancel2 = () => {
        this.setState({
            show2: false
        });
    };

    onCancel3 = () => {
        this.setState({
            show3: false
        });
    };

    onClickOverlay = () => {
        this.setState({
            show: false
        });
    };

    onCancel4 = () => {
        this.setState({
            show4: false
        });
    };

    onSelect4 = () => {
        this.setState({
            show4: false
        });
    };

    onCancel5 = () => {
        this.setState({
            show5: false
        });
    };

    onSelect5 = () => {
        this.setState({
            show5: false
        });
    };
    render() {
        return (
            <>
                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>基础用法</h2>
                    <p className={classnames('subTitle')}>
                        动作面板通过 actions 属性来定义选项，actions
                        属性是一个由对象构成的数组，数组中的每个对象配置一列。
                    </p>
                    <Button onClick={this.show} type="primary">
                        基础用法
                    </Button>

                    <ActionSheet
                        actions={this.state.actions}
                        onClickOverlay={this.onClickOverlay}
                        onClose={this.onClose}
                        onSelect={this.onSelect}
                        show={this.state.show}
                    />
                </div>

                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>展示取消按钮</h2>
                    <p className={classnames('subTitle')}>
                        设置 cancelText 属性后，会在底部展示取消按钮，点击后关闭当前面板并触发
                        onCancel 事件。
                    </p>
                    <Button onClick={this.show2} type="primary">
                        展示取消按钮
                    </Button>

                    <ActionSheet
                        actions={this.state.actions}
                        cancelText="取消"
                        onCancel={this.onCancel2}
                        onSelect={this.onSelect2}
                        show={this.state.show2}
                    />
                </div>

                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>展示描述信息</h2>
                    <p className={classnames('subTitle')}>
                        通过 description 可以在菜单顶部显示描述信息，通过选项的 subname
                        属性可以在选项文字的右侧展示描述信息。
                    </p>
                    <Button onClick={this.show3} type="primary">
                        展示描述信息
                    </Button>

                    <ActionSheet
                        actions={this.state.actions}
                        cancelText="取消"
                        description="这是一段描述信息"
                        onCancel={this.onCancel3}
                        onSelect={this.onSelect3}
                        show={this.state.show3}
                    />
                </div>

                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>选项状态</h2>
                    <p className={classnames('subTitle')}>
                        可以通过 loading 和 disabled
                        将选项设置为加载状态或禁用状态，或者通过color设置选项的颜色
                    </p>
                    <Button onClick={this.show4} type="primary">
                        选项状态
                    </Button>

                    <ActionSheet
                        actions={this.state.actions2}
                        cancelText="取消"
                        description="这是一段描述信息"
                        onCancel={this.onCancel4}
                        onSelect={this.onSelect4}
                        show={this.state.show4}
                    />
                </div>

                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>自定义面板</h2>
                    <p className={classnames('subTitle')}>
                        可以自定义面板的展示内容，同时可以使用title属性展示标题栏
                    </p>
                    <Button onClick={this.show5} type="primary">
                        自定义面板
                    </Button>

                    <ActionSheet onCancel={this.onCancel5} show={this.state.show5} title="标题">
                        <div className={classnames('content')}>自定义内容</div>
                    </ActionSheet>
                </div>
            </>
        );
    }
}
