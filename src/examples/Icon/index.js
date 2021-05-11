import React, { Component } from 'react';
import classnames from 'classnames';
import Icon from '@/components/icon';
import './index.scss';

export default class IconComponent extends Component {
    render() {
        return (
            <>
                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>基础用法</h2>
                    <p className={classnames('subTitle')}>
                        Icon 的 name 属性支持传入图标名称或图片链接，所有可用的图标名称见右侧示例。
                    </p>
                    <div className={classnames('r-row')}>
                        <div className={classnames('r-col', 'r-col--6')}>
                            <Icon name="chat-o" size="30" />
                        </div>
                        <div className={classnames('r-col', 'r-col--6')}>
                            <Icon
                                badge="99"
                                color="#ff8100"
                                name={require('@/assets/images/user-active.png')}
                                size="30"
                            />
                        </div>
                    </div>
                </div>

                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>徽标提示</h2>
                    <p className={classnames('subTitle')}>
                        设置 dot 属性后，会在图标右上角展示一个小红点；设置 badge
                        属性后，会在图标右上角展示相应的徽标。
                    </p>
                    <div className={classnames('r-row')}>
                        <div className={classnames('r-col', 'r-col--6')}>
                            <Icon dot name="chat-o" size="30" />
                        </div>
                        <div className={classnames('r-col', 'r-col--6')}>
                            <Icon badge="9" name="chat-o" size="30" />
                        </div>
                        <div className={classnames('r-col', 'r-col--6')}>
                            <Icon badge="99+" name="chat-o" size="30" />
                        </div>
                    </div>
                </div>

                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>图标颜色</h2>
                    <p className={classnames('subTitle')}>Icon 的 color 属性用来设置图标的颜色。</p>
                    <div className={classnames('r-row')}>
                        <div className={classnames('r-col', 'r-col--6')}>
                            <Icon color="#1989fa" name="chat-o" size="30" />
                        </div>
                        <div className={classnames('r-col', 'r-col--6')}>
                            <Icon color="#ee0a24" name="fire-o" size="30" />
                        </div>
                    </div>
                </div>

                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>图标大小</h2>
                    <p className={classnames('subTitle')}>
                        Icon 的 size 属性用来设置图标的尺寸大小，默认单位为 px。
                    </p>
                    <div className={classnames('r-row')}>
                        <div className={classnames('r-col', 'r-col--6')}>
                            <Icon color="#1989fa" name="chat-o" size="60" />
                        </div>
                        <div className={classnames('r-col', 'r-col--6')}>
                            <Icon color="#ee0a24" name="fire-o" size="60" />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
