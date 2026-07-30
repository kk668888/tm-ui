<template>
  <a-comment v-bind="forwardedAttrs" :author="author" :avatar="avatar" :content="content" :datetime="datetime" :actions="actions" class="tm-comment">
    <template v-if="$slots.actions" #actions><slot name="actions" /></template>
    <template v-if="$slots.avatar" #avatar><slot name="avatar" /></template>
    <template v-if="$slots.author" #author><slot name="author" /></template>
    <template v-if="$slots.content" #content><slot name="content" /></template>
    <template v-if="$slots.datetime" #datetime><slot name="datetime" /></template>
  </a-comment>
</template>
<script setup lang="ts">
import type { VNode } from 'vue'
import { useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmComment', inheritAttrs: false })

// ant-design-vue Comment 的 actions 为 VNode 数组，收敛 any[]
withDefaults(
  defineProps<{ author?: string; avatar?: string; content?: string; datetime?: string; actions?: VNode[] }>(),
  {},
)
const forwardedAttrs = useForwardAttrs()
</script>
