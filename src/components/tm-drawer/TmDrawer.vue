<template>
  <ForwardRender
    :is="ADrawer"
    :attrs="{ ...forwardedAttrs, open: visible, title, placement, width, closable, maskClosable, destroyOnClose, class: 'tm-drawer', onClose: handleClose, 'onUpdate:open': updateVisible }"
    :slots="$slots"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Drawer as ADrawer } from 'ant-design-vue'
import { ForwardRender, useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmDrawer', inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    title?: string
    placement?: 'top' | 'bottom' | 'left' | 'right'
    width?: number | string
    closable?: boolean
    maskClosable?: boolean
    destroyOnClose?: boolean
  }>(),
  {
    modelValue: false,
    placement: 'right',
    width: 378,
    closable: true,
    maskClosable: true,
    destroyOnClose: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
}>()

const forwardedAttrs = useForwardAttrs()

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const handleClose = () => emit('close')
const updateVisible = (value: boolean) => emit('update:modelValue', value)
</script>

<style scoped lang="less">
.tm-drawer { border-radius: 0; }
</style>
