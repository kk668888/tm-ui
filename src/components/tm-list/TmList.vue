<template>
  <a-list
    v-bind="forwardedAttrs"
    :data-source="dataSource"
    :loading="loading"
    :pagination="pagination"
    :header="header"
    :footer="footer"
    :bordered="bordered"
    :size="size"
    class="tm-list"
  >
    <template #renderItem="{ item }">
      <slot name="renderItem" :item="item" />
    </template>
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot v-if="name !== 'renderItem'" :name="name" v-bind="slotProps" />
    </template>
  </a-list>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import { useForwardAttrs } from '@/utils'

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
