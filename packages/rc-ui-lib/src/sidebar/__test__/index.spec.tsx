import React from 'react';
import { fireEvent, render, cleanup } from '@testing-library/react';
import { Sidebar } from '..';

describe('Sidebar', () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('should emit change event when active item changed', async () => {
    const onChange = jest.fn();

    const { container } = render(
      <Sidebar onChange={onChange}>
        <Sidebar.Item title="标签名" />
        <Sidebar.Item title="标签名" />
        <Sidebar.Item title="标签名" />
      </Sidebar>,
    );
    const wrapper = container.querySelectorAll('.rc-sidebar-item');
    await fireEvent.click(wrapper[0]);
    expect(onChange).toHaveBeenCalledTimes(0);
    await fireEvent.click(wrapper[1]);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should emit click event when SidebarItem is clicked', async () => {
    const onClick = jest.fn();

    const { container } = render(
      <Sidebar>
        <Sidebar.Item onClick={onClick} title="标签名">
          Text
        </Sidebar.Item>
      </Sidebar>,
    );
    const wrapper = container.querySelectorAll('.rc-sidebar-item');
    await fireEvent.click(wrapper[0]);
    expect(onClick).toHaveBeenCalledWith(0);
  });

  it('should not emit change event when disabled SidebarItem is clicked', async () => {
    const onChange = jest.fn();

    const { container } = render(
      <Sidebar onChange={onChange}>
        <Sidebar.Item title="标签名" />
        <Sidebar.Item title="标签名" disabled />
        <Sidebar.Item title="标签名" />
      </Sidebar>,
    );
    const wrapper = container.querySelectorAll('.rc-sidebar-item');
    await fireEvent.click(wrapper[1]);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should render correctly when using badge prop in SidebarItem', async () => {
    const { container } = render(
      <Sidebar>
        <Sidebar.Item title="标签名" disabled />
        <Sidebar.Item badge="5" title="标签名" />
        <Sidebar.Item badge="20" title="标签名" />
      </Sidebar>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render incorrectly when SidebarItem not parent', async () => {
    const spyConsole: jest.SpyInstance = jest.spyOn(console, 'error');
    spyConsole.mockImplementation(() => {
      return null;
    });
    // eslint-disable-next-line react/no-children-prop
    const { container } = render(<Sidebar.Item />);

    expect(container).toMatchSnapshot();
    expect(spyConsole).toHaveBeenCalledWith(
      '[rc-ui-lib] <SidebarItem> must be a child component of <Sidebar>.',
    );
    spyConsole.mockRestore();
  });
});
