import React from 'react';
import { mount } from 'enzyme';
import { Tag } from '..';

describe('Tag', () => {
  let wrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  it('should emit close event when clicking the close icon', () => {
    const onClose = jest.fn();
    wrapper = mount(<Tag closeable onClose={onClose} />);
    wrapper.find('.rc-tag__close').at(0).simulate('click');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should hide tag when the show prop is false', () => {
    wrapper = mount(<Tag visible={false} />);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should not trigger click event when clicking the close icon', () => {
    const onClick = jest.fn();
    wrapper = mount(<Tag closeable onClick={onClick} />);
    wrapper.find('.rc-tag__close').at(0).simulate('click');
    expect(onClick).toHaveBeenCalledTimes(0);
    wrapper.simulate('click');
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should render border-color correctly', () => {
    wrapper = mount(<Tag plain color="red" textColor="blue" />);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
