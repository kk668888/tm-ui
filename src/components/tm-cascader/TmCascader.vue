<template>
  <a-cascader v-bind="forwardedAttrs" v-model:value="cascaderValue" :options="options" :placeholder="placeholder" :show-search="showSearch" :allow-clear="allowClear" class="tm-cascader" @update:value="handleChange">
    <template v-for="(_, name) in $slots" #[name]="slotProps"><slot :name="name" v-bind="slotProps" /></template>
  </a-cascader>
</template>
<script setup lang="ts">
import { computed } from 'vue'; import { useForwardAttrs } from '@/utils'
defineOptions({ name: 'TmCascader', inheritAttrs: false })
const props = withDefaults(defineProps<{ modelValue?: any; options?: any[]; placeholder?: string; showSearch?: boolean; allowClear?: boolean }>(), { modelValue: undefined, options: () => [], placeholder: '请选择', showSearch: true, allowClear: true })
const emit = defineEmits<{ 'update:modelValue': [value: any] }>()
const forwardedAttrs = useForwardAttrs()
const cascaderValue = computed({ get: () => props.modelValue, set: (v) => emit('update:modelValue', v) })
const handleChange = (v: any) => emit('update:modelValue', v)
</script>
<style scoped lang="less">.tm-cascader { border-radius: 6px; }</style>
