import React, { Component } from 'react';
import classnames from 'classnames';
import Cell from '@/components/cell';
import CellGroup from '@/components/cell-group';
import '../style/index.scss';

export default class CellComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>基础用法</h2>
                    <CellGroup>
                        <Cell title="单元格" value="内容" />
                        <Cell label="描述信息" title="单元格" value="内容" />
                    </CellGroup>
                </div>

                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>展示图标</h2>
                    <Cell icon="location-o" title="单元格" />
                </div>

                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>单元格大小</h2>
                    <p className={classnames('subTitle')}>通过 size 属性可以控制单元格的大小。</p>
                    <CellGroup>
                        <Cell title="单元格" value="内容" />
                        <Cell label="描述信息" title="单元格" value="内容" />
                    </CellGroup>
                </div>

                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>只设置 value</h2>
                    <p className={classnames('subTitle')}>只设置 value 时，内容会靠左对齐。</p>
                    <Cell value="内容" />
                </div>

                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>垂直居中</h2>
                    <Cell
                        center
                        icon="location-o"
                        label="描述信息"
                        size="large"
                        title="单元格"
                        value="内容"
                    />
                </div>

                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>展示箭头</h2>
                    <p className={classnames('subTitle')}>
                        通过 CellGroup 的 title 属性可以指定分组标题。
                    </p>
                    <CellGroup title="分组1">
                        <Cell title="单元格" value="内容" />
                    </CellGroup>
                    <CellGroup title="分组2">
                        <Cell title="单元格" value="内容" />
                    </CellGroup>
                    <CellGroup title="分组3">
                        <Cell title="单元格" value="内容" />
                    </CellGroup>
                </div>

                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>分组标题</h2>
                    <p className={classnames('subTitle')}>
                        设置 is-link 属性后会在单元格右侧显示箭头，并且可以通过 arrow-direction
                        属性控制箭头方向。
                    </p>
                    <Cell isLink title="单元格" />
                    <Cell isLink title="单元格" value="内容" />
                    <Cell arrowDirection="up" isLink title="单元格" value="内容" />
                </div>
            </>
        );
    }
}
