import React, { useState } from 'react';
import { Cell, Toast } from 'rc-ui-lib';
import { components } from 'site-mobile-demo';
import Radio from '..';
import './style.less';

let timer;

export default (): React.ReactNode => {
  const [value, setValue] = useState('1');
  const [cellValue, setCellValue] = useState('');

  const { DemoBlock, DemoSection } = components;

  return (
    <DemoSection>
      <DemoBlock title="基础用法">
        <div className="demo-radio-group">
          <RadioGroup defaultValue="1">
            <Radio name="1">单选框1</Radio>
            <Radio name="2">单选框2</Radio>
          </RadioGroup>
        </div>
      </DemoBlock>
      <DemoBlock title="水平排列">
        <div className="demo-radio-group">
          <RadioGroup defaultValue="1" direction="horizontal">
            <Radio name="1">单选框1</Radio>
            <Radio name="2">单选框2</Radio>
          </RadioGroup>
        </div>
      </DemoBlock>
      <DemoBlock title="禁用状态">
        <div className="demo-radio-group">
          <RadioGroup defaultValue="1" disabled>
            <Radio name="1">单选框1</Radio>
            <Radio name="2">单选框2</Radio>
          </RadioGroup>
        </div>
      </DemoBlock>
      <DemoBlock title="自定义形状">
        <div className="demo-radio-group">
          <RadioGroup defaultValue="1">
            <Radio name="1" shape="square">
              单选框1
            </Radio>
            <Radio name="2" shape="square">
              单选框2
            </Radio>
          </RadioGroup>
        </div>
      </DemoBlock>
      <DemoBlock title="自定义颜色">
        <div className="demo-radio-group">
          <RadioGroup defaultValue="1">
            <Radio name="1" checkedColor="#ee0a24">
              单选框1
            </Radio>
            <Radio name="2" checkedColor="#ee0a24">
              单选框2
            </Radio>
          </RadioGroup>
        </div>
      </DemoBlock>
      <DemoBlock title="自定义大小">
        <div className="demo-radio-group">
          <RadioGroup defaultValue="1">
            <Radio name="1" iconSize="24px">
              单选框1
            </Radio>
            <Radio name="2" iconSize="24px">
              单选框2
            </Radio>
          </RadioGroup>
        </div>
      </DemoBlock>
      <DemoBlock title="禁止文本点击">
        <div className="demo-radio-group">
          <RadioGroup defaultValue="1">
            <Radio name="1" labelDisabled>
              单选框1
            </Radio>
            <Radio name="2" labelDisabled>
              单选框2
            </Radio>
          </RadioGroup>
        </div>
      </DemoBlock>
      <DemoBlock title="异步更新">
        <div className="demo-radio-group">
          <RadioGroup
            value={value}
            onChange={(val) => {
              Toast.loading({ forbidClick: true });
              clearTimeout(timer);
              timer = setTimeout(() => {
                Toast.clear();
                setValue(val as string);
              }, 500);
            }}
          >
            <Radio name="1" labelDisabled>
              单选框 1
            </Radio>
            <Radio name="2" labelDisabled>
              单选框 2
            </Radio>
          </RadioGroup>
        </div>
      </DemoBlock>
      <DemoBlock title="搭配单元格组件使用">
        <RadioGroup value={cellValue}>
          <CellGroup>
            <Cell
              clickable
              title="单选框1"
              icon="shop-o"
              onClick={() => setCellValue('1')}
              rightIcon={<Radio name="1" />}
            />
            <Cell
              clickable
              title="单选框2"
              icon="shop-o"
              onClick={() => setCellValue('2')}
              rightIcon={<Radio name="2" />}
            />
          </CellGroup>
        </RadioGroup>
      </DemoBlock>
    </DemoSection>
  );
};
