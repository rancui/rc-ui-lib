# Divider 分割线

### 介绍

用于将内容分隔为多个区域。

### 引入

```js
import { Divider } from 'rc-ui-lib';
```

## 代码演示

### 基础用法

默认渲染一条水平分割线。

```jsx
<Divider />
```

### 展示文字

通过插槽在可以分割线中间插入内容。

```jsx
<Divider>文字</Divider>
```

### 内容位置

通过 `contentPosition` 指定内容所在位置。

```jsx
<Divider content-position="left">文字</Divider>
<Divider content-position="right">文字</Divider>
```

### 虚线

添加 `dashed` 属性使分割线渲染为虚线。

```jsx
<Divider dashed>文字</Divider>
```

### 自定义样式

可以直接通过 `style` 属性设置分割线的样式。

```jsx
<Divider style={{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }}>文字</Divider>
```

## API

### Props

| 参数            | 说明                              | 类型                  | 默认值   |
| --------------- | --------------------------------- | --------------------- | -------- |
| dashed          | 是否使用虚线                      | _boolean_             | `false`  |
| hairline        | 是否使用 0.5px 线                 | _boolean_             | `true`   |
| contentPosition | 内容位置，可选值为 `left` `right` | _string_              | `center` |
| className       | 类名                              | _string_              | -        |
| style           | style                             | _React.CSSProperties_ | -        |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](#/zh-CN/config-provider)。

| 名称                             | 默认值                   | 描述 |
| -------------------------------- | ------------------------ | ---- |
| --rc-divider-margin              | _var(--rc-padding-md) 0_ | -    |
| --rc-divider-text-color          | _var(--rc-gray-6)_       | -    |
| --rc-divider-font-size           | _var(--rc-font-size-md)_ | -    |
| --rc-divider-line-height         | _24px_                   | -    |
| --rc-divider-border-color        | _var(--rc-border-color)_ | -    |
| --rc-divider-content-padding     | _var(--rc-padding-md)_   | -    |
| --rc-divider-content-left-width  | _10%_                    | -    |
| --rc-divider-content-right-width | _10%_                    | -    |
