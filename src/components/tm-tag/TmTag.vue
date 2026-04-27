<template>
  <ForwardRender
    :is="ATag"
    :attrs="{ ...forwardedAttrs, color, closable, visible, class: 'tm-tag', onClose: handleClose }"
    :slots="$slots"
  />
</template>
<script setup lang="ts">
import { Tag as ATag } from 'ant-design-vue'
import { ForwardRender, useForwardAttrs } from '@/utils'
defineOptions({ name: 'TmTag', inheritAttrs: false })
withDefaults(defineProps<{ color?: string; closable?: boolean; visible?: boolean }>(), { closable: false, visible: true })
const emit = defineEmits<{ close: [] }>()
const forwardedAttrs = useForwardAttrs()
const handleClose = () => emit('close')
</script>
<style scoped lang="less">.tm-tag { border-radius: 4px; }</style>
