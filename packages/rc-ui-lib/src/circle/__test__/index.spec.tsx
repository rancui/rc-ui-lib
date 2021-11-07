import * as React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { sleep } from '../../../tests/utils';
import { Circle } from '..';

describe('Circle', () => {
  let wrapper;
  afterEach(() => {
    wrapper.unmount();
  });

  it('should update to final rate immediately if speed is 0', async () => {
    const onChange = jest.fn();
    wrapper = mount(<Circle rate={50} speed={0} onChange={onChange} />);
    // await wrapper.setProps({ rate: 150 });
    // expect(wrapper.props().rate).toEqual(150);
    await sleep(50);
    expect(onChange).toHaveBeenCalledWith(50);
    // expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render rate correctly when rate is changed', async () => {
    wrapper = mount(<Circle rate={50} defaultRate={0} />);
    expect(wrapper.props().rate).toEqual(50);
    await wrapper.setProps({ rate: 150 });
    expect(wrapper.props().rate).toEqual(150);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should change circle size when using size prop', async () => {
    wrapper = mount(<Circle defaultRate={0} size={100} />);
    expect(wrapper.getDOMNode().style.width).toEqual('100px');
    expect(wrapper.getDOMNode().style.height).toEqual('100px');
    await wrapper.setProps({ size: 150 });
    expect(wrapper.getDOMNode().style.width).toEqual('150px');
    expect(wrapper.getDOMNode().style.height).toEqual('150px');
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should change stroke linecap when using stroke-linecap prop', async () => {
    wrapper = mount(<Circle defaultRate={0} strokeLinecap="square" />);
    expect(wrapper.find('.rc-circle__hover').getDOMNode().style.strokeLinecap).toEqual('square');
    await wrapper.setProps({ strokeLinecap: 'butt' });
    wrapper.update();
    expect(wrapper.find('.rc-circle__hover').getDOMNode().style.strokeLinecap).toEqual('butt');
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render start-position prop correctly', async () => {
    wrapper = mount(<Circle startPosition="top" />);
    expect(wrapper.find('svg').getDOMNode().style.transform).toEqual('');

    await wrapper.setProps({ startPosition: 'right' });
    expect(wrapper.find('svg').getDOMNode().style.transform).toEqual('rotate(90deg)');

    await wrapper.setProps({ startPosition: 'bottom' });
    expect(wrapper.find('svg').getDOMNode().style.transform).toEqual('rotate(180deg)');

    await wrapper.setProps({ startPosition: 'left' });
    expect(wrapper.find('svg').getDOMNode().style.transform).toEqual('rotate(270deg)');
  });

  it('should render text correctly', async () => {
    wrapper = mount(<Circle defaultRate={70} text="70%" />);
    expect(wrapper.find('.rc-circle__text').text()).toEqual('70%');
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render linearGradient correctly', async () => {
    wrapper = mount(
      <Circle
        defaultRate={70}
        color={{
          '0%': '#3fecff',
          '100%': '#6149f6',
        }}
      />,
    );
    expect(wrapper.find('stop').at(0).props().stopColor).toEqual('#3fecff');
    expect(wrapper.find('stop').at(1).props().stopColor).toEqual('#6149f6');
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render clockwise and anticlockwise correctly', async () => {
    wrapper = mount(<Circle defaultRate={70} clockwise text="70%" />);
    expect(wrapper.find('svg').find('path').at(1).props().d.substr(-10, 1)).toEqual('1');
    await wrapper.setProps({ clockwise: false });
    expect(wrapper.find('svg').find('path').at(1).props().d.substr(-10, 1)).toEqual('0');
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render layerColor correctly', () => {
    wrapper = mount(<Circle defaultRate={70} layerColor="#ebedf0" />);
    expect(wrapper.find('.rc-circle__layer').getDOMNode().style.stroke).toEqual('#ebedf0');
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render fill prop correctly', () => {
    wrapper = mount(<Circle defaultRate={70} fill="#ff0000" />);
    expect(wrapper.find('.rc-circle__layer').getDOMNode().style.fill).toEqual('#ff0000');
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('hould emit onChange event during animation', async () => {
    const onChange = jest.fn();
    wrapper = mount(<Circle speed={150} rate={150} onChange={onChange} />);
    await sleep(50);
    expect(onChange).toHaveBeenCalled();
  });
});
