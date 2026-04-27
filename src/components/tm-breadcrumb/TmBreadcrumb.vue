<template>
  <a-breadcrumb v-bind="forwardedAttrs" :separator="separator" class="tm-breadcrumb">
    <a-breadcrumb-item v-for="(item, index) in items" :key="index">
      <template v-if="item.href">
        <a :href="item.href">{{ item.title }}</a>
      </template>
      <template v-else>
        {{ item.title }}
      </template>
    </a-breadcrumb-item>
    <slot />
  </a-breadcrumb>
</template>

<script setup lang="ts">
import { useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmBreadcrumb', inheritAttrs: false })

export interface TmBreadcrumbItem {
  title: string
  href?: string
}

withDefaults(
  defineProps<{
    items?: TmBreadcrumbItem[]
    separator?: string
  }>(),
  {
    items: () => [],
    separator: '/',
  },
)

const forwardedAttrs = useForwardAttrs()
</script>

<style scoped lang="less">
.tm-breadcrumb { border-radius: 6px; }
</style>
