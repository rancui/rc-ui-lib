/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import { render, cleanup, act, fireEvent } from '@testing-library/react';
import TestsEvent from '../../../tests/events';
import { sleep } from '../../../tests/utils';
import Picker, { PickerInstance, PickerProps } from '..';

const simpleColumn = ['1990', '1991', '1992', '1993', '1994', '1995'];
const columns = [
  {
    values: ['vip', 'normal'],
    className: 'column1',
  },
  {
    values: simpleColumn,
    className: 'column2',
  },
];

describe('Picker', () => {
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

  it('simple columns confirm & cancel event', async () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();

    const { container } = createPicker({
      showToolbar: true,
      columns: simpleColumn,
      onConfirm,
      onCancel,
    });

    const confirmBtn = container.querySelector('.rc-picker__confirm');
    const cancelBtn = container.querySelector('.rc-picker__cancel');

    fireEvent.click(confirmBtn);
    fireEvent.click(cancelBtn);

    expect(onConfirm).toHaveBeenCalledWith('1990', 0);
    expect(onCancel).toHaveBeenCalledWith('1990', 0);
  });

  it('multiple columns confirm & cancel event', async () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();

    const { container } = createPicker({
      showToolbar: true,
      columns,
      onConfirm,
      onCancel,
    });

    const confirmBtn = container.querySelector('.rc-picker__confirm');
    const cancelBtn = container.querySelector('.rc-picker__cancel');

    fireEvent.click(confirmBtn);
    fireEvent.click(cancelBtn);

    expect(onConfirm).toHaveBeenCalledWith(['vip', '1990'], [0, 0]);
    expect(onCancel).toHaveBeenCalledWith(['vip', '1990'], [0, 0]);
  });

  test('drag columns', async () => {
    const onChange = jest.fn();

    const { container } = createPicker({
      columns,
      onChange,
    });

    const column = container.querySelector('.rc-picker-column__wrapper');
    await TestsEvent.triggerDrag(column, [0, 0]);
    await TestsEvent.triggerDrag(column, [0, -100]);

    await sleep(500);
    expect(onChange).toHaveBeenCalledWith(['normal', '1990'], 0);
  });

  test('drag simple columns', async () => {
    const onChange = jest.fn();

    const { container } = createPicker({
      columns: simpleColumn,
      onChange,
    });

    const column = container.querySelector('.rc-picker-column__wrapper');
    await TestsEvent.triggerDrag(column, [0, -100]);

    await sleep(500);
    expect(onChange).toHaveBeenCalledWith('1995', 5);
  });

  test('column watch default index', async () => {
    const disabled = { disabled: true, text: 1 };
    const props: PickerProps = {
      columns: [disabled, ...simpleColumn],
      itemHeight: 50,
      visibleItemCount: 5,
      swipeDuration: 1000,
    };
    const { container, rerender } = createPicker(props);
    expect(container).toMatchSnapshot();

    const props2: PickerProps = {
      ...props,
      defaultIndex: 2,
    };
    rerender(<Picker {...props2} />);
    expect(container).toMatchSnapshot();
  });

  test('should render title correctly', async () => {
    const { container } = createPicker({
      columns,
      title: 'Custom title',
    });
    expect(container).toMatchSnapshot();
  });

  test('should render toolbar correctly', async () => {
    const { container } = createPicker({
      columns,
      toolbar: 'Custom toolbar',
    });
    expect(container).toMatchSnapshot();
  });

  test('should render option correctly', async () => {
    const { container } = createPicker({
      showToolbar: true,
      columns: ['foo', 'bar'],
      optionRender: (item) => item.toString(),
    });
    expect(container).toMatchSnapshot();
  });

  // test('click column item', async () => {
  //   const onChange = jest.fn();
  //   const columns = [
  //     { text: '杭州' },
  //     { text: '宁波' },
  //     { text: '温州', disabled: true },
  //     { text: '嘉兴', disabled: true },
  //   ];
  //   const { container, debug } = createPicker({
  //     columns,
  //     onChange,
  //   });

  //   const columnWrapper = container.querySelector('.rc-picker-column');
  //   await fireEvent.click(columnWrapper);

  //   const column = container.querySelectorAll('.rc-picker-column__item')[2];
  //   debug();
  //   await TestsEvent.triggerDrag(column, [0, 0]);
  //   // await fireEvent.click(column);
  //   expect(onChange).toHaveBeenCalledWith(columns[1], 1);
  // });

  test('toolbar-position prop', () => {
    const { container } = createPicker({
      showToolbar: true,
      toolbarPosition: 'bottom',
      columns,
    });
    expect(container).toMatchSnapshot();
  });

  test('columns-top、columns-bottom prop', () => {
    const { container } = createPicker({
      columnsTop: 'Custom Columns Top',
      columnsBottom: 'Custom Columns Bottom',
      columns,
    });
    expect(container).toMatchSnapshot();
  });

  test('watch columns change', () => {
    const onConfirm = jest.fn();
    const props: PickerProps = {
      showToolbar: true,
      columns: ['1', '2'],
      defaultIndex: 1,
      onConfirm,
    };
    const { container, rerender } = createPicker(props);
    const props2 = {
      ...props,
      columns: ['2', '3'],
    };
    rerender(<Picker {...props2} />);

    fireEvent.click(container.querySelector('.rc-picker__confirm'));
    expect(onConfirm).toHaveBeenCalledWith('3', 1);
  });

  test('should not reset index when columns unchanged', async () => {
    const onConfirm = jest.fn();
    const props: PickerProps = {
      showToolbar: true,
      columns: ['1', '2'],
      onConfirm,
    };
    const { container, rerender, pickerRef } = createPicker(props);
    act(() => {
      pickerRef.current.setIndexes([1]);
    });
    const props2 = {
      ...props,
      columns: ['1', '2'],
    };
    rerender(<Picker {...props2} />);

    fireEvent.click(container.querySelector('.rc-picker__confirm'));
    expect(onConfirm).toHaveBeenCalledWith('2', 1);
  });

  test('set rem item-height', () => {
    const originGetComputedStyle = window.getComputedStyle;

    window.getComputedStyle = () => ({ fontSize: '16px' } as CSSStyleDeclaration);
    const { container } = createPicker({
      columns: simpleColumn.slice(0, 2),
      itemHeight: '10rem',
    });
    expect(container).toMatchSnapshot();

    window.getComputedStyle = originGetComputedStyle;
  });

  test('readonly prop', async () => {
    const onChange = jest.fn();
    const { container } = createPicker({
      columns,
      readonly: true,
      onChange,
    });

    const column = container.querySelectorAll('.rc-picker-column__item')[3];
    await fireEvent.click(column);

    const columnWrapper = container.querySelector('.rc-picker-column__wrapper');
    await TestsEvent.triggerDrag(columnWrapper, [0, -100]);

    expect(onChange).not.toHaveBeenCalled();
  });

  test('set picker values', () => {
    const onConfirm = jest.fn();
    const props: PickerProps = {
      showToolbar: true,
      columns,
      onConfirm,
    };
    const { pickerRef } = createPicker(props);

    const vm = pickerRef.current;

    expect(vm.getColumnValues(-1)).toEqual(undefined);
    expect(vm.getColumnValues(1)).toHaveLength(6);
    expect(vm.getColumnValue(1)).toEqual('1990');

    act(() => {
      vm.setColumnValue(0, 'normal');
    });
    expect(vm.getColumnValue(0)).toEqual('normal');

    act(() => {
      vm.setColumnIndex(0, 0);
    });
    expect(vm.getColumnValue(0)).toEqual('vip');

    act(() => {
      vm.setColumnValue(1, '1991');
    });
    expect(vm.getColumnValue(1)).toEqual('1991');

    act(() => {
      vm.setColumnValues(0, ['vip', 'normal', 'other']);
    });
    expect(vm.getColumnValues(0)).toHaveLength(3);
    expect(vm.getValues()).toHaveLength(2);

    act(() => {
      vm.setColumnValues(-1, []);
    });
    expect(vm.getValues()).toHaveLength(2);

    act(() => {
      vm.setValues(['vip', '1992']);
    });
    expect(vm.getColumnIndex(1)).toEqual(2);
    expect(vm.getColumnIndex(2)).toEqual(0);
    expect(vm.getIndexes()).toEqual([0, 2]);

    act(() => {
      vm.setIndexes([1, 4]);
    });
    expect(vm.getColumnValue(1)).toEqual('1994');
    expect(vm.getColumnValue(2)).toEqual(undefined);
  });
});
