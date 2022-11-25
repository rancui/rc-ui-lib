import React, { useState, useRef } from 'react';
import { Cell, Switch, Button } from 'rc-ui-lib';
import { components } from 'site-mobile-demo';
import Toast, { DropdownMenu } from '..';
import { DropdownMenuInstance } from '../PropsType';
import './style.less';

const option1 = [
  { text: '全部商品', value: 0 },
  { text: '新款商品', value: 1, icon: 'location-o' },
  {
    text: '活动商品',
    value: 2,
  },
];
const option2 = [
  { text: '默认排序', value: 'a' },
  { text: '好评排序', value: 'b' },
  { text: '销量排序', value: 'c' },
];

const scrollList = () => {
  const arr = new Array(30).fill(1);
  return arr.map((item, index) => {
    return {
      text: `scroll${index}`,
      value: `${index}`,
    };
  });
};

export default (): React.ReactNode => {
  const [value, setValue] = useState<Record<string, string | number>>({});
  const [menuValue, setMenuValue] = useState<Record<string, string | number>>({});
  const dropdownMenuRef = useRef<DropdownMenuInstance>(null);

  const { DemoBlock, DemoSection } = components;

  const onConfirm = (e) => {
    Toast(e);
    dropdownMenuRef.current?.close();
  };

  return (
    <DemoSection className="demo-badge">
      <DemoBlock title="基础用法">
        <DropdownMenu onChange={(v) => setMenuValue(v as any)}>
          <DropdownMenu.Item
            name="item1"
            defaultValue={{ text: '全部商品', value: 0 }}
            value={value}
            options={option1}
            onChange={(v) => setValue(v as any)}
          />
          <DropdownMenu.Item
            name="item2"
            defaultValue={{ text: '默认排序', value: 'a' }}
            value={value}
            options={option2}
            onChange={(v) => setValue(v as any)}
          />
        </DropdownMenu>
      </DemoBlock>
      <DemoBlock title="自定义菜单内容">
        <DropdownMenu ref={dropdownMenuRef}>
          <DropdownMenu.Item name="item1" options={option1} />
          <DropdownMenu.Item title="筛选" name="item2">
            <Cell center title="包邮" rightIcon={<Switch size={24} />} />
            <Cell center title="团购" rightIcon={<Switch size={24} />} />
            <div
              style={{
                height: '40px',
                paddingTop: '20px',
                paddingRight: '15px',
                paddingBottom: '20px',
                paddingLeft: '15px',
              }}
            >
              <Button type="danger" block round onClick={onConfirm}>
                确定
              </Button>
            </div>
          </DropdownMenu.Item>
        </DropdownMenu>
      </DemoBlock>
      <DemoBlock title="自定义选中颜色">
        <DropdownMenu activeColor="#1900ff" zIndex="3000">
          <DropdownMenu.Item name="item1" options={option1} teleport={document.body} />
          <DropdownMenu.Item name="item2" options={option2} />
        </DropdownMenu>
      </DemoBlock>
      <DemoBlock title="向上展开">
        <DropdownMenu direction="up" activeColor="#1900ff">
          <DropdownMenu.Item name="item1" options={option1} />
          <DropdownMenu.Item name="item2" options={option2} />
        </DropdownMenu>
      </DemoBlock>
      <DemoBlock title="禁用菜单">
        <DropdownMenu>
          <DropdownMenu.Item disabled name="item1" options={option1} />
          <DropdownMenu.Item disabled name="item2" options={option2} />
        </DropdownMenu>
      </DemoBlock>
      <DemoBlock title="滚动">
        <DropdownMenu direction="up">
          <DropdownMenu.Item name="item1" options={scrollList()} />
        </DropdownMenu>
      </DemoBlock>
    </DemoSection>
  );
};
