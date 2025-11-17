# Card 卡片

## 介绍

最基础的卡片容器，可承载文字、列表、图片、段落。

```js
import { Card } from 'rc-ui-lib';
```

## 代码演示

### 基础用法

```jsx
import React from 'react';
import { Card } from 'rc-ui-lib';
export default () => {
  return (
    <Card>
      <Card.Header>卡片标题</Card.Header>
      <Card.Body>卡片内容区域</Card.Body>
    </Card>
  );
};
```

### 圆角卡片

`round`属性开启圆角样式

```jsx
import React from 'react';
import { Card } from 'rc-ui-lib';
export default () => {
  return (
    <Card round>
      <Card.Header>圆角卡片</Card.Header>
      <Card.Body>卡片内容区域</Card.Body>
    </Card>
  );
};
```

### 底部内容

通过 `Card.Footer` 设置底部内容。

```jsx
import React from 'react';
import { Card, Button } from 'rc-ui-lib';

export default () => {
  return (
    <Card round>
      <Card.Header>卡片标题</Card.Header>
      <Card.Body>
        rc-ui-lib 是一套轻量、可靠的移动端 React 组件库，提供了丰富的基础组件和业务组件，帮助开发者快速搭建移动应用。
      </Card.Body>
      <Card.Footer>
        <Button type="primary" round block size="small">
          查看更多
        </Button>
      </Card.Footer>
    </Card>
  );
};
```

### 封面展示

使用 `Card.Cover` 可以方便的展示封面，随意调整位置

```jsx
<Card round style={{ margin: 10 }}>
  <Card.Cover onClick={() => Toast.info('点击了Cover区域')}>
    <Image src={coverDemoImg} />
  </Card.Cover>
  <Card.Header onClick={() => Toast.info('点击了Header区域')}>
    封面展示
  </Card.Header>
  <Card.Body onClick={() => Toast.info('点击了Body区域')}>
    卡片内容区域
  </Card.Body>
  <Card.Footer>
    <Button round size='small'>
      更多
    </Button>
    <Button
      round
      color='linear-gradient(to right, #ff6034, #ee0a24)'
      size='small'
     >
      Like
    </Button>
  </Card.Footer>
 </Card>
```

### 展示边框

`Card.Header` 和 `Card.Footer` 的 `border` 属性可以展示对应边框

```jsx
import React from 'react';
import { Card, Button } from 'rc-ui-lib';

export default () => {
  return (
    <Card round>
      <Card.Header border>卡片标题</Card.Header>
      <Card.Body
        style={{
          height: '20vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        卡片内容区域
      </Card.Body>
      <Card.Footer border>
        <Button type="primary" round block size="mini">
          查看更多
        </Button>
      </Card.Footer>
    </Card>
  );
};
```

### 自定义卡片样式

```jsx
import React from 'react';
import { Card } from 'rc-ui-lib';

export default () => {
  return (
    <Card round style={{ backgroundColor: '#ccc', color: 'white' }}>
      <Card.Header>卡片标题</Card.Header>
      <Card.Body
        style={{
          height: '20vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        卡片内容区域
      </Card.Body>
      <Card.Footer>
        <div style={{ textAlign: 'center' }}>我是自定义的底部</div>
      </Card.Footer>
    </Card>
  );
};
```

## API

### Card Props

| 参数      | 说明         | 类型                      | 默认值  |
| --------- | ------------ | ------------------------- | ------- |
| round     | 开启圆角     | _boolean_                 | `false` |
| border    | 显示边框     | _boolean_                 | `false` |
| className | css 类名     | _string_                  | -       |
| style     | css 样式     | _CSSProperties_           | -       |
| onClick   | 卡片点击事件 | _(e: MouseEvent) => void_ | -       |

### Card.Header Props

| 参数      | 说明           | 类型                      | 默认值 |
| --------- | -------------- | ------------------------- | ------ |
| extra     | 右侧内容       | _ReactNode_               | -      |
| border    | 是否显示下边框 | _boolean_                 | -      |
| className | css 类名       | _string_                  | -      |
| style     | css 样式       | _CSSProperties_           | -      |
| onClick   | 点击事件       | _(e: MouseEvent) => void_ | -      |

### Card.Body Props

| 参数      | 说明     | 类型                      | 默认值 |
| --------- | -------- | ------------------------- | ------ |
| className | css 类名 | _string_                  | -      |
| style     | css 样式 | _CSSProperties_           | -      |
| onClick   | 点击事件 | _(e: MouseEvent) => void_ | -      |

### Card.Footer Props

| 参数      | 说明           | 类型                      | 默认值 |
| --------- | -------------- | ------------------------- | ------ |
| border    | 是否显示下边框 | _boolean_                 | -      |
| compact   | 不需要内边距   | _boolean_                 | -      |
| className | css 类名       | _string_                  | -      |
| style     | css 样式       | _CSSProperties_           | -      |
| onClick   | 点击事件       | _(e: MouseEvent) => void_ | -      |

### Card.Cover Props

| 参数      | 说明     | 类型                      | 默认值 |
| --------- | -------- | ------------------------- | ------ |
| className | css 类名 | _string_                  | -      |
| style     | css 样式 | _CSSProperties_           | -      |
| onClick   | 点击事件 | _(e: MouseEvent) => void_ | -      |

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/config-provider)。

| 名称 | 默认值 | 描述 |
| --- | --- | --- |
| --rc-card-size | _var(--rc-font-size-md)_ | - |
| --rc-card-color | _var(--rc-text-color)_ | - |
| --rc-card-background-color | _var(--rc-white)_ | - |
| --rc-card-radius | _var(--rc-border-radius-lg)_ | - |
| --rc-card-body-padding | _0 var(--rc-padding-md)_ | - |
| --rc-card-header-padding | _var(--rc-padding-sm) var(--rc-padding-md)_ | - |
| --rc-card-header-size | _var(--rc-font-size-lg)_ | - |
| --rc-card-header-color | _var(--rc-black)_ | - |
| --rc-card-footer-padding | _var(--rc-padding-sm) var(--rc-padding-md)_ | - |