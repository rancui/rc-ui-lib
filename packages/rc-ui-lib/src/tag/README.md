# Tag 标签

### 引入

```js
import { Tag } from 'rc-ui-lib';
```

## 代码演示

### 基础用法

通过 `type` 属性控制标签颜色。

```jsx
<Tag type="primary">标签</Tag>
<Tag type="success">标签</Tag>
<Tag type="danger">标签</Tag>
<Tag type="warning">标签</Tag>
```

### 空心样式

设置 `plain` 属性设置为空心样式。

```jsx
<Tag plain type="primary">
  标签
</Tag>
```

### 圆角样式

通过 `round` 设置为圆角样式。

```jsx
<Tag round type="primary">
  标签
</Tag>
```

### 标记样式

通过 `mark` 设置为标记样式(半圆角)。

```jsx
<Tag mark type="primary">
  标签
</Tag>
```

### 可关闭标签

添加 `closeable` 属性表示标签是可关闭的，关闭标签时会触发 `close` 事件，在 `close` 事件中可以执行隐藏标签的逻辑。

```jsx
<Tag show={show} closeable size="medium" type="primary" onClose={() => setShow(false)}>
  标签
</Tag>
```

### 标签大小

通过 `size` 属性调整标签大小。

```jsx
<Tag type="primary" size="mini">标签</Tag>
<Tag type="primary">标签</Tag>
<Tag type="primary" size="medium">标签</Tag>
<Tag type="primary" size="large">标签</Tag>
```

### 自定义颜色

通过 `color` 和 `textColor` 属性设置标签颜色。

```jsx
<Tag color="#7232dd">标签</Tag>
<Tag color="#ffe1e1" textColor="#ad0000">标签</Tag>
<Tag color="#7232dd" plain>标签</Tag>
```

## API

### Props

| 参数      | 说明                                                  | 类型      | 默认值    |
| --------- | ----------------------------------------------------- | --------- | --------- |
| type      | 类型，可选值为 `primary` `success` `danger` `warning` | _string_  | `default` |
| size      | 大小, 可选值为 `large` `medium`                       | _string_  | -         |
| color     | 标签颜色                                              | _string_  | -         |
| show      | 是否展示标签                                          | _boolean_ | `true`    |
| plain     | 是否为空心样式                                        | _boolean_ | `false`   |
| round     | 是否为圆角样式                                        | _boolean_ | `false`   |
| mark      | 是否为标记样式                                        | _boolean_ | `false`   |
| textColor | 文本颜色，优先级高于 `color` 属性                     | _string_  | `white`   |
| closeable | 是否为可关闭标签                                      | _boolean_ | `false`   |

### Events

| 事件名 | 说明           | 回调参数            |
| ------ | -------------- | ------------------- |
| onClick  | 点击时触发     | _event: MouseEvent_      |
| onClose  | 关闭标签时触发 | _event: MouseEvent_                   |


## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](#/zh-CN/config-provider)。

| 名称 | 默认值 | 描述 |
| --- | --- | --- |
| --rc-tag-padding | _0 var(--rc-padding-base)_ | - |
| --rc-tag-text-color | _var(--rc-white)_ | - |
| --rc-tag-font-size | _var(--rc-font-size-sm)_ | - |
| --rc-tag-border-radius | _2px_ | - |
| --rc-tag-line-height | _16px_ | - |
| --rc-tag-medium-padding | _2px 6px_ | - |
| --rc-tag-large-padding | _var(--rc-padding-base) var(--rc-padding-xs)_ | - |
| --rc-tag-large-border-radius | _var(--rc-border-radius-md)_ | - |
| --rc-tag-large-font-size | _var(--rc-font-size-md)_ | - |
| --rc-tag-round-border-radius | _var(--rc-border-radius-max)_ | - |
| --rc-tag-danger-color | _var(--rc-danger-color)_ | - |
| --rc-tag-primary-color | _var(--rc-primary-color)_ | - |
| --rc-tag-success-color | _var(--rc-success-color)_ | - |
| --rc-tag-warning-color | _var(--rc-warning-color)_ | - |
| --rc-tag-default-color | _var(--rc-gray-6)_ | - |
| --rc-tag-plain-background-color | _var(--rc-white)_ | - |
