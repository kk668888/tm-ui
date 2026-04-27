<template>
  <a-menu
    v-bind="forwardedAttrs"
    :open-keys="openKeys"
    :selected-keys="selectedKeys"
    :mode="mode"
    :theme="theme"
    :inline-collapsed="inlineCollapsed"
    class="tm-menu"
    @update:open-keys="(v) => emit('update:openKeys', v)"
    @update:selected-keys="(v) => emit('update:selectedKeys', v)"
  >
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </a-menu>
</template>

<script setup lang="ts">
import { useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmMenu', inheritAttrs: false })

withDefaults(
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
    openKeys: () => [],
    selectedKeys: () => [],
  },
)

const emit = defineEmits<{
  'update:openKeys': [keys: string[]]
  'update:selectedKeys': [keys: string[]]
}>()

const forwardedAttrs = useForwardAttrs()
</script>

<style scoped lang="less">
.tm-menu { border-radius: 6px; }
</style>
