import React, { Component } from 'react';
import Loading from '@/components/Loading';
import classnames from 'classnames';
import styles from './index.scss';

export default class LoadingComponent extends Component {
    render() {
        return (
            <>
                <div className={classnames(styles['r-doc-demo-block'])}>
                    <h2 className={classnames(styles['r-doc-demo-block__title'])}>基础用法</h2>
                    <p className={classnames(styles.subTitle)}>
                        通过 type 属性可以设置加载图标的类型，默认为 circular，可选值为 spinner。
                    </p>
                    <div className={classnames(styles.inlineBlock)}>
                        <Loading />
                    </div>
                    <div className={classnames(styles.inlineBlock)}>
                        <Loading type="spinner" />
                    </div>
                </div>
                <div className={classnames(styles['r-doc-demo-block'])}>
                    <h2 className={classnames(styles['r-doc-demo-block__title'])}>自定义颜色</h2>
                    <p className={classnames(styles.subTitle)}>
                        通过 color 属性设置加载图标的颜色。
                    </p>
                    <div className={classnames(styles.inlineBlock)}>
                        <Loading color="#1989fa" />
                    </div>
                    <div className={classnames(styles.inlineBlock)}>
                        <Loading color="#1989fa" type="spinner" />
                    </div>
                </div>
                <div className={classnames(styles['r-doc-demo-block'])}>
                    <h2 className={classnames(styles['r-doc-demo-block__title'])}>自定义大小</h2>
                    <p className={classnames(styles.subTitle)}>
                        通过 size 属性设置加载图标的大小，默认单位为 px。
                    </p>
                    <div className={classnames(styles.inlineBlock)}>
                        <Loading size="24" />
                    </div>
                    <div className={classnames(styles.inlineBlock)}>
                        <Loading size="24" type="spinner" />
                    </div>
                </div>
                <div className={classnames(styles['r-doc-demo-block'])}>
                    <h2 className={classnames(styles['r-doc-demo-block__title'])}>加载文案</h2>
                    <p className={classnames(styles.subTitle)}>通过 text 属性设置加载文案。</p>
                    <div className={classnames(styles.inlineBlock)}>
                        <Loading color="#1989fa" size="24" text="加载中..." />
                    </div>
                    <div className={classnames(styles.inlineBlock)}>
                        <Loading size="24" text="加载中..." type="spinner" />
                    </div>
                </div>
                <div className={classnames(styles['r-doc-demo-block'])}>
                    <h2 className={classnames(styles['r-doc-demo-block__title'])}>垂直排列</h2>
                    <p className={classnames(styles.subTitle)}>
                        设置 vertical 属性后，图标和文案会垂直排列
                    </p>
                    <div className={classnames(styles.inlineBlock)}>
                        <Loading size="24" text="加载中..." vertical />
                    </div>
                    <div className={classnames(styles.inlineBlock)}>
                        <Loading size="24" text="加载中..." type="spinner" vertical />
                    </div>
                </div>
                <div className={classnames(styles['r-doc-demo-block'])}>
                    <h2 className={classnames(styles['r-doc-demo-block__title'])}>
                        自定义文案颜色
                    </h2>
                    <p className={classnames(styles.subTitle)}>
                        通过 color 或者 textColor 属性设置加载文案的颜色。
                    </p>
                    <div className={classnames(styles.inlineBlock)}>
                        <Loading color="#1989fa" size="24" text="加载中..." vertical />
                    </div>
                    <div className={classnames(styles.inlineBlock)}>
                        <Loading
                            size="24"
                            text="加载中..."
                            textColor="#0094ff"
                            type="spinner"
                            vertical
                        />
                    </div>
                </div>
            </>
        );
    }
}
