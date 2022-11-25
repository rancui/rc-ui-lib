/* eslint-disable @typescript-eslint/no-unused-expressions */
/**
 * @jest-environment jsdom
 */
import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import TestsEvent from '../../../tests/events';
import { sleep } from '../../../tests/utils';
import Tabs from '..';
import TestElements from './components/testElement';
import { TabsInstance } from '../PropsType';

describe('Tabs', () => {
  let wrapper;
  afterEach(() => {
    wrapper?.unmount();
    jest.restoreAllMocks();
  });

  it('should emit click-tab event when tab is clicked', async () => {
    const onClickTab = jest.fn();

    wrapper = mount(
      <Tabs onClickTab={onClickTab}>
        <Tabs.TabPane title="title1">1</Tabs.TabPane>
        <Tabs.TabPane title="title2">2</Tabs.TabPane>
      </Tabs>,
    );

    await sleep();
    const tabs = wrapper.find('.rc-tab');

    await tabs.at(0).simulate('click');
    expect(onClickTab).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 0,
        title: 'title1',
        disabled: false,
      }),
    );
  });

  it('should not emit change event when TabPane is disabled and tab is clicked', async () => {
    const onChange = jest.fn();

    wrapper = mount(
      <Tabs onChange={onChange}>
        <Tabs.TabPane title="title1">1</Tabs.TabPane>
        <Tabs.TabPane disabled title="title2">
          2
        </Tabs.TabPane>
        <Tabs.TabPane title="title3">3</Tabs.TabPane>
      </Tabs>,
    );

    await sleep();
    const tabs = wrapper.find('.rc-tab');

    await tabs.at(1).simulate('click');
    expect(onChange).toHaveBeenCalledTimes(0);
    await tabs.at(0).simulate('click');
    expect(onChange).toHaveBeenCalledTimes(0);
    await tabs.at(2).simulate('click');
    expect(onChange).toHaveBeenCalledTimes(1);
    await tabs.at(2).simulate('click');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should match active tab by name when using name prop', async () => {
    const onClickTab = jest.fn();
    wrapper = mount(
      <Tabs active="a" onClickTab={onClickTab}>
        <Tabs.TabPane title="title1" name="a">
          Tab
        </Tabs.TabPane>
        <Tabs.TabPane title="title2" name="b">
          Tab
        </Tabs.TabPane>
      </Tabs>,
    );
    const item = wrapper.find('.rc-tab').at(1);
    await item.simulate('click');
    expect(onClickTab).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'b',
        title: 'title2',
        disabled: false,
      }),
    );
  });

  it('should not render zero badge when show-zero-badge prop is false', async () => {
    wrapper = mount(
      <Tabs>
        <Tabs.TabPane badge={0}>1</Tabs.TabPane>
        <Tabs.TabPane badge={0} showZeroBadge={false}>
          2
        </Tabs.TabPane>
      </Tabs>,
    );
    await sleep();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render card type correctly', async () => {
    wrapper = mount(
      <Tabs active={0} type="card" color="#ff0000">
        <Tabs.TabPane badge={1}>1</Tabs.TabPane>
        <Tabs.TabPane dot>2</Tabs.TabPane>
        <Tabs.TabPane renderTitle={<h3>haha</h3>} />
        <Tabs.TabPane renderTitle={(active) => <h3>{active ? 'true' : 'false'}</h3>} />
      </Tabs>,
    );
    await sleep();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render correctly when lazy-render', async () => {
    wrapper = mount(
      <Tabs active="a" lazyRender>
        <Tabs.TabPane title="title1" name="a">
          Tab
        </Tabs.TabPane>
        <Tabs.TabPane title="title2" name="b">
          Tab
        </Tabs.TabPane>
      </Tabs>,
    );
    await sleep();
    expect(toJson(wrapper.find('.rc-tabs__content'))).toMatchSnapshot();

    await wrapper.setProps({
      lazyRender: false,
    });

    expect(toJson(wrapper.find('.rc-tabs__content'))).toMatchSnapshot();
  });

  it('should render correctly when set scrollspy prop', async () => {
    const onChange = jest.fn();
    Date.now = jest.fn(() => 1482363367071);
    const scrollspyConfig = {
      autoFocusLast: true,
      reachBottomThreshold: 50,
    };
    wrapper = mount(
      <div className="test-rab">
        <Tabs sticky scrollspy={scrollspyConfig} onChange={onChange}>
          {[0, 1, 2, 3, 4].map((item) => (
            <Tabs.TabPane key={item} title={`title${item}`}>
              <div style={{ height: '80px' }}>内容 {item}</div>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div>,
    );
    const tabs = wrapper.find('.rc-tab');
    await sleep();
    expect(toJson(wrapper)).toMatchSnapshot();
    tabs.at(2).simulate('click');
    expect(onChange).toHaveBeenCalledWith(2, 'title2');
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

describe('Tabs test with testing library', () => {
  const mockRect = (el: Element, rect: Partial<DOMRect>) => {
    Object.defineProperty(el, 'getBoundingClientRect', {
      configurable: true,
      get: () => {
        return () => ({
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: 0,
          height: 0,
          ...rect,
        });
      },
    });
  };

  const mockSticky = (c: Element, sticky: Element, rect?: Partial<DOMRect>) => {
    Object.defineProperty(c, 'offsetParent', {
      configurable: true,
      get: () => document.body,
    });

    if (rect) {
      mockRect(sticky, rect);
    }
  };

  const mockOffset = (c: Element, rect?: Partial<DOMRect>) => {
    Object.defineProperty(c, 'offsetHeight', {
      configurable: true,
      get: () => rect?.height,
    });
    Object.defineProperty(c, 'offsetWidth', {
      configurable: true,
      get: () => rect?.width,
    });
  };

  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('should scroll to specific swipe after calling the scrollTo method', async () => {
    const onChange = jest.fn();

    const tabsRef = React.createRef<TabsInstance>();
    render(
      <Tabs ref={tabsRef} onChange={onChange}>
        <Tabs.TabPane title="1">content1</Tabs.TabPane>
        <Tabs.TabPane disabled title="2">
          content2
        </Tabs.TabPane>
        <Tabs.TabPane title="3">content3</Tabs.TabPane>
      </Tabs>,
    );

    const scrollTo = (step: number) => {
      tabsRef.current.scrollTo(step);
    };

    await waitFor(async () => {
      scrollTo(1);
    });

    await sleep(100);

    expect(onChange).toHaveBeenCalledWith(2, '3');
  });
  it('should render correctly after inserting a tab', async () => {
    const { container, getByTestId } = render(<TestElements />);

    await sleep();
    expect(container).toMatchSnapshot();

    fireEvent.click(getByTestId('button-change'));

    await sleep();
    expect(container).toMatchSnapshot();
  });

  it('should render correctly when set sticky prop', async () => {
    Object.defineProperty(window.HTMLElement.prototype, 'clientHeight', {
      value: 300,
    });
    const onScroll = jest.fn();
    const { container } = render(
      <Tabs
        sticky
        lineHeight={5}
        scrollspy={{ autoFocusLast: true, reachBottomThreshold: 100 }}
        onScroll={onScroll}
      >
        <Tabs.TabPane title="1">content1</Tabs.TabPane>
        <Tabs.TabPane title="2" disabled>
          content2
        </Tabs.TabPane>
        <Tabs.TabPane title="3">content3</Tabs.TabPane>
      </Tabs>,
    );

    await sleep();

    const sticky = container.querySelector('.rc-sticky');
    const c = container.querySelector('.rc-tabs');

    c && mockRect(c, { width: 300, height: 200, top: 0, bottom: 600 });
    sticky &&
      mockSticky(c, sticky, {
        width: 300,
        height: 50,
        top: -100,
        bottom: -90,
      });
    Object.defineProperty(sticky.parentNode, 'offsetParent', {
      configurable: true,
      get: () => document.body,
    });

    await waitFor(() => {
      fireEvent.scroll(window, { target: { pageYOffset: 100 } }); // 0
    });

    expect(container).toMatchSnapshot();
  });

  it('should swipe to switch tab', async () => {
    const onChange = jest.fn();
    Date.now = jest.fn(() => 1482363367071);
    const { container } = render(
      <Tabs sticky active="b" swipeable onChange={onChange}>
        <Tabs.TabPane title="title1" name="a">
          Tab
        </Tabs.TabPane>
        <Tabs.TabPane title="title2" name="b">
          Tab
        </Tabs.TabPane>
        <Tabs.TabPane title="title3" name="c">
          Tab
        </Tabs.TabPane>
      </Tabs>,
    );

    const sticky = container.querySelector('.rc-sticky');
    const c = container.querySelector('.rc-tabs');
    const track = container.querySelector('.rc-swiper__track');

    c && mockRect(c, { width: 300, height: 200, top: 0, bottom: 600 });
    sticky &&
      mockSticky(c, sticky, {
        width: 300,
        height: 50,
        top: -10,
      });

    mockOffset(track, {
      width: 300,
      height: 50,
    });

    await TestsEvent.triggerDrag(track, [-300, 0]);
    await sleep(300);

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
