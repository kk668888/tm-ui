<template>
  <a-mentions v-bind="mentionsAttrs">
    <template v-for="(_, name) in $slots" #[name]="slotProps"><slot :name="name" v-bind="slotProps" /></template>
  </a-mentions>
</template>
<script setup lang="ts">
import { computed } from 'vue'; import { useForwardAttrs } from '@/utils'
defineOptions({ name: 'TmMentions', inheritAttrs: false })
const props = withDefaults(defineProps<{ modelValue?: string; options?: any[]; placeholder?: string }>(), { options: () => [], placeholder: '请输入' })
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
const forwardedAttrs = useForwardAttrs()
const mentionsAttrs = computed(() => ({
  ...forwardedAttrs.value,
  ...(props.modelValue !== undefined ? { value: props.modelValue } : {}),
  options: props.options,
  placeholder: props.placeholder,
  class: 'tm-mentions',
  'onUpdate:value': handleChange,
}))
const handleChange = (v: string) => emit('update:modelValue', v)
</script>
