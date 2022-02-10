/* eslint-disable no-continue */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-restricted-syntax */
import * as React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { render, cleanup, fireEvent, createEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { patchCreateEvent } from '../../../tests/events';
import ImagePreview from '..';
import ImagePreviewItem from '../ImagePreviewItem';

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
];

afterAll(cleanup);
patchCreateEvent(createEvent);

describe('ImagePreview', () => {
  let wrapper;
  afterEach(() => {
    wrapper.unmount();
    jest.restoreAllMocks();
  });

  it('basic usage', async () => {
    // const instance = ImagePreview.open({ images });
    wrapper = mount(<ImagePreview images={images} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('designate start position', async () => {
    // const instance = ImagePreview.open({ images, startPosition: 2 });
    wrapper = mount(<ImagePreview images={images} startPosition={2} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('show close icon', async () => {
    // const instance = ImagePreview.open({ images, startPosition: 2, closeable: true });
    wrapper = mount(<ImagePreview images={images} startPosition={2} closeable />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('emit close event', async () => {
    const onClose = jest.fn();
    wrapper = mount(
      <ImagePreview images={images} startPosition={2} closeable onClose={onClose} visible />,
    );
    await wrapper.find('i.rc-image-preview__close-icon').simulate('click');
    expect(onClose).toHaveBeenCalled();
  });

  it('show indicators', async () => {
    // const instance = ImagePreview.open({ images, showIndicators: true, showIndex: false });
    wrapper = mount(<ImagePreview images={images} showIndicators showIndex={false} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('emit swipe event', async () => {
    const onChange = jest.fn();
    wrapper = mount(<ImagePreview images={images} visible autoplay={false} onChange={onChange} />);
    wrapper.find('Swiper').invoke('onIndexChange')(1);
    expect(onChange).toHaveBeenCalled();
  });

  // it('maxZoom', async () => {
  //   wrapper = mount(<ImagePreview images={images} visible maxZoom={2} />);
  //   expect(toJson(wrapper)).toMatchSnapshot();
  // });

  it('emit close event', async () => {
    const onClose = jest.fn();
    wrapper = mount(<ImagePreview images={images} visible onClose={onClose} />);
    wrapper.find('ImagePreviewItem').at(0).invoke('onTap')();
    expect(onClose).toHaveBeenCalled();
  });

  // it('emit onZoomChange event when zoom is not 1', async () => {
  //   wrapper = mount(<ImagePreview images={images} visible />);
  //   wrapper.find('ImagePreviewItem').at(0).invoke('onZoomChange')(2);
  //   expect(toJson(wrapper)).toMatchSnapshot();
  // });

  // it('emit onZoomChange event when zoom is 1', async () => {
  //   wrapper = mount(<ImagePreview images={images} visible />);
  //   wrapper.find('ImagePreviewItem').at(0).invoke('onZoomChange')(1);
  //   expect(toJson(wrapper)).toMatchSnapshot();
  // });

  it('basic ImagePreviewItem usage', async () => {
    const onTap = jest.fn();
    wrapper = mount(
      <div>
        <ImagePreviewItem maxZoom={2} image={images[0]} onTap={onTap} />
      </div>,
    );
    wrapper.find('Image').at(0).invoke('onClick')();
    expect(onTap).toHaveBeenCalled();
  });
});

describe('ImagePreviewItem', () => {
  it('test onDrag', async () => {
    const { queryAllByTestId, debug } = render(<ImagePreview images={images} visible />);
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
