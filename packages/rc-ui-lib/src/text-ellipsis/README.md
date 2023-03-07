# TextEllipsis 文本省略

### 介绍

对长文本进行省略，支持展开/收起。请升级到 >= 2.0.0 版本来使用该组件。

### 引入

通过以下方式来全局注册组件，更多注册方式请参考[组件注册](#/zh-CN/advanced-usage#zu-jian-zhu-ce)。

```js
import { TextEllipsis } from 'rc-ui-lib';
```

## 代码演示

### 基础用法

默认展示 `1` 行，超过 `1` 行显示省略号。

```tsx
import { useState } from 'react';
import { TextEllipsis } from 'rc-ui-lib';

export default () => {
  const text =
    'Rc-ui-lib 是一个轻量、可定制的移动端React组件库，于 2021 年开源。50+ 个高质量组件，覆盖移动端各类场景，单元测试覆盖率超过 95%，提供稳定性保障, 支持按需引入、主题定制、Typescript。';
  return (
    <>
      <TextEllipsis content={text} />
    </>
  );
};
```

### 展开/收起

超过行数支持展开/收起。

```tsx
import { useState } from 'react';
import { TextEllipsis } from 'rc-ui-lib';

export default () => {
  const text =
    'Rc-ui-lib 是一个轻量、可定制的移动端React组件库，于 2021 年开源。50+ 个高质量组件，覆盖移动端各类场景，单元测试覆盖率超过 95%，提供稳定性保障, 支持按需引入、主题定制、Typescript。';
  return (
    <>
      <TextEllipsis content={text} expandText="展开" collapseText="收起" />
    </>
  );
};
```

### 自定义展示行数

通过设置 `rows` 限制展示行数。

```tsx
import { useState } from 'react';
import { TextEllipsis } from 'rc-ui-lib';

export default () => {
  const text =
    'Rc-ui-lib 是一个轻量、可定制的移动端React组件库，于 2021 年开源。50+ 个高质量组件，覆盖移动端各类场景，单元测试覆盖率超过 95%，提供稳定性保障, 支持按需引入、主题定制、Typescript。';
  return (
    <>
      <TextEllipsis content={text} rows="3" expandText="展开" collapseText="收起" />
    </>
  );
};
```

## API

### Props

| 参数          | 说明           | 类型               | 默认值 |
| ------------- | -------------- | ------------------ | ------ |
| rows          | 展示的行数     | _number \| string_ | `1`    |
| content       | 需要展示的文本 | _string_           | -      |
| expand-text   | 展开操作的文案 | _string_           | -      |
| collapse-text | 收起操作的文案 | _string_           | -      |

### Events

| 事件         | 说明                | 回调参数            |
| ------------ | ------------------- | ------------------- |
| click-action | 点击展开/收起时触发 | _event: MouseEvent_ |

### 类型定义

组件导出以下类型定义：

```ts
import type { TextEllipsisProps } from 'rc-ui-lib';
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](#/zh-CN/config-provider)。

| 名称                            | 默认值           | 描述           |
| ------------------------------- | ---------------- | -------------- |
| --rc-text-ellipsis-action-color | _var(--rc-blue)_ | 操作按钮的颜色 |
| --rc-text-ellipsis-line-height  | _1.6_            | 文本的行高     |
