import { render } from '@testing-library/react';
import { ReactElement } from 'react';

export default function toMatchRenderedSnapshot(
  this: jest.MatcherUtils,
  jsx: ReactElement<unknown>,
): { message(): string; pass: boolean } {
  try {
    const { container } = render(jsx);
    expect(container).toMatchSnapshot();

    return {
      message: () => 'expected JSX not to match snapshot',
      pass: true,
    };
  } catch (e) {
    return {
      message: () => `expected JSX to match snapshot: ${e.message}`,
      pass: false,
    };
  }
}
