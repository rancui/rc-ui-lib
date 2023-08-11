# RollingText 翻滚文本动效

### 介绍

文本翻滚动效，可以翻滚数字和其他类型文本。请升级 `rc-ui-lib` 到 >= 2.1.0 版本来使用该组件。
### 引入

```js
import { RollingText } from 'rc-ui-lib';
```

## 代码演示

### 基础用法

通过 `startNum` 设置起始数值，`targetNum` 设置目标数值。RollingText 组件会自动开始动画，从起始数值翻滚到目标数值。

```jsx
<RollingText startNum={0} targetNum={123} />
```

### 设置翻滚方向

通过 `direction` 属性设置数字的翻滚方向，默认为向下翻滚，设置为 `up` 即可向上翻滚。

```jsx
<RollingText startNum={0} targetNum={432} direction="up" />
```

### 设置各数位停止顺序

通过 `stopOrder` 属性设置动画各个数位的停止先后顺序。默认先停止高位，设置为 `rtl` 可以先从个位停止。

```jsx
<RollingText startNum={0} targetNum={54321} stopOrder="rtl" />
```

### 翻转非数字内容

使用 `textList` 属性设置非数字内容的翻转。组件会从数组的第一项翻转到最后一项，请确保数组长度大于等于 2，以及每一项的长度一致。

```jsx

export default () => {
  const textList = [
      'aaaaa',
      'bbbbb',
      'ccccc',
      'ddddd',
      'eeeee',
      'fffff',
      'ggggg',
    ];
  return <RollingText textList={textList} duration={1} />;
};
```

### 自定义样式

RollingText 组件提供了一些 CSS 变量，覆盖这些变量来自定义样式，也可以直接修改组件的样式。此外，你还可以通过 `height` 属性设置数字高度。

```jsx
<RollingText
  className="my-rolling-text"
  height={54}
  startNum={12345}
  targetNum={54321}
/>
```

```css
.my-rolling-text {
  --rc-rolling-text-background: #1989fa;
  --rc-rolling-text-color: white;
  --rc-rolling-text-font-size: 24px;
  --rc-rolling-text-gap: 6px;
  --rc-rolling-text-item-border-radius: 5px;
  --rc-rolling-text-item-width: 40px;
}
```

### 手动控制

通过 ref 获取到组件实例后，调用 `start`、`reset` 方法，`start` 方法用于开始动画，`reset` 方法用于重置动画。

```jsx
export default () => {
  const rollingTextRef = useRef<RollingTextInstance>();
  
    const start = () => {
      rollingTextRef.current.start();
    };
  
    const reset = () => {
      rollingTextRef.current.reset();
    };

    return (
      <>
        <rc-rolling-text
          ref="rollingTextRef"
          startNum={0}
          targetNum={54321}
          autoStart={false}
        />
        <rc-grid columnNum={2}>
          <rc-grid-item icon="play-circle-o" text="start" onClick={start} />
          <rc-grid-item icon="replay" text="reset" onClick={reset} />
        </rc-grid>
      </>
    )

}


```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| startNum | 起始数值 | _number_ | `0` |
| targetNum | 目标数值 | _number_ | - |
| textList | 内容数组，用于翻转非数字内容 | _string[]_ | `[]` |
| duration | 动画时长，单位为秒 | _number_ | `2` |
| direction | 文本翻滚方向，值为 `down` 和 `up` | _string_ | `down` |
| autoStart | 是否自动开始动画 | _boolean_ | `true` |
| stopOrder | 各个数位动画停止先后顺序，值为 `ltr` 和 `rtl` | _string_ | `ltr` |
| height | 数字高度，单位为 `px` | _number_ | `40` |

### 方法

通过 ref 可以获取到 RollingText 实例并调用实例方法，详见[组件实例方法](#/zh-CN/advanced-usage#zu-jian-shi-li-fang-fa)。

| 方法名 | 说明     | 参数 | 返回值 |
| ------ | -------- | ---- | ------ |
| start  | 开始动画 | -    | -      |
| reset  | 重置动画 | -    | -      |

### 类型定义

组件导出以下类型定义：

```ts
import type {
  RollingTextProps,
  RollingTextInstance,
  RollingTextDirection,
  RollingTextStopOrder,
} from 'rc-ui-lib';
```

`RollingTextInstance` 是组件实例的类型，用法如下：

```ts
import { ref } from 'vue';
import type { RollingTextInstance } from 'rc-ui-lib';

const rollingTextRef = ref<RollingTextInstance>();

rollingTextRef.value?.start();
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](#/zh-CN/config-provider)。

| 名称 | 默认值 | 描述 |
| --- | --- | --- |
| --rc-rolling-text-background | _inherit_ | 单个数位背景色 |
| --rc-rolling-text-color | _var(--rc-text-color)_ | 数字颜色 |
| --rc-rolling-text-font-size | _var(--rc-font-size-md)_ | 字体大小 |
| --rc-rolling-text-gap | _0px_ | 数位之间的间隔 |
| --rc-rolling-text-item-width | _15px_ | 单个数位宽度 |
| --rc-rolling-text-item-border-radius | _0px_ | 单个数位边框圆角 |
