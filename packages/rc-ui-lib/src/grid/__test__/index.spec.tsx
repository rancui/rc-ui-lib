import * as React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Icon from '../../icon';
import Grid from '..';

describe('Grid', () => {
  let wrapper;
  afterEach(() => {
    wrapper.unmount();
  });

  it('should render square grid with gutter correctly', async () => {
    wrapper = mount(
      <Grid square columnNum={2} gutter={10}>
        <Grid.Item />
        <Grid.Item />
        <Grid.Item />
      </Grid>,
    );
    expect(toJson(wrapper.html())).toMatchSnapshot();
  });

  it('should render correctly with index prop', async () => {
    wrapper = mount(
      <Grid gutter={10} columnNum={4}>
        {Array.from({ length: 8 }, (_, i) => (
          <Grid.Item key={i} icon="photo-o" text="文字" />
        ))}
      </Grid>,
    );
    expect(toJson(wrapper.html())).toMatchSnapshot();
  });

  it('should change icon size when using icon-size prop', async () => {
    wrapper = mount(
      <Grid iconSize="10">
        <Grid.Item icon="success" />
      </Grid>,
    );
    expect(wrapper.find('i').props().style.fontSize).toEqual('10px');
  });

  it('should change icon color when using icon-color prop', async () => {
    wrapper = mount(
      <Grid iconSize="10">
        <Grid.Item icon="success" iconColor="red" />
      </Grid>,
    );
    expect(wrapper.find('i').props().style.color).toEqual('red');
  });

  it('should render icon correctly', async () => {
    wrapper = mount(
      <Grid>
        <Grid.Item badge={{ content: 1 }} icon="success" iconColor="red" />
      </Grid>,
    );
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when icon is ReactNode', async () => {
    wrapper = mount(
      <Grid>
        <Grid.Item icon={<Icon name="shop-o" />} />
      </Grid>,
    );
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render ".rc-grid-item__content--reverse" class when using reverse prop', async () => {
    wrapper = mount(
      <Grid reverse>
        <Grid.Item />
      </Grid>,
    );
    expect(
      wrapper.find('.rc-grid-item__content').hasClass('rc-grid-item__content--reverse'),
    ).toBeTruthy();
  });

  it('should render correctly when using text prop', async () => {
    wrapper = mount(
      <Grid>
        <Grid.Item icon="photo-o" text="hello,world!" />
      </Grid>,
    );
    expect(toJson(wrapper.html())).toMatchSnapshot();
  });

  it('should render correctly when text prop is ReactNode', async () => {
    wrapper = mount(
      <Grid>
        <Grid.Item icon="photo-o" text={React.createElement('div', {}, 'world')} />
      </Grid>,
    );
    expect(toJson(wrapper.html())).toMatchSnapshot();
  });

  it('should render correctly when using iconPrefix prop', async () => {
    wrapper = mount(
      <Grid>
        <Grid.Item icon="photo-o" iconPrefix="my-icon" text="hello,world!" />
      </Grid>,
    );
    expect(wrapper.find('i').hasClass('my-icon-photo-o')).toBeTruthy();
  });

  it('should render correctly when using iconColor prop', async () => {
    wrapper = mount(
      <Grid>
        <Grid.Item icon="photo-o" iconColor="red" />
      </Grid>,
    );
    expect(wrapper.find('i').props().style.color).toEqual('red');
  });

  it('should render correctly when using contentClassName prop', async () => {
    wrapper = mount(
      <Grid>
        <Grid.Item icon="photo-o" text="picture" contentClassName="my-content" />
      </Grid>,
    );
    expect(wrapper.find('.my-content').exists()).toBeTruthy();
  });

  it('should render correctly when using contentStyle prop', async () => {
    wrapper = mount(
      <Grid>
        <Grid.Item icon="photo-o" text="picture" contentStyle={{ color: 'red' }} />
      </Grid>,
    );
    expect(wrapper.find('.rc-grid-item__content').props().style.color).toEqual('red');
  });

  it('should emit click event correctly', async () => {
    const onClick = jest.fn();
    wrapper = mount(
      <Grid>
        <Grid.Item icon="photo-o" text="picture" onClick={onClick} />
      </Grid>,
    );
    wrapper.find('.rc-grid-item__content').simulate('click');

    expect(onClick).toHaveBeenCalled();
  });

  it('should render correctly with children', async () => {
    wrapper = mount(
      <Grid>
        <Grid.Item icon="photo-o">hello,world!</Grid.Item>
      </Grid>,
    );

    expect(toJson(wrapper.html())).toMatchSnapshot();
  });
});
