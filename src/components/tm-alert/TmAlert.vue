<template>
  <a-alert
    v-bind="forwardedAttrs"
    :message="message"
    :description="description"
    :type="type"
    :show-icon="showIcon"
    :closable="closable"
    :banner="banner"
    class="tm-alert"
    @close="handleClose"
  >
    <template v-if="$slots.icon" #icon>
      <slot name="icon" />
    </template>
    <template v-if="$slots.action" #action>
      <slot name="action" />
    </template>
  </a-alert>
</template>

<script setup lang="ts">
import { useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmAlert', inheritAttrs: false })

withDefaults(
  defineProps<{
    message?: string
    description?: string
    type?: 'success' | 'info' | 'warning' | 'error'
    showIcon?: boolean
    closable?: boolean
    banner?: boolean
  }>(),
  {
    type: 'info',
    showIcon: true,
    closable: false,
    banner: false,
  },
)

const emit = defineEmits<{ close: [] }>()
const forwardedAttrs = useForwardAttrs()
const handleClose = () => emit('close')
</script>

<style scoped lang="less">
.tm-alert { border-radius: 6px; margin-bottom: 16px; }
</style>
