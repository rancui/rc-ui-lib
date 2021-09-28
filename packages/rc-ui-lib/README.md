<p align="center">
    <img alt="logo" src="https://user-images.githubusercontent.com/7098719/132332142-f84a2bb9-879d-47e6-8e99-638d8e4b4740.png" width="240" style="margin-bottom: 10px;">
</p>

<h1 align="center">rc-ui-lib</h1>

<p align="center">参照 <a href="https://github.com/youzan/vant">Vant</a> 打造的 React 框架移动端组件库。</p>

<p align="center">
    <img src="https://img.shields.io/npm/v/rc-ui-lib/latest?style=flat-square" alt="npm version" />
</p>

<p align="center">
  🔥 <a href="https://lang3.gitee.io/rc-ui-lib/">文档网站（国内）</a>
  &nbsp;
  🌈 <a href="https://rancui.github.io/rc-ui-lib/">文档网站（GitHub）</a>
</p>

## 路线图

[Roadmap](https://github.com/rancui/rc-ui-lib/discussions/16)概览

## 特性

- 提供 50 多个高质量组件，覆盖移动端各类场景
- 性能极佳，组件平均体积不到 1kb（min+gzip）
- 完善的文档和示例
- 支持按需引入
- 支持主题定制(less modifyVars)
- 支持 TypeScript
- 支持 [SSR]
- 支持 [Vite]

## 安装

[![rc-ui-lib](https://nodei.co/npm/rc-ui-lib.png)](https://npmjs.org/package/rc-ui-lib)

## 快速开始

```jsx
import ReactDOM from 'react-dom';
import { Button } from 'rc-ui-lib';
import 'rc-ui-lib/lib/index.css';

function App() {
  return <Button>Default Button</Button>;
}

ReactDOM.render(<App />, mountNode);
```

### 快速集成

#### 在 create-react-app 中使用

参考[rc-ui-lib-cra](https://github.com/rancui/rc-ui-lib-template/tree/main/template/create-react-app)

#### 在 umijs 使用

参考[rc-ui-lib-umi](https://github.com/rancui/rc-ui-lib-template/tree/main/template/umi)

#### 在 nextjs 使用

参考[rc-ui-lib-nextjs](https://github.com/rancui/rc-ui-lib-template/tree/main/template/nextjs)

#### vite 集成

参考[rc-ui-lib-vite](https://github.com/rancui/rc-ui-lib-template/tree/main/template/vite)

请参阅[Quickstart](https://rancui.github.io/rc-ui-lib/#/zh-CN/)中的更多内容。

## 浏览器支持

rc-ui-lib 支持现代浏览器以及 Chrome >= 51、iOS >= 10.0。

## 贡献代码

修改代码请阅读我们的 [贡献指南](https://rancui.github.io/rc-ui-lib/#/zh-CN/contribution)。

使用过程中发现任何问题都可以提 [Issue](https://github.com/rancui/rc-ui-lib/issues) 给我们，当然，我们也非常欢迎你给我们发 [PR](https://github.com/rancui/rc-ui-lib/pulls)。

> 欢迎加入我们的微信讨论组

<img src="https://user-images.githubusercontent.com/7098719/130221473-851855c7-1429-4a36-838d-4f7f95a48418.jpg" width="140">

## 手机预览

可以手机扫码以下二维码访问手机端 demo：

<img src="https://user-images.githubusercontent.com/7098719/132332336-20429085-18b7-4639-8022-a5e7098610ad.png" width="200" height="200" >
