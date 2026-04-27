<template>
  <ForwardRender
    :is="ADescriptions"
    :attrs="{ ...forwardedAttrs, title, column, bordered, size, layout, class: 'tm-descriptions' }"
    :slots="$slots"
  />
</template>

<script setup lang="ts">
import { Descriptions as ADescriptions } from 'ant-design-vue'
import { ForwardRender, useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmDescriptions', inheritAttrs: false })

withDefaults(
  defineProps<{
    title?: string
    column?: number
    bordered?: boolean
    size?: 'small' | 'middle' | 'large'
    layout?: 'horizontal' | 'vertical'
  }>(),
  {
    column: 3,
    bordered: false,
    size: 'middle',
    layout: 'horizontal',
  },
)

const forwardedAttrs = useForwardAttrs()
</script>

<style scoped lang="less">
.tm-descriptions {
  border-radius: 6px;
}
</style>
