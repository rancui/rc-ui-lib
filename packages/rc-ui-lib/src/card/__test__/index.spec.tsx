import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Card from '..';

describe('Card', () => {
  it('renders correctly', () => {
    expect(<Card />).toMatchRenderedSnapshot();
  });

  it('mounts without error', () => {
    expect(() => render(<Card />)).not.toThrow();
  });

  it('should trigger onClick on Header', () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <Card>
        <Card.Header onClick={onClick}>标题</Card.Header>
      </Card>
    );
    fireEvent.click(getByText('标题'));
    expect(onClick).toHaveBeenCalled();
  });

  it('should render Card with round prop', () => {
    const { container } = render(<Card round>Content</Card>);
    expect(container).toMatchSnapshot();
  });

  it('should render Card with border prop', () => {
    const { container } = render(<Card border>Content</Card>);
    expect(container).toMatchSnapshot();
  });

  it('should trigger onClick on Card', () => {
    const onClick = jest.fn();
    const { getByText } = render(<Card onClick={onClick}>Content</Card>);
    fireEvent.click(getByText('Content'));
    expect(onClick).toHaveBeenCalled();
  });

  it('should render Card.Header with border prop', () => {
    const { container } = render(
      <Card>
        <Card.Header border>Header</Card.Header>
      </Card>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render Card.Header with extra prop', () => {
    const { container } = render(
      <Card>
        <Card.Header extra={<span>extra</span>}>Header</Card.Header>
      </Card>
    );
    expect(container).toMatchSnapshot();
  });

  it('should trigger onClick on Card.Body', () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <Card>
        <Card.Body onClick={onClick}>Body</Card.Body>
      </Card>
    );
    fireEvent.click(getByText('Body'));
    expect(onClick).toHaveBeenCalled();
  });

  it('should render Card.Footer with border prop', () => {
    const { container } = render(
      <Card>
        <Card.Footer border>Footer</Card.Footer>
      </Card>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render Card.Footer with compact prop', () => {
    const { container } = render(
      <Card>
        <Card.Footer compact>Footer</Card.Footer>
      </Card>
    );
    expect(container).toMatchSnapshot();
  });

  it('should trigger onClick on Card.Footer', () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <Card>
        <Card.Footer onClick={onClick}>Footer</Card.Footer>
      </Card>
    );
    fireEvent.click(getByText('Footer'));
    expect(onClick).toHaveBeenCalled();
  });

  it('should trigger onClick on Card.Cover', () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <Card>
        <Card.Cover onClick={onClick}>Cover</Card.Cover>
      </Card>
    );
    fireEvent.click(getByText('Cover'));
    expect(onClick).toHaveBeenCalled();
  });
});