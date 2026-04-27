<template>
  <a-message
    v-bind="forwardedAttrs"
    :content="content"
    :type="type"
    :duration="duration"
    class="tm-message"
  />
</template>

<script setup lang="ts">
import { useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmMessage', inheritAttrs: false })

withDefaults(
  defineProps<{
    content?: string
    type?: 'success' | 'info' | 'warning' | 'error' | 'loading'
    duration?: number
  }>(),
  {
    content: '',
    type: 'info',
    duration: 3,
  },
)

const forwardedAttrs = useForwardAttrs()
</script>
