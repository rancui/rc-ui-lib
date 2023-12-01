import React from 'react';
import { render, fireEvent, cleanup, waitFor, screen, act } from '@testing-library/react';
import { sleep } from '../../../tests/utils';
import Icon from '../../icon';
import BaseToast from '../Toast';
import Toast from '..';

const waitForContentShow = async (content: string) => {
  await waitFor(() => {
    screen.getByText(content);
  });
};

describe('Toast', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(async () => {
    await act(async () => {
      Toast.clear();
    });
    cleanup();
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('toast disappeared after duration', async () => {
    const onClose = jest.fn();
    const { getByText } = render(
      <button
        type="button"
        onClick={() => {
          Toast({
            duration: 1,
            message: 'test close',
            onClose,
          });
        }}
      >
        btn
      </button>,
    );
    fireEvent.click(getByText('btn'));
    expect(onClose).toHaveBeenCalledTimes(0);
    await waitForContentShow('test close');
    act(() => {
      jest.runAllTimers();
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should change overlay style after using overlay-style prop', async () => {
    render(<BaseToast visible overlay overlayStyle={{ background: 'red' }} />);
    act(() => {
      jest.runAllTimers();
    });
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
    act(() => {
      jest.runAllTimers();
    });
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
    const { getByText } = render(
      <button
        type="button"
        onClick={() => {
          Toast({
            icon: 'star-o',
            iconPrefix: 'my-icon',
            message: 'content',
          });
        }}
      >
        btn
      </button>,
    );
    fireEvent.click(getByText('btn'));
    await waitForContentShow('content');

    expect(document.querySelector('.my-icon.my-icon-star-o')).toBeInTheDocument();
  });

  it('clear multiple toast', async () => {
    jest.useFakeTimers();
    Toast.allowMultiple(true);
    const { getByText } = render(
      <div>
        <button
          type="button"
          onClick={() => {
            Toast.info({ message: '多个提示1' });
          }}
        >
          btn1
        </button>
        <button
          type="button"
          onClick={() => {
            Toast.info({ message: '多个提示2' });
          }}
        >
          btn2
        </button>
        <button
          type="button"
          onClick={() => {
            Toast.clear();
          }}
        >
          btn3
        </button>
      </div>,
    );
    await act(async () => {
      await fireEvent.click(getByText('btn1'));
    });
    await waitForContentShow('多个提示1');
    await act(async () => {
      await fireEvent.click(getByText('btn2'));
    });
    await waitForContentShow('多个提示2');

    expect(document.querySelector('.toast-contanier')).toBeInTheDocument();
    await act(async () => {
      await fireEvent.click(getByText('btn3'));
      jest.runAllTimers();
    });
    expect(document.querySelector('.toast-contanier')).not.toBeInTheDocument();
  });

  it('set default options', async () => {
    jest.useFakeTimers();
    Toast.setDefaultOptions({ className: 'my-toast' });

    const { getByText } = render(
      <div>
        <button
          type="button"
          onClick={() => {
            Toast.info({
              message: 'content1',
            });
          }}
        >
          btn1
        </button>
        <button
          type="button"
          onClick={() => {
            Toast.info({
              message: 'content2',
            });
          }}
        >
          btn2
        </button>
        <button
          type="button"
          onClick={() => {
            Toast.clear();
          }}
        >
          btn3
        </button>
      </div>,
    );
    await act(async () => {
      await fireEvent.click(getByText('btn1'));
    });
    await waitForContentShow('content1');
    expect(document.querySelector('.my-toast')).toBeInTheDocument();
    await act(async () => {
      await fireEvent.click(getByText('btn3'));
      jest.runAllTimers();
    });
    jest.useRealTimers();

    Toast.resetDefaultOptions();

    await act(async () => {
      await fireEvent.click(getByText('btn2'));
    });

    await waitForContentShow('content2');
    await waitFor(() => {
      expect(document.querySelector('.my-toast')).not.toBeInTheDocument();
    });
  });

  it('set default options by type', async () => {
    const className = 'my-toast';
    Toast.setDefaultOptions('loading', { className });

    jest.useFakeTimers();
    const { getByText } = render(
      <div>
        <button
          type="button"
          onClick={() => {
            Toast.loading({
              message: 'loading',
            });
          }}
        >
          btn
        </button>
        <button
          type="button"
          onClick={() => {
            Toast.success({
              message: 'success',
            });
          }}
        >
          btn2
        </button>
        <button
          type="button"
          onClick={() => {
            Toast.clear();
          }}
        >
          btn3
        </button>
      </div>,
    );

    fireEvent.click(getByText('btn'));
    await waitForContentShow('loading');

    expect(document.querySelector('.my-toast')).toBeInTheDocument();

    await act(async () => {
      await fireEvent.click(getByText('btn3'));
      jest.runAllTimers();
    });

    jest.useRealTimers();
    Toast.resetDefaultOptions('loading');

    fireEvent.click(getByText('btn2'));
    await waitForContentShow('success');

    expect(document.querySelector('.my-toast')).not.toBeInTheDocument();
  });

  it('toast duration is zero', async () => {
    Toast.allowMultiple(true);

    const onClose = jest.fn();
    const { getByText } = render(
      <button
        type="button"
        onClick={() => {
          Toast({ duration: 0, onClose, message: 'test zero' });
        }}
      >
        btn
      </button>,
    );
    fireEvent.click(getByText('btn'));
    expect(onClose).toHaveBeenCalledTimes(0);
    await waitForContentShow('test zero');
    await sleep(100);
    expect(onClose).toHaveBeenCalledTimes(0);
    Toast.allowMultiple(false);
  });

  it('should register component to teleport', async () => {
    const el = document.createElement('div');
    el.className = 'el-teleport';
    document.body.appendChild(el);

    const { getByText } = render(
      <button
        type="button"
        onClick={() => {
          Toast({
            message: 'hello,world',
            teleport: el,
          });
        }}
      >
        btn
      </button>,
    );
    fireEvent.click(getByText('btn'));
    await waitForContentShow('hello,world');

    expect(document.querySelector('.el-teleport').querySelector('.rc-toast--info')).toBeTruthy();
  });
});
