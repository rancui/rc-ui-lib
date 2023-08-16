import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { Loading } from '..';

describe('Loading', () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('should change loading size when using size prop', () => {
    render(<Loading size={20} />);
    const spinner = document.querySelector('.rc-loading__spinner');
    expect(getComputedStyle(spinner).width).toEqual('20px');
    expect(getComputedStyle(spinner).height).toEqual('20px');
  });

  it('should change text font-size when using text-size prop', () => {
    render(<Loading textSize={20}>Text</Loading>);
    expect(getComputedStyle(document.querySelector('.rc-loading__text')).fontSize).toEqual('20px');
  });

  it('should change text color when using text-color prop', async () => {
    render(<Loading textColor="red">Loading Text</Loading>);
    expect(getComputedStyle(document.querySelector('.rc-loading__text')).color).toBe('red');
  });

  it('should change text color when using color prop', async () => {
    render(<Loading color="green">Loading Text</Loading>);
    expect(getComputedStyle(document.querySelector('.rc-loading__text')).color).toBe('green');
  });

  it('should change text color to textColor when using color & textColor prop', async () => {
    render(
      <Loading color="green" textColor="red">
        Loading Text
      </Loading>,
    );
    expect(getComputedStyle(document.querySelector('.rc-loading__text')).color).toBe('red');
  });

  it('should render correctly when using type is spinner', async () => {
    render(<Loading type="spinner" />);
    expect(document.querySelectorAll('i')).toHaveLength(12);
  });

  it('should render correctly when using type is ball', async () => {
    render(<Loading type="ball" />);
    expect(document.querySelector('.rc-loading__ball')).toBeTruthy();
  });
});
