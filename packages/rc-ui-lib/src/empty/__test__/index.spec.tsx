import * as React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Button from '../../button';
import { Network } from '../Network';
import Empty from '..';

describe('Empty', () => {
  let wrapper;
  afterEach(() => {
    wrapper.unmount();
  });

  it('should render image correctly', () => {
    wrapper = mount(<Empty image="search" />);
    expect(toJson(wrapper.html())).toMatchSnapshot();
  });

  it('should render description correctly', () => {
    wrapper = mount(<Empty description="description" />);
    expect(toJson(wrapper.html())).toMatchSnapshot();
  });

  it('should render bottom correctly', () => {
    wrapper = mount(
      <Empty>
        <Button round type="primary" className="bottom-button">
          按钮
        </Button>
      </Empty>,
    );
    expect(toJson(wrapper.html())).toMatchSnapshot();
  });

  it('should render svg when image is network component', () => {
    wrapper = mount(<Empty image={Network} />);
    expect(toJson(wrapper.html())).toMatchSnapshot();
  });

  it('should render svg when prop image is network', () => {
    wrapper = mount(<Empty image="network" />);
    expect(toJson(wrapper.html())).toMatchSnapshot();
  });

  it('should change image size when using image-size prop', async () => {
    wrapper = mount(<Empty image="search" imageSize={50} />);

    const image = wrapper.find('.rc-empty__image');

    expect(image.getDOMNode().style.width).toEqual('50px');
    expect(image.getDOMNode().style.height).toEqual('50px');

    await wrapper.setProps({ imageSize: '1vw' });
    expect(image.getDOMNode().style.width).toEqual('1vw');
    expect(image.getDOMNode().style.height).toEqual('1vw');
  });
});
