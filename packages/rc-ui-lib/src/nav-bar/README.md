# NavBar 导航栏

### 介绍

为页面提供导航功能，常用于页面顶部。

### 引入

```js
import { NavBar } from 'rc-ui-lib';
```

## 代码演示

### 基础用法

通过 `title` 属性设置导航栏标题。

```jsx
<NavBar title="标题" />
```

### 返回上级

在导航栏实现返回上级功能。

```jsx
import { useHistory } from 'react-router-dom';
export default (): React.ReactNode => {
  const history = useHistory();
  const onClickLeft = () => history.goBack();
  return <NavBar title="标题" leftArea="返回" leftArrow onClickLeft={onClickLeft} />;
};
```

### 右侧按钮

在导航栏右侧添加可点击的按钮。

```jsx
import { Toast } from 'rc-ui-lib';
import { useHistory } from 'react-router-dom';
export default (): React.ReactNode => {
  const history = useHistory();
  const onClickLeft = () => history.goBack();
  const onClickRight = () => Toast('按钮');
  return (
    <NavBar
      title="标题"
      leftArea="返回"
      rightArea="按钮"
      left-arrow
      onClickLeft={onClickLeft}
      onClickRight={onClickRight}
    />
  );
};
```

### 自定义内容

自定义导航栏两侧的内容。

```jsx
import { Icon } from 'rc-ui-lib';
export default (): React.ReactNode => {
  return (
    <NavBar title="标题" leftArea="返回" rightArea={<Icon name="search" size="18" />} left-arrow />
  );
};
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | _string_\| _ReactNode_ | `''` |
| leftArea | 左侧区域 | _string_\| _ReactNode_ | `''` |
| rightArea | 右侧区域 | _string_\| _ReactNode_ | `''` |
| leftArrow | 是否显示左侧箭头 | _boolean_ | `false` |
| border | 是否显示下边框 | _boolean_ | `true` |
| fixed | 是否固定在顶部 | _boolean_ | `false` |
| placeholder | 固定在顶部时，是否在标签位置生成一个等高的占位元素 | _boolean_ | `false` |
| zIndex | 导航栏 z-index | _number \| string_ | `1` |
| safeAreaInsetTop | 是否开启[顶部安全区适配](#/zh-CN/advanced-usage#di-bu-an-quan-qu-gua-pei) | _boolean_ | `false` |

### Events

| 事件名       | 说明               | 回调参数            |
| ------------ | ------------------ | ------------------- |
| onClickLeft  | 点击左侧按钮时触发 | _event: MouseEvent_ |
| onClickRight | 点击右侧按钮时触发 | _event: MouseEvent_ |

### 类型定义

组件导出以下类型定义：

```ts
import type { NavBarProps } from 'rc-ui-lib';
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](#/zh-CN/config-provider)。

| 名称                          | 默认值                             | 描述 |
| ----------------------------- | ---------------------------------- | ---- |
| --rc-nav-bar-height           | _46px_                             | -    |
| --rc-nav-bar-background-color | _var(--rc-background-color-light)_ | -    |
| --rc-nav-bar-arrow-size       | _16px_                             | -    |
| --rc-nav-bar-icon-color       | _var(--rc-primary-color)_          | -    |
| --rc-nav-bar-text-color       | _var(--rc-primary-color)_          | -    |
| --rc-nav-bar-title-font-size  | _var(--rc-font-size-lg)_           | -    |
| --rc-nav-bar-title-text-color | _var(--rc-text-color)_             | -    |
| --rc-nav-bar-z-index          | _1_                                | -    |
