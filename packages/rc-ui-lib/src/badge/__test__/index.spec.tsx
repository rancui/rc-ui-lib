import React from 'react';
import { cleanup, render } from '@testing-library/react';
import Badge from '../index';
import Icon from '../../icon';
import { sleep } from '../../../tests/utils';

describe('Badge', () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });
  it('should render nothing when content is empty string', () => {
    const { container } = render(<Badge content="" />);

    expect(container).toMatchSnapshot();
  });

  it('should render nothing when content is undefined', () => {
    const { container } = render(<Badge content="undefined" />);

    expect(container).toMatchSnapshot();
  });

  it('should render nothing when content is zero', () => {
    const { container } = render(<Badge content="0" />);

    expect(container).toMatchSnapshot();
  });

  it('should render className prop correctly', () => {
    const { container } = render(
      <Badge className="test-badge" content={<Icon name="success" className="badge-icon" />} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render content prop correctly', () => {
    const { container } = render(
      <Badge content={<Icon name="success" className="badge-icon" />}>
        <div className="child" />
      </Badge>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should change dot position when using offset prop', async () => {
    const { container, rerender } = render(
      <Badge dot offset={[2, 4]}>
        <div className="child" />
      </Badge>,
    );

    const style = getComputedStyle(container.querySelector('.rc-badge'));
    expect(style.top).toEqual('4px');
    expect(style.right).toEqual('-2px');

    rerender(
      <Badge dot offset={[-2, -4]}>
        <div className="child" />
      </Badge>,
    );

    await sleep(100);
    const style2 = getComputedStyle(container.querySelector('.rc-badge'));
    expect(style2.top).toEqual('-4px');
    expect(style2.right).toEqual('2px');
  });

  it('should change dot position when using offset prop with custom unit', async () => {
    const { container, rerender } = render(
      <Badge dot offset={['2rem', '4em']}>
        <div className="child" />
      </Badge>,
    );

    const style = getComputedStyle(container.querySelector('.rc-badge'));
    expect(style.top).toEqual('4em');
    expect(style.right).toEqual('-2rem');

    rerender(
      <Badge dot offset={['-2rem', '-4em']}>
        <div className="child" />
      </Badge>,
    );

    await sleep(10);
    const style2 = getComputedStyle(container.querySelector('.rc-badge'));

    expect(style2.top).toEqual('-4em');
    expect(style2.right).toEqual('2rem');
  });

  it('should change dot position when using offset prop without children', () => {
    const { container } = render(<Badge dot offset={[2, 4]} />);

    const badge = container.querySelector('.rc-badge');
    const style = getComputedStyle(badge);
    expect(style.marginTop).toEqual('4px');
    expect(style.marginLeft).toEqual('2px');
  });

  it('should not render zero when show-zero is false', async () => {
    const { container, rerender } = render(
      <Badge content="0">
        <div className="child" />
      </Badge>,
    );

    expect(container.querySelector('.rc-badge')).toBeTruthy();

    rerender(
      <Badge content="0" showZero={false}>
        <div className="child" />
      </Badge>,
    );

    await sleep(10);

    expect(container.querySelector('.rc-badge')).toBeFalsy();
  });

  it('can set custom max count', () => {
    const { container } = render(
      <Badge content={100} max={99}>
        news
      </Badge>,
    );
    expect(container.querySelector('.rc-badge').textContent).toBe('99+');
  });

  it('should change dot position when using offset prop and position is bottom-right', async () => {
    const { container, rerender } = render(
      <Badge dot offset={[2, '-4rem']} position="bottom-right">
        news
      </Badge>,
    );

    const badge = container.querySelector('.rc-badge');
    const style = getComputedStyle(badge);

    expect(style.bottom).toEqual('4rem');
    expect(style.right).toEqual('-2px');

    rerender(
      <Badge dot offset={['2rem', -4]} position="bottom-right">
        news
      </Badge>,
    );

    await sleep(10);

    const style2 = getComputedStyle(container.querySelector('.rc-badge'));

    expect(style2.bottom).toEqual('4px');
    expect(style2.right).toEqual('-2rem');
  });

  it('should change dot position when using offset prop and position is bottom-left', async () => {
    const { container, rerender } = render(
      <Badge dot offset={[2, '-4rem']} position="bottom-left">
        news
      </Badge>,
    );

    const badge = container.querySelector('.rc-badge');
    const style = getComputedStyle(badge);

    expect(style.bottom).toEqual('4rem');
    expect(style.left).toEqual('2px');

    rerender(
      <Badge dot offset={['2rem', 4]} position="bottom-left">
        news
      </Badge>,
    );

    await sleep(10);

    const style2 = getComputedStyle(container.querySelector('.rc-badge'));

    expect(style2.bottom).toEqual('-4px');
    expect(style2.left).toEqual('2rem');
  });

  it('should change dot position when using offset prop and position is top-left', async () => {
    const { container } = render(
      <Badge dot offset={[2, '-4rem']} position="top-left">
        news
      </Badge>,
    );

    const badge = container.querySelector('.rc-badge');
    const style = getComputedStyle(badge);

    expect(style.top).toEqual('-4rem');
    expect(style.left).toEqual('2px');
  });
});
