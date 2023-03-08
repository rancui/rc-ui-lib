class TestsDOMStatic {
  mustQuerySelector<T extends Element = Element>(el: Element, selector: string): T {
    const node: any = el.querySelector(selector);

    if (!node) {
      throw new Error(`[TestsDOM] Unable to find an element by selector: ${selector}`);
    }

    return node;
  }
}

const TestsDOM = new TestsDOMStatic();

export function mockHTMLElementOffset() {
  Object.defineProperties(HTMLElement.prototype, {
    offsetParent: {
      get() {
        return this.parentNode || {};
      },
    },
    offsetLeft: {
      get() {
        return parseFloat(window.getComputedStyle(this).marginLeft) || 0;
      },
    },
    offsetTop: {
      get() {
        return parseFloat(window.getComputedStyle(this).marginTop) || 0;
      },
    },
    offsetHeight: {
      get() {
        return parseFloat(window.getComputedStyle(this).height) || 100;
      },
    },
    offsetWidth: {
      get() {
        return parseFloat(window.getComputedStyle(this).width) || 100;
      },
    },
  });
}

export function mockGetBoundingClientRect(rect: Partial<DOMRect>): () => void {
  const spy = jest.spyOn(Element.prototype, 'getBoundingClientRect');
  spy.mockReturnValue(rect as DOMRect);
  return () => spy.mockRestore();
}

export default TestsDOM;
