<template>
  <a-popconfirm
    v-bind="forwardedAttrs"
    :title="title"
    :ok-text="okText"
    :cancel-text="cancelText"
    :placement="placement"
    class="tm-popconfirm"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  >
    <slot />
    <template v-if="$slots.icon" #icon>
      <slot name="icon" />
    </template>
  </a-popconfirm>
</template>

<script setup lang="ts">
import { useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmPopconfirm', inheritAttrs: false })

withDefaults(
  defineProps<{
    title?: string
    okText?: string
    cancelText?: string
    placement?: 'top' | 'bottom' | 'left' | 'right'
  }>(),
  {
    title: '确定执行此操作吗？',
    okText: '确定',
    cancelText: '取消',
    placement: 'top',
  },
)

const emit = defineEmits<{ confirm: []; cancel: [] }>()
const forwardedAttrs = useForwardAttrs()
const handleConfirm = () => emit('confirm')
const handleCancel = () => emit('cancel')
</script>
