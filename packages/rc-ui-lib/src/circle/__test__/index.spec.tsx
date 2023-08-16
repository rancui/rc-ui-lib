import * as React from 'react';
import { cleanup, render } from '@testing-library/react';
import { sleep } from '../../../tests/utils';
import { Circle } from '..';

describe('Circle', () => {
  afterEach(() => {
    cleanup();
  });

  it('should update to final rate immediately if speed is 0', async () => {
    const onChange = jest.fn();
    const { container } = render(<Circle rate={50} speed={0} onChange={onChange} />);
    // await wrapper.setProps({ rate: 150 });
    // expect(wrapper.props().rate).toEqual(150);
    await sleep(50);
    expect(onChange).toHaveBeenCalledWith(50);
  });

  it('should render rate correctly when rate is changed', async () => {
    const { container, rerender } = render(<Circle rate={50} defaultRate={0} />);
    // expect(wrapper.props().rate).toEqual(50);
    expect(container).toMatchSnapshot();
    // await wrapper.setProps({ rate: 150 });
    // expect(wrapper.props().rate).toEqual(150);
    rerender(<Circle rate={150} defaultRate={0} />);
    expect(container).toMatchSnapshot();
  });

  it('should change circle size when using size prop', async () => {
    const { container, rerender } = render(<Circle defaultRate={0} size={100} />);
    const style = getComputedStyle(container.querySelector('.rc-circle'));
    expect(style.width).toEqual('100px');
    expect(style.height).toEqual('100px');

    rerender(<Circle defaultRate={0} size={150} />);
    const style2 = getComputedStyle(container.querySelector('.rc-circle'));
    expect(style2.width).toEqual('150px');
    expect(style2.height).toEqual('150px');
    expect(container).toMatchSnapshot();
  });

  it('should change stroke linecap when using stroke-linecap prop', async () => {
    const { container, rerender } = render(<Circle defaultRate={0} strokeLinecap="square" />);
    const style = getComputedStyle(container.querySelector('.rc-circle__hover'));
    expect(style.strokeLinecap).toEqual('square');

    rerender(<Circle defaultRate={0} strokeLinecap="butt" />);
    const style2 = getComputedStyle(container.querySelector('.rc-circle__hover'));
    expect(style2.strokeLinecap).toEqual('butt');
    expect(container).toMatchSnapshot();
  });

  it('should render start-position prop correctly', async () => {
    const { container, rerender } = render(<Circle startPosition="top" />);
    const style = getComputedStyle(container.querySelector('svg'));
    expect(style.transform).toEqual('');

    rerender(<Circle startPosition="right" />);
    const style2 = getComputedStyle(container.querySelector('svg'));
    expect(style2.transform).toEqual('rotate(90deg)');

    rerender(<Circle startPosition="bottom" />);
    const style3 = getComputedStyle(container.querySelector('svg'));
    expect(style3.transform).toEqual('rotate(180deg)');

    rerender(<Circle startPosition="left" />);
    const style4 = getComputedStyle(container.querySelector('svg'));
    expect(style4.transform).toEqual('rotate(270deg)');
  });

  it('should render text correctly', async () => {
    const { container } = render(<Circle defaultRate={70} text="70%" />);
    expect(container.querySelector('.rc-circle__text').textContent).toEqual('70%');
    expect(container).toMatchSnapshot();
  });

  it('should render linearGradient correctly', async () => {
    const { container } = render(
      <Circle
        defaultRate={70}
        color={{
          '0%': '#3fecff',
          '100%': '#6149f6',
        }}
      />,
    );
    // expect(container.querySelector('stop').props().stopColor).toEqual('#3fecff');
    // expect(container.querySelector('stop').at(1).props().stopColor).toEqual('#6149f6');
    expect(container).toMatchSnapshot();
  });

  it('should render clockwise and anticlockwise correctly', async () => {
    const { container, rerender } = render(<Circle defaultRate={70} clockwise text="70%" />);
    // expect(container.querySelector('svg').find('path').at(1).props().d.substr(-10, 1)).toEqual('1');
    expect(container).toMatchSnapshot();

    rerender(<Circle defaultRate={70} clockwise={false} text="70%" />);
    // expect(container.querySelector('svg').find('path').at(1).props().d.substr(-10, 1)).toEqual('0');
    expect(container).toMatchSnapshot();
  });

  it('should render layerColor correctly', () => {
    const { container } = render(<Circle defaultRate={70} layerColor="#ebedf0" />);
    const style = getComputedStyle(container.querySelector('.rc-circle__layer'));
    expect(style.stroke).toEqual('#ebedf0');
    expect(container).toMatchSnapshot();
  });

  it('should render fill prop correctly', () => {
    const { container } = render(<Circle defaultRate={70} fill="#ff0000" />);
    const style = getComputedStyle(container.querySelector('.rc-circle__layer'));
    expect(style.fill).toEqual('#ff0000');
    expect(container).toMatchSnapshot();
  });

  it('hould emit onChange event during animation', async () => {
    const onChange = jest.fn();
    const { container } = render(<Circle speed={150} rate={150} onChange={onChange} />);
    await sleep(50);
    expect(onChange).toHaveBeenCalled();
  });
});
