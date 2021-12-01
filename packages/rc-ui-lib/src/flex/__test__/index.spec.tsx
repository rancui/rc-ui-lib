import * as React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Flex from '..';

describe('Flex', () => {
  let wrapper;
  afterEach(() => {
    wrapper.unmount();
  });

  it('should render correctly', async () => {
    wrapper = mount(
      <Flex>
        <Flex.Item span={12}>span: 12</Flex.Item>
        <Flex.Item span={12}>span: 12</Flex.Item>
      </Flex>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render correctly when using gutter prop', async () => {
    wrapper = mount(
      <Flex gutter={16}>
        <Flex.Item span={8}>span: 8</Flex.Item>
        <Flex.Item span={8}>span: 8</Flex.Item>
        <Flex.Item span={8}>span: 8</Flex.Item>
      </Flex>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render correctly when gutter prop is array', async () => {
    wrapper = mount(
      <Flex gutter={[16, -16]}>
        <Flex.Item span={8}>span: 8</Flex.Item>
        <Flex.Item span={8}>span: 8</Flex.Item>
      </Flex>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render correctly when direction prop is row-reverse', async () => {
    wrapper = mount(
      <Flex direction="row-reverse">
        <Flex.Item span={8}>span: 8-1</Flex.Item>
        <Flex.Item span={8}>span: 8-2</Flex.Item>
        <Flex.Item span={8}>span: 8-3</Flex.Item>
      </Flex>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render correctly when wrap prop is wrap', async () => {
    wrapper = mount(
      <Flex wrap="wrap">
        <Flex.Item span={8}>span: 8-1</Flex.Item>
        <Flex.Item span={8}>span: 8-2</Flex.Item>
        <Flex.Item span={8}>span: 8-3</Flex.Item>
      </Flex>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render correctly when using justify prop', async () => {
    wrapper = mount(
      <Flex justify="between">
        <Flex.Item span={8}>span: 8-1</Flex.Item>
        <Flex.Item span={8}>span: 8-2</Flex.Item>
        <Flex.Item span={8}>span: 8-3</Flex.Item>
      </Flex>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render correctly when using align prop', async () => {
    wrapper = mount(
      <Flex align="center">
        <Flex.Item span={8}>span: 8-1</Flex.Item>
        <Flex.Item span={8}>span: 8-2</Flex.Item>
        <Flex.Item span={8}>span: 8-3</Flex.Item>
      </Flex>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render correctly when using flex prop', async () => {
    wrapper = mount(
      <Flex align="center">
        <Flex.Item flex={2}>span: 8-1</Flex.Item>
        <Flex.Item flex={5}>span: 8-2</Flex.Item>
      </Flex>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render correctly when flex prop is decimal', async () => {
    wrapper = mount(
      <Flex align="center">
        <Flex.Item flex="20px">span: 8-1</Flex.Item>
        <Flex.Item flex={5}>span: 8-2</Flex.Item>
      </Flex>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
