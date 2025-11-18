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
});