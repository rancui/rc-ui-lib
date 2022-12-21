import React, { useRef, useState } from 'react';
import { CountDown, Grid } from '../..';
import { components } from 'site-mobile-demo';
import './style.less';
import { CurrentTime } from 'rc-ui-lib/es/hooks/use-count-down';
import { CountDownInstance } from '../PropsType';

export default (): React.ReactNode => {
  const { DemoBlock, DemoSection } = components;
  const [time] = useState(30 * 60 * 60 * 1000);
  const CountDownRef = useRef<CountDownInstance>(null);

  const renderChildren = (timeData: CurrentTime) => {
    return (
      <>
        <span className="block">{timeData.hours}</span>
        <span className="colon">:</span>
        <span className="block">{timeData.minutes}</span>
        <span className="colon">:</span>
        <span className="block">{timeData.seconds}</span>
      </>
    );
  };
  const start = () => {
    CountDownRef.current.start();
  };
  const pause = () => {
    CountDownRef.current.pause();
  };
  const reset = () => {
    CountDownRef.current.reset();
  };

  return (
    <DemoSection className="demo-count-down">
      <DemoBlock title="基础用法">
        <CountDown time={time} />
      </DemoBlock>
      <DemoBlock title="自定义格式">
        <CountDown time={time} format="DD 天 HH 时 mm 分 ss 秒" />
      </DemoBlock>
      <DemoBlock title="毫秒级渲染">
        <CountDown millisecond time={time} format="HH:mm:ss:SS" />
      </DemoBlock>
      <DemoBlock title="自定义样式">
        <CountDown time={time} renderChildren={renderChildren} />
      </DemoBlock>
      <DemoBlock title="手动控制">
        <CountDown autoStart={false} millisecond format="ss:SSS" time="3000" ref={CountDownRef} />
        <Grid columnNum={3}>
          <Grid.Item icon="play-circle-o" text="开始" onClick={start} />
          <Grid.Item icon="pause-circle-o" text="暂停" onClick={pause} />
          <Grid.Item icon="replay" text="重置" onClick={reset} />
        </Grid>
      </DemoBlock>
    </DemoSection>
  );
};
