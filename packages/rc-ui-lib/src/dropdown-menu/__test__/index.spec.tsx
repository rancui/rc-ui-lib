import React from 'react';
import { fireEvent, render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DropdownMenu from '../index';
import { sleep } from '../../../tests/utils';

const option1 = [
  { text: '全部商品', value: 0 },
  { text: '新款商品', value: 1 },
  { text: '活动商品', value: 2 },
];
const option2 = [
  { text: '默认排序', value: 'a' },
  { text: '好评排序', value: 'b' },
  { text: '销量排序', value: 'c' },
];

describe('DropdownMenu', () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('should render correctly when prop activeColor is set', async () => {
    const { container } = render(
      <DropdownMenu activeColor="#ff8100">
        <DropdownMenu.Item name="item1" options={option1} />
      </DropdownMenu>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly when prop zIndex is set', async () => {
    const { container } = render(
      <DropdownMenu zIndex="3000">
        <DropdownMenu.Item name="item1" options={option1} />
      </DropdownMenu>,
    );
    expect(container).toMatchSnapshot();
  });

  it('closeOnClickOutside ', async () => {
    const { container } = render(
      <DropdownMenu>
        <DropdownMenu.Item name="item1" options={option1} />
      </DropdownMenu>,
    );
    await sleep();
    const title = container.querySelector('.rc-dropdown-menu__title');
    fireEvent.click(title);
    fireEvent.click(document.body);
    await sleep(10);
    expect(container).toMatchSnapshot();
  });

  it('direction up', async () => {
    const { container } = render(
      <DropdownMenu direction="up">
        <DropdownMenu.Item name="item1" options={option1} />
      </DropdownMenu>,
    );
    await sleep();
    expect(container).toMatchSnapshot();

    const titles = container.querySelectorAll('.rc-dropdown-menu__title');
    await fireEvent.click(titles[0]);

    expect(container).toMatchSnapshot();
  });

  it('zIndex', async () => {
    const { container, getByRole } = render(
      <DropdownMenu zIndex="3000">
        <DropdownMenu.Item name="item1" options={option1} />
      </DropdownMenu>,
    );

    const btn = getByRole('button');
    await fireEvent.click(btn);
    expect(container.querySelector('.rc-dropdown-menu__bar')).toHaveStyle('z-index:3001');
  });

  it('shouldRenderTitle', async () => {
    const onChange = jest.fn();
    const { container, getAllByRole } = render(
      <DropdownMenu shouldRenderTitle>
        <DropdownMenu.Item name="item1" options={option1} onChange={onChange} />
        <DropdownMenu.Item name="item2" options={option2} />
      </DropdownMenu>,
    );
    const btns = getAllByRole('button');
    await fireEvent.click(btns[0]);
    const options = container.querySelectorAll('.rc-dropdown-item__option');
    await fireEvent.click(options[0]);
    await fireEvent.click(btns[1]);
  });

  it('disable dropdown item', async () => {
    const { container, getByRole } = render(
      <DropdownMenu>
        <DropdownMenu.Item name="item1" options={option1} disabled />
      </DropdownMenu>,
    );
    await sleep();
    const btn = getByRole('button');
    await fireEvent.click(btn);
    expect(container.querySelector('.rc-dropdown-item')).toHaveStyle('display:none');
  });

  it('emit change event ', async () => {
    const onChange = jest.fn();
    const { container, getByRole } = render(
      <DropdownMenu>
        <DropdownMenu.Item name="item1" options={option1} onChange={onChange} />
      </DropdownMenu>,
    );
    await fireEvent.click(getByRole('button'));
    const options = container.querySelectorAll('.rc-dropdown-item__option');
    await fireEvent.click(options[0]);
    expect(onChange).toHaveBeenCalledWith({ text: '全部商品', value: 0 });
  });

  it('click on the same button twice ', async () => {
    const { container, getByRole } = render(
      <DropdownMenu>
        <DropdownMenu.Item name="item1" options={option1} />
      </DropdownMenu>,
    );
    const btn = getByRole('button');
    await fireEvent.click(btn);
    const item = container.querySelector('.rc-dropdown-item');
    expect(item).toHaveStyle('display:block');
    await fireEvent.click(btn);
    await sleep(500);
    expect(item).toHaveStyle('display:none');
  });

  it('click on the different buttons separately ', async () => {
    const { container, getAllByRole } = render(
      <DropdownMenu>
        <DropdownMenu.Item name="item1" options={option1} />
        <DropdownMenu.Item name="item2" options={option2} />
      </DropdownMenu>,
    );
    const btns = getAllByRole('button');
    await fireEvent.click(btns[0]);
    const items = container.querySelectorAll('.rc-dropdown-item');
    expect(items[0]).toHaveStyle('display:block');
    await fireEvent.click(btns[1]);
    await sleep(500);
    expect(items[0]).toHaveStyle('display:none');
  });

  it('title', async () => {
    const { container } = render(
      <DropdownMenu>
        <DropdownMenu.Item name="item1" title="please click" />
      </DropdownMenu>,
    );
    expect(container.querySelector('.rc-ellipsis')).toHaveTextContent('please click');
  });

  it('teleport', async () => {
    const { container, getByRole } = render(
      <DropdownMenu>
        <DropdownMenu.Item name="item1" options={option1} teleport={document.body} />
      </DropdownMenu>,
    );
    const btn = getByRole('button');
    await fireEvent.click(btn);
    const items = document.body.querySelectorAll('.rc-dropdown-item__option');
    fireEvent.click(items[0]);
    expect(container).toMatchSnapshot();
  });

  it('scroll', async () => {
    const { container, getByRole } = render(
      <DropdownMenu>
        <DropdownMenu.Item name="item1" options={option1} />
      </DropdownMenu>,
    );
    const btn = getByRole('button');
    await fireEvent.click(btn);

    fireEvent.scroll(document.body);

    expect(container).toMatchSnapshot();
  });
});
