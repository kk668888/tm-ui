# TmCarousel 走马灯

组件描述，完整继承 ant-design-vue 的 Carousel 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-carousel style="max-width: 400px;">
    <div style="height: 160px; background: #364d79; color: #fff; display: flex; align-items: center; justify-content: center;">幻灯片 1</div>
    <div style="height: 160px; background: #689bd5; color: #fff; display: flex; align-items: center; justify-content: center;">幻灯片 2</div>
    <div style="height: 160px; background: #a3c6f5; color: #fff; display: flex; align-items: center; justify-content: center;">幻灯片 3</div>
  </tm-carousel>
</div>

```vue
<template>
  <tm-carousel style="max-width: 400px;">
    <div style="height: 160px; background: #364d79; color: #fff; display: flex; align-items: center; justify-content: center;">幻灯片 1</div>
    <div style="height: 160px; background: #689bd5; color: #fff; display: flex; align-items: center; justify-content: center;">幻灯片 2</div>
    <div style="height: 160px; background: #a3c6f5; color: #fff; display: flex; align-items: center; justify-content: center;">幻灯片 3</div>
  </tm-carousel>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| autoplay | 是否自动切换 | `boolean` | `false` |
| dotPosition | 面板指示点位置 | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` |
| dots | 是否显示面板指示点 | `boolean \| object` | `true` |
| effect | 动画效果函数 | `'scrollx' \| 'fade'` | `'scrollx'` |
| easing | 动画过渡 | `string` | `'ease'` |
| dotRender | 自定义指示点渲染 | `(o: VNode, i: number) => VNode` | `-` |
| dotActiveClassName | 指示点激活的类名 | `string` | `-` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| afterChange | 切换面板后触发 | `(current: number)` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 幻灯片内容 |

> TmCarousel 透传 ant-design-vue Carousel 的全部 API。
