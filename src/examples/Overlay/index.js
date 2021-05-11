import React, { Component } from 'react';
import Overlay from '@/components/overlay';
import Button from '@/components/button';
import classnames from 'classnames';
import './index.scss';

export default class OverlayComponent extends Component {
    constructor() {
        super();
        this.state = {
            show: false
        };
        this.showOverlay = this.showOverlay.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
    }

    showOverlay() {
        this.setState({
            show: true
        });
    }
    changeStatus(e) {
        this.setState({
            show: !this.state.show
        });
    }

    render() {
        return (
            <div style={{ position: 'relative', margin: '20px' }}>
                <div className="overlay">
                    <Button onClick={this.showOverlay} type="primary">
                        Click Me
                    </Button>
                    <Overlay onClick={this.changeStatus} show={this.state.show}>
                        <div className={classnames('overlayWrapper')}>
                            <div style={{ width: '200px', height: '200px', background: '#fff' }}>
                                hello,world!
                            </div>
                        </div>
                    </Overlay>
                </div>
            </div>
        );
    }
}
