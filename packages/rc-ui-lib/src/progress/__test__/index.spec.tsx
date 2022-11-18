import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Progress, { ProgressProps } from '..';

describe('Progress', () => {
  function createProgress(props: ProgressProps) {
    const { queryByTestId, container, rerender, debug, baseElement } = render(
      <Progress {...props} />,
    );

    return {
      container,
      rerender,
      debug,
      queryByTestId,
      baseElement,
    };
  }

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('should re-calc width if showing pivot dynamically', () => {
    const { rerender, container } = createProgress({
      showPivot: false,
      percentage: 100,
    });
    expect(container).toMatchSnapshot();
    const props = {
      percentage: 100,
      showPivot: true,
      pivotText: 'test',
    };
    rerender(<Progress {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should change track color when using track-color prop', () => {
    const { baseElement } = createProgress({
      showPivot: false,
      percentage: 100,
    });

    expect(getComputedStyle(baseElement.querySelector('.rc-progress')).background).toEqual(
      'rgb(229, 229, 229)',
    );
  });

  it('should render correctly when using inactive prop', () => {
    const { container } = createProgress({
      inactive: true,
      percentage: 50,
    });
    expect(container).toMatchSnapshot();
  });
});
