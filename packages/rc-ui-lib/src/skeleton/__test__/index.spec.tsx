import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { Skeleton } from '..';

describe('Skeleton', () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('should render with row width array correctly', async () => {
    const { container } = render(<Skeleton row={4} rowWidth={['100%', 30, '5rem']} />);
    expect(container).toMatchSnapshot();
  });

  it('should render with row height array correctly', async () => {
    const { container } = render(<Skeleton row={4} rowHeight={['10px', 30, '1rem']} />);
    expect(container).toMatchSnapshot();
  });

  it('should render default slot when loading is false', () => {
    const { container } = render(
      <Skeleton loading={false}>
        <div>Content</div>
      </Skeleton>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should change avatar size when using avatar-size prop', () => {
    const { container } = render(<Skeleton avatar avatarSize="20rem" />);

    const avatar = container.querySelector('.rc-skeleton__avatar');
    expect(getComputedStyle(avatar).width).toMatchSnapshot('20rem');
    expect(getComputedStyle(avatar).height).toMatchSnapshot('20ren');
  });

  it('should change avatar shape when using avatar-shape prop', () => {
    const { container } = render(<Skeleton avatar avatarShape="square" />);
    expect(container.querySelector('.rc-skeleton__avatar')).toMatchSnapshot();
  });

  it('should be round when using round prop', () => {
    const { container } = render(<Skeleton title round avatar />);
    expect(container.querySelector('.rc-skeleton--round')).toBeTruthy();
  });

  it('should allow to disable animation', async () => {
    const { container, rerender } = render(<Skeleton row={1} />);

    expect(container.querySelector('.rc-skeleton--animate')).toBeTruthy();

    rerender(<Skeleton row={1} animate={false} />);
    expect(container.querySelector('.rc-skeleton--animate')).toBeFalsy();
  });
});
