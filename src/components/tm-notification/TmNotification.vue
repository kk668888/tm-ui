<template>
  <a-notification
    v-bind="forwardedAttrs"
    :message="message"
    :description="description"
    :type="type"
    :duration="duration"
    :placement="placement"
    class="tm-notification"
  />
</template>

<script setup lang="ts">
import { useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmNotification', inheritAttrs: false })

withDefaults(
  defineProps<{
    message?: string
    description?: string
    type?: 'success' | 'info' | 'warning' | 'error'
    duration?: number
    placement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
  }>(),
  {
    type: 'info',
    duration: 4.5,
    placement: 'topRight',
  },
)

const forwardedAttrs = useForwardAttrs()
</script>
