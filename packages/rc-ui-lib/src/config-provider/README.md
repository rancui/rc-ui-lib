# ConfigProvider 全局配置

### 引入

```js
import { ConfigProvider } from 'rc-ui-lib';
```

## 定制主题

### 介绍

rc-ui-lib 组件通过丰富的 [CSS 变量](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties) 来组织样式，通过覆盖这些 CSS 变量，可以实现**定制主题、动态切换主题**等效果。

#### 示例

以 Button 组件为例，查看组件的样式，可以看到 `.rc-button--primary` 类名上存在以下变量：

```css
.rc-button--primary {
  color: var(--rc-button-primary-color);
  background-color: var(--rc-button-primary-background-color);
}
```

这些变量的默认值被定义在 `root` 节点上，HTML 文档的任何节点都可以访问到这些变量：

```css
:root {
  --rc-white: #fff;
  --rc-blue: #3f45ff;
  --rc-button-primary-color: var(--rc-white);
  --rc-button-primary-background-color: var(--rc-primary-color);
}
```

### 自定义 CSS 变量

#### 通过 CSS 覆盖

你可以直接在代码中覆盖这些 CSS 变量，Button 组件的样式会随之发生改变：

```css
/* 添加这段样式后，Primary Button 会变成红色 */
:root {
  --rc-button-primary-background-color: red;
}
```

#### 通过 ConfigProvider 定制主题

`ConfigProvider` 组件提供了覆盖 CSS 变量的能力，你需要在根节点包裹一个 `ConfigProvider` 组件，并通过 `themeVars` 属性来配置一些主题变量。

```jsx
import { ConfigProvider, Field, Rate, Slider, Button } from 'rc-ui-lib';

// themeVars 内的值会被转换成对应 CSS 变量
// 比如 sliderBarHeight 会转换成 `--rc-slider-bar-height`
const themeVars = {
  rateIconFullColor: '#ffcc56',
  sliderBarHeight: '4px',
  sliderButtonWidth: '20px',
  sliderButtonHeight: '20px',
  sliderActiveBackgroundColor: '#951fff',
  buttonPrimaryBorderColor: '#951fff',
  buttonPrimaryBackgroundColor: '#951fff',
};

export default () => {
  const [rate, updateRate] = useState(4);
  const [slider, updateSlider] = useState(50);

  return (
    <ConfigProvider themeVars={themeVars}>
      <Field label="评分">
        <Rate value={rate} onChange={updateRate} />
      </Field>
      <Field label="滑块">
        <Slider value={slider} onChange={updateSlider} />
      </Field>
      <div style={{ margin: 16 }}>
        <Button block round type="primary">
          提交
        </Button>
      </div>
    </ConfigProvider>
  );
};
```

> 注意：ConfigProvider 仅影响它的子组件的样式，不影响全局 root 节点。

### 通过 ConfigProvider 替换 Icon

`ConfigProvider` 组件提供了替换 Icon 的能力，你需要在根节点包裹一个 `ConfigProvider` 组件，并通过 `iconPrefix` 属性来修改图标的类名前缀。

```css
/* 引入第三方或自定义的字体图标样式 */
@font-face {
  font-family: 'iconfont';
  src: url('//at.alicdn.com/t/font_1619071_dqiwns2g0d.ttf') format('truetype');
}

.iconfont {
  font-family: 'iconfont' !important;
  font-style: normal;
}

.iconfont-1111::before {
  content: '\e782';
}
.iconfont-emojifill::before {
  content: '\e78d';
}
.iconfont-emojilight::before {
  content: '\e7a1';
}
```

```jsx
import { ConfigProvider, Field, Rate, Button } from 'rc-ui-lib';

export default () => {
  return (
    <ConfigProvider iconPrefix="iconfont">
      <Field label="评分">
        <Rate icon="emojifill" voidIcon="emojilight" />
      </Field>
      <div style={{ margin: 16 }}>
        <Button icon="1111" block round type="primary">
          提交
        </Button>
      </div>
    </ConfigProvider>
  );
};
```

