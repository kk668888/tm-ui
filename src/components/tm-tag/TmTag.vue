<template>
  <ForwardRender
    :is="ATag"
    :attrs="tagAttrs"
    :slots="$slots"
  />
</template>
<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Tag as ATag } from 'ant-design-vue'
import { ForwardRender, useForwardAttrs } from '@/utils'
defineOptions({ name: 'TmTag', inheritAttrs: false })
const props = withDefaults(defineProps<{ color?: string; closable?: boolean; visible?: boolean }>(), { closable: false, visible: true })
const emit = defineEmits<{ close: [] }>()
const attrs = useAttrs()
const forwardedAttrs = useForwardAttrs()
const tagAttrs = computed(() => ({
  ...forwardedAttrs.value,
  color: props.color,
  closable: props.closable,
  visible: props.visible,
  class: ['tm-tag', attrs.class],
  onClose: handleClose,
}))
const handleClose = () => emit('close')
</script>
<style scoped lang="less">.tm-tag { border-radius: 4px; }</style>
