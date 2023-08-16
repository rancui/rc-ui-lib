import * as React from 'react';
import Cell from '../../cell';
import Collapse from '..';
import { CollapseItemInstance } from '../PropsType';
import { cleanup, act, render, fireEvent } from '@testing-library/react';

describe('Collapse', () => {
  let spyConsole: jest.SpyInstance;
  beforeEach(() => {
    spyConsole = jest.spyOn(console, 'error');
    spyConsole.mockImplementation(() => {
      return null;
    });
  });

  afterEach(() => {
    cleanup;
    spyConsole.mockRestore();
  });

  // it('should update value when title is clicked', async () => {
  //   const onChange = jest.fn();
  //   const { container } = render(
  //     <Collapse value={[]} initValue="1" onChange={onChange}>
  //       <Collapse.Item title="标题1" name="first">
  //         内容
  //       </Collapse.Item>
  //       <Collapse.Item title="标题2" name="2">
  //         内容
  //       </Collapse.Item>
  //     </Collapse>,
  //   );
  //   const title = container.querySelector(Cell).children('.rc-collapse-item__title');
  //   await title.simulate('click');
  //   expect(onChange).toHaveBeenCalledWith(['first']);
  // });

  it('should update value when title is clicked in accordion mode', async () => {
    const onChange = jest.fn();
    const { container } = render(
      <Collapse value="" initValue="1" accordion onChange={onChange}>
        <Collapse.Item title="标题1" name="first">
          内容
        </Collapse.Item>
        <Collapse.Item title="标题2" name="2">
          内容
        </Collapse.Item>
      </Collapse>,
    );
    const title = container.querySelector('.rc-cell.rc-collapse-item__title');
    await fireEvent.click(title);
    expect(onChange).toHaveBeenCalledWith('first');
  });

  it('should render CollapseItem correctly', () => {
    const { container } = render(
      <Collapse value={[]}>
        <Collapse.Item
          title="标题1"
          name="first"
          icon="shop-o"
          value="this is value"
          rightIcon="question-o"
        >
          内容
        </Collapse.Item>
      </Collapse>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should not render border when border prop is false', () => {
    const { container } = render(<Collapse border={false} />);
    expect(container.querySelector('.rc-hairline--top-bottom')).toBeFalsy();
  });

  it('should toggle collapse after calling the toggle method', async () => {
    const CollapseItemRef = React.createRef<CollapseItemInstance>();
    const onChange = jest.fn();

    const toggle = (value?: boolean) => {
      CollapseItemRef.current.toggle(value);
    };

    const { container } = render(
      <Collapse initValue={[]} onChange={onChange}>
        <Collapse.Item title="标题1" name="first" ref={CollapseItemRef}>
          内容
        </Collapse.Item>
      </Collapse>,
    );

    await act(async () => {
      toggle(true);
    });

    expect(onChange).toHaveBeenCalledWith(['first']);

    await act(async () => {
      toggle(false);
    });

    expect(onChange).toHaveBeenCalledWith([]);
  });

  it('should toggle collapse after calling the toggle method in accordion mode', async () => {
    const CollapseItemRef = React.createRef<CollapseItemInstance>();
    const onChange = jest.fn();

    const toggle = (value?: boolean) => {
      CollapseItemRef.current.toggle(value);
    };

    const { container } = render(
      <Collapse initValue="" accordion onChange={onChange}>
        <Collapse.Item title="标题1" name="first" ref={CollapseItemRef}>
          内容
        </Collapse.Item>
      </Collapse>,
    );

    await act(async () => {
      toggle(true);
    });

    expect(onChange).toHaveBeenCalledWith('first');

    await act(async () => {
      toggle(false);
    });

    expect(onChange).toHaveBeenCalledWith('');
  });

  it('should be readonly when using readonly prop', async () => {
    const onChange = jest.fn();
    const { container } = render(
      <Collapse initValue="" onChange={onChange}>
        <Collapse.Item title="标题1" name="first" readonly>
          内容
        </Collapse.Item>
      </Collapse>,
    );
    const title = container.querySelector('.rc-cell.rc-collapse-item__title');
    await fireEvent.click(title);
    expect(onChange).not.toHaveBeenCalled();
    expect(container.querySelector('i')).toBeFalsy();
    expect(spyConsole).toHaveBeenCalledWith(
      '[rc-ui-lib] Collapse: "value" should be Array in non-accordion mode',
    );
  });

  it('should be readonly when using disabled prop', async () => {
    const onChange = jest.fn();
    const { container } = render(
      <Collapse initValue="" onChange={onChange}>
        <Collapse.Item title="标题1" name="first" disabled>
          内容
        </Collapse.Item>
      </Collapse>,
    );
    const title = container.querySelector('.rc-cell.rc-collapse-item__title');
    await fireEvent.click(title);
    expect(onChange).not.toHaveBeenCalled();
    expect(container.querySelector('.rc-collapse-item__title--disabled')).toBeTruthy();
    expect(spyConsole).toHaveBeenCalledWith(
      '[rc-ui-lib] Collapse: "value" should be Array in non-accordion mode',
    );
  });

  it('when value is change', async () => {
    const { container, rerender } = render(
      <Collapse initValue="" accordion value="">
        <Collapse.Item title="标题1" name="first">
          内容
        </Collapse.Item>
      </Collapse>,
    );

    const title = container.querySelector('.rc-cell.rc-collapse-item__title');
    await fireEvent.click(title);

    rerender(
      <Collapse initValue="" accordion value="first">
        <Collapse.Item title="标题1" name="first">
          内容
        </Collapse.Item>
      </Collapse>,
    );
    // expect(wrapper.props().value).toEqual('first');
    expect(container).toMatchSnapshot();
  });
});
