import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Overlay } from '..';

describe('Overlay', () => {
  it('should change z-index when using z-index prop', () => {
    const { container } = render(<Overlay visible zIndex={99} />);
    const overlay = document.querySelector('.rc-overlay');
    expect(getComputedStyle(overlay).zIndex).toEqual('99');
  });

  it('should allow to custom class name with class-name prop', () => {
    const { container } = render(<Overlay visible className="foo" />);
    const overlay = document.querySelector('.rc-overlay');
    expect(overlay.classList.contains('foo')).toBeTruthy();
  });

  it('should allow to custom style with custom-style prop', () => {
    const { container } = render(<Overlay visible customStyle={{ backgroundColor: 'red' }} />);
    const overlay = document.querySelector('.rc-overlay');
    expect(getComputedStyle(overlay).backgroundColor).toEqual('red');
  });

  it('should change animation duration when using duration prop', () => {
    const { container } = render(<Overlay visible duration={100} />);
    const overlay = document.querySelector('.rc-overlay');
    expect(getComputedStyle(overlay).animationDuration).toEqual('100ms');
  });

  it('should render default slot correctly', () => {
    render(<Overlay visible>Custom Default</Overlay>);
    expect(document.querySelector('.rc-overlay')).toMatchSnapshot();
  });
});
