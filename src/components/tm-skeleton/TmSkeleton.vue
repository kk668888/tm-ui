<template>
  <a-skeleton v-bind="forwardedAttrs" :active="active" :loading="loading" :avatar="avatar" :title="title" :paragraph="paragraph" class="tm-skeleton">
    <template v-for="(_, name) in $slots" #[name]="slotProps"><slot :name="name" v-bind="slotProps" /></template>
  </a-skeleton>
</template>
<script setup lang="ts">
import { useForwardAttrs } from '@/utils'
defineOptions({ name: 'TmSkeleton', inheritAttrs: false })
withDefaults(defineProps<{ active?: boolean; loading?: boolean; avatar?: boolean | object; title?: boolean | object; paragraph?: boolean | object }>(), { loading: true, active: true, avatar: false, title: true, paragraph: true })
const forwardedAttrs = useForwardAttrs()
</script>
