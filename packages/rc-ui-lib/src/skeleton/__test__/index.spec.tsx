import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Skeleton } from '..';

describe('Skeleton', () => {
  let wrapper;
  afterEach(() => {
    wrapper.unmount();
    jest.restoreAllMocks();
  });

  it('should render with row width array correctly', async () => {
    wrapper = mount(<Skeleton row={4} rowWidth={['100%', 30, '5rem']} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render with row height array correctly', async () => {
    wrapper = mount(<Skeleton row={4} rowHeight={['10px', 30, '1rem']} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render default slot when loading is false', () => {
    wrapper = mount(
      <Skeleton loading={false}>
        <div>Content</div>
      </Skeleton>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should change avatar size when using avatar-size prop', () => {
    wrapper = mount(<Skeleton avatar avatarSize="20rem" />);

    const avatar = wrapper.find('.rc-skeleton__avatar');
    expect(avatar.getDOMNode().style.width).toMatchSnapshot('20rem');
    expect(avatar.getDOMNode().style.height).toMatchSnapshot('20ren');
  });

  it('should change avatar shape when using avatar-shape prop', () => {
    wrapper = mount(<Skeleton avatar avatarShape="square" />);
    expect(toJson(wrapper.find('.rc-skeleton__avatar'))).toMatchSnapshot();
  });

  it('should be round when using round prop', () => {
    wrapper = mount(<Skeleton title round avatar />);
    expect(wrapper.find('.rc-skeleton--round').exists()).toBeTruthy();
  });

  it('should allow to disable animation', async () => {
    wrapper = mount(<Skeleton row={1} />);

    expect(wrapper.find('.rc-skeleton--animate').exists()).toBeTruthy();

    await wrapper.setProps({ animate: false });
    expect(wrapper.find('.rc-skeleton--animate').exists()).toBeFalsy();
  });
});
