import React from 'react';
import { components } from 'site-mobile-demo';
import SwipeCell from '..';
import { Dialog, Button, Cell } from '../..';
import './style.less';

export default (): React.ReactNode => {
  const { DemoSection, DemoBlock } = components;

  const beforeClose = ({ position, instance }) => {
    switch (position) {
      case 'right':
        Dialog.confirm({
          title: 'confirm',
        }).then(() => {
          instance.close();
        });
        break;
      case 'left':
      case 'cell':
      case 'outside':
        instance.close();
        break;
      default:
        break;
    }
  };

  return (
    <DemoSection>
      <DemoBlock title="基础用法">
        <SwipeCell
          left={<Button square type="primary" text="选择" />}
          right={
            <>
              <Button square type="danger" text="删除" />
              <Button square type="primary" text="收藏" />
            </>
          }
        >
          <Cell title="单元格" value="内容" />
        </SwipeCell>
      </DemoBlock>
      <DemoBlock title="禁止滑动">
        <SwipeCell
          disabled
          left={<Button square type="primary" text="选择" />}
          right={
            <>
              <Button square type="danger" text="删除" />
              <Button square type="primary" text="收藏" />
            </>
          }
        >
          <Cell title="单元格" value="内容" />
        </SwipeCell>
      </DemoBlock>
      <DemoBlock title="异步关闭">
        <SwipeCell
          beforeClose={beforeClose}
          left={<Button square type="primary" text="选择" />}
          right={<Button square type="danger" text="删除" />}
        >
          <Cell title="单元格" value="内容" />
        </SwipeCell>
      </DemoBlock>
    </DemoSection>
  );
};
