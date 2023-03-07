import React from 'react';
import { components } from 'site-mobile-demo';
import TextEllipsis from '..';
import './style.less';

export default (): React.ReactNode => {
  const { DemoBlock, DemoSection } = components;

  const text =
    'rc-ui-lib 是一个轻量、可定制的移动端组件库，于2021年开源。TextEllipsis组件对长文本进行省略，支持展开/收起。请升级到 >= 2.0.0 版本来使用该组件。';

  return (
    <DemoSection>
      <DemoBlock title="基础用法">
        <TextEllipsis content={text} />
      </DemoBlock>
      <DemoBlock title="展开/收起">
        <TextEllipsis content={text} expandText="展开" collapseText="收起" />
      </DemoBlock>
      <DemoBlock title="自定义展示行数">
        <TextEllipsis content={text} rows="3" expandText="展开" collapseText="收起" />
      </DemoBlock>
    </DemoSection>
  );
};
