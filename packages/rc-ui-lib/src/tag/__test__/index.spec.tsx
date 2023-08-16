import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { Tag } from '..';

describe('Tag', () => {
  afterEach(() => {
    cleanup();
  });

  it('should emit close event when clicking the close icon', async () => {
    const onClose = jest.fn();
    const { container } = render(<Tag closeable onClose={onClose} />);
    await fireEvent.click(container.querySelector('.rc-tag__close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should hide tag when the show prop is false', () => {
    const { container } = render(<Tag visible={false} />);
    expect(container).toMatchSnapshot();
  });

  it('should not trigger click event when clicking the close icon', async () => {
    const onClick = jest.fn();
    const { container } = render(<Tag closeable onClick={onClick} />);
    await fireEvent.click(container.querySelector('.rc-tag__close'));
    expect(onClick).toHaveBeenCalledTimes(0);
    await fireEvent.click(container.querySelector('.rc-tag'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should render border-color correctly', () => {
    const { container } = render(<Tag plain color="red" textColor="blue" />);
    expect(container).toMatchSnapshot();
  });
});
