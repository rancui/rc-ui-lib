import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { sleep } from '../../../tests/utils';
import Icon from '../../icon';
import Cascader from '..';

describe('Cascader', () => {
  let wrapper;
  afterEach(() => {
    wrapper.unmount();
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
    wrapper = mount(<Cascader options={options} onChange={onChange} />);

    await sleep();
    wrapper.find('.rc-cascader__option').at(0).simulate('click');

    const firstOption = options[0];
    expect(onChange.mock.calls[0][0]).toEqual({
      value: firstOption.value,
      tabIndex: 0,
      selectedOptions: [firstOption],
    });

    await sleep();
    wrapper.find('.rc-cascader__options').at(1).find('.rc-cascader__option').simulate('click');

    const secondOption = options[0].children[0];
    expect(onChange.mock.calls[1][0]).toEqual({
      value: secondOption.value,
      tabIndex: 1,
      selectedOptions: [firstOption, secondOption],
    });
  });

  it('will not emit onChange event when using disalbed prop', async () => {
    const items = [
      {
        text: '广东省',
        value: '310000',
        children: [{ text: '深圳市', value: '310100' }],
        disabled: true,
      },
    ];
    const onChange = jest.fn();
    wrapper = mount(<Cascader options={items} onChange={onChange} />);
    await sleep();
    wrapper.find('.rc-cascader__option').at(0).simulate('click');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should emit finish event when all options is selected', async () => {
    const option = { value: '1', text: 'foo' };
    const onFinish = jest.fn();
    wrapper = mount(<Cascader options={[option]} onFinish={onFinish} />);
    await sleep();
    wrapper.find('.rc-cascader__option').simulate('click');

    expect(onFinish.mock.calls[0][0]).toEqual({
      value: option.value,
      tabIndex: 0,
      selectedOptions: [option],
    });
  });

  it('should emit close event when close icon is clicked', () => {
    const onClose = jest.fn();
    wrapper = mount(<Cascader onClose={onClose} />);
    wrapper.find(Icon).props().onClick();
    expect(onClose).toHaveBeenCalled();
  });

  it('should not render close icon when closeable is false', () => {
    wrapper = mount(<Cascader closeable={false} />);
    expect(wrapper.find('.rc-cascader__close-icon').exists()).toBeFalsy();
  });

  it('should change close icon when close-icon prop is string', () => {
    wrapper = mount(<Cascader closeIcon="success" />);
    expect(wrapper.find(Icon).props().name).toEqual('success');
  });

  it('should change close icon when close-icon is ValidElement', () => {
    wrapper = mount(<Cascader closeIcon={<Icon name="shop-o" />} />);
    expect(wrapper.find('i.van-icon-shop-o').exists()).toBeTruthy();
  });

  it('should change close icon when close-icon is not ValidElement', () => {
    wrapper = mount(<Cascader closeIcon={123} />);
    expect(wrapper.find('i.van-icon-shop-o').exists()).toBeFalsy();
  });

  test('should render title slot correctly', () => {
    wrapper = mount(<Cascader title="Custom Title" />);
    expect(wrapper.find('.rc-cascader__title').html()).toMatchSnapshot();
  });

  test('should render option correctly when using optionRender prop', async () => {
    const optionItem = { value: '1', text: 'foo' };
    wrapper = mount(
      <Cascader
        options={[optionItem]}
        optionRender={({ option }) => `Custom Option ${option.text}`}
      />,
    );
    await sleep();
    expect(wrapper.find('.rc-cascader__option').text()).toEqual('Custom Option foo');
  });

  test('should render option correctly when using defaultValue prop', async () => {
    wrapper = mount(<Cascader options={options} defaultValue={['330000']} />);
    await sleep();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('should emit onClickTab event correctly', async () => {
    const onClickTab = jest.fn();
    wrapper = mount(<Cascader options={options} onClickTab={onClickTab} />);
    // console.log('====onClickTab-bug===',wrapper.debug());
    // console.log('====onClickTab-html===',wrapper.html());

    await wrapper.find('.rc-tab').simulate('click');
    expect(onClickTab).toHaveBeenCalled();
  });

  test('when value change', async () => {
    wrapper = mount(<Cascader options={options} defaultValue={['330000']} />);
    await wrapper.setProps({ value: ['350000'] });
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
