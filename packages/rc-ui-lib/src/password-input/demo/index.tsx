import React, { useState } from 'react';
import { components } from 'site-mobile-demo';
import PasswordInput from '..';
import { Toast, NumberKeyboard } from '../..';
import './style.less';

const initialValue = {
  showInfo: '123',
  addGutter: '123',
  basicUsage: '123',
  removeMask: '123',
  customLength: '123',
};

export default (): React.ReactNode => {
  const { DemoSection, DemoBlock } = components;

  const [visible, setVisible] = useState<boolean>(false);
  const [values, setValues] = useState(initialValue);

  const [current, setCurrent] = useState('basicUsage');

  const handleFocuse = (type) => {
    setCurrent(type);
    setVisible(true);
  };

  const numberKeyboardActions = {
    onClose: () => {
      Toast.info('closed');
      setVisible(false);
    },
    onInput: (key: string) => {
      setValues((v) => {
        return {
          ...v,
          [current]: v[current] + key,
        };
      });
    },
    onDelete: () => {
      setValues((v) => {
        return {
          ...v,
          [current]: v[current].slice(0, v[current].length - 1),
        };
      });
    },
    onBlur: () => {
      setVisible(false);
    },
  };

  return (
    <DemoSection>
      <DemoBlock card title="基础用法">
        <PasswordInput
          value={values.customLength}
          focused={current === 'basicUsage'}
          onFocus={() => handleFocuse('basicUsage')}
        />
      </DemoBlock>
      <DemoBlock card title="自定义长度">
        <PasswordInput
          value={values.customLength}
          length={4}
          focused={current === 'customLength'}
          onFocus={() => handleFocuse('customLength')}
        />
      </DemoBlock>
      <DemoBlock card title="基础用法">
        <PasswordInput
          value={values.customLength}
          length={4}
          focused={current === 'customLength'}
          onFocus={() => handleFocuse('customLength')}
        />
      </DemoBlock>
      <DemoBlock card title="基础用法">
        <PasswordInput
          value={values.customLength}
          length={4}
          focused={current === 'customLength'}
          onFocus={() => handleFocuse('customLength')}
        />
      </DemoBlock>
      <DemoBlock card title="基础用法">
        <PasswordInput
          value={values.customLength}
          length={4}
          focused={current === 'customLength'}
          onFocus={() => handleFocuse('customLength')}
        />
      </DemoBlock>
      <DemoBlock card title="基础用法">
        <PasswordInput
          value={values.customLength}
          length={4}
          focused={current === 'customLength'}
          onFocus={() => handleFocuse('customLength')}
        />
      </DemoBlock>
      <NumberKeyboard
        visible={visible}
        onClose={numberKeyboardActions.onClose}
        onInput={numberKeyboardActions.onInput}
        onDelete={numberKeyboardActions.onDelete}
        onBlur={numberKeyboardActions.onBlur}
      />
    </DemoSection>
  );
};
