<template>
  <a-rate v-bind="rateAttrs" />
</template>
<script setup lang="ts">
import { computed } from 'vue'; import { useForwardAttrs } from '@/utils'
defineOptions({ name: 'TmRate', inheritAttrs: false })
const props = withDefaults(defineProps<{ modelValue?: number; count?: number; allowHalf?: boolean; allowClear?: boolean }>(), { count: 5, allowHalf: false, allowClear: true })
const emit = defineEmits<{ 'update:modelValue': [value: number] }>()
const forwardedAttrs = useForwardAttrs()
const rateAttrs = computed(() => ({
  ...forwardedAttrs.value,
  ...(props.modelValue !== undefined ? { value: props.modelValue } : {}),
  count: props.count,
  allowHalf: props.allowHalf,
  allowClear: props.allowClear,
  class: 'tm-rate',
  'onUpdate:value': handleChange,
}))
const handleChange = (v: number) => emit('update:modelValue', v)
</script>
<style scoped lang="less">.tm-rate { display: inline-flex; }</style>
