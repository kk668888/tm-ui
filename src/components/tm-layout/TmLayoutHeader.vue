<template>
  <ForwardRender
    :is="ALayoutHeader"
    :attrs="{ ...forwardedAttrs, class: 'tm-layout-header' }"
    :slots="$slots"
  />
</template>

<script setup lang="ts">
import { LayoutHeader as ALayoutHeader } from 'ant-design-vue'
import { ForwardRender, useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmLayoutHeader', inheritAttrs: false })

const forwardedAttrs = useForwardAttrs()
</script>

<style scoped lang="less">
.tm-layout-header {
  transition: all 0.2s ease;
}
</style>
