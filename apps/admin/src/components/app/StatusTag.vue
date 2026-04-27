<template>
  <a-tag :color="color">
    {{ label }}
  </a-tag>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  value: string
}>()

const color = computed(() => {
  if (props.value === 'enabled' || props.value === 'success') {
    return 'success'
  }
  if (props.value === 'disabled' || props.value === 'failed') {
    return 'error'
  }
  return 'processing'
})

const label = computed(() => {
  if (props.value === 'enabled') return '启用'
  if (props.value === 'disabled') return '停用'
  if (props.value === 'success') return '成功'
  if (props.value === 'failed') return '失败'
  return props.value
})
</script>
