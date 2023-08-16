import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { Switch } from '..';

describe('Switch', () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('should emit onClick event when click the switch button', async () => {
    const onClick = jest.fn();
    const { container } = render(<Switch defaultChecked={false} onClick={onClick} />);

    await fireEvent.click(container.querySelector('.rc-switch'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should emit change event when click the switch button', async () => {
    const onChange = jest.fn();
    const onClick = jest.fn();
    const { container } = render(
      <Switch defaultChecked={false} onClick={onClick} onChange={onChange} />,
    );
    await fireEvent.click(container.querySelector('.rc-switch'));
    expect(onChange).toHaveBeenCalledWith(true);
    await fireEvent.click(container.querySelector('.rc-switch'));
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it('should not emit change event if disabled', async () => {
    const onChange = jest.fn();
    const onClick = jest.fn();
    const { container } = render(
      <Switch defaultChecked={false} disabled onClick={onClick} onChange={onChange} />,
    );
    await fireEvent.click(container.querySelector('.rc-switch'));
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  it('should change active color when using active-color prop', async () => {
    const { container, rerender } = render(<Switch defaultChecked activeColor="black" />);
    expect(getComputedStyle(container.querySelector('.rc-switch')).backgroundColor).toEqual(
      'black',
    );
    rerender(<Switch defaultChecked activeColor="red" />);
    expect(getComputedStyle(container.querySelector('.rc-switch')).backgroundColor).toEqual('red');
  });

  it('should change inactive color when using inactive-color prop', async () => {
    const { container, rerender } = render(<Switch defaultChecked={false} inactiveColor="black" />);
    expect(getComputedStyle(container.querySelector('.rc-switch')).backgroundColor).toEqual(
      'black',
    );
    rerender(<Switch defaultChecked={false} inactiveColor="red" />);
    expect(getComputedStyle(container.querySelector('.rc-switch')).backgroundColor).toEqual('red');
  });

  it('should apply active color to loading icon', () => {
    const { container } = render(<Switch defaultChecked loading activeColor="red" />);
    const loading = container.querySelector('.rc-loading__spinner');
    expect(getComputedStyle(loading).color).toEqual('red');
  });

  it('should apply inactive color to loading icon', () => {
    const { container } = render(<Switch defaultChecked={false} loading inactiveColor="red" />);
    const loading = container.querySelector('.rc-loading__spinner');
    expect(getComputedStyle(loading).color).toEqual('red');
  });

  it('should change size when using size prop', () => {
    const { container } = render(<Switch size={20} />);
    expect(getComputedStyle(container.querySelector('.rc-switch')).fontSize).toEqual('20px');
  });
});
