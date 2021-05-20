import React, { PureComponent } from 'react';
import Button from '@/components/button';
import Popup from '@/components/popup';
export default class PopupComponent extends PureComponent {
    constructor() {
        super();
        this.state = {
            show: false
        };
    }

    show = () => {
        this.setState({
            show: true
        });
    };

    close = () => {
        this.setState({
            show: false
        });
    };

    onClickCloseIcon = () => {
        this.setState({
            show: false
        });
    };

    render() {
        return (
            <div className="popup">
                <Button onClick={this.show} type="primary">
                    Show Popup
                </Button>
                <Popup
                    closeIcon={require('@/assets/images/user-active.png')}
                    closeIconPosition="top-right"
                    closeable
                    onClickCloseIcon={this.onClickCloseIcon}
                    onClose={this.close}
                    // position="center"
                    position="left"
                    round
                    safeAreaInsetBottom
                    show={this.state.show}
                    // teleport="#root"
                >
                    <h1>hello,popup!</h1>
                </Popup>
            </div>
        );
    }
}
