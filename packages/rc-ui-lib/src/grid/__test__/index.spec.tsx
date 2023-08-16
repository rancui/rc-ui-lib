import * as React from 'react';
import { fireEvent, render, cleanup } from '@testing-library/react';
import Icon from '../../icon';
import Grid from '..';

describe('Grid', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render square grid with gutter correctly', async () => {
    const { container } = render(
      <Grid square columnNum={2} gutter={10}>
        <Grid.Item />
        <Grid.Item />
        <Grid.Item />
      </Grid>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with index prop', async () => {
    const { container } = render(
      <Grid gutter={10} columnNum={4}>
        {Array.from({ length: 8 }, (_, i) => (
          <Grid.Item key={i} icon="photo-o" text="文字" />
        ))}
      </Grid>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should change icon size when using icon-size prop', async () => {
    const { container } = render(
      <Grid iconSize="10">
        <Grid.Item icon="success" />
      </Grid>,
    );
    expect(getComputedStyle(container.querySelector('i')).fontSize).toEqual('10px');
  });

  it('should change icon color when using icon-color prop', async () => {
    const { container } = render(
      <Grid iconSize="10">
        <Grid.Item icon="success" iconColor="red" />
      </Grid>,
    );
    expect(getComputedStyle(container.querySelector('i')).color).toEqual('red');
  });

  it('should render icon correctly', async () => {
    const { container } = render(
      <Grid>
        <Grid.Item badge={{ content: 1 }} icon="success" iconColor="red" />
      </Grid>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly when icon is ReactNode', async () => {
    const { container } = render(
      <Grid>
        <Grid.Item icon={<Icon name="shop-o" />} />
      </Grid>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render ".rc-grid-item__content--reverse" class when using reverse prop', async () => {
    const { container } = render(
      <Grid reverse>
        <Grid.Item />
      </Grid>,
    );
    expect(
      container
        .querySelector('.rc-grid-item__content')
        .classList.contains('rc-grid-item__content--reverse'),
    ).toBeTruthy();
  });

  it('should render correctly when using text prop', async () => {
    const { container } = render(
      <Grid>
        <Grid.Item icon="photo-o" text="hello,world!" />
      </Grid>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly when text prop is ReactNode', async () => {
    const { container } = render(
      <Grid>
        <Grid.Item icon="photo-o" text={React.createElement('div', {}, 'world')} />
      </Grid>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly when using iconPrefix prop', async () => {
    const { container } = render(
      <Grid>
        <Grid.Item icon="photo-o" iconPrefix="my-icon" text="hello,world!" />
      </Grid>,
    );
    expect(container.querySelector('i').classList.contains('my-icon-photo-o')).toBeTruthy();
  });

  it('should render correctly when using iconColor prop', async () => {
    const { container } = render(
      <Grid>
        <Grid.Item icon="photo-o" iconColor="red" />
      </Grid>,
    );
    expect(getComputedStyle(container.querySelector('i')).color).toEqual('red');
  });

  it('should render correctly when using contentClassName prop', async () => {
    const { container } = render(
      <Grid>
        <Grid.Item icon="photo-o" text="picture" contentClassName="my-content" />
      </Grid>,
    );
    expect(container.querySelector('.my-content')).toBeTruthy();
  });

  it('should render correctly when using contentStyle prop', async () => {
    const { container } = render(
      <Grid>
        <Grid.Item icon="photo-o" text="picture" contentStyle={{ color: 'red' }} />
      </Grid>,
    );
    expect(getComputedStyle(container.querySelector('.rc-grid-item__content')).color).toEqual(
      'red',
    );
  });

  it('should emit click event correctly', async () => {
    const onClick = jest.fn();
    const { container } = render(
      <Grid>
        <Grid.Item icon="photo-o" text="picture" onClick={onClick} />
      </Grid>,
    );
    const content = container.querySelector('.rc-grid-item__content');
    await fireEvent.click(content);

    expect(onClick).toHaveBeenCalled();
  });

  it('should render correctly with children', async () => {
    const { container } = render(
      <Grid>
        <Grid.Item icon="photo-o">hello,world!</Grid.Item>
      </Grid>,
    );

    expect(container).toMatchSnapshot();
  });
});
