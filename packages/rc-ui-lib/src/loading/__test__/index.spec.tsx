import React from 'react';
import { mount } from 'enzyme';
import { Loading } from '..';

describe('Loading', () => {
  let wrapper;
  afterEach(() => {
    wrapper.unmount();
    jest.restoreAllMocks();
  });

  it('should change loading size when using size prop', () => {
    wrapper = mount(<Loading size={20} />);
    const spinner = wrapper.find('.rc-loading__spinner');
    expect(spinner.getDOMNode().style.width).toEqual('20px');
    expect(spinner.getDOMNode().style.height).toEqual('20px');
  });

  it('should change text font-size when using text-size prop', () => {
    wrapper = mount(<Loading textSize={20}>Text</Loading>);
    expect(wrapper.find('.rc-loading__text').props().style.fontSize).toEqual('20px');
  });

  it('should change text color when using text-color prop', async () => {
    wrapper = mount(<Loading textColor="red">Loading Text</Loading>);
    expect(wrapper.find('.rc-loading__text').getDOMNode().style.color).toBe('red');
  });

  it('should change text color when using color prop', async () => {
    wrapper = mount(<Loading color="green">Loading Text</Loading>);
    expect(wrapper.find('.rc-loading__text').getDOMNode().style.color).toBe('green');
  });

  it('should change text color to textColor when using color & textColor prop', async () => {
    wrapper = mount(
      <Loading color="green" textColor="red">
        Loading Text
      </Loading>,
    );
    expect(wrapper.find('.rc-loading__text').getDOMNode().style.color).toBe('red');
  });
});
