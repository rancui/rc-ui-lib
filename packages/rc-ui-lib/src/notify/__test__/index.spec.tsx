// import React from 'react';
// import { fireEvent, render } from '@testing-library/react';
import { Notify, NotifyNamespace } from '..';
import { sleep } from '../../../tests/utils';

describe('Notify', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should not throw error if calling clear method before render notify', () => {
    Notify.clear();
  });

  test('should render Notify correctly', async () => {
    Notify.show('test');
    await sleep(10);
    expect(document.querySelector('.rc-notify')).toMatchSnapshot();
  });

  test('should add "rc-notify--success" class when type is success', async () => {
    Notify.show({
      message: 'test',
      type: 'success',
    });

    await sleep(0);
    const notify = document.querySelector('.rc-notify');
    expect(notify.classList.contains('rc-notify--success')).toBeTruthy();
  });

  test('should change default duration after calling setDefaultOptions method', () => {
    Notify.setDefaultOptions({ duration: 1000 });
    expect(NotifyNamespace.currentOptions.duration).toEqual(1000);
    Notify.resetDefaultOptions();
    expect(NotifyNamespace.currentOptions.duration).toEqual(3000);
  });

  test('should reset to default duration after calling resetDefaultOptions method', () => {
    Notify.setDefaultOptions({ duration: 1000 });
    Notify.resetDefaultOptions();
    expect(NotifyNamespace.currentOptions.duration).toEqual(3000);
  });

  test('should call onClose option when closing', async () => {
    const onClose = jest.fn();
    Notify.show({
      message: 'test',
      onClose,
      duration: 1,
    });

    await sleep(20);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
