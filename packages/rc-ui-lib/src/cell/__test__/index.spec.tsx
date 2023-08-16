import React from 'react';
import { cleanup, render } from '@testing-library/react';
import Cell from '..';

describe('Cell', () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('should render value slot correctly', () => {
    const { container } = render(<Cell value="Custom Value" />);
    expect(container).toMatchSnapshot();
  });

  it('should render title slot correctly', () => {
    const { container } = render(<Cell title="Custom Title" />);
    expect(container).toMatchSnapshot();
  });

  it('should render label slot correctly', () => {
    const { container } = render(<Cell title="Title" label="Custom Label" />);
    expect(container).toMatchSnapshot();
  });

  it('should render icon slot correctly', () => {
    const { container } = render(<Cell icon="location-o" />);
    expect(container).toMatchSnapshot();
  });

  it('should render extra slot correctly', () => {
    const { container } = render(<Cell title="Title" value="Value" extra="Custom Extra" />);
    expect(container).toMatchSnapshot();
  });

  it('should change arrow direction when using arrow-direction prop', () => {
    const { container } = render(<Cell title="Title" value="Value" isLink arrowDirection="down" />);
    expect(container.querySelector('.rc-cell__right-icon')).toBeTruthy();
    expect(container.querySelector('.van-icon-arrow-down')).toBeTruthy();
  });

  it('should change title style when using title-style prop', () => {
    const { container } = render(<Cell title="Title" titleStyle={{ color: 'red' }} />);
    const title = container.querySelector('.rc-cell__title');
    const style = getComputedStyle(title);
    expect(style.color).toEqual('red');
  });

  it('should change icon class prefix when using icon-prefix prop', () => {
    const { container } = render(<Cell title="Title" icon="success" iconPrefix="my-icon" />);
    expect(container).toMatchSnapshot();
  });

  it('should allow to disable clicakble when using is-link prop', () => {
    const { container } = render(<Cell title="Title" isLink clickable={false} />);
    expect(container.querySelector('.rc-cell--clickable')).toBeTruthy();
  });

  it('should render correctly when wrapperd with Cell.Group', () => {
    const { container } = render(
      <Cell.Group>
        <Cell title="单元格" value="内容" />
        <Cell title="单元格" value="内容" label="描述信息" />
      </Cell.Group>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly when using title prop in Cell.Group', () => {
    const { container } = render(
      <div>
        <Cell.Group title="分组1">
          <Cell title="单元格" value="内容" />
        </Cell.Group>
        <Cell.Group title="分组2">
          <Cell title="单元格" value="内容" />
        </Cell.Group>
      </div>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly when using inset prop in Cell.Group', () => {
    const { container } = render(
      <Cell.Group inset>
        <Cell title="单元格" value="内容" />
        <Cell title="单元格" value="内容" label="描述信息" />
      </Cell.Group>,
    );
    expect(container).toMatchSnapshot();
  });
});
