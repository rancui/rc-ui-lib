import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Icon from '../../icon';
import Button from '..';

describe('Button', () => {
  it('renders correctly', () => {
    expect(<Button />).toMatchRenderedSnapshot();
  });

  it('mount correctly', () => {
    expect(() => mount(<Button />)).not.toThrow();
  });

  it('should render empty button without errors', () => {
    const wrapper = mount(
      <Button>
        {null}
        {undefined}
      </Button>,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should simulate click event', () => {
    const onClick = jest.fn();
    const wrapper = mount(<Button onClick={onClick} />);
    wrapper.simulate('click');
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should not emit click event when disabled', () => {
    const onClick = jest.fn();
    const wrapper = mount(<Button disabled onClick={onClick} />);
    wrapper.simulate('click');
    expect(onClick).not.toHaveBeenCalled();
  });

  it('should render correctly when loading prop is set', () => {
    const wrapper = mount(<Button type="primary" loading />);
    expect(wrapper.find('.rc-loading__spinner').exists()).toBeTruthy();
  });

  it('should hide border when color is gradient', () => {
    const wrapper = mount(<Button color="linear-gradient(#000, #fff)" />);
    expect(wrapper.getDOMNode().style.border).toEqual('0px');
  });

  it('should hide border when color is not gradient', () => {
    const wrapper = mount(<Button type="primary" color="red" />);
    expect(wrapper.getDOMNode().style.borderColor).toEqual('red');
  });

  it('should change icon class prefix when using icon-prefix prop', () => {
    const wrapper = mount(<Button icon="success" iconPrefix="my-icon" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render correctly when icon is JSX element', () => {
    const wrapper = mount(<Button icon={<Icon name="shop-o" />} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render iconPosition correctly', () => {
    const wrapper = mount(<Button type="primary" iconPosition="right" />);
    expect(wrapper.find('.rc-loading__spinner').exists()).toBeFalsy();
  });

  it('should render buttton group correctly', () => {
    const wrapper = mount(
      <Button.Group>
        <Button type="primary">next step</Button>
      </Button.Group>,
    );
    expect(wrapper.find('.rc-button-group').exists()).toBeTruthy();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
