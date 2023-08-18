// import React from 'react';
// import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { act, cleanup, render, waitFor, screen, fireEvent } from '@testing-library/react';
import { Notify, NotifyNamespace } from '..';
import { sleep } from '../../../tests/utils';

const waitForContentShow = async (content: string) => {
  await waitFor(() => {
    screen.getByText(content);
  });
};

describe('Notify', () => {
  afterEach(async () => {
    await act(async () => {
      Notify.clear();
    });
    cleanup();
    jest.restoreAllMocks();
    document.body.innerHTML = '';
  });

  test('should not throw error if calling clear method before render notify', () => {
    expect(() => {
      Notify.clear();
    }).not.toThrow();
  });

  test('should render Notify correctly', async () => {
    const { getByText } = render(
      <button
        type="button"
        onClick={() => {
          Notify.show('content');
        }}
      >
        btn
      </button>,
    );
    fireEvent.click(getByText('btn'));
    await waitForContentShow('content');
    expect(getByText('content')).toBeInTheDocument();
  });

  test('should add "rc-notify--success" class when type is success', async () => {
    const { getByText } = render(
      <button
        type="button"
        onClick={() => {
          Notify.show({
            message: 'content success',
            type: 'success',
          });
        }}
      >
        btn
      </button>,
    );
    fireEvent.click(getByText('btn'));
    await waitForContentShow('content success');
    expect(document.querySelector('.rc-notify--success')).toBeInTheDocument();
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
    jest.useFakeTimers();
    const { getByText } = render(
      <button
        type="button"
        onClick={() => {
          Notify.show({
            message: 'test close',
            onClose,
            duration: 1,
          });
        }}
      >
        btn
      </button>,
    );
    fireEvent.click(getByText('btn'));
    await waitForContentShow('test close');
    act(() => {
      jest.runAllTimers();
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
