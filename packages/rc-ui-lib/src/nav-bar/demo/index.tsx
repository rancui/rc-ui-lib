import React from 'react';
import { useNavigate } from 'react-router-dom';
import { components } from 'site-mobile-demo';
import NavBar from '..';
import { Toast, Icon } from '../..';
import './style.less';

export default (): React.ReactNode => {
  const navigate = useNavigate();
  const { DemoBlock, DemoSection } = components;
  const onClickLeft = () => navigate(-1);

  const onClickRight = () => Toast('按钮');
  return (
    <DemoSection>
      <DemoBlock title="基础用法">
        <NavBar title="标题" />
      </DemoBlock>
      <DemoBlock title="返回上级">
        <NavBar title="标题" leftArea="返回" leftArrow onClickLeft={onClickLeft} />
      </DemoBlock>
      <DemoBlock title="右侧按钮">
        <NavBar
          title="标题"
          leftArea="返回"
          rightArea="按钮"
          left-arrow
          onClickLeft={onClickLeft}
          onClickRight={onClickRight}
        />
      </DemoBlock>
      <DemoBlock title="自定义区域">
        <NavBar
          title="标题"
          left-text="返回"
          leftArrow
          rightArea={<Icon name="search" size="18" />}
        />
      </DemoBlock>
    </DemoSection>
  );
};
