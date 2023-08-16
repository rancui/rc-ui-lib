import * as React from 'react';
import { cleanup, render } from '@testing-library/react';
import Button from '../../button';
import { Network } from '../Network';
import Empty from '..';

describe('Empty', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render image correctly', () => {
    const { container } = render(<Empty image="search" />);
    expect(container).toMatchSnapshot();
  });

  it('should render description correctly', () => {
    const { container } = render(<Empty description="description" />);
    expect(container).toMatchSnapshot();
  });

  it('should render bottom correctly', () => {
    const { container } = render(
      <Empty>
        <Button round type="primary" className="bottom-button">
          按钮
        </Button>
      </Empty>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render svg when image is network component', () => {
    const { container } = render(<Empty image={Network} />);
    expect(container).toMatchSnapshot();
  });

  it('should render svg when prop image is network', () => {
    const { container } = render(<Empty image="network" />);
    expect(container).toMatchSnapshot();
  });

  it('should change image size when using image-size prop', async () => {
    const { container, rerender } = render(<Empty image="search" imageSize={50} />);

    const style = getComputedStyle(container.querySelector('.rc-empty__image'));

    expect(style.width).toEqual('50px');
    expect(style.height).toEqual('50px');

    rerender(<Empty image="search" imageSize="1vw" />);
    const style2 = getComputedStyle(container.querySelector('.rc-empty__image'));
    expect(style2.width).toEqual('1vw');
    expect(style2.height).toEqual('1vw');
  });
});
