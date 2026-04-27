<template>
  <ForwardRender
    :is="ALayout"
    :attrs="{ ...forwardedAttrs, hasSider, class: 'tm-layout' }"
    :slots="$slots"
  />
</template>

<script setup lang="ts">
import { Layout as ALayout } from 'ant-design-vue'
import { ForwardRender, useForwardAttrs } from '@/utils'

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
