<template>
  <ForwardRender
    :is="APopconfirm"
    :attrs="{ ...forwardedAttrs, title, okText, cancelText, placement, class: 'tm-popconfirm', onConfirm: handleConfirm, onCancel: handleCancel }"
    :slots="$slots"
  />
</template>

<script setup lang="ts">
import { Popconfirm as APopconfirm } from 'ant-design-vue'
import { ForwardRender, useForwardAttrs } from '@/utils'

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
