# Copilot Instructions for rc-ui-lib

## 项目架构与核心知识
- 本项目为类 Vant 的 React 移动端组件库，主包为 `packages/rc-ui-lib`，所有核心组件均在此维护。
- 组件源码位于 `packages/rc-ui-lib/src/`，每个子目录为一个 UI 组件（如 `button/`, `grid/`, `badge/` 等），并配有独立 `README.md` 说明用法和 API。
- 组件全部采用 TypeScript 编写，类型安全，支持 props 类型推断。
- 组件库支持主题定制、按需引入、移动端主流浏览器兼容。
- 组件导出统一通过 `src/index.ts`，按需引入时只需引用主包。
- 组件 props 设计遵循 Vant 风格，常用属性如 `type`、`plain`、`hairline` 等。
- 组件内部状态管理采用自定义 hooks，通用 hooks 位于 `src/hooks/`。
- 样式采用 CSS Modules 或 BEM 类名约定，避免全局污染，主题相关内容在 `src/styles/`。

## 关键开发流程
- **构建/打包**：
	- 推荐使用 `rc-cli` 工具（源码在 `packages/rc-cli/src/commands/`），或直接运行 `pnpm run build`。
- **测试**：
	- 单元测试覆盖率高，测试文件在 `packages/rc-ui-lib/tests/`，Jest 配置见 `jest.config.js`，测试环境初始化在 `setupAfterEnv.ts`。
- **文档与演示**：
	- 组件文档在各自目录下的 `README.md`，主文档站点源码在 `docs/`，支持 markdown。
- **主题/样式**：
	- 全局样式与主题变量集中在 `src/styles/`，支持自定义主题。

## 项目约定与模式
- 组件 props 设计风格与 Vant 保持一致，支持多种类型和样式属性。
- 组件内部状态管理统一用 hooks，避免冗余 state。
- 组件样式采用类名约定（如 `rc-button--primary`），避免全局污染。
- 组件测试用例需覆盖常见交互和边界，测试工具为 Jest。
- 组件文档需同步维护，示例代码需可直接运行。

## 常用命令
- 安装依赖：`pnpm install`
- 构建组件库：`pnpm run build` 或 `pnpm --filter rc-cli run build`
- 运行测试：`pnpm test`
- 启动文档站点：`pnpm run docs`

## 重要文件/目录
- `packages/rc-ui-lib/src/`：所有组件源码
- `packages/rc-ui-lib/tests/`：测试用例
- `packages/rc-ui-lib/docs/`：文档与演示
- `packages/rc-cli/`：命令行工具源码
- `packages/rc-ui-lib/src/styles/`：全局样式与主题

## 组件开发示例
```jsx
import { Button } from 'rc-ui-lib';
<Button type="primary">主按钮</Button>
```

## 集成与扩展
- 组件库支持按需引入，推荐通过主包统一导入。
- 构建/打包流程依赖 `rc-cli`，如需扩展构建能力请参考 `rc-cli` 源码。
- 主题定制可通过覆盖 `src/styles/` 变量实现。

## 参考与贡献
- 详细贡献流程见主仓库 `README.md` 及[贡献指南](https://rancui.github.io/rc-ui-lib/#/zh-CN/contribution)
- 遇到问题请提交 Issue 或 PR

---
如有不清楚或遗漏的部分，请反馈以便补充完善。
