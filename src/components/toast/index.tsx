import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import { isDef, getMountContanier, ContanierType } from '../../utils';
import { ToastProps } from './props';
import Icon from '../icon';
import Loading from '../loading';
import Popup from '../popup';
import './style/index.scss';

const isToastProps = (content: ToastProps): content is ToastProps => {
  return !!content && typeof content === 'object';
};
const parseObject = (message: any) => {
  return typeof message === 'string' ? { message } : message;
};
export default class Toast extends PureComponent<ToastProps, unknown> {
  private static baseClass = 'r-toast';

  static defaultOptions = {
    icon: '',
    type: 'text',
    message: '',
    className: '',
    overlay: false,
    onClose: undefined,
    onOpened: undefined,
    duration: 2000,
    // teleport: '#root',
    iconSize: undefined,
    iconPrefix: 'r-icon',
    position: 'center',
    forbidClick: false,
    loadingType: undefined,
    overlayClass: '',
    overlayStyle: undefined,
    closeOnClick: false,
    closeOnClickOverlay: false,
  };

  private static toastDom: HTMLDivElement | null;

  private static toastContainer: HTMLElement;

  state = {
    show: this.props.show,
  };

  static hideHelper: () => void;

  private timer = 0;

  static show = (options: ToastProps) => {
    Toast.unmountNode();
    if (!Toast.toastDom) {
      Toast.toastDom = document.createElement('div');
      if (isToastProps(options)) {
        Toast.toastDom.classList.add('r-toast-contanier');
      }

      if (options.className) {
        Toast.toastDom.classList.add(options.className as string);
      }

      const teleport =
        isToastProps(options) && typeof options.teleport === 'string'
          ? (document.querySelector(options.teleport as string) as ContanierType)
          : options.teleport;

      Toast.toastContainer = teleport
        ? getMountContanier(teleport as ContanierType)
        : getMountContanier();

      Toast.toastContainer.appendChild(Toast.toastDom);
    }

    if (Toast.toastDom) {
      if (typeof options === 'string') {
        {
          options;
        }
      }
      const props: ToastProps = Object.assign(Toast.defaultOptions, parseObject(options), {
        show: true,
      });

      Toast.hideHelper = () => {
        ReactDOM.render(<Toast {...props} show={false} />, Toast.toastDom);
      };

      // eslint-disable-next-line react/no-render-return-value
      return ReactDOM.render(<Toast {...props} />, Toast.toastDom);
    }
  };

  static close = () => {
    if (Toast.toastDom) {
      Toast.hideHelper();
    }
  };

  private static unmountNode = () => {
    const { toastDom, toastContainer } = Toast;
    if (toastDom) {
      toastContainer.removeChild(toastDom);
      Toast.toastDom = null;
    }
  };

  renderIcon = () => {
    const { icon, type, iconPrefix, loadingType } = this.props;
    const hasIcon = icon || type === 'success' || type === 'fail';
    if (hasIcon) {
      return (
        <Icon
          name={icon || type}
          classPrefix={iconPrefix}
          className={classnames(`${Toast.baseClass}__icon`)}
        />
      );
    }
    if (type === 'loading') {
      return <Loading type={loadingType} className={classnames(`${Toast.baseClass}__loading`)} />;
    }
    return null;
  };

  renderMessage = () => {
    const { message, type } = this.props;
    if (isDef(message) && message !== '') {
      return type === 'html' ? (
        <div
          className={classnames(`${Toast.baseClass}__html`)}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      ) : (
        <div className={classnames(`${Toast.baseClass}__text`)}>{message}</div>
      );
    }
    return null;
  };

  handleOpened = () => {
    const { onOpened } = this.props;
    onOpened?.();
  };

  handleColse = () => {
    const { onClose } = this.props;
    if (Toast.toastDom) {
      Toast.toastContainer.removeChild(Toast.toastDom);
      Toast.toastDom = null;
    }
    onClose?.();
  };

  _hide = () => {
    this.setState({
      show: false,
    });
  };

  shutdown = () => {
    const { duration } = this.props;
    if ((duration as number) > 0) {
      this.timer = window.setTimeout(() => {
        this._hide();
        clearTimeout(this.timer);
      }, duration as number);
    }
  };

  componentDidMount() {
    this.shutdown();
  }

  componentDidUpdate(prevProps: ToastProps) {
    const { show } = this.props;
    if (prevProps.show !== show) {
      if (show === true) {
        this.setState({
          show: true,
        });
        this.shutdown();
      } else {
        clearTimeout(this.timer);
        this.shutdown();
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    const { icon, type, position, duration, overlay, ...rest } = this.props;
    const { show } = this.state;
    const positionCls = classnames(Toast.baseClass, `${Toast.baseClass}--${position}`, {
      [`${Toast.baseClass}--text`]: type === 'text' || type === 'html',
      [`${Toast.baseClass}--${type}`]: !icon,
    });
    return (
      <Popup
        position="center"
        duration={duration}
        overlay={overlay}
        onOpened={this.handleOpened}
        onClose={this.handleColse}
        {...rest}
        className={positionCls}
        show={show}
      >
        {this.renderIcon()}
        {this.renderMessage()}
      </Popup>
    );
  }
}
