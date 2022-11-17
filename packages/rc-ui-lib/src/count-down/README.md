# CountDown 倒计时

### 介绍

用于实时展示倒计时数值，支持毫秒精度。

### 引入

```js
import { CountDown } from 'rc-ui-lib';
```

## 代码演示

### 基础用法

`time` 属性表示倒计时总时长，单位为毫秒。

```jsx
import { setState } from 'react';
import { CountDown } from 'rc-ui-lib';
export default () => {
  const [time] = useState(30 * 60 * 60 * 1000);
  return <CountDown time={time} />;
};
```

### 自定义格式

通过 `format` 属性设置倒计时文本的内容。

```jsx
<CountDown time={30 * 60 * 60 * 1000} format="DD 天 HH 时 mm 分 ss 秒" />
```

### 毫秒级渲染

倒计时默认每秒渲染一次，设置 `millisecond` 属性可以开启毫秒级渲染。

```jsx
<CountDown millisecond time={30 * 60 * 60 * 1000} format="HH:mm:ss:SS" />
```

### 自定义样式

通过`renderChildren`添加 _ReactNode_ 定义 CSS 变量，可用于自定义样式 ，`CurrentTime` 对象格式见下方表格。

```jsx
<CountDown
  time={time}
  renderChildren={(timeData: CurrentTime) => {
    return (
      <>
        <span className="block">{timeData.hours}</span>
        <span className="colon">:</span>
        <span className="block">{timeData.minutes}</span>
        <span className="colon">:</span>
        <span className="block">{timeData.seconds}</span>
      </>
    );
  }}
/>
```

### 手动控制

通过 ref 获取到组件实例后，可以调用 `start`、`pause`、`reset` 方法。

```jsx
import { CountDown, Toast } from 'rc-ui-lib';
export default () => {
  const countDownRef = useRef<CountDownInstance>();
  const start = () => {
    CountDownRef.current.start();
  };
  const pause = () => {
    CountDownRef.current.pause();
  };
  const reset = () => {
    CountDownRef.current.reset();
  };
  const onFinish = () => Toast('倒计时结束');

  return (
    <>
      <CountDown format="ss:SSS" time={3000} onFinish={onFinish} ref={CountDownRef} />
      <Grid columnNum={3}>
        <Grid.Item icon="play-circle-o" text="开始" onClick={start} />
        <Grid.Item icon="pause-circle-o" text="暂停" onClick={pause} />
        <Grid.Item icon="replay" text="重置" onClick={reset} />
      </Grid>
    </>
  );
};
```

## API

### Props

| 参数           | 说明                 | 类型                                      | 默认值     |
| -------------- | -------------------- | ----------------------------------------- | ---------- |
| time           | 倒计时时长，单位毫秒 | _number \| string_                        | `0`        |
| format         | 时间格式             | _string_                                  | `HH:mm:ss` |
| autoStart      | 是否自动开始倒计时   | _boolean_                                 | `true`     |
| millisecond    | 是否开启毫秒级渲染   | _boolean_                                 | `false`    |
| renderChildren | 自定义子元素方法     | _(timeData:currentTime)=>React.ReactNode_ |            |

### format 格式

| 格式 | 说明         |
| ---- | ------------ |
| DD   | 天数         |
| HH   | 小时         |
| mm   | 分钟         |
| ss   | 秒数         |
| S    | 毫秒（1 位） |
| SS   | 毫秒（2 位） |
| SSS  | 毫秒（3 位） |

### 事件

| 事件名   | 说明             | 回调参数                   |
| -------- | ---------------- | -------------------------- |
| onFinish | 倒计时结束时触发 | -                          |
| onChange | 倒计时变化时触发 | _currentTime: CurrentTime_ |

### CurrentTime 格式

| 名称         | 说明                   | 类型     |
| ------------ | ---------------------- | -------- |
| total        | 剩余总时间（单位毫秒） | _number_ |
| days         | 剩余天数               | _number_ |
| hours        | 剩余小时               | _number_ |
| minutes      | 剩余分钟               | _number_ |
| seconds      | 剩余秒数               | _number_ |
| milliseconds | 剩余毫秒               | _number_ |

### 方法

通过 ref 可以获取到 CountDown 实例并调用实例方法。

| 方法名 | 说明                                                          | 参数 | 返回值 |
| ------ | ------------------------------------------------------------- | ---- | ------ |
| start  | 开始倒计时                                                    | -    | -      |
| pause  | 暂停倒计时                                                    | -    | -      |
| reset  | 重设倒计时，若 `auto-start` 为 `true`，重设后会自动开始倒计时 | -    | -      |

### 类型定义

通过 `CountDownInstance` 获取 CountDown 实例的类型定义。

```jsx
import { useRef } from 'react';
import type { CountDownInstance } from 'rc-ui-lib';

const countDownRef = useRef<CountDownInstance>();

countDownRef.current?.start();
```

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](#/zh-CN/config-provider)。

| 名称                        | 默认值                            | 描述 |
| --------------------------- | --------------------------------- | ---- |
| --rc-count-down-text-color  | _var(--rc-count-down-text-color)_ | -    |
| --rc-count-down-font-size   | _14px_                            | -    |
| --rc-count-down-line-height | _20px_                            | -    |

## 常见问题

### 在 iOS 系统上倒计时不生效？

如果你遇到了在 iOS 上倒计时不生效的问题，请确认在创建 Date 对象时没有使用`new Date('2020-01-01')`这样的写法，iOS 不支持以中划线分隔的日期格式，正确写法是`new Date('2020/01/01')`。
