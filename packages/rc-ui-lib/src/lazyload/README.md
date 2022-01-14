# Lazyload 懒加载

### 介绍

当页面需要加载大量内容时，使用懒加载可以实现延迟加载页面可视区域外的内容，从而使页面加载更流畅。

### 引入

```js
import { Lazyload } from 'rc-ui-lib';
```

## 代码演示

### 图片懒加载

图片懒加载需要使用 `Lazyload.Image` 组件，将需要懒加载的图片放在 `image` 熟悉中，即可实现图片懒加载。

```js
import React from 'react';
import { Lazyload } from 'rc-ui-lib';
const images = [
  'https://img01.yzcdn.cn/vant/apple-1.jpg',
  'https://img01.yzcdn.cn/vant/apple-2.jpg',
];
export default () => {
  return (
    <>
      {images.map((image) => (
        <Lazyload.Image key={image} image={image} />
      ))}
    </>
  );
};
```

### 背景图懒加载

和图片懒加载不同，背景图懒加载需要设置 `type`为 `background`，需要注意的是必须声明容器高度。

```js
import React from 'react';
import { Lazyload } from 'rc-ui-lib';
const images = [
  'https://img01.yzcdn.cn/vant/apple-1.jpg',
  'https://img01.yzcdn.cn/vant/apple-2.jpg',
];
export default () => {
  return (
    <>
      {images.map((image) => (
        <Lazyload.Image type="background" key={image} height="300px" image={image} />
      ))}
    </>
  );
};
```

### 组件懒加载

将需要懒加载的组件放在 `Lazyload` 标签中，即可实现组件懒加载。

```js
import React from 'react';
import { Lazyload, Loading } from 'rc-ui-lib';
const images = [
  'https://img01.yzcdn.cn/vant/apple-1.jpg',
  'https://img01.yzcdn.cn/vant/apple-2.jpg',
];
export default () => {
  return (
    <>
      {images.map((image) => (
        <Lazyload key={image} loading={<Loading />}>
          <img alt="" src={image} width="100%" height="300" />
        </Lazyload>
      ))}
    </>
  );
};
```

## API

### LazyloadProps

| 参数            | 说明                          | 类型               | 默认值 |
| --------------- | ----------------------------- | ------------------ | ------ |
| children        | 懒加载模块                    | _React.ReactNode_  | -      |
| loading         | 加载时的组件                  | _React.ReactNode_  | -      |
| height          | 占位高度                      | _string_、_number_ | 0      |
| observer        | 是否使用 IntersectionObserver | _boolean_          | true   |
| forceVisible    | 是否强制展示                  | _boolean_          | false  |
| eventOptions    | 事件监听选项                  | _EventOptions_     |        |
| observerOptions | ObserverOptions               | _ObserverOptions_  | -      |

### LazyloadImageProps

| 参数            | 说明                          | 类型                   | 默认值  |
| --------------- | ----------------------------- | ---------------------- | ------- |
| image           | 图片地址                      | _string_               | -       |
| loading         | 加载时的图片                  | _string_               | -       |
| errorImage      | 错误时的图片                  | _string_               | -       |
| type            | 加载类型                      | `image`、 `background` | `image` |
| observer        | 是否使用 IntersectionObserver | _boolean_              | true    |
| eventOptions    | 事件监听选项                  | _EventOptions_         | -       |
| observerOptions | ObserverOptions               | _ObserverOptions_      | -       |

### Events

| 事件名   | 说明             | 回调参数 |
| -------- | ---------------- | -------- |
| onLoaded | 图片加载完时回调 | -        |

### ObserverOptions

| 参数       | 说明             | 类型                 | 默认值  |
| ---------- | ---------------- | -------------------- | ------- |
| root       | 适配器           | _Element_            | -       |
| rootMargin | 图片 URL 过滤    | _string_             | -       |
| threshold  | 是否能懒加载模块 | _number_、_number[]_ | `false` |

### EventOptions

| 参数            | 说明             | 类型       | 默认值          |
| --------------- | ---------------- | ---------- | --------------- |
| scrollContainer | 滚动的容器       | _Element_  | `document.body` |
| offset          | 偏移量           | _number_   | 0               |
| listenEvents    | 监听的事件       | _string[]_ | `scroll`等      |
| debounce        | 图片 URL 过滤    | _number_   | 300             |
| throttle        | 是否能懒加载模块 | _number_   | -               |

### 类型定义

组件导出以下类型定义：

```js
import type { LazyloadProps, LazyloadImageProps } from 'rc-ui-lib';
```
