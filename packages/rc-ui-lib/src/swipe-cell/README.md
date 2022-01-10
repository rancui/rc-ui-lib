# SwipeCell 滑动单元格

### 介绍

可以左右滑动来展示操作按钮的单元格组件。

### 引入

```js
import { SwipeCell } from 'rc-ui-lib';
```

## 代码演示

### 基础用法

`SwipeCell` 组件提供了 `left` 和 `right` 两个 prop，用于定义两侧滑动区域的内容。

```js
import { SwipeCell, Button, Cell } from 'rc-ui-lib';

export default () => {
  return (
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
  );
};
```

### 基础用法

通过传入 `disabled` 属性， 可禁止滑动。

```js
import { SwipeCell, Button, Cell } from 'rc-ui-lib';

export default () => {
  return (
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
  );
};
```

### 异步关闭

通过传入 beforeClose 回调函数，可以自定义两侧滑动内容关闭时的行为。

```js
import { SwipeCell, Dialog, Button, Cell } from 'rc-ui-lib';

export default () => {
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
    <SwipeCell
      beforeClose={beforeClose}
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
  );
};
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 标识符，可以在事件参数中获取到 | _number \| string_ | `''` |
| leftWidth | 指定左侧滑动区域宽度，单位为 `px` | _number \| string_ | `auto` |
| rightWidth | 指定右侧滑动区域宽度，单位为 `px` | _number \| string_ | `auto` |
| beforeClose | 关闭前的回调函数，返回 `false` 可阻止关闭，支持返回 Promise | _(args) => boolean \| Promise\<boolean\>_ | - |
| disabled | 是否禁用滑动 | _boolean_ | `false` |
| left | 自定义左操作栏内容 | ReactNode | - |
| right | 自定义右操作栏内容 | ReactNode | - |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| onClick | 点击时触发 | _position: 'left' \| 'right' \| 'cell' \| 'outside'_ |
| onOpen | 打开时触发 | _{ name: string \| number, position: 'left' \| 'right' }_ |
| onClose | 关闭时触发 | _{ name: string \| number, position: 'left' \| 'right' \| 'cell' \| 'outside' }_ |

### beforeClose 参数

beforeClose 的第一个参数为对象，对象中包含以下属性：

| 参数名   | 说明             | 类型                                       |
| -------- | ---------------- | ------------------------------------------ |
| name     | 标识符           | _string \| number_                         |
| position | 关闭时的点击位置 | _'left' \| 'right' \| 'cell' \| 'outside'_ |

### 方法

通过 ref 可以获取到 SwipeCell 实例并调用实例方法，详见[组件实例方法](#/zh-CN/adrcced-usage#zu-jian-shi-li-fang-fa)。

| 方法名 | 说明             | 参数                      | 返回值 |
| ------ | ---------------- | ------------------------- | ------ |
| open   | 打开单元格侧边栏 | position: `left \| right` | -      |
| close  | 收起单元格侧边栏 | -                         | -      |

### 类型定义

组件导出以下类型定义：

```ts
import type {
  SwipeCellSide,
  SwipeCellProps,
  SwipeCellPosition,
  SwipeCellInstance,
} from 'rc-ui-lib';
```

`SwipeCellInstance` 是组件实例的类型，用法如下：

```ts
import { Ref } from 'React';
import type { SwipeCellInstance } from 'rc-ui-lib';

const swipeCellRef = Ref<SwipeCellInstance>();

swipeCellRef.current?.close();
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](#/zh-CN/config-provider)。

| 名称                                  | 默认值                                        | 描述 |
| ------------------------------------- | --------------------------------------------- | ---- |
| --rc-switch-cell-padding-top          | _var(--rc-cell-vertical-padding) - 1px_       | -    |
| --rc-switch-cell-padding-bottom       | _var(--rc-cell-vertical-padding) - 1px_       | -    |
| --rc-switch-cell-large-padding-top    | _var(--rc-cell-large-vertical-padding) - 1px_ | -    |
| --rc-switch-cell-large-padding-bottom | _var(--rc-cell-large-vertical-padding) - 1px_ | -    |
