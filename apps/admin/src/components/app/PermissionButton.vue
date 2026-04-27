<template>
  <tm-button
    v-if="visible"
    v-bind="$attrs"
    :disabled="isDisabled"
  >
    <slot />
  </tm-button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePermissionStore } from '@admin/stores/permission'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  permission?: string | string[]
  mode?: 'hidden' | 'disabled'
}>(), {
  permission: undefined,
  mode: 'hidden',
})

const permissionStore = usePermissionStore()
const allowed = computed(() => permissionStore.hasPermission(props.permission))
const visible = computed(() => props.mode === 'disabled' || allowed.value)
const isDisabled = computed(() => props.mode === 'disabled' && !allowed.value)
</script>
