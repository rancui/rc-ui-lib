import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Button from '../index';


describe('Button', () => {
  
it('should emit click event', () => {
  const onClick = jest.fn();
  const wrapper = mount(<Button onClick={onClick}>Click</Button>);
  wrapper.simulate('click');
  expect(onClick).toBeCalled();
});

it('should not emit click event when disabled', () => {
  const onClick = jest.fn();
  const wrapper = mount(<Button disabled onClick={onClick}>disabled</Button>);
  wrapper.simulate('click');
  expect(onClick).not.toBeCalled();
});

it('should not emit click event when loading', () => {
  const onClick = jest.fn();
  const wrapper = mount(<Button loading onClick={onClick}>loading</Button>);
  wrapper.simulate('click');
  expect(onClick).not.toBeCalled();
});

it('should hide border when color is gradient', () => {
  const wrapper = mount(
    <Button color="linear-gradient(#000, #fff)" />
  )
  expect(wrapper.getDOMNode().style.border).toEqual('0px');
});

it('should change icon class prefix when using icon-prefix prop', () => {
  const wrapper = mount(
    <Button icon="success" iconPrefix="my-icon" />
  )
  expect(toJson(wrapper.html())).toMatchSnapshot();
});

it('should render loading of a specific size when using loading-size prop', () => {
  const wrapper = mount(
    <Button loading loadingSize="10px" />
  ) 
  const loading = wrapper.find('.rc-loading__spinner');
  expect(loading.getDOMNode().style.width).toEqual('10px');
  expect(loading.getDOMNode().style.height).toEqual('10px');
});

it('should render icon in the right side when setting icon-position to right', () => {
  const wrapper = mount(
    <Button icon="plus" iconPosition="right" />
  ) 
  expect(toJson(wrapper)).toMatchSnapshot();
});


});