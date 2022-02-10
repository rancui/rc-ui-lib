# NumberKeyboard 数字键盘

### 介绍

H5 数字键盘，可以配合密码输入框组件或自定义的输入框组件使用

### 引入

```js
import { NumberKeyboard } from 'rc-ui-lib';
```

## 代码演示

### 默认样式

数字键盘提供了 onInput、onDelete、onBlur、onClose 事件，分别对应输入内容、删除内容失去焦点和关闭的动作。

```jsx
<Cell onClick={setVisible}>弹出默认键盘</Cell>
<NumberKeyboard
  visible={visible}
  onClose={actions.onClose}
  onInput={actions.onInput}
  onDelete={actions.onDelete}
  onBlur={actions.onBlur}
/>
```

```js
const [visible, setVisible] = useState(false);

const actions = {
  onClose: () => {
    Toast.info('closed');
    setVisible('');
  },
  onInput: (key: string) => {
    Toast.info(key);
  },
  onDelete: () => {
    Toast.info('delete');
  },
  onBlur: () => {
    setVisible('');
  },
};
```

### 带右侧栏的键盘

将 theme 属性设置为 `custom` 来展示键盘的右侧栏，常用于输入金额的场景。

```jsx
<NumberKeyboard
  visible={visible}
  theme="custom"
  extraInfo="."
  onClose={actions.onClose}
  onInput={actions.onInput}
  onDelete={actions.onDelete}
  onBlur={actions.onBlur}
/>
```

### 身份证号键盘

通过 `extraKey` 属性可以设置左下角按键内容，比如需要输入身份证号时，可以将 `extraKey` 设置为 `X`。

```jsx
<NumberKeyboard
  visible={visible}
  extraKey="X"
  onClose={actions.onClose}
  onInput={actions.onInput}
  onDelete={actions.onDelete}
  onBlur={actions.onBlur}
/>
```

### 键盘标题

通过 `title` 属性可以设置键盘标题。

```jsx
<NumberKeyboard
  visible={visible}
  title="键盘标题"
  extraKey="."
  closeButtonText="完成"
  onClose={actions.onClose}
  onInput={actions.onInput}
  onDelete={actions.onDelete}
  onBlur={actions.onBlur}
/>
```

### 配置多个按键

当 theme 为 `custom` 时，支持以数组的形式配置两个 `extraKey`。

```jsx
<NumberKeyboard
  visible={visible}
  theme="custom"
  extraKey={['00', '.']}
  closeButtonText="完成"
  onClose={actions.onClose}
  onInput={actions.onInput}
  onDelete={actions.onDelete}
  onBlur={actions.onBlur}
/>
```

### 随机数字键盘

通过 `randomKeyOrder` 属性可以随机排序数字键盘，常用于安全等级较高的场景。

```jsx
<NumberKeyboard
  visible={visible}
  randomKeyOrder
  onClose={actions.onClose}
  onInput={actions.onInput}
  onDelete={actions.onDelete}
  onBlur={actions.onBlur}
/>
```

## API

### Props

| 参数名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible | 是否显示键盘 | _boolean_ | - |
| title | 键盘标题 | _string_ | - |
| theme | 样式风格，可选值为 `custom` | _string_ | `default` |
| transition | 是否开启过场动画 | _boolean_ | `true` |
| zIndex | 键盘 z-index 层级 | \_number | `100` |
| extraKey | 底部额外按键的内容 | _string \| string[]_ | `''` |
| closeButtonText | 关闭按钮文字，空则不展示 | _string_ | - |
| deleteButtonText | 删除按钮文字，空则展示删除图标 | _string_ | - |
| closeButtonLoading | 是否将关闭按钮设置为加载中状态，仅在 `theme="custom"` 时有效 | _boolean_ | `false` |
| showDeleteKey | 是否展示删除图标 | _boolean_ | `true` |
| blurOnClose | 是否在点击关闭按钮时触发 blur 事件 | _boolean_ | `true` |
| hideOnClickOutside | 是否在点击外部时收起键盘 | _boolean_ | `true` |
| safeAreaInsetBottom | 是否开启[底部安全区适配](#/zh-CN/adrcced-usage#di-bu-an-quan-qu-gua-pei) | _boolean_ | `true` |
| randomKeyOrder | 是否将通过随机顺序展示按键 | _boolean_ | `false` |
| titleLeft | 自定义标题栏左侧内容 | React.ReactNode | - |
| teleport | 指定挂载的节点 | _HTMLElement_ | _(() => HTMLElement)_ |

### Events

| 事件名   | 说明                           | 回调参数      |
| -------- | ------------------------------ | ------------- |
| onInput  | 点击按键时触发                 | key: 按键内容 |
| onDelete | 点击删除键时触发               | -             |
| onBlur   | 点击关闭按钮或非键盘区域时触发 | -             |
| onClose  | 点击关闭按钮时触发             | -             |

### 类型定义

组件导出以下类型定义：

```js
import type { NumberKeyboardProps, NumberKeyboardTheme } from 'rc-ui-lib';
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](#/zh-CN/config-provider)。

| 名称                                         | 默认值                      | 描述 |
| -------------------------------------------- | --------------------------- | ---- |
| --rc-number-keyboard-background-color        | _var(--rc-gray-2)_          | -    |
| --rc-number-keyboard-key-height              | _48px_                      | -    |
| --rc-number-keyboard-key-font-size           | _28px_                      | -    |
| --rc-number-keyboard-key-active-color        | _var(--rc-gray-3)_          | -    |
| --rc-number-keyboard-key-background-color    | _var(--rc-white)_           | -    |
| --rc-number-keyboard-delete-font-size        | _var(--rc-font-size-lg)_    | -    |
| --rc-number-keyboard-title-color             | _var(--rc-gray-7)_          | -    |
| --rc-number-keyboard-title-height            | _34px_                      | -    |
| --rc-number-keyboard-title-font-size         | _var(--rc-font-size-lg)_    | -    |
| --rc-number-keyboard-close-padding           | _0 var(--rc-padding-md)_    | -    |
| --rc-number-keyboard-close-color             | _var(--rc-text-link-color)_ | -    |
| --rc-number-keyboard-close-font-size         | _var(--rc-font-size-md)_    | -    |
| --rc-number-keyboard-button-text-color       | _var(--rc-white)_           | -    |
| --rc-number-keyboard-button-background-color | _var(--rc-primary-color)_   | -    |
| --rc-number-keyboard-z-index                 | _100_                       | -    |
