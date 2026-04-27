<template>
  <ForwardRender
    :is="AMenu"
    :attrs="menuAttrs"
    :slots="$slots"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Menu as AMenu } from 'ant-design-vue'
import { ForwardRender, useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmMenu', inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    mode?: 'vertical' | 'horizontal' | 'inline'
    theme?: 'light' | 'dark'
    inlineCollapsed?: boolean
    openKeys?: string[]
    selectedKeys?: string[]
  }>(),
  {
    mode: 'vertical',
    theme: 'light',
  },
)

const emit = defineEmits<{
  'update:openKeys': [keys: string[]]
  'update:selectedKeys': [keys: string[]]
}>()

const forwardedAttrs = useForwardAttrs()
const menuAttrs = computed(() => ({
  ...forwardedAttrs.value,
  ...(props.openKeys !== undefined ? { openKeys: props.openKeys } : {}),
  ...(props.selectedKeys !== undefined ? { selectedKeys: props.selectedKeys } : {}),
  mode: props.mode,
  theme: props.theme,
  inlineCollapsed: props.inlineCollapsed,
  class: 'tm-menu',
  'onUpdate:openKeys': updateOpenKeys,
  'onUpdate:selectedKeys': updateSelectedKeys,
}))
const updateOpenKeys = (keys: string[]) => emit('update:openKeys', keys)
const updateSelectedKeys = (keys: string[]) => emit('update:selectedKeys', keys)
</script>

<style scoped lang="less">
.tm-menu { border-radius: 6px; }
</style>
