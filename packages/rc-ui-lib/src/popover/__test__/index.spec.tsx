import React from 'react';
import { fireEvent, render, cleanup, waitFor } from '@testing-library/react';
import TestsEvent from '../../../tests/events';
import { sleep } from '../../../tests/utils';
import { Popover, PopoverInstance, PopoverProps } from '..';

const baseActions = [{ text: 'Option 1' }, { text: 'Option 2' }, { text: 'Option 3' }];

const $props: PopoverProps = {
  actions: baseActions,
  trigger: 'click',
  reference: <div className="reference" />,
};

describe('Popover', () => {
  function createPopover(props: PopoverProps) {
    const popoverRef = React.createRef<PopoverInstance>();
    const { container, rerender, debug, baseElement } = render(
      <Popover ref={popoverRef} {...props} />,
    );

    return {
      baseElement,
      container,
      rerender,
      popoverRef,
      debug,
    };
  }

  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('should toggle popover when trigger is "click" and the reference element is clicked', async () => {
    const props: PopoverProps = {
      trigger: 'manual',
    };
    const { container, rerender } = createPopover(props);
    const reference = container.querySelector('.rc-popover__wrapper');
    await fireEvent.click(reference);
    expect(document.querySelector('.rc-popup')).toBeFalsy();

    const props2: PopoverProps = {
      ...props,
      trigger: 'click',
    };
    await rerender(<Popover {...props2} />);
    await fireEvent.click(reference);
    expect(document.querySelector('.rc-popup')).toBeTruthy();
  });

  it('should emit select event when clicking the action', async () => {
    const onSelect = jest.fn();
    const props: PopoverProps = {
      ...$props,
      onSelect,
    };
    const { container, baseElement } = createPopover(props);
    await fireEvent.click(container.querySelector('.rc-popover__wrapper'));
    const action = baseElement.querySelector('.rc-popover__action');
    await fireEvent.click(action);
    expect(onSelect).toHaveBeenCalledWith(baseActions[0], 0);
  });

  it('should not emit select event when the action is disabled', async () => {
    const onSelect = jest.fn();
    const props: PopoverProps = {
      ...$props,
      actions: [{ text: 'Option', disabled: true }],
      onSelect,
    };
    const { container, baseElement } = createPopover(props);
    await fireEvent.click(container.querySelector('.rc-popover__wrapper'));
    const action = baseElement.querySelector('.rc-popover__action');
    await fireEvent.click(action);
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('should close popover when clicking the action', async () => {
    const props: PopoverProps = {
      ...$props,
      closeOnClickAction: false,
    };
    const { container, baseElement } = createPopover(props);
    await fireEvent.click(container.querySelector('.rc-popover__wrapper'));
    const action = baseElement.querySelector('.rc-popover__action');
    await fireEvent.click(action);
    expect(getComputedStyle(baseElement.querySelector('.rc-popover')).display).toBe('block');
  });

  it('should allow to custom the className and the color of action', async () => {
    const props: PopoverProps = {
      ...$props,
      actions: [{ text: 'Option', className: 'foo', color: 'red' }],
    };
    const { container, baseElement } = createPopover(props);
    await fireEvent.click(container.querySelector('.rc-popover__wrapper'));
    const action = baseElement.querySelector('.rc-popover__action');
    expect(action).toMatchSnapshot();
  });

  it('should watch placement prop and update location', async () => {
    const root = document.createElement('div');
    const props: PopoverProps = {
      ...$props,
      placement: 'top',
      teleport: root,
    };
    const { container, rerender } = createPopover(props);
    await fireEvent.click(container.querySelector('.rc-popover__wrapper'));
    await sleep(400);
    expect(root.innerHTML).toMatchSnapshot();

    const props2: PopoverProps = {
      ...props,
      placement: 'bottom',
    };

    rerender(<Popover {...props2} />);

    await fireEvent.click(container.querySelector('.rc-popover__wrapper'));
    await sleep(400);
    expect(root.innerHTML).toMatchSnapshot();
  });

  it('should close popover when touch outside content', async () => {
    const root = document.createElement('div');
    const props: PopoverProps = {
      ...$props,
      teleport: root,
    };
    const { container } = createPopover(props);
    await fireEvent.click(container.querySelector('.rc-popover__wrapper'));
    const action = root.querySelector('.rc-popover__action');
    await fireEvent.click(action);
    expect(getComputedStyle(root.querySelector('.rc-popover')).display).toBe('block');
    await TestsEvent.triggerTouch(document.body, 'touchstart', [[0, 0]]);
    await sleep(400);
    expect(getComputedStyle(root.querySelector('.rc-popover')).display).toBe('none');
  });

  it('should emit clickOverlay event when overlay is clicked', async () => {
    const onClickOverlay = jest.fn();
    const props: PopoverProps = {
      ...$props,
      overlay: true,
      onClickOverlay,
    };
    const { container, baseElement } = createPopover(props);
    await fireEvent.click(container.querySelector('.rc-popover__wrapper'));
    const overlay = baseElement.querySelector('.rc-overlay');
    await fireEvent.click(overlay);
    expect(onClickOverlay).toHaveBeenCalledTimes(1);
  });

  it('should not close Popover when overlay is clicked and closeOnClickOutside is false', async () => {
    const props: PopoverProps = {
      ...$props,
      overlay: true,
      closeOnClickOverlay: false,
    };
    const { container, baseElement } = createPopover(props);
    await fireEvent.click(container.querySelector('.rc-popover__wrapper'));
    const overlay = baseElement.querySelector('.rc-overlay');
    await fireEvent.click(overlay);
    expect(getComputedStyle(baseElement.querySelector('.rc-popover')).display).toBe('block');
  });

  it('should not close Popover when outside is clicked and closeOnClickOutside is false', async () => {
    const onClickOverlay = jest.fn();
    const props: PopoverProps = {
      ...$props,
      overlay: true,
      closeOnClickOverlay: false,
      onClickOverlay,
    };
    const { container, baseElement } = createPopover(props);
    await fireEvent.click(container.querySelector('.rc-popover__wrapper'));
    await TestsEvent.triggerTouch(document.body, 'touchstart', [[0, 0]]);
    expect(getComputedStyle(baseElement.querySelector('.rc-popover')).display).toBe('block');
  });

  it('should change icon class prefix when using icon-prefix prop', async () => {
    const props: PopoverProps = {
      ...$props,
      iconPrefix: 'my-icon',
      actions: [{ icon: 'success', text: 'foo' }],
    };
    const { container, baseElement } = createPopover(props);
    await fireEvent.click(container.querySelector('.rc-popover__wrapper'));
    expect(baseElement).toMatchSnapshot();
  });

  it('should render correctly when using instance function', async () => {
    const { container, baseElement, popoverRef } = createPopover($props);

    await fireEvent.click(container.querySelector('.rc-popover__wrapper'));

    await waitFor(() => {
      popoverRef.current.show();
    });
    expect(getComputedStyle(baseElement.querySelector('.rc-popover')).display).toBe('block');

    await waitFor(() => {
      popoverRef.current.hide();
    });
    await sleep(400);
    expect(getComputedStyle(baseElement.querySelector('.rc-popover')).display).toBe('none');

    await waitFor(() => {
      popoverRef.current.show();
    });
    expect(getComputedStyle(baseElement.querySelector('.rc-popover')).display).toBe('block');
  });
});
