import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Typography from '..';

describe('Typography', () => {
  let wrapper;
  afterEach(() => {
    wrapper.unmount();
    jest.restoreAllMocks();
  });

  it('render correctly', async () => {
    wrapper = mount(<Typography.Text>这是一条文本</Typography.Text>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('render correctly when using type prop', async () => {
    wrapper = mount(<Typography.Text type="danger">这是一条文本</Typography.Text>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('render correctly when using underline prop', async () => {
    wrapper = mount(<Typography.Text underline>这是一条文本</Typography.Text>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('render correctly when using ellipsis prop', async () => {
    wrapper = mount(
      <Typography.Text ellipsis>
        In the process of internal desktop applications development, many different design specs and
        implementations would be involved
      </Typography.Text>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('render correctly when ellipsis has value', async () => {
    wrapper = mount(
      <Typography.Text ellipsis={2}>
        {' '}
        In the process of internal desktop applications development, many different design specs and
        implementations would be involved
      </Typography.Text>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('render correctly when using level prop', async () => {
    wrapper = mount(<Typography.Title level={1}>一级测试标题</Typography.Title>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
