import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import TextEllipsis from '../index';
import { sleep } from '../../../tests/utils';
import { mockHTMLElementOffset } from '../../../tests/dom';

const originGetComputedStyle = window.getComputedStyle;

const lineHeight = 20;

const content =
  'Vant is a lightweight, customizable mobile component library that was open sourced in 2017. Currently Vant officially provides Vue 2 version, Vue 3 version and WeChat applet version, and the community team maintains React version and Alipay applet version.';

describe('TextEllipsis', () => {
  mockHTMLElementOffset();
  window.getComputedStyle = (el) => {
    const style = originGetComputedStyle(el);
    style.lineHeight = `${lineHeight}px`;
    return style;
  };
  Object.defineProperty(window.HTMLElement.prototype, 'clientHeight', {
    get() {
      if (this.innerText.includes('...')) {
        const row = Math.ceil(
          (this.innerText.replace(/\.\.\./g, '中').length / content.length) * 4,
        );
        return lineHeight * row;
      }
      return lineHeight * 4;
    },
  });

  afterAll(() => {
    window.getComputedStyle = originGetComputedStyle;
  });

  it('should render content correctly', async () => {
    const { container } = render(<TextEllipsis content={content} />);
    await sleep(100);
    expect(container).toMatchSnapshot();
  });

  it('Expand and Collapse should be work', async () => {
    const { container } = render(
      <TextEllipsis content={content} expandText="expand" collapseText="collapse" />,
    );

    await sleep(100);
    expect(container.querySelector('.rc-text-ellipsis').innerHTML.includes('...')).toBeTruthy();

    const action = container.querySelector('.rc-text-ellipsis__action');
    await fireEvent.click(action);

    expect(container.querySelector('.rc-text-ellipsis').innerHTML.includes('...')).toBeFalsy();
  });

  it('should emit click event after Expand/Collapse is clicked', async () => {
    const onClick = jest.fn();
    const { container } = render(
      <TextEllipsis
        content={content}
        expandText="expand"
        collapseText="collapse"
        onClick={onClick}
      />,
    );

    const action = container.querySelector('.rc-text-ellipsis__action');

    await fireEvent.click(action);
    await sleep(100);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('text not exceeded', async () => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      value: lineHeight,
    });

    const shortContent = 'rc-ui-lib is nb';
    const { container } = render(<TextEllipsis content={shortContent} />);

    await sleep(100);

    expect(container.querySelector('.rc-text-ellipsis').innerHTML.includes('...')).toBeFalsy();
  });
});
