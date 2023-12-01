import * as React from 'react';
import { cleanup, render } from '@testing-library/react';
import Divider from '..';

describe('Divider', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render correctly', async () => {
    const { container } = render(<Divider />);
    expect(container).toMatchSnapshot();
  });

  it('should render correctly when have children', async () => {
    const { container } = render(<Divider>text</Divider>);
    expect(container.querySelector('.rc-divider--content-center').textContent).toEqual('text');
  });

  it('should render correctly when contentPosition is set for left', async () => {
    const { container } = render(<Divider contentPosition="left">text</Divider>);
    expect(container.querySelector('.rc-divider--content-left').textContent).toEqual('text');
  });

  it('should render correctly when contentPosition is set for right', async () => {
    const { container } = render(<Divider contentPosition="right">text</Divider>);
    expect(container.querySelector('.rc-divider--content-right').textContent).toEqual('text');
  });

  it('should render correctly when using dashed prop', async () => {
    const { container } = render(<Divider dashed>text</Divider>);
    expect(container.querySelector('.rc-divider--dashed').textContent).toEqual('text');
  });

  it('should render correctly when hairline is false ', async () => {
    const { container, rerender } = render(<Divider>text</Divider>);
    expect(container.querySelector('.rc-divider--hairline')).toBeTruthy();
    rerender(<Divider hairline={false}>text</Divider>);
    expect(container.querySelector('.rc-divider--hairline')).toBeFalsy();
  });
});
