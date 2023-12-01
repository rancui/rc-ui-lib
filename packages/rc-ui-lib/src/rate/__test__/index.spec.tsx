import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Rate from '..';

describe('Rate', () => {
  it('should emit change event when rate icon is clicked', async () => {
    const onChange = jest.fn();
    const { container } = render(<Rate onChange={onChange} defaultValue={0} />);

    const item4 = container.querySelectorAll('.rc-rate__item')[3];
    expect(container.querySelectorAll('i.rc-rate__icon--full').length).toBe(0);
    await fireEvent.click(item4);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toEqual(4);
    expect(container.querySelectorAll('i.rc-rate__icon--full').length).toBe(4);
  });

  it('should not emit change event when rate is not changed', async () => {
    const onChange = jest.fn();
    const { container } = render(<Rate onChange={onChange} value={4} />);

    const item4 = container.querySelectorAll('.rc-rate__item')[3];
    await fireEvent.click(item4);
    expect(onChange).not.toHaveBeenCalled();
    expect(container.querySelectorAll('i.rc-rate__icon--full').length).toBe(4);
  });

  it('should not emit change or update:modelValue event when rate is disabled', async () => {
    const onChange = jest.fn();
    const { container } = render(<Rate onChange={onChange} disabled />);
    const item4 = container.querySelectorAll('.rc-rate__item')[3];
    await fireEvent.click(item4);
    expect(onChange).not.toHaveBeenCalled();
    expect(container.querySelectorAll('i.rc-rate__icon--full').length).not.toBe(4);
  });

  it('should render gutter when using gutter prop', () => {
    const { container } = render(<Rate gutter={10} />);
    expect(container).toMatchSnapshot();
  });

  it('should change icon size when using size prop', () => {
    const { container } = render(<Rate size="2rem" />);
    container.querySelectorAll('i.rc-rate__icon').forEach((el) => {
      expect(getComputedStyle(el).fontSize).toEqual('2rem');
    });
  });

  it('should get decimal when using allow-half and readonly prop', () => {
    const { container } = render(<Rate allowHalf readonly value={2.3} />);
    const halfIcon = container.querySelector('i.rc-rate__icon--half');
    expect(getComputedStyle(halfIcon).width).toEqual('0.3em');
  });

  it('should render correct count when using string prop', () => {
    const { container } = render(<Rate count={4} />);
    const icons = container.querySelectorAll('.rc-rate__item');
    expect(icons).toHaveLength(4);
  });

  it('should emit click event correctly with allowHalf', async () => {
    const onChange = jest.fn();
    const { container } = render(<Rate allowHalf onChange={onChange} />);
    const item4 = container.querySelectorAll('.rc-rate__item')[4];
    await fireEvent.click(item4, { clientX: 92 });
    expect(onChange).toHaveBeenCalledWith(5);
    await fireEvent.click(container.querySelector('.rc-rate__item'));
    expect(onChange).toHaveBeenCalledWith(0.5);
  });

  it('touchMove event', async () => {
    const onChange = jest.fn();
    const { container } = render(<Rate onChange={onChange} />);
    const rate = container.querySelector('.rc-rate');
    await fireEvent.touchStart(rate, { touches: [{ clientX: 0, clientY: 0 }] });
    await fireEvent.touchMove(rate, { touches: [{ clientX: 100, clientY: 0 }] });
    expect(onChange).toHaveBeenCalled();
  });
});
