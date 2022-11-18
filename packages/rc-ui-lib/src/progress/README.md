# Progress 进度条

### 介绍

用于展示操作的当前进度。

### 引入

```js
import { Progress } from 'rc-ui-lib';
```

## 代码演示

### 基础用法

进度条默认为蓝色，使用 `percentage` 属性来设置当前进度。

```jsx
<Progress percentage={50} />
```

### 线条粗细

通过 `strokeWidth` 可以设置进度条的粗细。

```jsx
<Progress percentage={50} stroke-width="8" />
```

### 置灰

设置 `inactive` 属性后进度条将置灰。

```jsx
<Progress inactive percentage={50} />
```

### 样式定制

可以使用 `pivotText` 属性自定义文字，`color` 属性自定义进度条颜色。

```jsx
<Progress pivotText="橙色" color="#f2826a" percentage={25} />
<Progress pivotText="红色" color="#ee0a24" percentage={50} />
<Progress
  percentage="75"
  pivotText="紫色"
  pivotColor="#7232dd"
  color="linear-gradient(to right, #be99ff, #7232dd)"
/>
```

## API

### Props

| 参数        | 说明                       | 类型               | 默认值       |
| ----------- | -------------------------- | ------------------ | ------------ |
| percentage  | 进度百分比                 | _number \| string_ | `0`          |
| strokeWidth | 进度条粗细，默认单位为`px` | _number \| string_ | `4px`        |
| color       | 进度条颜色                 | _string_           | `#1989fa`    |
| trackColor  | 轨道颜色                   | _string_           | `#e5e5e5`    |
| pivotText   | 进度文字内容               | _string_           | 百分比       |
| pivotColor  | 进度文字背景色             | _string_           | 同进度条颜色 |
| textColor   | 进度文字颜色               | _string_           | `white`      |
| inactive    | 是否置灰                   | _boolean_          | `false`      |
| showPivot   | 是否显示进度文字           | _boolean_          | `true`       |

### 类型定义

组件导出以下类型定义：

```ts
import type { ProgressProps, ProgressInstance } from 'rc-ui-lib';
```

`ProgressInstance` 是组件实例的类型，用法如下：

```tsx
import { useRef } from 'react';
import type { ProgressInstance } from 'rc-ui-lib';

const progressRef = useRef<ProgressInstance>();

progressRef.value?.resize();
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](#/zh-CN/config-provider)。

| 名称                                 | 默认值                    | 描述 |
| ------------------------------------ | ------------------------- | ---- |
| --rc-progress-height                 | _4px_                     | -    |
| --rc-progress-color                  | _var(--rc-primary-color)_ | -    |
| --rc-progress-inactive-color         | _var(--rc-gray-5)_        | -    |
| --rc-progress-background-color       | _var(--rc-gray-3)_        | -    |
| --rc-progress-pivot-padding          | _0 5px_                   | -    |
| --rc-progress-pivot-text-color       | _var(--rc-white)_         | -    |
| --rc-progress-pivot-font-size        | _var(--rc-font-size-xs)_  | -    |
| --rc-progress-pivot-line-height      | _1.6_                     | -    |
| --rc-progress-pivot-background-color | _var(--rc-primary-color)_ | -    |
