<template>
  <ForwardRender
    :is="ACollapse"
    :attrs="collapseAttrs"
    :slots="$slots"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Collapse as ACollapse } from 'ant-design-vue'
import { ForwardRender, useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmCollapse', inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    modelValue?: string | number | Array<string | number>
    activeKey?: string | number | Array<string | number>
    accordion?: boolean
    bordered?: boolean
    ghost?: boolean
  }>(),
  {
    accordion: false,
    bordered: true,
    ghost: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string | number | Array<string | number>]
  'update:activeKey': [value: string | number | Array<string | number>]
  change: [value: string | number | Array<string | number>]
}>()

const forwardedAttrs = useForwardAttrs()

const mergedActiveKey = computed(() => props.activeKey ?? props.modelValue)

const updateActiveKey = (value: string | number | Array<string | number>) => {
  emit('update:modelValue', value)
  emit('update:activeKey', value)
}

const handleChange = (value: string | number | Array<string | number>) => {
  emit('change', value)
}

const collapseAttrs = computed(() => ({
  ...forwardedAttrs.value,
  ...(mergedActiveKey.value === undefined ? {} : { activeKey: mergedActiveKey.value }),
  accordion: props.accordion,
  bordered: props.bordered,
  ghost: props.ghost,
  class: 'tm-collapse',
  'onUpdate:activeKey': updateActiveKey,
  onChange: handleChange,
}))
</script>

<style scoped lang="less">
.tm-collapse {
  border-radius: 6px;
  overflow: hidden;
}
</style>
