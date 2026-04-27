<template>
  <a-tag v-bind="forwardedAttrs" :color="color" :closable="closable" :visible="visible" class="tm-tag" @close="handleClose">
    <slot />
  </a-tag>
</template>
<script setup lang="ts">
import { useForwardAttrs } from '@/utils'
defineOptions({ name: 'TmTag', inheritAttrs: false })
withDefaults(defineProps<{ color?: string; closable?: boolean; visible?: boolean }>(), { closable: false, visible: true })
const emit = defineEmits<{ close: [] }>()
const forwardedAttrs = useForwardAttrs()
const handleClose = () => emit('close')
</script>
<style scoped lang="less">.tm-tag { border-radius: 4px; }</style>
