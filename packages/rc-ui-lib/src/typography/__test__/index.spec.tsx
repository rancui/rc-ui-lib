import React from 'react';
import { cleanup, render } from '@testing-library/react';
import Typography from '..';

describe('Typography', () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('render correctly', async () => {
    const { container } = render(<Typography.Text>这是一条文本</Typography.Text>);
    expect(container).toMatchSnapshot();
  });

  it('render correctly when using type prop', async () => {
    const { container } = render(<Typography.Text type="danger">这是一条文本</Typography.Text>);
    expect(container).toMatchSnapshot();
  });

  it('render correctly when using underline prop', async () => {
    const { container } = render(<Typography.Text underline>这是一条文本</Typography.Text>);
    expect(container).toMatchSnapshot();
  });

  it('render correctly when using ellipsis prop', async () => {
    const { container } = render(
      <Typography.Text ellipsis>
        In the process of internal desktop applications development, many different design specs and
        implementations would be involved
      </Typography.Text>,
    );
    expect(container).toMatchSnapshot();
  });

  it('render correctly when ellipsis has value', async () => {
    const { container } = render(
      <Typography.Text ellipsis={2}>
        {' '}
        In the process of internal desktop applications development, many different design specs and
        implementations would be involved
      </Typography.Text>,
    );
    expect(container).toMatchSnapshot();
  });

  it('render correctly when using level prop', async () => {
    const { container } = render(<Typography.Title level={1}>一级测试标题</Typography.Title>);
    expect(container).toMatchSnapshot();
  });
});
