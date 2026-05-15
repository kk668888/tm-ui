<template>
  <span class="admin-status-tag" :class="statusClass">
    {{ label }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  value: string
}>()

const statusClass = computed(() => {
  if (props.value === 'enabled' || props.value === 'success') {
    return 'admin-status-tag-success'
  }
  if (props.value === 'disabled' || props.value === 'failed') {
    return 'admin-status-tag-danger'
  }
  return 'admin-status-tag-info'
})

const label = computed(() => {
  if (props.value === 'enabled') return '启用'
  if (props.value === 'disabled') return '停用'
  if (props.value === 'success') return '成功'
  if (props.value === 'failed') return '失败'
  return props.value
})
</script>
