import React, { useRef, useState, useEffect } from 'react';
import { components } from 'site-mobile-demo';
import PasswordInput from '..';
import { NumberKeyboard } from '../..';
import './style.less';

const initialValue = {
  nativeInput: '123',
  showInfo: '123',
  addGutter: '123',
  basicUsage: '123',
  removeMask: '123',
  customLength: '123',
};

export default (): React.ReactNode => {
  const { DemoSection, DemoBlock } = components;

  const [values] = useState(initialValue);
  const [current, setCurrent] = useState(null);

  const [errorInfo, setErrorInfo] = useState<string>('');

  const basicUsageRef = useRef(null);
  const nativeInputRef = useRef(null);
  const customLengthRef = useRef(null);
  const addGutterRef = useRef(null);
  const removeMaskRef = useRef(null);
  const showInfoRef = useRef(null);

  const refMap = {
    showInfo: showInfoRef,
    nativeInput: nativeInputRef,
    addGutter: addGutterRef,
    basicUsage: basicUsageRef,
    removeMask: removeMaskRef,
    customLength: customLengthRef,
  };

  useEffect(() => {
    if (current) {
      const el = refMap[current].current;
      const { top } = el.getBoundingClientRect();
      window.scrollTo(0, window.pageYOffset + top);
    }
  }, [current]);

  const handleFocus = (type) => {
    setCurrent(type);
  };

  const handleBlur = () => {
    setCurrent('');
  };

  const handleChange = (value, type) => {
    console.log(value, type);
  };

  const handleFill = () => {
    setErrorInfo('密码错误');
  };

  return (
    <DemoSection>
      <DemoBlock ref={basicUsageRef} card title="基础用法">
        <PasswordInput
          value={values.basicUsage}
          focused={current === 'basicUsage'}
          onFocus={() => handleFocus('basicUsage')}
          onBlur={handleBlur}
          onChange={(value) => handleChange(value, 'basicUsage')}
          keyboard={<NumberKeyboard />}
        />
      </DemoBlock>
      <DemoBlock ref={nativeInputRef} card title="原生键盘用法">
        <PasswordInput
          value={values.nativeInput}
          focused={current === 'nativeInput'}
          onFocus={() => handleFocus('nativeInput')}
          onBlur={handleBlur}
          onChange={(value) => handleChange(value, 'nativeInput')}
        />
      </DemoBlock>
      <DemoBlock ref={customLengthRef} card title="自定义长度">
        <PasswordInput
          value={values.customLength}
          length={4}
          focused={current === 'customLength'}
          onFocus={() => handleFocus('customLength')}
          onBlur={handleBlur}
          onChange={(value) => handleChange(value, 'customLength')}
          keyboard={<NumberKeyboard />}
        />
      </DemoBlock>
      <DemoBlock ref={addGutterRef} card title="格子间距">
        <PasswordInput
          value={values.addGutter}
          gutter={10}
          focused={current === 'addGutter'}
          onFocus={() => handleFocus('addGutter')}
          onBlur={handleBlur}
          onChange={(value) => handleChange(value, 'addGutter')}
          keyboard={<NumberKeyboard />}
        />
      </DemoBlock>
      <DemoBlock ref={removeMaskRef} card title="明文展示">
        <PasswordInput
          value={values.removeMask}
          mask={false}
          focused={current === 'removeMask'}
          onBlur={handleBlur}
          onFocus={() => handleFocus('removeMask')}
          keyboard={<NumberKeyboard />}
        />
      </DemoBlock>
      <DemoBlock ref={showInfoRef} card title="提示信息">
        <PasswordInput
          value={values.showInfo}
          info="密码为 6 位数字"
          errorInfo={errorInfo}
          onFill={handleFill}
          focused={current === 'showInfo'}
          onFocus={() => handleFocus('showInfo')}
          onBlur={handleBlur}
          onChange={(value) => handleChange(value, 'showInfo')}
          keyboard={<NumberKeyboard />}
        />
      </DemoBlock>
    </DemoSection>
  );
};
