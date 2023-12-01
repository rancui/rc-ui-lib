import React from 'react';
import { render, cleanup, act, fireEvent, waitFor } from '@testing-library/react';
import TestsEvent from '../../../tests/events';
import { sleep } from '../../../tests/utils';
import Picker, { PickerInstance, PickerProps } from '..';

const COLUMNS = [
  {
    text: 'A1',
    children: [
      {
        text: 'B1',
        children: [{ text: 'C1' }, { text: 'C2' }],
      },
      {
        text: 'B2',
        children: [{ text: 'C3' }, { text: 'C4' }],
      },
    ],
  },
  {
    text: 'A2',
    children: [
      {
        text: 'B3',
        children: [{ text: 'C5' }, { text: 'C6' }],
      },
      {
        text: 'B4',
        children: [{ text: 'C7' }, { text: 'C8' }],
      },
    ],
  },
];

const pickColumnText = (column: Array<{ text: string }>) =>
  column.map((item: { text: string }) => item.text);

describe('Picker cascade', () => {
  function createPicker(props?: Partial<PickerProps>) {
    const pickerRef = React.createRef<PickerInstance>();

    const { queryByTestId, container, rerender, debug } = render(
      <Picker ref={pickerRef} {...props} />,
    );

    return {
      container,
      rerender,
      pickerRef,
      debug,
      queryByTestId,
    };
  }

  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('cascade columns', async () => {
    const onConfirm = jest.fn();
    const onChange = jest.fn();

    const { container } = createPicker({
      showToolbar: true,
      columns: COLUMNS,
      onConfirm,
      onChange,
    });

    const confirmBtn = container.querySelector('.rc-picker__confirm');

    fireEvent.click(confirmBtn);

    expect(pickColumnText(onConfirm.mock.calls[0][0])).toEqual(['A1', 'B1', 'C1']);

    await TestsEvent.triggerDrag(container.querySelector('.rc-picker-column'), [0, -100]);
    await sleep(100);
    expect(pickColumnText(onChange.mock.calls[0][0])).toEqual(['A2', 'B3', 'C5']);

    fireEvent.click(confirmBtn);
    expect(pickColumnText(onConfirm.mock.calls[1][0])).toEqual(['A2', 'B3', 'C5']);
  });

  it('setColumnValue of cascade columns', async () => {
    const onConfirm = jest.fn();

    const { container, pickerRef } = createPicker({
      showToolbar: true,
      columns: COLUMNS,
      onConfirm,
    });

    await waitFor(() => {
      pickerRef.current.setColumnValue(0, 'A2');
    });

    const confirmBtn = container.querySelector('.rc-picker__confirm');

    await fireEvent.click(confirmBtn);

    expect(pickColumnText(onConfirm.mock.calls[0][0])).toEqual(['A2', 'B3', 'C5']);

    await waitFor(() => {
      pickerRef.current.setColumnValue(1, 'B4');
    });

    await fireEvent.click(confirmBtn);
    expect(pickColumnText(onConfirm.mock.calls[1][0])).toEqual(['A2', 'B4', 'C7']);
  });

  it('setValues of cascade columns', async () => {
    const onConfirm = jest.fn();

    const { container, pickerRef } = createPicker({
      showToolbar: true,
      columns: COLUMNS,
      onConfirm,
    });

    await waitFor(() => {
      pickerRef.current.setValues(['A2', 'B4', 'C8']);
    });

    const confirmBtn = container.querySelector('.rc-picker__confirm');

    await fireEvent.click(confirmBtn);
    expect(pickColumnText(onConfirm.mock.calls[0][0])).toEqual(['A2', 'B4', 'C8']);

    await waitFor(() => {
      pickerRef.current.setValues(['A2', 'B3', 'C1']);
    });

    await fireEvent.click(confirmBtn);
    expect(pickColumnText(onConfirm.mock.calls[1][0])).toEqual(['A2', 'B3', 'C5']);
  });

  it('setColumnIndex of cascade columns', async () => {
    const onConfirm = jest.fn();

    const { container, pickerRef } = createPicker({
      showToolbar: true,
      columns: COLUMNS,
      onConfirm,
    });

    act(() => {
      pickerRef.current.setColumnIndex(0, 1);
    });

    await sleep(100);

    const confirmBtn = container.querySelector('.rc-picker__confirm');

    await fireEvent.click(confirmBtn);

    expect(pickColumnText(onConfirm.mock.calls[0][0])).toEqual(['A2', 'B3', 'C5']);
    act(() => {
      pickerRef.current.setColumnIndex(1, 1);
    });
    await sleep(500);

    await fireEvent.click(confirmBtn);

    expect(pickColumnText(onConfirm.mock.calls[1][0])).toEqual(['A2', 'B4', 'C7']);
  });

  it('setIndexes of cascade columns', async () => {
    const onConfirm = jest.fn();

    const { container, pickerRef } = createPicker({
      showToolbar: true,
      columns: COLUMNS,
      onConfirm,
    });

    act(() => {
      pickerRef.current.setIndexes([1, 0, 1]);
    });

    const confirmBtn = container.querySelector('.rc-picker__confirm');

    await fireEvent.click(confirmBtn);

    expect(pickColumnText(onConfirm.mock.calls[0][0])).toEqual(['A2', 'B3', 'C6']);
  });

  it('disabled in cascade', () => {
    const { container } = createPicker({
      showToolbar: true,
      columns: [
        COLUMNS[0],
        {
          ...COLUMNS[1],
          disabled: true,
        },
      ],
    });

    expect(container.querySelector('.rc-picker-column__item--disabled')).toMatchSnapshot();
  });

  it('should move to next option when default option is disabled', () => {
    const { container } = createPicker({
      columns: [
        {
          text: 'A1',
          disabled: true,
          children: [{ text: 'B1' }, { text: 'B2' }],
        },
        {
          text: 'A2',
          children: [{ text: 'B3' }, { text: 'B4' }],
        },
      ],
    });

    expect(container).toMatchSnapshot();
  });

  it('should move to first option when all options are disabled', () => {
    const { container } = createPicker({
      columns: [
        {
          text: 'A1',
          disabled: true,
          children: [
            { text: 'B1', disabled: true },
            { text: 'B2', disabled: true },
          ],
        },
        {
          text: 'A2',
          disabled: true,
          children: [
            { text: 'B3', disabled: true },
            { text: 'B4', disabled: true },
          ],
        },
      ],
    });

    expect(container).toMatchSnapshot();
  });
});
