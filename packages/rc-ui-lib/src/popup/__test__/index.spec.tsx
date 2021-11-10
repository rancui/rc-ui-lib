import React from 'react';
import { mount } from 'enzyme';
import Icon from '../../icon';
import { Popup } from '..';

describe('Popup', () => {
  let wrapper;
  afterEach(() => {
    wrapper.unmount();
    jest.restoreAllMocks();
  });

  it('should change z-index when using z-index prop', async () => {
    wrapper = mount(<Popup visible style={{ zIndex: 1500 }} />);
    expect(wrapper.find('.rc-popup').getDOMNode().style.zIndex).toEqual('1500');
    expect(wrapper.find('.rc-overlay').getDOMNode().style.zIndex).toEqual('1500');
  });

  it('should lock scroll when visibled', async () => {
    wrapper = mount(<Popup />);
    expect(document.body.classList.contains('rc-overflow-hidden')).toBeFalsy();
    await wrapper.setProps({ visible: true });
    expect(document.body.classList.contains('rc-overflow-hidden')).toBeTruthy();
  });

  it('should allow to using teleport prop', async () => {
    const div = document.createElement('div');
    wrapper = mount(<Popup visible teleport={div} />);

    expect(div.querySelector('.rc-popup')).toBeTruthy();
  });

  it('should render overlay by default', () => {
    wrapper = mount(<Popup visible />);
    expect(wrapper.find('.rc-overlay')).toBeTruthy();
  });

  it('should not render overlay when overlay prop is false', () => {
    wrapper = mount(<Popup visible overlay={false} />);
    expect(wrapper.hasClass('rc-overlay')).toBeFalsy();
  });
  it('should emit click-overlay event when overlay is clicked', async () => {
    const onClickOverlay = jest.fn();
    wrapper = mount(<Popup visible onClickOverlay={onClickOverlay} />);
    const overlay = wrapper.find('.rc-overlay');
    overlay.simulate('click');
    expect(onClickOverlay).toHaveBeenCalled();
  });

  it('should emit open event when visible prop is set to true', async () => {
    const onOpen = jest.fn();
    wrapper = mount(<Popup visible={false} onOpen={onOpen} />);
    await wrapper.setProps({ visible: true });
    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it('should emit close event when visible prop is set to false', async () => {
    const onClickOverlay = jest.fn();
    const onClose = jest.fn();
    wrapper = mount(<Popup visible onClickOverlay={onClickOverlay} onClose={onClose} />);
    const overlay = wrapper.find('.rc-overlay');
    await overlay.simulate('click');
    wrapper.setProps({ visible: false });
    expect(onClose).toHaveBeenCalled();
  });

  it('should change duration when using duration prop', () => {
    wrapper = mount(<Popup visible duration={500} />);
    const popup = wrapper.find('.rc-popup');
    const overlay = wrapper.find('.rc-overlay');
    expect(popup.getDOMNode().style.animationDuration).toEqual('500ms');
    expect(overlay.getDOMNode().style.animationDuration).toEqual('500ms');
  });

  it('should have "rc-popup--round" class when setting the round prop', () => {
    wrapper = mount(<Popup visible round />);
    expect(wrapper.find('.rc-popup--round').exists()).toBeTruthy();
  });

  it('should render close icon when using closeable prop', () => {
    wrapper = mount(<Popup visible closeable />);
    expect(wrapper.find('.rc-popup__close-icon').exists()).toBeTruthy();
  });

  it('should emit click-close-icon event when close icon is clicked', async () => {
    const onClickCloseIcon = jest.fn();
    wrapper = mount(
      <Popup visible closeable closeIcon="success" onClickCloseIcon={onClickCloseIcon} />,
    );
    const icon = wrapper.find('.rc-popup__close-icon').at(0);
    await icon.simulate('click');
    expect(onClickCloseIcon).toHaveBeenCalled();
  });

  it('should render correct close icon when using close-icon prop', () => {
    wrapper = mount(<Popup visible closeable closeIcon="success" />);
    expect(wrapper.find('.rc-popup__close-icon')).toMatchSnapshot();
  });

  it('should render correct close icon when close-icon is JSX element', () => {
    wrapper = mount(<Popup visible closeable closeIcon={<Icon name="shop-o" />} />);
    expect(wrapper.find('Icon').exists()).toBeTruthy();
  });

  it('should render correctly when using title prop', () => {
    wrapper = mount(<Popup visible title="标题" />);
    expect(wrapper.find('.rc-popup__title').text()).toEqual('标题');
  });

  it('should render correctly when using descrition prop', () => {
    wrapper = mount(<Popup visible descrition="descrition" />);
    expect(wrapper.find('.rc-popup__descrition').text()).toEqual('descrition');
  });

  it('should change icon class prefix when using icon-prefix prop', () => {
    wrapper = mount(<Popup visible closeable iconPrefix="my-icon" />);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should allow to prevent close with before-close prop', async () => {
    const onClickOverlay = jest.fn();
    wrapper = mount(<Popup visible beforeClose={() => false} onClickOverlay={onClickOverlay} />);

    const overlay = wrapper.find('.rc-overlay');
    overlay.simulate('click');
    expect(overlay).toBeTruthy();

    await wrapper.setProps({ beforeClose: () => true });
    overlay.simulate('click');
    expect(overlay.exists());
  });

  it('should not call before-close when visible prop becomes false', async () => {
    const beforeClose = jest.fn();
    wrapper = mount(<Popup visible beforeClose={beforeClose} />);
    await wrapper.setProps({ visible: false });
    expect(beforeClose).toHaveBeenCalledTimes(0);
  });
});
