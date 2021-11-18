import * as React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import toJson from 'enzyme-to-json';
import Cell from '../../cell';
import Collapse from '..';
import { CollapseItemInstance } from '../PropsType';

describe('Collapse', () => {
  let wrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  it('should update value when title is clicked', async () => {
    const onChange = jest.fn();
    wrapper = mount(
      <Collapse value={[]} initValue="1" onChange={onChange}>
        <Collapse.Item title="标题1" name="first">
          内容
        </Collapse.Item>
        <Collapse.Item title="标题2" name="2">
          内容
        </Collapse.Item>
      </Collapse>,
    );
    const title = wrapper.find(Cell).at(0).children('.rc-collapse-item__title');
    await title.simulate('click');
    expect(onChange).toHaveBeenCalledWith(['first']);
  });

  it('should update value when title is clicked in accordion mode', async () => {
    const onChange = jest.fn();
    wrapper = mount(
      <Collapse value="" initValue="1" accordion onChange={onChange}>
        <Collapse.Item title="标题1" name="first">
          内容
        </Collapse.Item>
        <Collapse.Item title="标题2" name="2">
          内容
        </Collapse.Item>
      </Collapse>,
    );
    const title = wrapper.find(Cell).at(0).children('.rc-collapse-item__title');
    await title.simulate('click');
    expect(onChange).toHaveBeenCalledWith('first');
  });

  it('should render CollapseItem correctly', () => {
    wrapper = mount(
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
    expect(toJson(wrapper.html())).toMatchSnapshot();
  });

  it('should not render border when border prop is false', () => {
    wrapper = mount(<Collapse border={false} />);
    expect(wrapper.find('.rc-hairline--top-bottom').exists()).toBeFalsy();
  });

  it('should toggle collapse after calling the toggle method', async () => {
    const CollapseItemRef = React.createRef<CollapseItemInstance>();
    const onChange = jest.fn();

    const toggle = (value?: boolean) => {
      CollapseItemRef.current.toggle(value);
    };

    wrapper = mount(
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

    wrapper = mount(
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
    wrapper = mount(
      <Collapse initValue="" onChange={onChange}>
        <Collapse.Item title="标题1" name="first" readonly>
          内容
        </Collapse.Item>
      </Collapse>,
    );
    const title = wrapper.find(Cell).children('.rc-collapse-item__title');
    await title.simulate('click');
    expect(onChange).not.toHaveBeenCalled();
    expect(wrapper.find('i').exists()).toBeFalsy();
  });

  it('should be readonly when using disabled prop', async () => {
    const onChange = jest.fn();
    wrapper = mount(
      <Collapse initValue="" onChange={onChange}>
        <Collapse.Item title="标题1" name="first" disabled>
          内容
        </Collapse.Item>
      </Collapse>,
    );
    const title = wrapper.find(Cell).children('.rc-collapse-item__title');
    await title.simulate('click');
    expect(onChange).not.toHaveBeenCalled();
    expect(wrapper.find('.rc-collapse-item__title--disabled').exists()).toBeTruthy();
  });

  it('when value is change', async () => {
    wrapper = mount(
      <Collapse initValue="" accordion value="">
        <Collapse.Item title="标题1" name="first">
          内容
        </Collapse.Item>
      </Collapse>,
    );

    const title = wrapper.find(Cell).children('.rc-collapse-item__title');
    title.simulate('click');
    await wrapper.setProps({ value: 'first' });
    expect(wrapper.props().value).toEqual('first');
  });
});
