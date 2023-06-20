# NumberKeyboard 数字键盘

### 介绍

带网格的输入框组件，可以用于输入密码、短信验证码等场景，通常与[数字键盘](#/zh-CN/number-keyboard)组件配合使用。

### 引入

```js
import { PasswordInput, NumberKeyboard } from 'rc-ui-lib';
```

### 基础用法

搭配数字键盘组件来实现密码输入功能。

```jsx
<PasswordInput
    focused={focused}
    onFocus={() => setFocused(true)}
    onBlur={() => setFocused(false)}
    onChange={handleChange(value)}
    keyboard={<NumberKeyboard />}
```

```js
const [focused, setFocused] = useState(false);

const handleChange = (value) => {
  console.log(value);
};
```

### 原生键盘用法

搭配原生键盘组件来实现密码输入功能。

```jsx
<PasswordInput
    focused={focused}
    onFocus={() => setFocused(true)}
    onBlur={() => setFocused(false)}
    onChange={handleChange(value)}
```

```js
const [focused, setFocused] = useState(false);

const handleChange = (value) => {
  console.log(value);
};
```

### 自定义长度

通过 `length` 属性来设置密码长度。

```jsx
<PasswordInput
  length={4}
  focused={focused}
  onFocus={() => setFocused(true)}
  onBlur={() => setFocused(false)}
  onChange={handleChange(value)}
/>
```

### 格子间距

通过 `gutter` 属性来设置格子之间的间距。

```jsx
<PasswordInput
  focused={focused}
  gutter={10}
  onFocus={() => setFocused(true)}
  onBlur={() => setFocused(false)}
  onChange={handleChange(value)}
/>
```

### 明文展示

将 `mask` 设置为 `false` 可以明文展示输入的内容，适用于短信验证码等场景。

```jsx
<PasswordInput
  focused={focused}
  mask={false}
  onFocus={() => setFocused(true)}
  onBlur={() => setFocused(false)}
  onChange={handleChange(value)}
/>
```

### 提示信息

通过 `info` 属性设置提示信息，通过 `error-info` 属性设置错误提示，例如当输入六位时提示密码错误。

```jsx
<PasswordInput
  focused={focused}
  info="密码为 6 位数字"
  errorInfo={errorInfo}
  onFill={handleFill}
  onFocus={() => setFocused(true)}
  onBlur={() => setFocused(false)}
  onChange={handleChange(value)}
/>
```

```js
const [focused, setFocused] = useState(false);
const [errorInfo, setErrorInfo] = useState < string > '';

const handleChange = (value) => {
  console.log(value);
};

const handleFill = () => {
  setErrorInfo('密码错误');
};
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 默认非受控密码值 | _string_ | `''` |
| info | 输入框下方文字提示 | _string_ | - |
| error-info | 输入框下方错误提示 | _string_ | - |
| length | 密码最大长度 | _number \| string_ | `6` |
| gutter | 输入框格子之间的间距，如 `20px` `2em`，默认单位为`px` | _number \| string_ | `0` |
| mask | 是否隐藏密码内容 | _boolean_ | `true` |
| focused | 是否已聚焦，聚焦时会显示光标 | _boolean_ | `false` |

### Events

| 事件名   | 说明           | 回调参数      |
| -------- | -------------- | ------------- |
| onChange | 输入时回调     | key: 按键内容 |
| onFill   | 填写完成回调   | -             |
| onBlur   | 输入框失焦回调 | -             |
| onFocus  | 输入框聚焦回调 | -             |

### Ref

| 事件名     | 说明                                     | 回调参数 |
| ---------- | ---------------------------------------- | -------- |
| focus      | 输入框聚焦回调，若是原生输入则会自动聚焦 | -        |
| blur       | 输入框失焦，若是原生输入则会自动失焦     | -        |
| resetValue | 清空输入框                               | -        |

### 类型定义

组件导出以下类型定义：

```js
import type { PasswordInputProps, PasswordInputInstance } from 'rc-ui-lib';
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](#/zh-CN/config-provider)。

| 名称                                          | 默认值                             | 描述 |
| --------------------------------------------- | ---------------------------------- | ---- |
| --rc-password-input-height                    | _50px_                             | -    |
| --rc-password-input-margin                    | _0 var(--rc-padding-md)_           | -    |
| --rc-password-input-font-size                 | _20px_                             | -    |
| --rc-password-input-border-radius             | _6px_                              | -    |
| --rc-password-input-background-color          | _var(--rc-background-color-light)_ | -    |
| --rc-password-input-info-color                | _var(--rc-text-color-2)_           | -    |
| --rc-password-input-info-font-size            | _var(--rc-font-size-md)_           | -    |
| --rc-password-input-error-info-color          | _var(--rc-danger-color)_           | -    |
| --rc-password-input-dot-size                  | _10px_                             | -    |
| --rc-password-input-dot-color                 | _var(--rc-text-color)_             | -    |
| --rc-password-input-text-color                | _var(--rc-text-color)_             | -    |
| --rc-password-input-cursor-color              | _var(--rc-text-color)_             | -    |
| --rc-password-input-cursor-width              | _1px_                              | -    |
| --rc-password-input-cursor-height             | _40%_                              | -    |
| --rc-password-input-cursor-animation-duration | _1s_                               | -    |
