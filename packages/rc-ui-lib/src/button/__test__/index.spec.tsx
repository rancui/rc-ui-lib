import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Icon from '../../icon';
import Button from '..';

describe('Button', () => {
  it('renders correctly', () => {
    expect(<Button />).toMatchRenderedSnapshot();
  });

  it('mount correctly', () => {
    expect(() => render(<Button />)).not.toThrow();
  });

  it('should render empty button without errors', () => {
    const { container } = render(
      <Button>
        {null}
        {undefined}
      </Button>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should simulate click event', async () => {
    const onClick = jest.fn();

    const { container } = render(<Button onClick={onClick} plain />);

    await fireEvent.click(container.querySelector('.rc-button'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should not emit click event when disabled', async () => {
    const onClick = jest.fn();
    const { container } = render(<Button disabled onClick={onClick} />);
    await fireEvent.click(container.querySelector('.rc-button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('should render correctly when loading prop is set', () => {
    const { container, rerender } = render(<Button loading />);
    expect(container.querySelector('.rc-loading__spinner')).toBeTruthy();

    rerender(<Button type="primary" loading />);
    expect(
      container.querySelector('.rc-button').classList.contains('rc-button--primary'),
    ).toBeTruthy();
  });

  it('should not emit click event when loading prop is set', async () => {
    const onClick = jest.fn();
    const { container } = render(<Button loading onClick={onClick} />);
    await fireEvent.click(container.querySelector('.rc-button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('should hide border when color is gradient', () => {
    const { container, rerender } = render(<Button color="linear-gradient(#000, #fff)" />);
    const style = getComputedStyle(container.querySelector('.rc-button'));
    expect(style.border).toEqual('0px');

    rerender(<Button color="linear-gradient(#000, #fff)" plain />);
    const style2 = getComputedStyle(container.querySelector('.rc-button'));
    expect(style2.color).toEqual('rgb(255, 255, 255)');
    expect(
      container.querySelector('.rc-button').classList.contains('rc-button--plain'),
    ).toBeTruthy();
  });

  it('should hide border when color is not gradient', () => {
    const { container } = render(<Button type="primary" color="red" />);
    const style = getComputedStyle(container.querySelector('.rc-button'));
    expect(style.borderColor).toEqual('red');
  });

  it('should change icon class prefix when using icon-prefix prop', () => {
    const { container } = render(<Button icon="success" iconPrefix="my-icon" />);
    expect(container).toMatchSnapshot();
  });

  it('should render correctly when icon is JSX element', () => {
    const { container } = render(<Button icon={<Icon name="shop-o" />} />);
    expect(container).toMatchSnapshot();
  });

  it('should render iconPosition correctly', () => {
    const { container } = render(<Button type="primary" iconPosition="right" />);
    expect(container.querySelector('.rc-loading__spinner')).toBeFalsy();
  });

  it('should render buttton group correctly', () => {
    const { container } = render(
      <Button.Group>
        <Button type="primary">next step</Button>
      </Button.Group>,
    );
    expect(container.querySelector('.rc-button-group')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
