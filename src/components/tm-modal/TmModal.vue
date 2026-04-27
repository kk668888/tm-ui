<template>
  <ForwardRender
    :is="AModal"
    :attrs="{ ...forwardedAttrs, open: visible, title, width, confirmLoading, okText, cancelText, maskClosable, destroyOnClose, class: 'tm-modal', onOk: handleOk, onCancel: handleCancel, 'onUpdate:open': updateVisible }"
    :slots="$slots"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Modal as AModal } from 'ant-design-vue'
import { ForwardRender, useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmModal', inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    title?: string
    width?: number | string
    confirmLoading?: boolean
    okText?: string
    cancelText?: string
    maskClosable?: boolean
    destroyOnClose?: boolean
  }>(),
  {
    modelValue: false,
    width: 520,
    okText: '确定',
    cancelText: '取消',
    maskClosable: true,
    destroyOnClose: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  ok: []
  cancel: []
}>()

const forwardedAttrs = useForwardAttrs()

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const handleOk = () => emit('ok')
const handleCancel = () => emit('cancel')
const updateVisible = (value: boolean) => emit('update:modelValue', value)
</script>

<style scoped lang="less">
.tm-modal { border-radius: 8px; }
</style>
