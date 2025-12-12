import { render, cleanup } from '@testing-library/react';
import { setupJestCanvasMock } from 'jest-canvas-mock';
import React from 'react';
import { Watermark } from '..';

describe('Watermark', () => {
  let spyConsole: jest.SpyInstance;
  const mockRevoke = jest.fn();

  beforeEach(() => {
    spyConsole = jest.spyOn(console, 'error');
    spyConsole.mockImplementation(() => {
      return null;
    });
    global.URL.createObjectURL = jest.fn(() => 'run to here');
    global.URL.revokeObjectURL = jest.fn();
    // 确保 URL.revokeObjectURL 在全局范围内可用
    if (typeof URL !== 'undefined' && !URL.revokeObjectURL) {
      URL.revokeObjectURL = jest.fn();
    }

    setupJestCanvasMock();
  });
  afterEach(() => {
    cleanup();
    spyConsole.mockRestore();
    jest.restoreAllMocks();
  });

  it('should render content', () => {
    const { container } = render(<Watermark content="rc-ui-lib" />);

    expect(container).toMatchSnapshot();
  });

  it('should render image', () => {
    Object.defineProperty(Image.prototype, 'src', {
      set() {
        this.onload();
      },
    });

    const { container } = render(
      <Watermark
        image="https://rancui.github.io/rc-ui-lib/rc-ui-lib.png"
        width={180}
        height={90}
      />,
    );

    expect(container).toMatchSnapshot();
  });
  it('should render image and test opacity', () => {
    Object.defineProperty(Image.prototype, 'src', {
      set() {
        this.onload();
      },
    });

    const { container } = render(
      <Watermark
        image="https://rancui.github.io/rc-ui-lib/rc-ui-lib.png"
        width={180}
        height={90}
        opacity={0.2}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render html', () => {
    const { container } = render(
      <Watermark width={150}>
        <div style={{ background: 'linear-gradient(45deg, #000 0, #000 50%, #fff 50%)' }}>
          <p style={{ mixBlendMode: 'difference', color: '#fff' }}>rc watermark</p>
        </div>
      </Watermark>,
    );

    expect(container).toMatchSnapshot();
  });

  it('test width, height, rotate, zIndex', () => {
    const { container } = render(
      <Watermark content="rc-ui-lib" width={180} height={90} rotate="22" zIndex={999} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('test false value fullPage', () => {
    const { container } = render(<Watermark content="rc-ui-lib" fullPage opacity={0.2} />);

    expect(container).toMatchSnapshot();
  });
});
