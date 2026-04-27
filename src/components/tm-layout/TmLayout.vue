<template>
  <a-layout v-bind="forwardedAttrs" :has-sider="hasSider" class="tm-layout">
    <slot />
  </a-layout>
</template>

<script setup lang="ts">
import { useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmLayout', inheritAttrs: false })

withDefaults(
  defineProps<{
    hasSider?: boolean
  }>(),
  { hasSider: false },
)

const forwardedAttrs = useForwardAttrs()
</script>

<style scoped lang="less">
.tm-layout {
  min-height: 100vh;
  transition: all 0.2s ease;
}
</style>
