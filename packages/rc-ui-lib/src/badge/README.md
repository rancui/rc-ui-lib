# Badge 徽标

### 介绍

在右上角展示徽标数字或小红点。

### 引入

```js
import { Badge } from 'rc-ui-lib';
```

## 代码演示

### 基础用法

设置 `content` 属性后，Badge 会在子元素的右上角显示对应的徽标，也可以通过 `dot` 来显示小红点。

```jsx
<Badge content="5">
  <div className="child" />
</Badge>
<Badge content="10">
  <div className="child" />
</Badge>
<Badge content="Hot">
  <div className="child" />
</Badge>
<Badge dot>
  <div className="child" />
</Badge>

<style>
  .child {
    width: 40px;
    height: 40px;
    background: #f2f3f5;
    border-radius: 4px;
  }
</style>
```

### 最大值

设置 `max` 属性后，当 `content` 的数值超过最大值时，会自动显示为 `{max}+`。

```jsx
<Badge content="20" max="9">
  <div className="child" />
</Badge>
<Badge content="50" max="20">
  <div className="child" />
</Badge>
<Badge content="200" max="99">
  <div className="child" />
</Badge>
```

### 自定义颜色

通过 `color` 属性来设置徽标的颜色。

```jsx
<Badge content="5" color="#1989fa">
  <div className="child" />
</Badge>
<Badge content="10" color="#1989fa">
  <div className="child" />
</Badge>
<Badge dot color="#1989fa">
  <div className="child" />
</Badge>
```

### 自定义徽标内容

```jsx
<Badge content={<Icon name="success" className="badge-icon" />}>
  <div className="child" />
</Badge>
```

```css
.badge-icon {
  display: block;
  font-size: 10px;
  line-height: 16px;
}
```
### 自定义徽标位置

通过 `position` 属性来设置徽标的位置。

```jsx
<Badge content="10" position="top-left">
  <div className="child" />
</Badge>
<Badge content="10" position="bottom-left">
  <div className="child" />
</Badge>
<Badge content="10" position="bottom-right">
  <div className="child" />
</Badge>
```


### 独立展示

当 Badge 没有子元素时，会作为一个独立的元素进行展示。

```jsx
<Badge content="20" />

<Badge content="200" max="99" />
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 徽标内容 | _ReactNode_ | - |
| color | 徽标背景颜色 | _string_ | `#f44336` |
| dot | 是否展示为小红点 | _boolean_ | `false` |
| max | 最大值，超过最大值会显示 `{max}+`，仅当 content 为数字时有效 | _number \| string_ | - |
| offset | 设置徽标的偏移量，数组的两项分别对应水平和垂直方向的偏移量，默认单位为 `px` | _[number \| string, number \| string]_ | - |
| showZero | 当 content 为数字 0 时，是否展示徽标 | _boolean_ | `true` |
| position | 徽标位置，可选值为 `top-left` `bottom-left` `bottom-right` | _string_ | `top-right` |

### 事件

| 事件名  | 说明       | 回调参数       |
| ------- | ---------- | -------------- |
| onClick | 点击时触发 | _event: Event_ |

### 类型定义

组件导出以下类型定义：

```ts
import type { BadgeProps, BadgePosition, BadgeThemeVars } from 'rc-ui-lib';

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](#/zh-CN/config-provider)。

| 名称                        | 默认值                                                  | 描述 |
| --------------------------- | ------------------------------------------------------- | ---- |
| --rc-badge-size             | _16px_                                                  | -    |
| --rc-badge-color            | _var(--rc-white)_                                       | -    |
| --rc-badge-padding          | _0 3px_                                                 | -    |
| --rc-badge-font-size        | _var(--rc-font-size-sm)_                                | -    |
| --rc-badge-font-weight      | _var(--rc-font-weight-bold)_                            | -    |
| --rc-badge-border-width     | _var(--rc-border-width-base)_                           | -    |
| --rc-badge-background-color | _var(--rc-danger-color)_                                | -    |
| --rc-badge-dot-color        | _var(--rc-danger-color)_                                | -    |
| --rc-badge-dot-size         | _8px_                                                   | -    |
| --rc-badge-font-family      | _-apple-system-font, Helvetica Neue, Arial, sans-serif_ | -    |
