<template>
  <a-dropdown v-bind="forwardedAttrs" :trigger="trigger" :placement="placement" class="tm-dropdown">
    <template #default><slot /></template>
    <template #overlay>
      <a-menu>
        <a-menu-item v-for="item in items" :key="item.key" @click="handleClick(item)">
          {{ item.label }}
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
import { useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmDropdown', inheritAttrs: false })

export interface TmDropdownItem {
  key: string
  label: string
  disabled?: boolean
}

withDefaults(
  defineProps<{
    items?: TmDropdownItem[]
    trigger?: ('click' | 'hover' | 'contextmenu')[]
    placement?: 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight'
  }>(),
  {
    items: () => [],
    trigger: () => ['hover'],
    placement: 'bottomLeft',
  },
)

const emit = defineEmits<{ select: [item: TmDropdownItem] }>()
const forwardedAttrs = useForwardAttrs()
const handleClick = (item: TmDropdownItem) => emit('select', item)
</script>

<style scoped lang="less">
.tm-dropdown { display: inline-block; }
</style>
