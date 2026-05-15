<template>
  <ForwardRender
    :is="ALayoutContent"
    :attrs="{ ...forwardedAttrs, class: 'tm-layout-content' }"
    :slots="$slots"
  />
</template>

<script setup lang="ts">
import { LayoutContent as ALayoutContent } from 'ant-design-vue'
import { ForwardRender, useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmLayoutContent', inheritAttrs: false })

const forwardedAttrs = useForwardAttrs()
</script>

<style scoped lang="less">
.tm-layout-content {
  min-width: 0;
}
</style>
