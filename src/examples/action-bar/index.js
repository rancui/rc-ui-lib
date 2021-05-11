import React, { PureComponent } from 'react';
import ActionBar from '@/components/action-bar';
import ActionBarButton from '@/components/action-bar-button';
import ActionBarIcon from '@/components/action-bar-icon';
import Toast from '@/components/toast';
import classnames from 'classnames';
import '../style/index.scss';

export default class ActionBarComponent extends PureComponent {
    clickBtn = () => {
        Toast.show('hello');
    };

    render() {
        return (
            <>
                <div className={classnames('r-doc-demo-block')}>
                    <h2 className={classnames('r-doc-demo-block__title')}>基础用法</h2>
                    <p className={classnames('subTitle')}>
                        可以通过 model 绑定输入框的值，通过 placeholder 设置占位提示文字。
                    </p>
                    <ActionBar>
                        <ActionBarIcon color="#ee0a24" icon="chat-o" text="客服" />
                        <ActionBarIcon badge="5" icon="cart-o" text="购物车" />
                        <ActionBarIcon color="#ff5000" icon="star" text="已收藏" />
                        <ActionBarButton
                            color="#be99ff"
                            indexPostion="first"
                            onClick={this.clickBtn}
                            text="加入购物车"
                            type="warning"
                        />
                        <ActionBarButton
                            color="#7232dd"
                            indexPostion="last"
                            text="立即购买"
                            type="danger"
                        />
                    </ActionBar>
                </div>
            </>
        );
    }
}
