<template>
  <a-tree-select
    v-bind="treeSelectAttrs"
  >
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </a-tree-select>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmTreeSelect', inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    modelValue?: any
    treeData?: any[]
    placeholder?: string
    showSearch?: boolean
    allowClear?: boolean
    multiple?: boolean
    defaultExpandAll?: boolean
  }>(),
  {
    modelValue: undefined,
    treeData: () => [],
    placeholder: '请选择',
    showSearch: true,
    allowClear: true,
    multiple: false,
    defaultExpandAll: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: any]
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

const handleChange = (value: any) => {
  emit('update:modelValue', value)
}
</script>

<style scoped lang="less">
.tm-tree-select {
  border-radius: 6px;
  transition: all 0.2s ease;
}
</style>
