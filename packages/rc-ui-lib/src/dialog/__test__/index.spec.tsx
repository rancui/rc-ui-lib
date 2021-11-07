import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Dialog from '..';
import Button from '../../button';

describe('Dialog', () => {
  let wrapper;
  afterEach(() => {
    wrapper.unmount();
    jest.clearAllMocks();
  });

  it('should change confirm button color when using confirm-button-color prop', () => {
    wrapper = mount(<Dialog visible confirmButtonColor="red" />);
    const confirmButton = wrapper.find('.rc-dialog__confirm').at(0);
    expect(confirmButton.getDOMNode().style.color).toEqual('red');
  });

  it('should change cancel button color when using cancel-button-color prop', () => {
    wrapper = mount(<Dialog visible showCancelButton cancelButtonColor="red" />);
    const cancelButton = wrapper.find('.rc-dialog__cancel').at(0);
    expect(cancelButton.getDOMNode().style.color).toEqual('red');
  });

  it('should render button text correctly', () => {
    wrapper = mount(
      <Dialog
        visible
        showCancelButton
        cancelButtonText="Custom Cancel"
        confirmButtonText="Custom Confirm"
      />,
    );
    expect(wrapper.find('.rc-dialog__footer').html()).toMatchSnapshot();
  });

  it('should render default slot correctly', () => {
    wrapper = mount(<Dialog visible message="Custom Message" />);
    expect(wrapper.find('.rc-dialog__message').text()).toEqual('Custom Message');
    expect(wrapper.find('.rc-dialog__content').html()).toMatchSnapshot();
  });

  it('should render title slot correctly', () => {
    wrapper = mount(<Dialog visible title="Custom Title" />);
    expect(wrapper.find('.rc-dialog__header').text()).toEqual('Custom Title');
    expect(toJson(wrapper.find('.rc-dialog__header'))).toMatchSnapshot();
  });

  it('should emit open event when show prop is set to true', async () => {
    const onOpen = jest.fn();
    wrapper = mount(<Dialog onOpen={onOpen} />);
    await wrapper.setProps({ visible: true });
    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it('should emit close event when show prop is set to false', async () => {
    const onClose = jest.fn();
    const onClickCloseIcon = jest.fn();
    wrapper = mount(
      <Dialog visible onClose={onClose} closeable onClickCloseIcon={onClickCloseIcon} />,
    );
    wrapper.find('i').simulate('click');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should update width when using width prop', async () => {
    wrapper = mount(<Dialog visible width={200} />);
    expect(wrapper.find('.rc-dialog').at(1).getDOMNode().style.width).toEqual('200px');
  });

  it('should render footer correctly', () => {
    wrapper = mount(<Dialog visible message="message" footer={<Button>Footer</Button>} />);
    expect(wrapper.find('.rc-dialog').at(1).find('.rc-button__text').text()).toEqual('Footer');
  });

  it('should correctly when showCancelButton prop is true', () => {
    wrapper = mount(<Dialog visible message="message" showCancelButton />);
    expect(
      wrapper.find('.rc-dialog').at(1).find('.rc-dialog__cancel').find('.rc-button__text').text(),
    ).toEqual('取消');
  });

  it('should correctly when theme prop is round-button', () => {
    wrapper = shallow(<Dialog visible message="message" theme="round-button" showCancelButton />);
    expect(wrapper.find('.rc-dialog__footer').find('ActionBarButton')).toHaveLength(2);
  });
});