### 基础变量

rc-ui-lib 中的 CSS 变量分为 **基础变量** 和 **组件变量**。组件变量会继承基础变量，因此在修改基础变量后，会影响所有相关的组件。

#### 修改变量

由于 CSS 变量继承机制的原因， 两者的修改方式有一定差异：

- 基础变量只能通过 `root 选择器` 修改，不能通过 `ConfigProvider 组件` 修改。
- 组件变量可以通过 `root 选择器` 和 `ConfigProvider 组件` 修改。

#### 变量列表

下面是所有的基础变量：

```less
// Color Palette
--rc-black: #000;
--rc-white: #fff;
--rc-gray-1: #f7f8fa;
--rc-gray-2: #f2f3f5;
--rc-gray-3: #ebedf0;
--rc-gray-4: #dcdee0;
--rc-gray-5: #c8c9cc;
--rc-gray-6: #969799;
--rc-gray-7: #646566;
--rc-gray-8: #323233;
--rc-red: #ee0a24;
--rc-blue: #3f45ff;
--rc-orange: #ff976a;
--rc-orange-dark: #ed6a0c;
--rc-orange-light: #fffbe8;
--rc-green: #07c160;

// Gradient Colors
--rc-gradient-red: linear-gradient(to right, #ff6034, #ee0a24);
--rc-gradient-orange: linear-gradient(to right, #ffd01e, #ff8917);

// Component Colors
--rc-primary-color: var(--rc-blue);
--rc-success-color: var(--rc-green);
--rc-danger-color: var(--rc-red);
--rc-warning-color: var(--rc-orange);
--rc-text-color: var(--rc-gray-8);
--rc-active-color: var(--rc-gray-2);
--rc-active-opacity: 0.7;
--rc-disabled-opacity: 0.5;
--rc-background-color: var(--rc-gray-1);
--rc-background-color-light: #fafafa;
--rc-text-link-color: #576b95;

// Padding
--rc-padding-base: 4px;
--rc-padding-xs: 8px;
--rc-padding-sm: 12px;
--rc-padding-md: 16px;
--rc-padding-lg: 24px;
--rc-padding-xl: 32px;

// Font
--rc-font-size-xs: 10px;
--rc-font-size-sm: 12px;
--rc-font-size-md: 14px;
--rc-font-size-lg: 16px;
--rc-font-weight-bold: 500;
--rc-line-height-xs: 14px;
--rc-line-height-sm: 18px;
--rc-line-height-md: 20px;
--rc-line-height-lg: 22px;
--rc-base-font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Segoe UI, Arial,
  Roboto, 'PingFang SC', 'miui', 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif;
--rc-price-integer-font-family: Avenir-Heavy, PingFang SC, Helvetica Neue, Arial, sans-serif;

// Animation
--rc-animation-duration-base: 0.3s;
--rc-animation-duration-fast: 0.2s;
--rc-animation-timing-function-enter: ease-out;
--rc-animation-timing-function-leave: ease-in;

// Border
--rc-border-color: var(--rc-gray-3);
--rc-border-width-base: 1px;
--rc-border-radius-sm: 2px;
--rc-border-radius-md: 4px;
--rc-border-radius-lg: 8px;
--rc-border-radius-max: 999px;
```

你可以在各个组件文档底部的表格中查看组件变量。

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| themeVars | 自定义主题变量 | _object_ | - |
| prefixCls | 设置统一样式前缀。注意：需要配合 less 变量 [@rc-prefix]() 使用 | _string_ | `rv` |
| iconPrefix | 所有图标的类名前缀，等同于 Icon 组件的 [classPrefix 属性](#/zh-CN/icon#props) | _string_ | `van-icon` |
| tag | `ConfigProdiver`对应的 HTML 节点标签名 | _string_ | `div` |
