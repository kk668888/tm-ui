<template>
  <a-slider v-bind="sliderAttrs" />
</template>
<script setup lang="ts">
import { computed } from 'vue'; import { useForwardAttrs } from '@/utils'
defineOptions({ name: 'TmSlider', inheritAttrs: false })
const props = withDefaults(defineProps<{ modelValue?: number | [number, number]; min?: number; max?: number; step?: number; range?: boolean; marks?: Record<string, string>; tooltip?: boolean }>(), { min: 0, max: 100, step: 1, range: false, tooltip: true })
const emit = defineEmits<{ 'update:modelValue': [value: number | [number, number]] }>()
const forwardedAttrs = useForwardAttrs()
const sliderAttrs = computed(() => ({
  ...forwardedAttrs.value,
  ...(props.modelValue !== undefined ? { value: props.modelValue } : {}),
  min: props.min,
  max: props.max,
  step: props.step,
  range: props.range,
  marks: props.marks,
  tooltip: props.tooltip,
  class: 'tm-slider',
  'onUpdate:value': handleChange,
}))
const handleChange = (v: number | [number, number]) => emit('update:modelValue', v)
</script>
