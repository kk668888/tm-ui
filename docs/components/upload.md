# TmUpload 上传

组件描述，完整继承 ant-design-vue 的 Upload 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-upload action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload" />
</div>

```vue
<template>
  <tm-upload action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload" />
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| accept | 接受上传的文件类型，同 input accept | `string` | - |
| action | 上传的地址 | `string \| (file) => Promise<string>` | - |
| headers | 设置上传的请求头部 | `object` | - |
| method | 上传请求的 HTTP 方法 | `string` | `'post'` |
| multiple | 是否支持多选文件 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| maxCount | 限制上传文件数量，超出后隐藏上传按钮 | `number` | - |
| fileList (v-model) | 已上传的文件列表 | `UploadFile[]` | - |
| beforeUpload | 上传文件之前的钩子，返回 false 则停止上传 | `(file: File, fileList: File[]) => boolean \| Promise<File> \| boolean` | - |
| customRequest | 覆盖默认上传行为的自定义请求 | `(options: object) => void` | - |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 上传文件状态变化时触发 | `({ file, fileList, event }) => void` |
| preview | 点击文件链接或预览图标时触发 | `(file: UploadFile) => void` |
| download | 点击下载文件时触发 | `(file: UploadFile) => void` |
| remove | 点击删除文件时的回调 | `(file: UploadFile) => boolean \| Promise<boolean> \| void` |

> TmUpload 透传 ant-design-vue Upload 的全部 API。
