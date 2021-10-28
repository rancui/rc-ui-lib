# 快速上手

### 通过 npm 安装

在现有项目中使用，可以通过`npm`安装

```bash
# 通过 npm 安装
npm i rc-ui-lib
```

## 引入组件

### 方式一. 自动按需引入组件 (推荐)

[babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 是一款 babel 插件，它会在编译过程中将 import 的写法自动转换为按需引入的方式

```bash

# 安装插件
npm i babel-plugin-import -D
```

在.babelrc 或 babel.config.js 中添加配置：

```js
// 注意：webpack 1 无需设置 libraryDirectory
{
  "plugins": [
    ["import", {
      "libraryName": "rc-ui-lib",
      "libraryDirectory": "es",
      "style": true
    }]
  ]
}

// 对于使用 babel7 的用户，可以在 babel.config.js 中配置
module.exports = {
  plugins: [
    ['import', {
      libraryName: 'rc-ui-lib',
      libraryDirectory: 'es',
      style: true
    }, 'rc-ui-lib']
  ]
};
```

```js
// 原始代码
import { Button } from 'rc-ui-lib';

// 编译后代码
import Button from 'rc-ui-lib/es/button';
import 'rc-ui-lib/es/button/style';
```

> Tips: 如果你在使用 TypeScript，可以使用 [ts-import-plugin](https://github.com/Brooooooklyn/ts-import-plugin) 实现按需引入。

### 方式二. 手动按需引入组件

在不使用插件的情况下，可以手动引入需要的组件

```js
import { Button } from 'rc-ui-lib';
import 'rc-ui-lib/lib/button/style';
```

> Tips: 配置按需引入后，将不允许直接导入所有组件。

### 方式三. 导入所有组件样式

rc-ui-lib 支持一次性导入所有组件样式。

```js
import { Button } from 'rc-ui-lib';
import 'rc-ui-lib/lib/index.css';
```

> Tips: 引入所有组件样式会增加代码包体积，因此不推荐这种做法。
