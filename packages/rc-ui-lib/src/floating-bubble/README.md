# FloatingBubble 浮动气泡

### 介绍

悬浮在页面边缘的可点击气泡。请升级 `rc-ui-lib` 到 >= 2.1.0 版本来使用该组件。

### 引入

```js
import { FloatingBubble } from 'rc-ui-lib';
```

## 代码演示

### 基础用法

浮动气泡默认展示在右下角，并允许在 y 轴方向上下拖拽，你可以通过 `icon` 属性设置气泡的图标。

```jsx
const onClick = () => {
  Toast('点击气泡');
};
<FloatingBubble icon="chat" onClick={onClick} />;
```

### 自由拖拽和磁吸

允许 x 和 y 轴方向拖拽，吸附到 x 轴方向最近一边。

```jsx
const onOffsetChange = (offset) => {
  Toast(`x: ${offset.x.toFixed(0)}, y: ${offset.y.toFixed(0)}`);
};
<FloatingBubble axis="xy" icon="chat" magnetic="x" onOffsetChange={onOffsetChange} />;
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| offset | 气泡初始位置 | _OffsetType_ | `默认右下角坐标` |
| axis | 拖拽的方向，`xy` 代表自由拖拽，`lock` 代表禁止拖拽 | _'x' \| 'y' \| 'xy' \| 'lock'_ | `y` |
| magnetic | 自动磁吸的方向 | _'x' \| 'y'_ | - |
| icon | 气泡图标名称或图片链接，等同于 Icon 组件的 name 属性 | _string_ | - |
| gap | 气泡与窗口的最小间距，单位为 `px` | _number_ | `24` |
| teleport | 指定挂载的节点 | _HTMLElment () => HTMLElement_ | `body` |

### Events

| 事件名         | 说明                         | 回调参数                 |
| -------------- | ---------------------------- | ------------------------ |
| onClick        | 点击组件时触发               | _MouseEvent_             |
| onOffsetChange | 由用户拖拽结束位置改变后触发 | _{x: string, y: string}_ |

### 类型定义

组件导出以下类型定义：

```ts
export type {
  FloatingBubbleProps,
  FloatingBubbleThemeVars,
  FloatingBubbleAxis,
  FloatingBubbleMagnetic,
  FloatingBubbleOffset,
  FloatingBubbleBoundary,
} from 'rc-ui-lib';
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](#/zh-CN/config-provider)。

| 名称                               | 默认值                               | 描述 |
| ---------------------------------- | ------------------------------------ | ---- |
| --rc-floating-bubble-size          | _48px_                               | -    |
| --rc-floating-bubble-initial-gap   | _24px_                               | -    |
| --rc-floating-bubble-icon-size     | _28px_                               | -    |
| --rc-floating-bubble-background    | _var(--rc-primary-color)_            | -    |
| --rc-floating-bubble-color         | _var(--rc-primary-color)_            | -    |
| --rc-floating-bubble-z-index       | _999_                                | -    |
| --rc-floating-bubble-border-radius | _--rc-floating-bubble-border-radius_ | -    |
