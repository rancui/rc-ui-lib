# rc-ui

众所周知，[Vant 组件库](https://vant-contrib.gitee.io/vant/v3/#/zh-CN) Vue 版本在前端业内享有盛誉，无论是从美观，性能还是使用体验上来说都是非常优秀的开源作品。
尽管 Vant 的 React 版本有社区团队在维护，但其组件偏少，更新较慢，满足不了实际工作中某些场景的需要，而且业内开源出来的同类作品中，也很难找到一个可以媲美 Vant 的 React 移动端组件库。
基于此，我萌生了开发这个 UI 组件库的想法，希望我的这点微薄之力，能够帮助到有同样需求的个人、团队。

使用过程中发现任何问题都可以提 Issue 或者 发送 PR。

## 安装

```text
通过 npm 安装
npm i rc-ui-lib -S
```

# 使用

```js
import { Button } from 'rc-ui-lib';
```

# 方式一. 自动按需引入组件 (推荐)

```text

babel-plugin-import 是一款 babel 插件，它会在编译过程中将 import 的写法自动转换为按需引入的方式。
# 安装插件
npm i babel-plugin-import -D
```

```js
// 在.babel.config.js中添加配置
{
  "plugins": [
    ["import", {
      libraryName: "rc-ui-lib",
      libraryDirectory: "es",
      style: (name) => {
        return `${name}/style/index.css`;
      }
    }]
  ]
}

// 对于使用 babel7 的用户，可以在 babel.config.js 中配置
module.exports = {
  plugins: [
    ['import', {
      libraryName: 'rc-ui-lib',
      libraryDirectory: 'es',
      style: (name) => {
        return `${name}/style/index.css`;
      }
    }, 'rc-ui-lib']
  ]
};
```

# 方式二. 手动按需引入组件

### 在不使用插件的情况下，可以手动引入需要的组件。

```js
import Button from 'rc-ui-lib/es/button';
import 'rc-ui-lib/es/button/style/index.css';
```

## 已开发的组件

### 基础组件

- [x] Button
- [x] Icon
- [x] Popup
- [x] Cell
- [x] CellGroup

### 表单组件

- [x] CheckboxGroup
- [x] Checkbox
- [x] RadioGroup
- [x] Radio
- [x] Switch
- [x] Form
- [x] Field

### 反馈组件

- [x] Loading
- [x] Overlay
- [x] Dialog
- [x] Toast

### 展示组件

- [x] Badge

### 导航组件

- [x] ActionBar

## 浏览器支持

Modern browsers and Android 4.0+, iOS 8.0+.

## 特别鸣谢

为了尽可能的与 Vant 保持一致的使用体验，在开发过程中参考了[Vant 组件库](https://vant-contrib.gitee.io/vant/v3/#/zh-CN)的源码，在此特别鸣谢 Vant 组件库及其开发者！

## 开源协议

This is an Open Source Software operating under the [MIT](https://github.com/rancui/vant-react/blob/main/LICENSE) License.
