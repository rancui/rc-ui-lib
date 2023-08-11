import React, { useRef, useState } from 'react';
import { components } from 'site-mobile-demo';
import { RollingText, Button, Grid } from '../..';
import './style.less';
import type { RollingTextInstance } from '../PropsType';

const textList = ['aaaaa', 'bbbbb', 'ccccc', 'ddddd', 'eeeee', 'fffff', 'ggggg'];

export default (): React.ReactNode => {
  const { DemoBlock, DemoSection } = components;

  const [isStart, setIsStart] = useState(false);
  const [isStart2, setIsStart2] = useState(false);
  const [isStart3, setIsStart3] = useState(false);
  const [isStart4, setIsStart4] = useState(false);

  const rollingTextRef = useRef<RollingTextInstance>();

  const start = () => {
    rollingTextRef.current.start();
  };

  const reset = () => {
    rollingTextRef.current.reset();
  };

  return (
    <DemoSection>
      <DemoBlock card title="基础用法">
        <RollingText startNum={0} targetNum={123} autoStart={isStart} />
        <div style={{ marginTop: '10px' }}>
          <Button onClick={() => setIsStart(true)} type="primary">
            向下翻滚
          </Button>
        </div>
      </DemoBlock>
      <DemoBlock card title="设置翻滚方向">
        <RollingText startNum={0} targetNum={432} direction="up" autoStart={isStart2} />
        <div style={{ marginTop: '10px' }}>
          <Button onClick={() => setIsStart2(true)} type="primary">
            向上翻滚
          </Button>
        </div>
      </DemoBlock>
      <DemoBlock card title="设置各数位停止顺序">
        <RollingText startNum={0} targetNum={54321} autoStart={isStart3} stopOrder="rtl" />
        <div style={{ marginTop: '10px' }}>
          <Button onClick={() => setIsStart3(true)} type="primary">
            翻滚
          </Button>
        </div>
      </DemoBlock>
      <DemoBlock card title="翻转非数字内容">
        <RollingText textList={textList} autoStart={isStart4} stopOrder="rtl" />
        <div style={{ marginTop: '10px' }}>
          <Button onClick={() => setIsStart4(true)} type="primary">
            翻滚
          </Button>
        </div>
      </DemoBlock>
      <DemoBlock card title="自定义样式">
        <RollingText
          className="my-rolling-text"
          startNum={12345}
          targetNum={54321}
          // autoStart={isStart5}
          height={54}
        />
      </DemoBlock>
      <DemoBlock card title="手动控制">
        <RollingText
          ref={rollingTextRef}
          className="my-rolling-text"
          startNum={12345}
          targetNum={54321}
          autoStart={false}
          height={54}
        />
        <Grid columnNum={2} style={{ marginTop: '10px' }}>
          <Grid.Item icon="play-circle-o" text="开始" onClick={start} />
          <Grid.Item icon="replay" text="重置" onClick={reset} />
        </Grid>
      </DemoBlock>
    </DemoSection>
  );
};
