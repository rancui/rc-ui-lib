import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import Column from './PickerColumn';
import { Loading } from '../loading';
import { PickerProps, PickerInstance } from './PropsType';
import useRefs from '../hooks/use-refs';
import { extend, preventDefault, unitToPx } from '../utils';
import { PickerObjectColumn } from '.';
import { BORDER_UNSET_TOP_BOTTOM } from '../utils/constant';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';
import useEventListener from '../hooks/use-event-listener';

const Picker = forwardRef<PickerInstance, PickerProps>((props, ref) => {
  const {
    columns = [],
    columnsFieldNames,
    itemHeight: itemHeightProp = 44,
    visibleItemCount = 5,
    swipeDuration = 1000,
    defaultIndex = 0,
    showToolbar = true,
    toolbarPosition = 'top',
    title,
    loading,
    readonly,
    cancelButtonText,
    confirmButtonText,
    toolbar,
    columnsTop,
    columnsBottom,
    optionRender,
    onChange,
    onConfirm,
    onCancel,
    className,
  } = props;

  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('picker', prefixCls);

  const [refs, setRefs] = useRefs();
  const [formattedColumns, setFormattedColumns] = useState([]);

  const {
    text: textKey,
    values: valuesKey,
    children: childrenKey,
  } = extend(
    {
      // compatible with valueKey prop
      text: 'text',
      values: 'values',
      children: 'children',
    },
    columnsFieldNames,
  );

  const wrapper = useRef<HTMLDivElement>(null);

  const itemHeight = useMemo(() => unitToPx(itemHeightProp), [itemHeightProp]);

  const dataType = useMemo(() => {
    const firstColumn = columns[0] || {};

    if (typeof firstColumn === 'object') {
      if (childrenKey in firstColumn) {
        return 'cascade';
      }
      if (valuesKey in firstColumn) {
        return 'object';
      }
    }
    return 'plain';
  }, [columns, childrenKey, valuesKey]);

  const formatCascade = () => {
    const formatted: PickerObjectColumn[] = [];

    let cursor: PickerObjectColumn = {
      [childrenKey]: columns,
    };

    while (cursor && cursor[childrenKey]) {
      const children = cursor[childrenKey];
      let columnDefaultIndex = cursor.defaultIndex ?? +defaultIndex;

      while (children[columnDefaultIndex] && children[columnDefaultIndex].disabled) {
        if (columnDefaultIndex < children.length - 1) {
          columnDefaultIndex++;
        } else {
          columnDefaultIndex = 0;
          break;
        }
      }

      formatted.push({
        [valuesKey]: cursor[childrenKey],
        className: cursor.className,
        defaultIndex: columnDefaultIndex,
      });

      cursor = children[columnDefaultIndex];
    }
    setFormattedColumns(formatted);
  };

  const format = () => {
    if (dataType === 'plain') {
      setFormattedColumns([
        {
          [valuesKey]: columns,
        },
      ]);
    } else if (dataType === 'cascade') {
      formatCascade();
    } else {
      setFormattedColumns(columns);
    }
  };

  // get indexes of all columns
  const getIndexes = () => refs.map((_ref) => _ref.getIndex());

  // set options of column by index
  const setColumnValues = (index: number, options) => {
    const column = refs[index];
    if (column) {
      column.setOptions(options);
    }
  };

  const onCascadeChange = (columnIndex: number) => {
    let cursor: PickerObjectColumn = {
      [childrenKey]: columns,
    };
    const indexes = getIndexes();

    for (let i = 0; i <= columnIndex; i += 1) {
      cursor = cursor[childrenKey][indexes[i]];
    }

    while (cursor && cursor[childrenKey]) {
      columnIndex += 1;
      setColumnValues(columnIndex, cursor[childrenKey]);
      cursor = cursor[childrenKey][cursor.defaultIndex || 0];
    }
  };

  // get column instance by index
  const getChild = (index: number) => refs[index];

  // get column value by index
  const getColumnValue = (index: number) => {
    const column = getChild(index);
    return column?.getValue() || undefined;
  };

  // set column value by index
  const setColumnValue = (index: number, value: string) => {
    const column = getChild(index);

    if (column) {
      column.setValue(value);

      if (dataType === 'cascade') {
        onCascadeChange(index);
      }
    }
  };

  // get column option index by column index
  const getColumnIndex = (index: number) => {
    const column = getChild(index);
    return column?.getIndex() || 0;
  };

  // set column option index by column index
  const setColumnIndex = (columnIndex: number, optionIndex: number) => {
    const column = getChild(columnIndex);

    if (column) {
      column.setIndex(optionIndex);
      if (dataType === 'cascade') {
        onCascadeChange(columnIndex);
      }
    }
  };

  // get options of column by index
  const getColumnValues = (index: number) => {
    const column = getChild(index);
    return column?.getOptions();
  };

  // get values of all columns
  const getValues = () => refs.map((_ref) => _ref.getValue());

  // set values of all columns
  const setValues = (values: string[]) => {
    values.forEach((value, index) => {
      setColumnValue(index, value);
    });
  };

  // set indexes of all columns
  const setIndexes = (indexes: []) => {
    indexes.forEach((optionIndex, columnIndex) => {
      setColumnIndex(columnIndex, optionIndex);
    });
  };

  const handleChange = (columnIndex: number) => {
    if (dataType === 'cascade') {
      onCascadeChange(columnIndex);
    }
    if (onChange) {
      if (dataType === 'plain') {
        onChange(getColumnValue(0), getColumnIndex(0));
      } else {
        onChange(getValues(), columnIndex);
      }
    }
  };

  const confirm = () => {
    if (onConfirm) {
      if (dataType === 'plain') {
        onConfirm(getColumnValue(0), getColumnIndex(0));
      } else {
        onConfirm(getValues(), getIndexes());
      }
    }
  };

  const cancel = () => {
    if (dataType === 'plain') {
      onCancel?.(getColumnValue(0), getColumnIndex(0));
    } else {
      onCancel?.(getValues(), getIndexes());
    }
  };

  const renderTitle = () => {
    if (title) {
      return <div className={classNames(bem('title'), 'rc-ellipsis')}>{title}</div>;
    }
    return null;
  };

  const renderCancel = () => {
    const text = cancelButtonText || '取消';
    return (
      <button type="button" className={classNames(bem('cancel'))} onClick={cancel}>
        {text}
      </button>
    );
  };

  const renderConfirm = () => {
    const text = confirmButtonText || '确认';
    return (
      <button type="button" className={classNames(bem('confirm'))} onClick={confirm}>
        {text}
      </button>
    );
  };

  const renderToolbar = () => {
    return showToolbar ? (
      <div className={classNames(bem('toolbar'))}>
        {toolbar || (
          <>
            {renderCancel()}
            {renderTitle()}
            {renderConfirm()}
          </>
        )}
      </div>
    ) : null;
  };

  const renderColumnItems = () =>
    formattedColumns.map((item, columnIndex) => (
      <Column
        key={String(columnIndex)}
        optionRender={optionRender}
        ref={setRefs(columnIndex)}
        textKey={textKey}
        readonly={readonly}
        className={item.className}
        itemHeight={itemHeight}
        defaultIndex={item.defaultIndex ?? +defaultIndex}
        swipeDuration={swipeDuration}
        visibleItemCount={visibleItemCount}
        initialOptions={item[valuesKey]}
        onChange={() => {
          handleChange(columnIndex);
        }}
      />
    ));

  const renderColumns = () => {
    const wrapHeight = itemHeight * visibleItemCount;
    const frameStyle = { height: `${itemHeight}px` };
    const columnsStyle = { height: `${wrapHeight}px` };
    const maskStyle = {
      backgroundSize: `100% ${(wrapHeight - itemHeight) / 2}px`,
    };

    return (
      <div ref={wrapper} className={classNames(bem('columns'))} style={columnsStyle}>
        {renderColumnItems()}
        <div className={classNames(bem('mask'))} style={maskStyle} />
        <div className={classNames(BORDER_UNSET_TOP_BOTTOM, bem('frame'))} style={frameStyle} />
      </div>
    );
  };

  useEffect(() => {
    format();
  }, [columns, dataType, valuesKey, childrenKey]);

  useEventListener('touchmove', preventDefault, {
    target: wrapper.current,
    depends: [wrapper.current],
  });

  useImperativeHandle(ref, () => ({
    confirm,
    getValues,
    setValues,
    getIndexes,
    setIndexes,
    getColumnIndex,
    setColumnIndex,
    getColumnValue,
    setColumnValue,
    getColumnValues,
    setColumnValues,
  }));

  return (
    <div className={classNames(bem(), className)}>
      {toolbarPosition === 'top' ? renderToolbar() : null}
      {loading ? <Loading className={classNames(bem('loading'))} /> : null}
      {columnsTop}
      {renderColumns()}
      {columnsBottom}
      {toolbarPosition === 'bottom' ? renderToolbar() : null}
    </div>
  );
});

Picker.displayName = 'Picker';

export default Picker;
