import React, { useState } from 'react';
import { components } from 'site-mobile-demo';
import FloatingBubble from '..';
import './style.less';
import { Tabs, Toast } from '../..';

export default (): React.ReactNode => {
  const { DemoBlock, DemoSection } = components;
  const [active, setActive] = useState(0);
  return (
    <DemoSection>
      <DemoBlock>
        <Tabs active={active} onChange={(name: number) => setActive(name)}>
          <Tabs.TabPane title="基础用法">
            {active === 0 && <FloatingBubble icon="chat-o" onClick={() => Toast('点击气泡')} />}
          </Tabs.TabPane>
          <Tabs.TabPane title="自由拖拽和磁吸">
            {active === 1 && <FloatingBubble icon="chat-o" axis="xy" magnetic="x" />}
          </Tabs.TabPane>
        </Tabs>
      </DemoBlock>
    </DemoSection>
  );
};
