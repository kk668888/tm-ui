<template>
  <ForwardRender
    :is="ALayoutSider"
    :attrs="{ ...forwardedAttrs, theme, class: 'tm-layout-sider' }"
    :slots="$slots"
  />
</template>

<script setup lang="ts">
import { LayoutSider as ALayoutSider } from 'ant-design-vue'
import { ForwardRender, useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmLayoutSider', inheritAttrs: false })

withDefaults(
  defineProps<{
    theme?: 'light' | 'dark'
  }>(),
  { theme: 'dark' },
)

const forwardedAttrs = useForwardAttrs()
</script>

<style scoped lang="less">
.tm-layout-sider {
  transition: all 0.2s ease;
}
</style>
