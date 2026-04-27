<template>
  <a-segmented v-bind="segmentedAttrs" />
</template>
<script setup lang="ts">
import { computed } from 'vue'; import { useForwardAttrs } from '@/utils'
defineOptions({ name: 'TmSegmented', inheritAttrs: false })
const props = withDefaults(defineProps<{ modelValue?: string | number; options?: any[]; block?: boolean }>(), { modelValue: undefined, options: () => [], block: false })
const emit = defineEmits<{ 'update:modelValue': [value: string | number] }>()
const forwardedAttrs = useForwardAttrs()
const segmentedAttrs = computed(() => ({
  ...forwardedAttrs.value,
  ...(props.modelValue !== undefined ? { value: props.modelValue } : {}),
  options: props.options,
  block: props.block,
  class: 'tm-segmented',
  'onUpdate:value': handleChange,
}))
const handleChange = (v: string | number) => emit('update:modelValue', v)
</script>
<style scoped lang="less">.tm-segmented { border-radius: 6px; }</style>
