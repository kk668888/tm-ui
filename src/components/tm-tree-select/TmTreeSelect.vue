<template>
  <a-tree-select
    v-bind="forwardedAttrs"
    v-model:value="selectValue"
    :tree-data="treeData"
    :placeholder="placeholder"
    :show-search="showSearch"
    :allow-clear="allowClear"
    :multiple="multiple"
    :tree-default-expand-all="defaultExpandAll"
    class="tm-tree-select"
    @update:value="handleChange"
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

const selectValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

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
