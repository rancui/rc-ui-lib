import React, { PureComponent } from 'react';
import Overlay from '@/components/overlay';
import Button from '@/components/button';
import classnames from 'classnames';
import '../style/index.scss';
export default class OverlayComponent extends PureComponent {
    constructor() {
        super();
        this.state = {
            show: false
        };
    }

    showOverlay = () => {
        this.setState({
            show: true
        });
    };
    changeStatus = (e) => {
        this.setState({
            show: !this.state.show
        });
    };

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
