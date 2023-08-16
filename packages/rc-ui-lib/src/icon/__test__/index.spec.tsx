import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { Icon } from '..';

const IconFont = Icon.createFromIconfontCN('//at.alicdn.com/t/font_2763890_w471tfudy4d.js');

describe('Icon', () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('should render icon with builtin icon name correctly', () => {
    const { container } = render(<Icon name="success" />);
    expect(container).toMatchSnapshot();
  });

  it('should render icon with url name correctly', () => {
    const { container } = render(<Icon name="https://img.yzcdn.com/icon.jpg" />);
    expect(container).toMatchSnapshot();
  });

  it('should render default slot correctly', () => {
    const { container } = render(<Icon name="success">Default Slot</Icon>);
    expect(container).toMatchSnapshot();
  });

  it('should change root tag after using tag prop', () => {
    const { container } = render(
      <Icon name="success" tag="div">
        Default Slot
      </Icon>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render dot correctly', () => {
    const { container } = render(<Icon name="success" dot />);
    expect(container.querySelector('.rc-badge')).toMatchSnapshot();
  });

  it('should render badge correctly', () => {
    const { container } = render(<Icon name="success" badge={{ content: 9 }} />);
    expect(container.querySelector('.rc-badge')).toMatchSnapshot();
  });

  it('should change icon size when using size prop', () => {
    const { container } = render(<Icon name="success" size={20} />);
    expect(getComputedStyle(container.querySelector('.van-icon')).fontSize).toEqual('20px');
  });

  it('should render correctly when createFromIconfontCN', () => {
    const { container } = render(<IconFont name="cuIcon-classify" color="#f44336" />);
    expect(container).toMatchSnapshot();
  });
});
