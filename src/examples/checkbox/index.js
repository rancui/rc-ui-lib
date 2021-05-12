import React, { Component } from 'react';
import classnames from 'classnames';
import CheckboxGroup from '@/components/checkbox-group';
import Checkbox from '@/components/checkbox';
import Cell from '@/components/cell';
import CellGroup from '@/components/cell-group';
import '../style/index.scss';

export default class CheckboxComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: true,
            unchecked: false,
            imgUrl: {
                activeIcon: require('../../assets/images/user-active.png'),
                inactiveIcon: require('../../assets/images/user-inactive.png')
            },
            groupModel: [],
            groupModel2: [],
            groupModel3: [],
            groupModel4: [],
            list: ['a', 'b']
        };

        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.checkboxChange = this.checkboxChange.bind(this);
    }

    checkboxChange(arg) {
        console.log('Checkbox的model值为：', arg);
    }
    onChange(arg) {
        console.log('CheckboxGroup的model值为：', arg);
        // To do something you want.
    }
    onClick(e) {
        console.log('checkbox is clicked', e);
        // To do something you want.
    }

    render() {
        return (
            <>
                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>基础用法</h2>
                    <p className={classnames('subTitle')}>通过 model 绑定复选框的勾选状态。</p>
                    <Checkbox model={this.state.checked}>复选框</Checkbox>

                    <div className={classnames('r-doc-demo-block')}>
                        <h2 className={classnames('r-doc-demo-block__title')}>禁用状态</h2>
                        <p className={classnames('subTitle')}>
                            通过设置 disabled 属性可以禁用复选框。
                        </p>
                        <Checkbox disabled key="a" model={this.state.unchecked}>
                            复选框
                        </Checkbox>
                        <Checkbox disabled key="b" model={this.state.checked}>
                            复选框
                        </Checkbox>
                    </div>
                </div>
                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>自定义形状</h2>
                    <p className={classnames('subTitle')}>
                        将 shape 属性设置为 square，复选框的形状会变成方形。
                    </p>
                    <Checkbox model={this.state.checked} shape="square">
                        复选框
                    </Checkbox>
                </div>
                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>自定义颜色</h2>
                    <p className={classnames('subTitle')}>
                        通过 checkedColor 属性设置选中状态的图标颜色。
                    </p>
                    <Checkbox checkedColor="#ee0a24" model={this.state.checked}>
                        复选框
                    </Checkbox>
                </div>
                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>自定义大小</h2>
                    <p className={classnames('subTitle')}>
                        通过 icon-size 属性可以自定义图标的大小。
                    </p>
                    <Checkbox iconSize="24px" model={this.state.checked}>
                        复选框
                    </Checkbox>
                </div>
                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>自定义图标</h2>
                    <p className={classnames('subTitle')}>
                        通过 imgUrl对象 自定义图标，其包括activeIcon（选中的图片链接）和
                        inactiveIcon（未选中的图片链接）两个属性
                    </p>
                    <Checkbox imgUrl={this.state.imgUrl} model={this.state.checked}>
                        复选框
                    </Checkbox>
                </div>
                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>禁用文本点击</h2>
                    <p className={classnames('subTitle')}>
                        设置 labelDisabled 属性后，点击图标以外的内容不会触发复选框切换。
                    </p>
                    <Checkbox labelDisabled model={this.state.checked}>
                        复选框
                    </Checkbox>
                </div>
                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>复选框组</h2>
                    <p className={classnames('subTitle')}>
                        复选框可以与复选框组一起使用，复选框组通过 model 数组绑定复选框的勾选状态。
                    </p>
                    <CheckboxGroup max="2" model={this.state.groupModel} onChange={this.onChange}>
                        <Checkbox key="a" name="a" onClick={this.onClick} shape="square">
                            复选框 A
                        </Checkbox>
                        <Checkbox key="b" name="b" onClick={this.onClick} shape="square">
                            复选框 B
                        </Checkbox>
                    </CheckboxGroup>
                </div>
                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>水平排列</h2>
                    <p className={classnames('subTitle')}>
                        将 direction 属性设置为 horizontal 后，复选框组会变成水平排列。
                    </p>
                    <CheckboxGroup
                        direction="horizontal"
                        model={this.state.groupModel2}
                        onChange={this.onChange}
                    >
                        <Checkbox key="c" name="c" onChange={this.checkboxChange} shape="square">
                            复选框 A
                        </Checkbox>
                        <Checkbox key="d" name="d" onChange={this.checkboxChange} shape="square">
                            复选框 B
                        </Checkbox>
                        <Checkbox key="e" name="e" onChange={this.checkboxChange} shape="square">
                            复选框 C
                        </Checkbox>
                    </CheckboxGroup>
                </div>
                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>限制最大可选数</h2>
                    <p className={classnames('subTitle')}>
                        通过 max 属性可以限制复选框组的最大可选数。
                    </p>
                    <CheckboxGroup
                        direction="horizontal"
                        max="2"
                        model={this.state.groupModel3}
                        onChange={this.onChange}
                    >
                        <Checkbox key="a" name="a" onClick={this.onClick} shape="square">
                            复选框 A
                        </Checkbox>
                        <Checkbox key="b" name="b" onClick={this.onClick} shape="square">
                            复选框 B
                        </Checkbox>
                        <Checkbox key="c" name="c" onClick={this.onClick} shape="square">
                            复选框 C
                        </Checkbox>
                    </CheckboxGroup>
                </div>
                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>限制最大可选数</h2>
                    <p className={classnames('subTitle')}>
                        通过 max 属性可以限制复选框组的最大可选数。
                    </p>
                    <CheckboxGroup
                        direction="horizontal"
                        model={this.state.groupModel4}
                        onChange={this.onChange}
                    >
                        <CellGroup>
                            {this.state.list.map((item) => {
                                return (
                                    <Cell clickable key={item} title={'复选框' + item}>
                                        <Checkbox name={item} />
                                    </Cell>
                                );
                            })}
                        </CellGroup>
                    </CheckboxGroup>
                </div>
            </>
        );
    }
}
