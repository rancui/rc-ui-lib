# Sidebar 侧边导航

### 介绍

垂直展示的导航栏，用于在不同的内容区域之间进行切换。

### 引入

```js
import { Sidebar } from 'rc-ui-lib';
```

### 基础用法

通过 `value` 绑定当前选中项的索引。

```js
import React, { useState } from 'react';
import { Sidebar } from 'rc-ui-lib';

export default () => {
  const [active, setActive] = useState(0);
  return (
    <Sidebar value={active} onChange={setActive}>
      <Sidebar.Item title="标签名" />
      <Sidebar.Item title="标签名" />
      <Sidebar.Item title="标签名" />
    </Sidebar>
  );
};
```

### 禁用选项

通过 `disabled` 属性禁用选项。

```js
import React, { useState } from 'react';
import { Sidebar } from 'rc-ui-lib';
export default () => {
  const [active, setActive] = useState(0);
  return (
    <Sidebar value={active} onChange={setActive}>
      <Sidebar.Item title="标签名" />
      <Sidebar.Item title="标签名" disabled />
      <Sidebar.Item title="标签名" />
    </Sidebar>
  );
};
```

### 徽标提示

设置 `dot` 属性后，会在右上角展示一个小红点；设置 `badge` 属性后，会在右上角展示相应的徽标。

```js
import React, { useState } from 'react';
import { Sidebar } from 'rc-ui-lib';
export default () => {
  const [active, setActive] = useState(0);
  return (
    <Sidebar value={active} onChange={setActive}>
      <Sidebar.Item dot title="标签名" />
      <Sidebar.Item badge="5" title="标签名" />
      <Sidebar.Item badge="20" title="标签名" />
    </Sidebar>
  );
};
```

### 监听切换事件

设置 `change` 方法来监听切换导航项时的事件。

```js
import React, { useState } from 'react';
import { Sidebar, Toast } from 'rc-ui-lib';
export default () => {
  const [active, setActive] = useState(0);

  const onChange = (value: number) => {
    Toast(`点击了标签${value + 1}`);
    setActive(value);
  };
  return (
    <Sidebar value={active} onChange={onChange}>
      <Sidebar.Item title="标签名" />
      <Sidebar.Item title="标签名" />
      <Sidebar.Item title="标签名" />
    </Sidebar>
  );
};
```

## API

### Sidebar Props

| 参数  | 说明             | 类型               | 默认值 |
| ----- | ---------------- | ------------------ | ------ |
| value | 当前导航项的索引 | _number \| string_ | `0`    |

### Sidebar Events

| 事件名   | 说明             | 回调参数        |
| -------- | ---------------- | --------------- |
| onChange | 切换导航项时触发 | _index: number_ |

### SidebarItem Props

| 参数     | 说明                 | 类型               | 默认值  |
| -------- | -------------------- | ------------------ | ------- |
| title    | 内容                 | _string_           | `''`    |
| dot      | 是否显示右上角小红点 | _boolean_          | `false` |
| badge    | 图标右上角徽标的内容 | _number \| string_ | -       |
| disabled | 是否禁用该项         | _boolean_          | `false` |

### SidebarItem Events

| 事件名  | 说明       | 回调参数        |
| ------- | ---------- | --------------- |
| onClick | 点击时触发 | _index: number_ |

### 类型定义

组件导出以下类型定义：

```ts
import type { SidebarProps, SidebarItemProps } from 'vant';
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](#/zh-CN/config-provider)。

| 名称                                   | 默认值                             | 描述 |
| -------------------------------------- | ---------------------------------- | ---- |
| --rc-sidebar-width                     | _80px_                             | -    |
| --rc-sidebar-font-size                 | _var(--rc-font-size-md)_           | -    |
| --rc-sidebar-line-height               | _var(--rc-line-height-md)_         | -    |
| --rc-sidebar-text-color                | _var(--rc-text-color)_             | -    |
| --rc-sidebar-disabled-text-color       | _var(--rc-text-color-3)_           | -    |
| --rc-sidebar-padding                   | _20px var(--rc-padding-sm)_        | -    |
| --rc-sidebar-active-color              | _var(--rc-active-color)_           | -    |
| --rc-sidebar-background-color          | _var(--rc-background-color)_       | -    |
| --rc-sidebar-selected-font-weight      | _var(--rc-font-weight-bold)_       | -    |
| --rc-sidebar-selected-text-color       | _var(--rc-text-color)_             | -    |
| --rc-sidebar-selected-border-width     | _4px_                              | -    |
| --rc-sidebar-selected-border-height    | _16px_                             | -    |
| --rc-sidebar-selected-border-color     | _var(--rc-danger-color)_           | -    |
| --rc-sidebar-selected-background-color | _var(--rc-background-color-light)_ | -    |
