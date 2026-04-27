<template>
  <a-auto-complete v-bind="autoCompleteAttrs">
    <template v-for="(_, name) in $slots" #[name]="slotProps"><slot :name="name" v-bind="slotProps" /></template>
  </a-auto-complete>
</template>
<script setup lang="ts">
import { computed } from 'vue'; import { useForwardAttrs } from '@/utils'
defineOptions({ name: 'TmAutoComplete', inheritAttrs: false })
const props = withDefaults(defineProps<{ modelValue?: string; options?: any[]; placeholder?: string }>(), { options: () => [], placeholder: '请输入' })
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
const forwardedAttrs = useForwardAttrs()
const autoCompleteAttrs = computed(() => ({
  ...forwardedAttrs.value,
  ...(props.modelValue !== undefined ? { value: props.modelValue } : {}),
  options: props.options,
  placeholder: props.placeholder,
  class: 'tm-auto-complete',
  'onUpdate:value': handleChange,
}))
const handleChange = (v: string) => emit('update:modelValue', v)
</script>
