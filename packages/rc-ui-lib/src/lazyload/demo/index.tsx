import React from 'react';
import { components } from 'site-mobile-demo';
import { Loading } from '../..';
import Lazyload from '..';
import './style.less';

export default (): React.ReactNode => {
  const { DemoBlock, DemoSection } = components;
  const images = [
    'https://img01.yzcdn.cn/vant/apple-1.jpg',
    'https://img01.yzcdn.cn/vant/apple-2.jpg',
    'https://img01.yzcdn.cn/vant/apple-3.jpg',
    'https://img01.yzcdn.cn/vant/apple-4.jpg',
  ];
  const backgroundImageList = [
    'https://img.yzcdn.cn/vant/apple-5.jpg',
    'https://img.yzcdn.cn/vant/apple-6.jpg',
  ];
  const componentImageList = [
    'https://img.yzcdn.cn/vant/apple-8.jpg',
    'https://img.yzcdn.cn/vant/apple-7.jpg',
  ];
  const Spain = () => {
    return (
      <div className="spain-container">
        <Loading />
      </div>
    );
  };

  return (
    <DemoSection>
      <DemoBlock title="基础用法">
        {images.map((image) => (
          <Lazyload.Image observer={false} key={image} image={image} />
        ))}
      </DemoBlock>
      <DemoBlock title="背景图片懒加载">
        {backgroundImageList.map((image) => (
          <Lazyload.Image type="background" key={image} height="300px" image={image} />
        ))}
      </DemoBlock>
      <DemoBlock title="懒加载模块">
        {componentImageList.map((image) => (
          <Lazyload key={image} loading={<Spain />} height="250">
            <img alt="" src={image} width="100%" height="250" />
          </Lazyload>
        ))}
      </DemoBlock>
      <DemoBlock title="事件监听懒加载模块">
        {componentImageList.map((image) => (
          <Lazyload observer={false} key={image} loading={<Spain />}>
            <img alt="" src={image} width="100%" height="300" />
          </Lazyload>
        ))}
      </DemoBlock>
    </DemoSection>
  );
};
