<template>
  <a-empty
    v-bind="forwardedAttrs"
    :image="image"
    :description="description"
    class="tm-empty"
  >
    <template v-if="$slots.image" #image>
      <slot name="image" />
    </template>
    <template v-if="$slots.description" #description>
      <slot name="description" />
    </template>
    <template #default><slot /></template>
  </a-empty>
</template>

<script setup lang="ts">
import { useForwardAttrs } from '@/utils'
import { Empty } from 'ant-design-vue'

defineOptions({ name: 'TmEmpty', inheritAttrs: false })

withDefaults(
  defineProps<{
    image?: typeof Empty['PRESENTED_IMAGES_SIMPLE']
    description?: string
  }>(),
  {
    description: '暂无数据',
  },
)

const forwardedAttrs = useForwardAttrs()
</script>

<style scoped lang="less">
.tm-empty {
  padding: 24px 0;
}
</style>
