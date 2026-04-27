# TmFloatButton 悬浮按钮

悬浮按钮组件，包裹 ant-design-vue 的 FloatButton 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0; position: relative; min-height: 60px;">
  <tm-float-button type="primary" style="position: relative;" />
</div>

```vue
<template>
  <tm-float-button type="primary">
    <Icon />
  </tm-float-button>
</template>
```

## 回到顶部

<div class="demo-wrapper" style="padding: 16px 0;">
  <div ref="backTopContainer" style="position: relative; height: 160px; overflow: auto; padding: 12px; border: 1px solid #f0f0f0; border-radius: 8px;">
    <div style="height: 420px; background: linear-gradient(180deg, #f8fbff 0%, #eef4ff 100%); border-radius: 6px; padding: 12px;">
      向下滚动此区域，右下角会出现返回顶部按钮。
    </div>
    <tm-back-top :target="() => backTopContainer" :visibility-height="60" style="right: 16px; bottom: 16px;" />
  </div>
</div>

```vue
<template>
  <div ref="container" style="height: 160px; overflow: auto; position: relative;">
    <div style="height: 420px;">滚动内容</div>
    <tm-back-top :target="() => container" :visibility-height="60" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const container = ref()
</script>
```

## API

TmFloatButton 完整继承 ant-design-vue 的 FloatButton 组件的所有 props、events 和 slots。

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| type | 按钮类型 | `'primary' \| 'default'` | `'default'` |
| shape | 按钮形状 | `'circle' \| 'square'` | `'circle'` |
| icon | 自定义图标 | `VNode \| Component` | - |
| style | 自定义样式 | `CSSProperties` | - |

### FloatButton.Group

```vue
<template>
  <tm-float-button-group>
    <tm-float-button>1</tm-float-button>
    <tm-float-button>2</tm-float-button>
  </tm-float-button-group>
</template>
```

> TmFloatButton 透传 ant-design-vue FloatButton 的全部 API。

<script setup>
import { ref } from 'vue'

const backTopContainer = ref()
</script>
