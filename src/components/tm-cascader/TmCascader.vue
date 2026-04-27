<template>
  <a-cascader v-bind="cascaderAttrs">
    <template v-for="(_, name) in $slots" #[name]="slotProps"><slot :name="name" v-bind="slotProps" /></template>
  </a-cascader>
</template>
<script setup lang="ts">
import { computed } from 'vue'; import { useForwardAttrs } from '@/utils'
defineOptions({ name: 'TmCascader', inheritAttrs: false })
const props = withDefaults(defineProps<{ modelValue?: any; options?: any[]; placeholder?: string; showSearch?: boolean; allowClear?: boolean }>(), { modelValue: undefined, options: () => [], placeholder: '请选择', showSearch: true, allowClear: true })
const emit = defineEmits<{ 'update:modelValue': [value: any] }>()
const forwardedAttrs = useForwardAttrs()
const cascaderAttrs = computed(() => ({
  ...forwardedAttrs.value,
  ...(props.modelValue !== undefined ? { value: props.modelValue } : {}),
  options: props.options,
  placeholder: props.placeholder,
  showSearch: props.showSearch,
  allowClear: props.allowClear,
  class: 'tm-cascader',
  'onUpdate:value': handleChange,
}))
const handleChange = (v: any) => emit('update:modelValue', v)
</script>
<style scoped lang="less">.tm-cascader { border-radius: 6px; }</style>
