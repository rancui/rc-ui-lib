import React, { PureComponent } from 'react';
import Badge from '@/components/badge';
import classnames from 'classnames';
import Icon from '@/components/icon';
import '../style/index.scss';
export default class BadgeComponent extends PureComponent {
    render() {
        return (
            <>
                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>基础用法</h2>
                    <div className={classnames('badge__wrapper')}>
                        <div className={classnames('r-badge__wrapper-outer')}>
                            <Badge color="#ee0a24" content="99" max="10">
                                <div className={classnames('child')} />
                            </Badge>
                        </div>
                        <div className={classnames('r-badge__wrapper-outer')}>
                            <Badge color="#ee0a24" content="10">
                                <div className={classnames('child')} />
                            </Badge>
                        </div>
                        <div className={classnames('r-badge__wrapper-outer')}>
                            <Badge color="#ee0a24" content="Hot">
                                <div className={classnames('child')} />
                            </Badge>
                        </div>
                        <div className={classnames('r-badge__wrapper-outer')}>
                            <Badge color="#ee0a24" dot>
                                <div className={classnames('child')} />
                            </Badge>
                        </div>
                    </div>
                </div>

                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>自定义徽标内容</h2>
                    <div className={classnames('r-badge__wrapper-outer')}>
                        <Badge>
                            <div className={classnames('child')} />
                            <Icon className="badge-icon" name="success" />
                        </Badge>
                    </div>
                    <div className={classnames('r-badge__wrapper-outer')}>
                        <Badge>
                            <div className={classnames('child')} />
                            <Icon className="badge-icon" name="cross" />
                        </Badge>
                    </div>
                    <div className={classnames('r-badge__wrapper-outer')}>
                        <Badge>
                            <div className={classnames('child')} />
                            <Icon className="badge-icon" name="down" />
                        </Badge>
                    </div>
                </div>

                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title ')}>独立展示</h2>
                    <div className={classnames('r-badge__wrapper-outer')}>
                        <Badge content="100" max="99" />
                    </div>
                </div>
                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title ')}>
                        offset without prop content
                    </h2>
                    <div className={classnames('r-badge__wrapper-outer')}>
                        <Badge offset={[20, 20]} slot="Icon">
                            <div className={classnames('child')} />
                            <Icon className="badge-icon" name="down" />
                        </Badge>
                    </div>
                </div>
                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title ')}>
                        offset with prop content
                    </h2>
                    <div className={classnames('r-badge__wrapper-outer')}>
                        <Badge content="100" offset={[-40, 0]}>
                            <div className={classnames('child')} />
                        </Badge>
                    </div>
                </div>
            </>
        );
    }
}
