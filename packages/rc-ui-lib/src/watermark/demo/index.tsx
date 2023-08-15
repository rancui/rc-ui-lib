import React, { useState } from 'react';
import { components } from 'site-mobile-demo';
import Watermark from '..';
import { Button } from '../..';
import './style.less';

export default (): React.ReactNode => {
  const { DemoBlock, DemoSection } = components;
  const [fullPage, setFullPage] = useState(false);
  return (
    <DemoSection>
      <DemoBlock title="文字水印">
        <div className="demo-watermark-wrapper">
          <Watermark content="rc-ui-lib" />
        </div>
      </DemoBlock>
      <DemoBlock title="图片水印">
        <div className="demo-watermark-wrapper">
          <Watermark image="https://rancui.github.io/rc-ui-lib/rc-ui-lib.png" opacity={0.2} />
        </div>
      </DemoBlock>
      <DemoBlock title="自定义间隔">
        <div className="demo-watermark-wrapper">
          <Watermark image="https://rancui.github.io/rc-ui-lib/rc-ui-lib.png" gapX={30} gapY={10} />
        </div>
      </DemoBlock>
      <DemoBlock title="自定义倾斜角度">
        <div className="demo-watermark-wrapper">
          <Watermark
            image="https://rancui.github.io/rc-ui-lib/rc-ui-lib.png"
            rotate="22"
            opacity={0.2}
          />
        </div>
      </DemoBlock>
      <DemoBlock title="显示范围">
        <Button type="primary" onClick={() => setFullPage((v) => !v)}>
          切换
        </Button>
        <div className="demo-watermark-wrapper">
          <Watermark image="https://rancui.github.io/rc-ui-lib/rc-ui-lib.png" fullPage={fullPage} />
        </div>
      </DemoBlock>
      <DemoBlock title="HTML 水印">
        <div className="demo-watermark-wrapper">
          <Watermark width={150}>
            <div style={{ background: 'linear-gradient(45deg, #000 0, #000 50%, #fff 50%)' }}>
              <p style={{ mixBlendMode: 'difference', color: '#fff' }}>rc watermark</p>
            </div>
          </Watermark>
        </div>
      </DemoBlock>
    </DemoSection>
  );
};
