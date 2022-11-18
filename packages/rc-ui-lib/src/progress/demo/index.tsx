import React, { useState } from 'react';
import { components } from 'site-mobile-demo';
import Progress from '..';
import { Button } from '../..';
import './style.less';

export default (): React.ReactNode => {
  const { DemoBlock, DemoSection } = components;
  const [value, setValue] = useState(50);

  const add = () => {
    setValue((e) => e + 20);
  };

  const reduce = () => {
    setValue((e) => e - 20);
  };

  return (
    <DemoSection className="demo-slider">
      <DemoBlock title="基础用法">
        <Progress percentage={50} />
      </DemoBlock>
      <DemoBlock title="线条粗细">
        <Progress percentage={50} strokeWidth="8" />
      </DemoBlock>
      <DemoBlock title="置灰">
        <Progress inactive percentage={50} />
      </DemoBlock>
      <DemoBlock title="样式定制">
        <Progress pivotText="橙色" color="#f2826a" percentage={25} />
        <Progress pivotText="红色" color="#ee0a24" percentage={50} />
        <Progress
          percentage="75"
          pivotText="紫色"
          pivotColor="#7232dd"
          color="linear-gradient(to right, #be99ff, #7232dd)"
        />
      </DemoBlock>
      <DemoBlock title="过渡效果">
        <Progress percentage={value} />
        <Button type="primary" size="small" onClick={add} text="增加" />
        <Button type="danger" size="small" onClick={reduce} text="减少" />
      </DemoBlock>
    </DemoSection>
  );
};
