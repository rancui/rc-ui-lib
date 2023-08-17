<h1 align="center">rc-ui-lib</h1>

<p align="center">参照 <a href="https://github.com/youzan/vant">Vant</a> 打造的 React 框架移动端组件库。</p>
<p align="center">
  <img src="https://img.shields.io/github/actions/workflow/status/rancui/rc-ui-lib/test.yml?branch=main" alt="CI Status" />
  <img alt="Codecov" src="https://img.shields.io/codecov/c/github/rancui/rc-ui-lib?color=%236CC73F&logo=%236CC73F&logoColor=%236CC73F&style=flat-square">
  <img src="https://img.badgesize.io/https://unpkg.com/rc-ui-lib/lib/rc-ui-lib.min.js?compression=gzip&style=flat-square&label=gzip%20size&color=#4fc08d" alt="Gzip Size" />
</p>

<p align="center">
  🌈 <a href="https://rancui.github.io/rc-ui-lib/">文档网站（GitHub）</a>
</p>

## 特性

- 50+ 个高质量组件，覆盖移动端各类场景
- 性能极佳，组件平均体积不到 1kb（min+gzip）
- 单元测试覆盖率超过 95%，提供稳定性保障
- 完善的文档和示例
- 支持按需引入
- 支持主题定制
- 支持 TypeScript

## 安装

[![rc-ui-lib](https://nodei.co/npm/rc-ui-lib.png)](https://npmjs.org/package/rc-ui-lib)

## 快速开始

```jsx
import ReactDOM from 'react-dom/client';
import { Button } from 'rc-ui-lib';

function App() {
  return <Button>Default Button</Button>;
}

ReactDOM.createRoot(mountNode).render(<App />);
```

## 浏览器支持

rc-ui-lib 支持现代浏览器以及 Chrome >= 51、iOS >= 10.0。

## 贡献代码

修改代码请阅读我们的 [贡献指南](https://rancui.github.io/rc-ui-lib/#/zh-CN/contribution)。

使用过程中发现任何问题都可以提 [Issue](https://github.com/rancui/rc-ui-lib/issues) 给我们，当然，我们也非常欢迎你给我们发 [PR](https://github.com/rancui/rc-ui-lib/pulls)。

## 感谢

[Vant](https://github.com/youzan/vant) - 感谢有赞团队对 vant 的辛苦维护，才让我们有了种种可能。
