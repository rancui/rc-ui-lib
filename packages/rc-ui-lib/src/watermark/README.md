# WaterMark 水印

### 介绍

给页面的某个区域加上水印，支持文字和图案。请升级 `rc-ui-lib` 到 >= 2.1.0 版本来使用该组件。

### 引入

适用于防止信息盗用、标识版权时使用。

```js
import { Watermark } from 'rc-ui-lib';
```

## 代码演示

### 文字水印

通过 `content` 属性来设置水印的文字。

```jsx
<Watermark content="rc-ui-lib" />
```

### 图片水印

通过 `image` 属性来设置水印图片，并使用 `opacity` 来调整水印的整体透明度。

```jsx
<Watermark
  image="https://rancui.github.io/rc-ui-lib/rc-ui-lib.png"
  width={180}
  height={90}
  opacity={0.2}
/>
```

### 自定义间隔

通过 `gapX` 和 `gapY` 属性来控制多个重复水印之间的间隔。

```jsx
<Watermark
  image="https://rancui.github.io/rc-ui-lib/rc-ui-lib.png"
  gapX={30}
  gapY={10}
  opacity={0.2}
/>
```

### 自定义倾斜角度

通过 `rotate` 属性来控制水印的倾斜角度，默认值为`-22`。

```jsx
<Watermark image="https://rancui.github.io/rc-ui-lib/rc-ui-lib.png" rotate="22" opacity={0.2} />
```

### 显示范围

通过 `full-page` 属性来控制水印的显示范围。

```jsx
<Watermark image="https://rancui.github.io/rc-ui-lib/rc-ui-lib.png" fullPage />
```

### HTML 水印

通过 `children` 可以直接传入 HTML 作为水印。HTML 中的样式仅支持行内样式，同时不支持传入自闭合标签。

```jsx
<Watermark width={150}>
  <div style={{ background: 'linear-gradient(45deg, #000 0, #000 50%, #fff 50%)' }}>
    <p style={{ mixBlendMode: 'difference', color: '#fff' }}>rc watermark</p>
  </div>
</Watermark>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| width | 水印宽度 | _number_ | `100` |
| height | 水印高度 | _number_ | `100` |
| zIndex | 水印的 z-index | _number \| string_ | `100` |
| content | 文字水印的内容 | _string_ | - |
| image | 图片水印的内容，如果与 `content` 同时传入，优先使用图片水印 | _string_ | - |
| rotate | 水印的旋转角度 | _number \| string_ | `-22` |
| fullPage | 水印是否全屏显示 | _boolean_ | `false` |
| gapX | 水印之间的水平间隔 | _number_ | `0` |
| gapY | 水印之间的垂直间隔 | _number_ | `0` |
| textColor | 文字水印的颜色 | _string_ | `#dcdee0` |
| opacity | 水印的透明度 | _number_ | - |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/config-provider)。

| 名称                    | 默认值 | 描述 |
| ----------------------- | ------ | ---- |
| --rc-water-mark-z-index | _100_  | -    |
