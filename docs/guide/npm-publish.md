# 发布到 npm

本文档用于说明如何把 `@kibus/tm-ui` 发布到 npm，让其他 Vue 3 项目可以通过包管理器安装并使用。

## 发布前检查

发布前先确认当前包名和版本号：

```powershell
Get-Content -Raw package.json
```

当前项目的包名应为：

```json
{
  "name": "@kibus/tm-ui",
  "version": "0.1.0"
}
```

这里使用 `@kibus/tm-ui` 这种作用域包名，是因为普通包名 `tm-ui` 已经被占用。`@kibus` 必须是你自己的 npm 用户名，或者是你有发布权限的 npm organization。

## 确认 npm 登录状态

先切换到 npm 官方源，避免发布到淘宝源或公司私有源：

```powershell
npm config set registry https://registry.npmjs.org/
```

查看当前是否已经登录：

```powershell
npm whoami
```

如果提示未登录，执行：

```powershell
npm login
```

登录时按提示输入 npm 用户名、密码和一次性验证码。如果账号开启了双因素认证，发布时也可能需要输入验证码。

## 安装依赖

如果是第一次在本机发布，先安装依赖：

```powershell
pnpm install
```

## 构建并检查产物

发布前至少执行一次构建：

```powershell
pnpm build
```

当前项目的构建入口由 `package.json` 控制：

```json
{
  "main": "./dist/tm-ui.cjs.js",
  "module": "./dist/tm-ui.es.js",
  "types": "./dist/index.d.ts",
  "files": ["dist"]
}
```

这些字段表示：

| 字段     | 作用                         |
| -------- | ---------------------------- |
| `main`   | CommonJS 使用的入口文件      |
| `module` | ESM 使用的入口文件           |
| `types`  | TypeScript 类型声明入口      |
| `files`  | npm 发布时只包含 `dist` 目录 |

构建成功后，确认 `dist` 目录里至少包含：

```text
dist/tm-ui.es.js
dist/tm-ui.cjs.js
dist/index.d.ts
dist/style.css
```

## 预览发布内容

正式发布前，用 dry-run 检查 npm 实际会上传哪些文件：

```powershell
npm pack --dry-run
```

重点确认输出里包含 `dist` 目录和 `package.json`，同时不要包含 `node_modules`、`play`、`docs/.vitepress/cache` 等开发目录。

## 正式发布

因为 `@kibus/tm-ui` 是作用域包，公开发布时需要加 `--access public`：

```powershell
npm publish --access public
```

如果发布成功，npm 会返回包名和版本号。之后其他项目就可以安装这个版本。

## 版本升级

npm 不允许重复发布同一个版本号。每次重新发布前都要先升级版本。

修复 bug 时：

```powershell
npm version patch
npm publish --access public
```

新增兼容功能时：

```powershell
npm version minor
npm publish --access public
```

发布不兼容的大版本时：

```powershell
npm version major
npm publish --access public
```

版本含义：

| 命令                | 示例               | 使用场景                 |
| ------------------- | ------------------ | ------------------------ |
| `npm version patch` | `0.1.0` -> `0.1.1` | 修复问题，不改变使用方式 |
| `npm version minor` | `0.1.0` -> `0.2.0` | 新增功能，兼容旧版本     |
| `npm version major` | `0.1.0` -> `1.0.0` | 有破坏性变更             |

## 其他项目安装

在业务项目中安装：

```powershell
pnpm add @kibus/tm-ui vue ant-design-vue vxe-table
```

`vue`、`ant-design-vue`、`vxe-table` 是当前组件库的 `peerDependencies`，需要由使用方项目自己安装。

## 其他项目使用

全局注册：

```ts
import { createApp } from 'vue'
import App from './App.vue'
import TmUI from '@kibus/tm-ui'
import '@kibus/tm-ui/style.css'

const app = createApp(App)

// 注册 TM-UI 的全部组件，适合后台管理系统或内部系统统一接入。
app.use(TmUI)

app.mount('#app')
```

按需引入：

```ts
import { createApp } from 'vue'
import App from './App.vue'
import { TmButton, TmInput } from '@kibus/tm-ui'
import '@kibus/tm-ui/style.css'

const app = createApp(App)

// 只注册当前页面或项目实际使用的组件，减少无关组件进入业务代码。
app.use(TmButton)
app.use(TmInput)

app.mount('#app')
```

模板中使用：

```vue
<template>
  <tm-button type="primary">保存</tm-button>
  <tm-input v-model:value="keyword" placeholder="请输入关键字" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 页面搜索关键字，示例用于演示 TmInput 的 v-model:value 绑定方式。
const keyword = ref('')
</script>
```

## 常见问题

### 包名被占用怎么办

普通包名被占用时，使用作用域包：

```json
{
  "name": "@kibus/tm-ui"
}
```

发布时使用：

```powershell
npm publish --access public
```

### 提示没有发布权限

确认当前登录账号：

```powershell
npm whoami
```

如果 `@kibus` 是 organization，需要确认当前账号已经加入该 organization，并拥有 publish 权限。

### 提示版本已经存在

先升级版本号，再重新发布：

```powershell
npm version patch
npm publish --access public
```

### 业务项目样式没有生效

确认业务项目已经引入样式文件：

```ts
import '@kibus/tm-ui/style.css'
```

如果组件内部依赖 ant-design-vue 的基础样式，也需要在业务项目入口中引入：

```ts
import 'ant-design-vue/dist/reset.css'
```

npm_<your_token>

npm config set //registry.npmjs.org/:_authToken npm_<your_token>
