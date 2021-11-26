import * as React from 'react';
import { mount } from 'enzyme';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import toJson from 'enzyme-to-json';
import { sleep } from '../../../tests/utils';
import Icon from '../../icon';
import Toast from '../../toast';
import Image from '..';

const IMAGE_URL = 'https://img.com';

describe('Image', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should emit load event after image loaded', async () => {
    const onLoad = jest.fn();
    const wrapper = mount(<Image src={IMAGE_URL} onLoad={onLoad} />);
    await wrapper.find('img').simulate('load');
    expect(onLoad).toHaveBeenCalled();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should watch src and reset', async () => {
    const wrapper = mount(<Image src={IMAGE_URL} />);
    await wrapper.find('img').simulate('load');
    await wrapper.setProps({ src: '' });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should emit error event when load image failed', () => {
    const onError = jest.fn();
    const { getByAltText } = render(<Image alt="errJpg" src={IMAGE_URL} onError={onError} />);
    fireEvent.error(getByAltText('errJpg'));
    expect(onError).toHaveBeenCalled();
  });

  it('should not render loading placeholder when show-loading prop is false', async () => {
    const wrapper = mount(<Image />);
    expect(wrapper.find('.rc-image__loading').exists()).toBeTruthy();
    await wrapper.setProps({
      showLoading: false,
    });
    expect(wrapper.find('.rc-image__loading').exists()).toBeFalsy();
  });

  it('should not render error placeholder when show-error prop is false', async () => {
    const { getByAltText, container } = render(
      <Image src={IMAGE_URL} alt="test" showError={false} />,
    );
    fireEvent.error(getByAltText('test'));
    expect(container.querySelector('.rc-image__error')).not.toBeInTheDocument();
  });

  it('should change loading icon when using loading-icon prop', () => {
    const wrapper = mount(<Image loadingIcon="success" />);
    expect(wrapper.find('.van-icon-success').exists()).toBeTruthy();
  });

  it('should render correctly when using width and height prop', () => {
    const { container } = render(<Image width={100} height={100} />);
    expect(container.querySelector('.rc-image').getAttribute('style')).toEqual(
      'width: 100px; height: 100px;',
    );
  });

  it('should render correctly when using radius prop', () => {
    const { container } = render(<Image width={100} height={100} radius={10} />);
    expect(container.querySelector('.rc-image')).toHaveStyle('border-radius: 10px');
  });
});
