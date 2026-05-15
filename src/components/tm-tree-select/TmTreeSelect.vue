<template>
  <a-tree-select v-bind="treeSelectAttrs">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </a-tree-select>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardAttrs } from '@/utils'
import type { TmTreeOption, TmValue } from '../shared-types'

defineOptions({ name: 'TmTreeSelect', inheritAttrs: false })

export type TmTreeSelectValue = TmValue | TmValue[]

export interface TmTreeSelectProps {
  modelValue?: TmTreeSelectValue
  treeData?: TmTreeOption[]
  placeholder?: string
  showSearch?: boolean
  allowClear?: boolean
  multiple?: boolean
  defaultExpandAll?: boolean
}

const props = withDefaults(defineProps<TmTreeSelectProps>(), {
  modelValue: undefined,
  treeData: () => [],
  placeholder: '请选择',
  showSearch: true,
  allowClear: true,
  multiple: false,
  defaultExpandAll: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: TmTreeSelectValue]
}>()

const forwardedAttrs = useForwardAttrs()

const treeSelectAttrs = computed(() => ({
  ...forwardedAttrs.value,
  ...(props.modelValue !== undefined ? { value: props.modelValue } : {}),
  treeData: props.treeData,
  placeholder: props.placeholder,
  showSearch: props.showSearch,
  allowClear: props.allowClear,
  multiple: props.multiple,
  treeDefaultExpandAll: props.defaultExpandAll,
  class: 'tm-tree-select',
  'onUpdate:value': handleChange,
}))

const handleChange = (value: TmTreeSelectValue) => {
  emit('update:modelValue', value)
}
</script>

<style scoped lang="less">
.tm-tree-select {
  border-radius: 6px;
  transition: all 0.2s ease;
}
</style>
