<template>
  <a-card
    v-bind="forwardedAttrs"
    :title="title"
    :extra="extra"
    :bordered="bordered""
    :hoverable="hoverable"
    :loading="loading"
    :size="size"
    class="tm-card"
  >
    <template v-if="$slots.extra" #extra>
      <slot name="extra" />
    </template>
    <template v-if="$slots.cover" #cover>
      <slot name="cover" />
    </template>
    <template v-if="$slots.actions" #actions>
      <slot name="actions" />
    </template>
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot v-if="name !== 'extra' && name !== 'cover' && name !== 'actions'" :name="name" v-bind="slotProps" />
    </template>
  </a-card>
</template>

<script setup lang="ts">
import { useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmCard', inheritAttrs: false })

withDefaults(
  defineProps<{
    title?: string
    extra?: string
    bordered?: boolean
    hoverable?: boolean
    loading?: boolean
    size?: 'default' | 'small'
  }>(),
  {
    bordered: true,
    hoverable: true,
    loading: false,
    size: 'default',
  },
)

const forwardedAttrs = useForwardAttrs()
</script>

<style scoped lang="less">
.tm-card {
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
  }
}
</style>
