import * as React from 'react';
import { cleanup, render } from '@testing-library/react';
import Flex from '..';

describe('Flex', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render correctly', async () => {
    const { container } = render(
      <Flex>
        <Flex.Item span={12}>span: 12</Flex.Item>
        <Flex.Item span={12}>span: 12</Flex.Item>
      </Flex>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly when using gutter prop', async () => {
    const { container } = render(
      <Flex gutter={16}>
        <Flex.Item span={8}>span: 8</Flex.Item>
        <Flex.Item span={8}>span: 8</Flex.Item>
        <Flex.Item span={8}>span: 8</Flex.Item>
      </Flex>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly when gutter prop is array', async () => {
    const { container } = render(
      <Flex gutter={[16, -16]}>
        <Flex.Item span={8}>span: 8</Flex.Item>
        <Flex.Item span={8}>span: 8</Flex.Item>
      </Flex>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly when direction prop is row-reverse', async () => {
    const { container } = render(
      <Flex direction="row-reverse">
        <Flex.Item span={8}>span: 8-1</Flex.Item>
        <Flex.Item span={8}>span: 8-2</Flex.Item>
        <Flex.Item span={8}>span: 8-3</Flex.Item>
      </Flex>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly when wrap prop is wrap', async () => {
    const { container } = render(
      <Flex wrap="wrap">
        <Flex.Item span={8}>span: 8-1</Flex.Item>
        <Flex.Item span={8}>span: 8-2</Flex.Item>
        <Flex.Item span={8}>span: 8-3</Flex.Item>
      </Flex>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly when using justify prop', async () => {
    const { container } = render(
      <Flex justify="between">
        <Flex.Item span={8}>span: 8-1</Flex.Item>
        <Flex.Item span={8}>span: 8-2</Flex.Item>
        <Flex.Item span={8}>span: 8-3</Flex.Item>
      </Flex>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly when using align prop', async () => {
    const { container } = render(
      <Flex align="center">
        <Flex.Item span={8}>span: 8-1</Flex.Item>
        <Flex.Item span={8}>span: 8-2</Flex.Item>
        <Flex.Item span={8}>span: 8-3</Flex.Item>
      </Flex>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly when using flex prop', async () => {
    const { container } = render(
      <Flex align="center">
        <Flex.Item flex={2}>span: 8-1</Flex.Item>
        <Flex.Item flex={5}>span: 8-2</Flex.Item>
      </Flex>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly when flex prop is decimal', async () => {
    const { container } = render(
      <Flex align="center">
        <Flex.Item flex="20px">span: 8-1</Flex.Item>
        <Flex.Item flex={5}>span: 8-2</Flex.Item>
      </Flex>,
    );
    expect(container).toMatchSnapshot();
  });
});
