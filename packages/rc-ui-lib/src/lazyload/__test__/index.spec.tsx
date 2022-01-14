import React from 'react';
import { fireEvent, render, cleanup, waitFor } from '@testing-library/react';
import { Lazyload } from '..';

describe('test Lazyload by listen event', () => {
  it('should render correctly when use listen event', async () => {
    const { container } = render(
      <Lazyload.Image image="https://img.yzcdn.cn/vant/apple-5.jpg" height="300px" />,
    );
    expect(container).toMatchSnapshot();
  });
});

describe('test Lazyload by observer', () => {
  beforeEach(() => {
    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = jest.fn();
    const observe = jest.fn();
    const unobserve = jest.fn();
    const disconnect = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe,
      unobserve,
      disconnect,
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });
  it('should render correctly when IntersectionObserver is available', async () => {
    const { container } = render(
      <Lazyload.Image image="https://img.yzcdn.cn/vant/apple-5.jpg" height="300px" />,
    );
    expect(container).toMatchSnapshot();
  });
});
