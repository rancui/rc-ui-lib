import React, { useState } from 'react';
import { components } from 'site-mobile-demo';
import { Cell, Toast, Field } from '../..';
import { NumberKeyboard } from '..';
import './style.less';

export default (): React.ReactNode => {
  const { DemoSection, DemoBlock } = components;

  const [visible, setVisible] = useState<any>('');
  const [value, setValue] = useState('');
  const openKeyboard = (name: string) => {
    setVisible(name);
  };

  const onInput = (e: string) => {
    setValue((v) => v + e);
  };

  const onDelete = () => {
    setValue((v) => v.slice(0, v.length - 1));
  };

  const actions = {
    onClose: () => {
      Toast.info('closed');
      setVisible('');
    },
    onInput: (key: string) => {
      Toast.info(key);
    },
    onDelete: () => {
      Toast.info('delete');
    },
    onBlur: () => {
      setVisible('');
    },
  };

  const titleLeft = <span>titleLeft</span>;

  return (
    <DemoSection>
      <DemoBlock card title="基础用法">
        <Cell onClick={() => openKeyboard('default')}>弹出默认键盘</Cell>
        <Cell onClick={() => openKeyboard('custom')}>弹出带右侧栏的键盘</Cell>
        <Cell onClick={() => openKeyboard('extraKey')}>弹出身份证号键盘</Cell>
        <Cell onClick={() => openKeyboard('title')}>弹出带标题的键盘</Cell>
        <Cell onClick={() => openKeyboard('multiExtraKey')}>弹出配置多个按键的键盘</Cell>
        <Cell onClick={() => openKeyboard('randomKeyOrder')}>弹出配置随机数字的键盘</Cell>
        <Field
          onClick={() => openKeyboard('bindValue')}
          label="绑定值"
          value={value}
          placeholder="点此输入"
        />
      </DemoBlock>
      <NumberKeyboard
        visible={visible === 'default'}
        onClose={actions.onClose}
        onInput={actions.onInput}
        onDelete={actions.onDelete}
        onBlur={actions.onBlur}
      />
      <NumberKeyboard
        visible={visible === 'custom'}
        closeButtonText="完成"
        theme="custom"
        extraKey="."
        onInput={actions.onInput}
        onDelete={actions.onDelete}
        onBlur={actions.onBlur}
      />
      <NumberKeyboard
        visible={visible === 'extraKey'}
        closeButtonText="完成"
        extraKey="X"
        onInput={actions.onInput}
        onDelete={actions.onDelete}
        onBlur={actions.onBlur}
      />
      <NumberKeyboard
        visible={visible === 'title'}
        title="自定义标题"
        closeButtonText="完成"
        titleLeft={titleLeft}
        extraKey="."
        onInput={actions.onInput}
        onDelete={actions.onDelete}
        onBlur={actions.onBlur}
      />
      <NumberKeyboard
        visible={visible === 'multiExtraKey'}
        closeButtonText="完成"
        theme="custom"
        extraKey={['00', '.']}
        onInput={actions.onInput}
        onDelete={actions.onDelete}
        onBlur={actions.onBlur}
      />
      <NumberKeyboard
        visible={visible === 'randomKeyOrder'}
        randomKeyOrder
        onInput={actions.onInput}
        onDelete={actions.onDelete}
        onBlur={actions.onBlur}
      />
      <NumberKeyboard
        visible={visible === 'bindValue'}
        onInput={onInput}
        onDelete={onDelete}
        onBlur={actions.onBlur}
      />
    </DemoSection>
  );
};
