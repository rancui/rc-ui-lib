import React, { Component } from 'react';
import classnames from 'classnames';
import RadioGroup from '@/components/radio-group';
import Radio from '@/components/radio';
import '../style/index.scss';
import CellGroup from '@/components/cell-group';
import Cell from '@/components/cell';
export default class RadioComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgUrl: {
                activeIcon: require('../../assets/images/user-active.png'),
                inactiveIcon: require('../../assets/images/user-inactive.png')
            },
            parentModel: '',
            parentModel2: '',
            parentModel3: 'e',
            parentModel4: '',
            parentModel5: '',
            parentModel6: '',
            parentModel7: ''
        };
    }

    onChange = (arg) => {
        this.setState({
            parentModel: arg
        });
    };
    onChange2 = (arg) => {
        this.setState({
            parentModel2: arg
        });
    };
    onChange3 = (arg) => {
        this.setState({
            parentModel3: arg
        });
    };
    onChange4 = (arg) => {
        this.setState({
            parentModel4: arg
        });
    };
    onChange5 = (arg) => {
        this.setState({
            parentModel5: arg
        });
    };
    onChange6 = (arg) => {
        this.setState({
            parentModel6: arg
        });
    };

    onChange7 = (arg) => {
        this.setState({
            parentModel7: arg
        });
    };

    cellOnClick = () => {
        console.log('cell is clicked');
    };

    render() {
        return (
            <>
                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>基础用法</h2>
                    <p className={classnames('subTitle')}>通过 model 绑定值当前选中项的 name.</p>
                    <RadioGroup model={this.state.parentModel} onChange={this.onChange}>
                        <Radio name="a" shape="square">
                            单选框1
                        </Radio>
                        <Radio name="b">单选框2</Radio>
                    </RadioGroup>
                </div>
                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>水平排列</h2>
                    <p className={classnames('subTitle')}>
                        将 direction 属性设置为 horizontal 后，单选框组会变成水平排列。
                    </p>
                    <RadioGroup
                        direction="horizontal"
                        model={this.state.parentModel2}
                        onChange={this.onChange2}
                    >
                        <Radio name="c" shape="square">
                            单选框1
                        </Radio>
                        <Radio name="d">单选框2</Radio>
                    </RadioGroup>
                </div>
                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>禁用状态</h2>
                    <p className={classnames('subTitle')}>
                        通过 disabled 属性禁止选项切换，在 Radio 上设置 disabled 可以禁用单个选项。
                    </p>
                    <RadioGroup
                        direction="horizontal"
                        model={this.state.parentModel3}
                        onChange={this.onChange3}
                    >
                        <Radio disabled name="e">
                            单选框1
                        </Radio>
                        <Radio name="f">单选框2</Radio>
                    </RadioGroup>
                </div>
                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>自定义颜色</h2>
                    <p className={classnames('subTitle')}>
                        通过 checkedColor 属性设置选中状态的图标颜色。
                    </p>
                    <RadioGroup
                        checkedColor="#ff0000"
                        direction="horizontal"
                        model={this.state.parentModel4}
                        onChange={this.onChange4}
                    >
                        <Radio name="g">单选框1</Radio>
                        <Radio name="h">单选框2</Radio>
                    </RadioGroup>
                </div>

                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>自定义图标</h2>
                    <p className={classnames('subTitle')}>
                        通过 imgUrl对象 自定义图标，其包括activeIcon（选中的图片链接）和
                        inactiveIcon（未选中的图片链接）两个属性
                    </p>
                    <RadioGroup
                        direction="horizontal"
                        model={this.state.parentModel5}
                        onChange={this.onChange5}
                    >
                        <Radio imgUrl={this.state.imgUrl} name="i">
                            单选框1
                        </Radio>
                        <Radio imgUrl={this.state.imgUrl} name="j">
                            单选框2
                        </Radio>
                    </RadioGroup>
                </div>

                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>禁用文本点击</h2>
                    <p className={classnames('subTitle')}>
                        设置 labelDisabled 属性后，点击图标以外的内容不会触发单选框切换。
                    </p>
                    <RadioGroup
                        direction="horizontal"
                        model={this.state.parentModel6}
                        onChange={this.onChange6}
                    >
                        <Radio labelDisabled name="k">
                            单选框1
                        </Radio>
                        <Radio labelDisabled name="l">
                            单选框2
                        </Radio>
                    </RadioGroup>
                </div>

                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>与 Cell 组件一起使用</h2>
                    <p className={classnames('subTitle')}>
                        此时你需要再引入 Cell 和 CellGroup 组件。
                    </p>
                    <RadioGroup
                        direction="horizontal"
                        model={this.state.parentModel7}
                        onChange={this.onChange7}
                    >
                        <CellGroup>
                            <Cell onClick={this.cellOnClick}>
                                <Radio name="k">单选框1</Radio>
                            </Cell>
                            <Cell>
                                <Radio name="l">单选框2</Radio>
                            </Cell>
                        </CellGroup>
                    </RadioGroup>
                </div>
            </>
        );
    }
}
