import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { sleep } from '../../../tests/utils';
import Icon from '../../icon';
import Cascader from '..';

describe('Cascader', () => {
  let spyConsole: jest.SpyInstance;
  beforeEach(() => {
    spyConsole = jest.spyOn(console, 'error');
    spyConsole.mockImplementation(() => {
      return null;
    });
  });

  afterEach(() => {
    cleanup();
    spyConsole.mockRestore();
    jest.restoreAllMocks();
  });

  const options = [
    {
      text: '浙江省',
      value: '330000',
      children: [{ text: '杭州市', value: '330100' }],
    },
    {
      text: '江苏省',
      value: '320000',
      children: [{ text: '南京市', value: '320100' }],
    },
  ];

  it('should emit change event when active option changed', async () => {
    const onChange = jest.fn();
    render(<Cascader options={options} onChange={onChange} />);

    await sleep();
    const optionElement = document.querySelector('.rc-cascader__option');
    await fireEvent.click(optionElement);

    const firstOption = options[0];
    expect(onChange.mock.calls[0][0]).toEqual({
      value: firstOption.value,
      tabIndex: 0,
      selectedOptions: [firstOption],
    });

    await sleep();
    const option = document
      .querySelectorAll('.rc-swiper__slide')[1]
      .querySelectorAll('.rc-cascader__option')[0];
    await fireEvent.click(option);

    const secondOption = options[0].children[0];
    expect(onChange.mock.calls[1][0]).toEqual({
      value: secondOption.value,
      tabIndex: 1,
      selectedOptions: [firstOption, secondOption],
    });
  });

  it('will not emit onChange event when using disabled prop', async () => {
    const items = [
      {
        text: '广东省',
        value: '310000',
        children: [{ text: '深圳市', value: '310100' }],
        disabled: true,
      },
    ];
    const onChange = jest.fn();
    render(<Cascader options={items} onChange={onChange} />);
    await sleep();
    const option = document.querySelector('.rc-cascader__option');
    await fireEvent.click(option);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should emit finish event when all options is selected', async () => {
    const option = { value: '1', text: 'foo' };
    const onFinish = jest.fn();
    render(<Cascader options={[option]} onFinish={onFinish} />);
    await sleep();
    const optionElement = document.querySelector('.rc-cascader__option');
    await fireEvent.click(optionElement);

    expect(onFinish.mock.calls[0][0]).toEqual({
      value: option.value,
      tabIndex: 0,
      selectedOptions: [option],
    });
  });

  it('should emit close event when close icon is clicked', async () => {
    const onClose = jest.fn();
    render(<Cascader onClose={onClose} />);
    const close = document.querySelector('.rc-cascader__close-icon');
    await fireEvent.click(close);
    expect(onClose).toHaveBeenCalled();
  });

  it('should not render close icon when closeable is false', () => {
    render(<Cascader closeable={false} />);
    expect(document.querySelector('.rc-cascader__close-icon')).toBeFalsy();
  });

  it('should change close icon when close-icon prop is string', () => {
    render(<Cascader closeIcon="success" />);
    expect(
      document.querySelector('.rc-cascader__close-icon').classList.contains('van-icon-success'),
    ).toBeTruthy();
  });

  it('should change close icon when close-icon is ValidElement', () => {
    render(<Cascader closeIcon={<Icon name="shop-o" />} />);
    expect(document.querySelector('i.van-icon-shop-o')).toBeTruthy();
  });

  it('should change close icon when close-icon is not ValidElement', () => {
    render(<Cascader closeIcon={123} />);
    expect(document.querySelector('i.van-icon-shop-o')).toBeFalsy();
  });

  test('should render title slot correctly', () => {
    render(<Cascader title="Custom Title" />);
    expect(document.querySelector('.rc-cascader__title')).toMatchSnapshot();
  });

  test('should render option correctly when using optionRender prop', async () => {
    const optionItem = { value: '1', text: 'foo' };
    render(
      <Cascader
        options={[optionItem]}
        optionRender={({ option }) => `Custom Option ${option.text}`}
      />,
    );
    await sleep();
    expect(document.querySelector('.rc-cascader__option').textContent).toEqual('Custom Option foo');
  });

  test('should render option correctly when using defaultValue prop', async () => {
    Date.now = jest.fn(() => 1482363367071);
    render(<Cascader options={options} defaultValue={['330000']} />);
    await sleep();
    expect(document.querySelector('.rc-cascader')).toMatchSnapshot();
  });

  test('should emit onClickTab event correctly', async () => {
    const onClickTab = jest.fn();
    render(<Cascader options={options} onClickTab={onClickTab} />);

    const tab = document.querySelector('.rc-tab');
    await fireEvent.click(tab);
    expect(onClickTab).toHaveBeenCalled();
  });

  test('when value change', async () => {
    const { rerender } = render(<Cascader options={options} defaultValue={['330000']} />);

    rerender(<Cascader options={options} defaultValue={['330000']} value={['350000']} />);

    expect(document.querySelector('.rc-cascader')).toMatchSnapshot();
    expect(spyConsole).toHaveBeenLastCalledWith(
      Error(
        'Cascader: unable to match options correctly, Please check value or defaultValue props.',
      ),
    );
  });
});
