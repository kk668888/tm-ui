<template>
  <a-descriptions
    v-bind="forwardedAttrs"
    :title="title"
    :column="column"
    :bordered="bordered"
    :size="size"
    :layout="layout"
    class="tm-descriptions"
  >
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </a-descriptions>
</template>

<script setup lang="ts">
import { useForwardAttrs } from '@/utils'

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
