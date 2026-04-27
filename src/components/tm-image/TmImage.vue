<template>
  <a-image
    v-bind="forwardedAttrs"
    :src="src"
    :width="width"
    :height="height"
    :fallback="fallback"
    :preview="preview"
    class="tm-image"
  >
    <template v-if="$slots.placeholder" #placeholder>
      <slot name="placeholder" />
    </template>
    <template v-if="$slots.previewMask" #previewMask>
      <slot name="previewMask" />
    </template>
  </a-image>
</template>

<script setup lang="ts">
import { useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmImage', inheritAttrs: false })

withDefaults(
  defineProps<{
    src?: string
    width?: number | string
    height?: number | string
    fallback?: string
    preview?: boolean
  }>(),
  {
    preview: true,
  },
)

const forwardedAttrs = useForwardAttrs()
</script>

<style scoped lang="less">
.tm-image {
  border-radius: 6px;
  overflow: hidden;
}
</style>
