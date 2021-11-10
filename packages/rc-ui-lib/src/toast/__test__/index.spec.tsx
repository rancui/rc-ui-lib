import React from 'react';
import { mount, shallow } from 'enzyme';
import { sleep } from '../../../tests/utils';
import Icon from '../../icon';
import BaseToast from '../Toast';
import Toast from '..';

describe('Toast', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should change overlay style after using overlay-style prop', async () => {
    const wrapper = mount(<BaseToast visible overlay overlayStyle={{ background: 'red' }} />);
    await sleep();
    expect(wrapper.find('.rc-overlay').getDOMNode().style.background).toEqual('red');
  });

  it('should emit close event when using closeOnClick prop and clicked', () => {
    const onClose = jest.fn();
    const wrapper = shallow(<BaseToast visible closeOnClick onClose={onClose} />);
    wrapper.find('.rc-toast').simulate('click');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('toast disappeared after duration', async () => {
    const onClose = jest.fn();
    Toast({
      duration: 10,
      onClose,
    });
    expect(onClose).toHaveBeenCalledTimes(0);
    await sleep(50);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('show loading toast', async () => {
    const wrapper = mount(<BaseToast className="loading-toast" />);
    await sleep(3000);
    expect(wrapper.find('.loading-toast').exists()).toBeTruthy();
  });

  it('should render correctly when icon prop is string', async () => {
    const wrapper = mount(<BaseToast icon="start-o" />);
    await sleep(10);
    expect(wrapper.find('.rc-icon-star-o')).toBeTruthy();
  });

  it('should render correctly when icon prop is jsx', async () => {
    const wrapper = mount(<BaseToast icon={<Icon name="shop-o" />} />);
    await sleep(10);
    expect(wrapper.find('.rc-icon-shop-o')).toBeTruthy();
  });

  it('icon-prefix prop', async () => {
    const toast = Toast({
      icon: 'star-o',
      iconPrefix: 'my-icon',
    });
    await sleep(10);
    expect(document.querySelector('.my-icon.my-icon-star-o')).toBeTruthy();
    toast.clear();
  });

  it('clear multiple toast', async () => {
    Toast.allowMultiple(true);
    Toast.info({ message: '多个提示1' });
    await sleep(20);
    Toast.info({ message: '多个提示2' });
    await sleep(20);
    expect(document.body.querySelectorAll('.toast-contanier').length).toEqual(2);
    jest.useFakeTimers();
    Toast.clear();
    jest.runAllTimers();
    expect(document.body.querySelectorAll('.toast-contanier').length).toEqual(0);
  });

  it('set default options', async () => {
    Toast.setDefaultOptions({ className: 'my-toast' });
    Toast.info({ message: '提示内容1' });
    await sleep(20);
    expect(document.querySelector('.my-toast')).toBeTruthy();
    jest.useFakeTimers();
    Toast.clear();
    jest.runAllTimers();

    Toast.resetDefaultOptions();
    Toast.info({ message: '提示内容2' });
    await sleep(20);
    expect(document.querySelector('.my-toast')).toBeFalsy();
    jest.useFakeTimers();
    Toast.clear();
    jest.runAllTimers();
  });

  it('set default options by type', async () => {
    const className = 'my-toast';
    Toast.setDefaultOptions('loading', { className });

    Toast.loading('');
    await sleep(2100);
    expect(document.querySelector('.my-toast')).toBeTruthy();

    jest.useFakeTimers();
    Toast.clear();
    jest.runAllTimers();

    Toast.success('');
    await sleep(2100);
    expect(document.querySelector('.my-toast')).toBeFalsy();

    Toast.resetDefaultOptions('loading');
    Toast.loading('');
    expect(document.querySelector('.my-toast')).toBeFalsy();
  });

  it('toast duration is zero', async () => {
    Toast.allowMultiple(true);
    const onClose = jest.fn();
    Toast({ duration: 0, onClose });

    await sleep(2100);
    expect(onClose).toHaveBeenCalledTimes(0);
    Toast.allowMultiple(false);
  });

  it('should trigger onClose callback after closed', async () => {
    Toast.allowMultiple(true);
    const onClose = jest.fn();
    const toast = Toast({ onClose });

    await sleep(2100);
    toast.clear();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should register component to teleport', async () => {
    const el = document.createElement('div');
    el.className = 'el-teleport';
    document.body.appendChild(el);
    Toast({
      message: 'hello,world',
      teleport: el,
    });
    await sleep(10);
    expect(document.querySelector('.el-teleport').querySelector('.rc-toast--info')).toBeTruthy();
  });
});
