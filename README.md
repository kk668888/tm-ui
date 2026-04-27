# TM-UI

基于 ant-design-vue 二次封装的 Vue 3 组件库，组件以 `tm` 前缀命名。

## 特性

- TypeScript 完整类型支持
- 按需引入，自动 Tree-shaking
- 统一的样式规范和增强功能
- 保留 ant-design-vue 所有原始 API

## 安装

```bash
pnpm add tm-ui
```

## 快速开始

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import TmUI from 'tm-ui'

const app = createApp(App)
app.use(Antd)
app.use(TmUI)
app.mount('#app')
```

## 组件列表

| 组件 | 标签 | 说明 |
|------|------|------|
| TmButton | `<tm-button>` | 增强按钮 |
| TmInput | `<tm-input>` | 增强输入框 |
| TmSelect | `<tm-select>` | 增强选择器 |
| TmTable | `<tm-table>` | 增强表格 |
| TmForm | `<tm-form>` | 增强表单 |

## 开发

```bash
# 开发调试（playground）
pnpm dev

# 后台模板开发
pnpm admin:dev

# 构建库
pnpm build

# 构建后台模板
pnpm admin:build

# 文档站开发
pnpm docs:dev

# 文档站构建
pnpm docs:build
```

## 项目结构

```
tm-ui/
├── apps/admin/    # 可复用后台模板
├── src/           # 组件库源码
├── play/          # 开发调试沙箱
├── docs/          # VitePress 文档站
├── dist/          # 构建产物
├── vite.config.ts # 构建配置
└── package.json
```
1.全部采用已有的"透传+增强默认值"模式 
2. 分批次
3. 每个组件生成独立的 .md 文档
4. 统一 Tm 前缀
5. 只对核心组件写测试
6. 另外每个组件目录格式不要那么普通，需要更清晰
7. 技术上加上tailwindcss
