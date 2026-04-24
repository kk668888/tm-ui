<template>
  <a-button v-bind="$attrs" class="tm-btn">
    <slot />
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </a-button>
</template>

<script setup lang="ts">
/**
 * TmButton - 增强按钮组件
 * 包裹 ant-design-vue 的 Button，提供统一的样式前缀和自定义扩展点
 */
defineOptions({
  name: 'TmButton',
  inheritAttrs: false,
})
</script>

<style scoped lang="less">
.tm-btn {
  font-weight: 500;
  transition: all 0.2s ease;

  &:active {
    transform: scale(0.98);
  }
}
</style>
