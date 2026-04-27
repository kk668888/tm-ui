<template>
  <a-qrcode v-bind="forwardedAttrs" :value="value" :size="size" :icon="icon" :bordered="bordered" :color="color" class="tm-qr-code" />
</template>
<script setup lang="ts">
import { useForwardAttrs } from '@/utils'
defineOptions({ name: 'TmQRCode', inheritAttrs: false })
withDefaults(defineProps<{ value: string; size?: number; icon?: string; bordered?: boolean; color?: { dark: string; light: string } }>(), { size: 160, bordered: true })
const forwardedAttrs = useForwardAttrs()
</script>
