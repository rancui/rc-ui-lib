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

export default TestsDOM;
