import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { sleep } from '../../../tests/utils';
import Icon from '../../icon';
import BaseToast from '../Toast';
import Toast from '..';

describe('Toast', () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('toast disappeared after duration', async () => {
    const handleClose = jest.fn();
    Toast({
      duration: 10,
      onClose: handleClose,
    });

    expect(handleClose).toHaveBeenCalledTimes(0);
    await sleep(50);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should change overlay style after using overlay-style prop', async () => {
    render(<BaseToast visible overlay overlayStyle={{ background: 'red' }} />);
    await sleep();
    expect(getComputedStyle(document.querySelector('.rc-overlay')).background).toEqual('red');
  });

  it('should emit close event when using closeOnClick prop and clicked', async () => {
    Toast.clear();
    const onClose = jest.fn();
    render(<BaseToast visible closeOnClick onClose={onClose} className="test-toast" />);
    await fireEvent.click(document.querySelector('.test-toast'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('show loading toast', async () => {
    render(<BaseToast visible className="loading-toast" />);
    await sleep(10);
    expect(document.querySelector('.loading-toast')).toBeTruthy();
  });

  it('should render correctly when icon prop is string', async () => {
    render(<BaseToast visible icon="start-o" />);
    await sleep(10);
    expect(document.querySelector('.van-icon-start-o')).toBeTruthy();
  });

  it('should render correctly when icon prop is jsx', async () => {
    render(<BaseToast visible icon={<Icon name="shop-o" />} />);
    await sleep(10);
    expect(document.querySelector('.van-icon-shop-o')).toBeTruthy();
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

  it('should trigger onClosed callback after closed', async () => {
    const toast = Toast({ forbidClick: true });
    await sleep();
    toast.clear();
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
