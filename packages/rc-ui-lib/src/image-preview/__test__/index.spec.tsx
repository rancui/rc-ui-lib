/* eslint-disable no-continue */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-restricted-syntax */
import * as React from 'react';
import { render, cleanup, fireEvent, createEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TestsEvent, { patchCreateEvent } from '../../../tests/events';
import ImagePreview from '..';
import ImagePreviewItem from '../ImagePreviewItem';
import { sleep } from '../../../tests/utils';

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
];

afterAll(cleanup);
patchCreateEvent(createEvent);

describe('ImagePreview', () => {
  const mockOffset = (c: Element) => {
    Object.defineProperty(c, 'offsetHeight', {
      configurable: true,
      get: () => 100,
    });
    Object.defineProperty(c, 'offsetWidth', {
      configurable: true,
      get: () => 100,
    });
  };

  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('basic usage', async () => {
    // const instance = ImagePreview.open({ images });
    const { container } = render(<ImagePreview images={images} />);
    expect(container).toMatchSnapshot();
  });

  it('designate start position', async () => {
    // const instance = ImagePreview.open({ images, startPosition: 2 });
    const { container } = render(<ImagePreview images={images} startPosition={2} />);
    expect(container).toMatchSnapshot();
  });

  it('show close icon', async () => {
    // const instance = ImagePreview.open({ images, startPosition: 2, closeable: true });
    const { container } = render(<ImagePreview images={images} startPosition={2} closeable />);
    expect(container).toMatchSnapshot();
  });

  it('emit close event', async () => {
    const onClose = jest.fn();
    const { container } = render(
      <ImagePreview images={images} startPosition={2} closeable onClose={onClose} visible />,
    );
    const close = document.querySelector('i.rc-image-preview__close-icon');
    await fireEvent.click(close);
    expect(onClose).toHaveBeenCalled();
  });

  it('show indicators', async () => {
    // const instance = ImagePreview.open({ images, showIndicators: true, showIndex: false });
    const { container } = render(<ImagePreview images={images} showIndicators showIndex={false} />);
    expect(container).toMatchSnapshot();
  });

  it('emit swipe event', async () => {
    const onChange = jest.fn();
    const { container } = render(
      <ImagePreview images={images} visible autoplay onChange={onChange} />,
    );
    await sleep(100);
    // const swipe = document.querySelector('.rc-swiper');

    const track = document.querySelector('.rc-swiper__track');
    mockOffset(track);
    await TestsEvent.triggerDrag(track, [-100, 0]);

    expect(onChange).toHaveBeenCalled();
  });

  // it('maxZoom', async () => {
  //   const { container } = render(<ImagePreview images={images} visible maxZoom={2} />);
  //   expect(container).toMatchSnapshot();
  // });

  it('emit close event', async () => {
    const onClose = jest.fn();
    render(<ImagePreview images={images} visible onClose={onClose} />);
    const item = document.querySelector('.rc-image__img');
    await fireEvent.click(item);
    expect(onClose).toHaveBeenCalled();
  });

  // it('emit onZoomChange event when zoom is not 1', async () => {
  //   const { container } = render(<ImagePreview images={images} visible />);
  //   container.querySelector('ImagePreviewItem').invoke('onZoomChange')(2);
  //   expect(container).toMatchSnapshot();
  // });

  // it('emit onZoomChange event when zoom is 1', async () => {
  //   const { container } = render(<ImagePreview images={images} visible />);
  //   container.querySelector('ImagePreviewItem').invoke('onZoomChange')(1);
  //   expect(container).toMatchSnapshot();
  // });

  it('basic ImagePreviewItem usage', async () => {
    const onTap = jest.fn();
    const { container } = render(
      <div>
        <ImagePreviewItem maxZoom={2} image={images[0]} onTap={onTap} />
      </div>,
    );
    const image = container.querySelector('.rc-image');
    await fireEvent.click(image);
    expect(onTap).toHaveBeenCalled();
  });
});

describe('ImagePreviewItem', () => {
  it('test onDrag', async () => {
    const { queryAllByTestId } = render(<ImagePreview images={images} visible />);
    const item = queryAllByTestId('control')[0];

    fireEvent.mouseDown(item, {
      pointerId: 2,
      clientX: 20,
      clientY: 20,
      buttons: 1,
      timeStamp: new Date().getTime(),
      cancelable: true,
    });
    fireEvent.mouseMove(item, {
      pointerId: 2,
      clientX: 22,
      clientY: 22,
      buttons: 1,
      timeStamp: new Date().getTime(),
      cancelable: true,
    });

    fireEvent.mouseUp(item);
  });

  it('test onPinch when maxZoom is 1', async () => {
    const { queryAllByTestId, debug } = render(
      <ImagePreview images={images} maxZoom={1} visible />,
    );
    const item = queryAllByTestId('control')[0];
    fireEvent.pointerDown(item, {
      pointerId: 2,
      clientX: 20,
      clientY: 20,
      buttons: 1,
      timeStamp: new Date().getTime(),
      cancelable: true,
    });
    const event = createEvent.pointerDown(item, {
      pointerId: 3,
      clientX: 22,
      clientY: 22,
      buttons: 1,
      timeStamp: new Date().getTime(),
      cancelable: true,
    });

    fireEvent(item, event);

    const eventMove = createEvent.pointerMove(item, {
      pointerId: 3,
      clientX: 40,
      clientY: 32,
      buttons: 1,
      timeStamp: new Date().getTime(),
      cancelable: true,
    });
    fireEvent(item, eventMove);
    fireEvent.pointerUp(item, { pointerId: 3, buttons: 0, timeStamp: new Date().getTime() });
  });

  it('test onPinch when maxZoom is 3', async () => {
    const { queryAllByTestId, debug } = render(
      <ImagePreview images={images} maxZoom={3} visible />,
    );
    const item = queryAllByTestId('control')[0];
    fireEvent.pointerDown(item, {
      pointerId: 2,
      clientX: 20,
      clientY: 20,
      buttons: 1,
      timeStamp: new Date().getTime(),
      cancelable: true,
    });
    const event = createEvent.pointerDown(item, {
      pointerId: 3,
      clientX: 22,
      clientY: 22,
      buttons: 1,
      timeStamp: new Date().getTime(),
      cancelable: true,
    });

    fireEvent(item, event);

    const eventMove = createEvent.pointerMove(item, {
      pointerId: 3,
      clientX: 40,
      clientY: 42,
      buttons: 1,
      timeStamp: new Date().getTime(),
      cancelable: true,
      scale: 2,
    });
    fireEvent(item, eventMove);
    fireEvent.pointerUp(item, { pointerId: 3, buttons: 0, timeStamp: new Date().getTime() });
  });
});
