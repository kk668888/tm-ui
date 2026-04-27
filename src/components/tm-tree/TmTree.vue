<template>
  <a-tree
    v-bind="forwardedAttrs"
    :tree-data="treeData"
    :show-line="showLine"
    :show-icon="showIcon"
    :selectable="selectable"
    :block-node="blockNode"
    :checkable="checkable"
    :check-strictly="checkStrictly"
    :default-expand-all="defaultExpandAll"
    :expanded-keys="expandedKeys"
    :selected-keys="selectedKeys"
    :checked-keys="checkedKeys"
    class="tm-tree"
    @update:expanded-keys="(v) => emit('update:expandedKeys', v)"
    @update:selected-keys="(v) => emit('update:selectedKeys', v)"
    @update:checked-keys="(v) => emit('update:checkedKeys', v)"
  >
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </a-tree>
</template>

<script setup lang="ts">
import { useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmTree', inheritAttrs: false })

withDefaults(
  defineProps<{
    treeData?: any[]
    showLine?: boolean
    showIcon?: boolean
    selectable?: boolean
    blockNode?: boolean
    checkable?: boolean
    checkStrictly?: boolean
    defaultExpandAll?: boolean
    expandedKeys?: (string | number)[]
    selectedKeys?: (string | number)[]
    checkedKeys?: (string | number)[]
  }>(),
  {
    treeData: () => [],
    showLine: true,
    showIcon: true,
    selectable: true,
    blockNode: false,
    checkable: false,
    checkStrictly: false,
    defaultExpandAll: false,
  },
)

const emit = defineEmits<{
  'update:expandedKeys': [keys: (string | number)[]]
  'update:selectedKeys': [keys: (string | number)[]]
  'update:checkedKeys': [keys: (string | number)[]]
}>()

const forwardedAttrs = useForwardAttrs()
</script>

<style scoped lang="less">
.tm-tree {
  border-radius: 6px;
}
</style>
