<template>
  <ForwardRender
    :is="AList"
    :attrs="{ ...forwardedAttrs, dataSource, loading, pagination, header, footer, bordered, size, class: 'tm-list' }"
    :slots="$slots"
  />
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import { List as AList } from 'ant-design-vue'
import { ForwardRender, useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmList', inheritAttrs: false })

withDefaults(
  defineProps<{
    dataSource?: T[]
    loading?: boolean
    pagination?: boolean | object
    header?: string
    footer?: string
    bordered?: boolean
    size?: 'small' | 'middle' | 'large'
  }>(),
  {
    dataSource: () => [],
    loading: false,
    bordered: false,
    size: 'middle',
  },
)

const forwardedAttrs = useForwardAttrs()
</script>

<style scoped lang="less">
.tm-list {
  border-radius: 6px;
}
</style>
