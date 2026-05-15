<template>
  <ForwardRender
    :is="ALayoutFooter"
    :attrs="{ ...forwardedAttrs, class: 'tm-layout-footer' }"
    :slots="$slots"
  />
</template>

<script setup lang="ts">
import { LayoutFooter as ALayoutFooter } from 'ant-design-vue'
import { ForwardRender, useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmLayoutFooter', inheritAttrs: false })

const forwardedAttrs = useForwardAttrs()
</script>

<style scoped lang="less">
.tm-layout-footer {
  transition: all 0.2s ease;
}
</style>
