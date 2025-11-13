# Copilot Instructions for rc-ui-lib

## 项目架构与核心知识
- 本项目是一个参考 Vant 打造的 React 移动端组件库，主包为 `packages/rc-ui-lib`，包含所有核心组件。
- 组件源码位于 `packages/rc-ui-lib/src/`，每个子目录对应一个 UI 组件（如 `button/`, `grid/`, `badge/` 等），并配有独立的 `README.md` 说明用法和 API。
- 组件均采用 TypeScript 编写，支持类型推断和类型安全。
- 组件库支持主题定制、按需引入、主流移动端浏览器兼容。

## 关键开发流程
- **构建/打包**：使用 `rc-cli` 包下的命令行工具，相关源码在 `packages/rc-cli/src/commands/`。
- **测试**：单元测试覆盖率高于 95%，测试文件位于 `packages/rc-ui-lib/tests/`，常用入口为 `setupAfterEnv.ts`。
- **文档与演示**：组件文档在各自目录下的 `README.md`，主文档站点源码在 `packages/rc-ui-lib/docs/`。
- **主题/样式**：全局样式与主题相关内容在 `packages/rc-ui-lib/src/styles/`。

## 项目约定与模式
- 组件导出统一通过 `packages/rc-ui-lib/src/index.ts`，按需引入时只需引用主包。
- 组件 props 设计遵循 Vant 风格，支持 `type`、`plain`、`hairline` 等常用属性。
- 组件内部采用 hooks 进行状态管理，相关通用 hooks 在 `src/hooks/`。
- 组件样式采用 CSS Modules 或类名约定，避免全局污染。
- 组件测试用例覆盖常见交互和边界情况，测试工具以 Jest 为主。

## 常用命令
- 安装依赖：`pnpm install`
- 构建组件库：`pnpm run build` 或使用 `rc-cli` 工具
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

## 参考与贡献
- 详细贡献流程见主仓库 `README.md` 及[贡献指南](https://rancui.github.io/rc-ui-lib/#/zh-CN/contribution)
- 遇到问题请提交 Issue 或 PR

---
如有不清楚或遗漏的部分，请反馈以便补充完善。
