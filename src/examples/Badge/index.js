import React, { Component } from 'react';
import Badge from '@/components/Badge';
import classnames from 'classnames';
import styles from './index.scss';
import Icon from '@/components/Icon';

export default class BadgeComponent extends Component {
    render() {
        return (
            <>
                <div className={classnames(styles['r-doc-demo-block'])}>
                    <h2 className={classnames(styles['r-doc-demo-block__title'])}>基础用法</h2>
                    <div className={classnames(styles['badge__wrapper'])}>
                        <div className={classnames(styles['r-badge__wrapper'])}>
                            <Badge color="#ee0a24" content="99" max="10">
                                <div className={classnames(styles.child)} />
                            </Badge>
                        </div>
                        <div className={classnames(styles['r-badge__wrapper'])}>
                            <Badge color="#ee0a24" content="10">
                                <div className={classnames(styles.child)} />
                            </Badge>
                        </div>
                        <div className={classnames(styles['r-badge__wrapper'])}>
                            <Badge color="#ee0a24" content="Hot">
                                <div className={classnames(styles.child)} />
                            </Badge>
                        </div>
                        <div className={classnames(styles['r-badge__wrapper'])}>
                            <Badge color="#ee0a24" dot>
                                <div className={classnames(styles.child)} />
                            </Badge>
                        </div>
                    </div>
                </div>

                <div className={classnames(styles['r-doc-demo-block'])}>
                    <h2 className={classnames(styles['r-doc-demo-block__title'])}>
                        自定义徽标内容
                    </h2>
                    <div className={classnames(styles['r-badge__wrapper'])}>
                        <Badge>
                            <div className={classnames(styles.child)} />
                            <Icon className="badge-icon" name="success" />
                        </Badge>
                    </div>
                    <div className={classnames(styles['r-badge__wrapper'])}>
                        <Badge>
                            <div className={classnames(styles.child)} />
                            <Icon className="badge-icon" name="cross" />
                        </Badge>
                    </div>
                    <div className={classnames(styles['r-badge__wrapper'])}>
                        <Badge>
                            <div className={classnames(styles.child)} />
                            <Icon className="badge-icon" name="down" />
                        </Badge>
                    </div>
                </div>

                <div className={classnames(styles['r-doc-demo-block'])}>
                    <h2 className={classnames(styles['r-doc-demo-block__title'])}>独立展示</h2>
                    <div className={classnames(styles['r-badge__wrapper'])}>
                        <Badge content="100" max="99" />
                    </div>
                </div>
                <div className={classnames(styles['r-doc-demo-block'])}>
                    <h2 className={classnames(styles['r-doc-demo-block__title'])}>
                        offset without prop content
                    </h2>
                    <div className={classnames(styles['r-badge__wrapper'])}>
                        <Badge offset={[20, 20]} slot="Icon">
                            <div className={classnames(styles.child)} />
                            <Icon className="badge-icon" name="down" />
                        </Badge>
                    </div>
                </div>
                <div className={classnames(styles['r-doc-demo-block'])}>
                    <h2 className={classnames(styles['r-doc-demo-block__title'])}>
                        offset with prop content
                    </h2>
                    <div className={classnames(styles['r-badge__wrapper'])}>
                        <Badge content="100" offset={[-40, 0]}>
                            <div className={classnames(styles.child)} />
                        </Badge>
                    </div>
                </div>
            </>
        );
    }
}
