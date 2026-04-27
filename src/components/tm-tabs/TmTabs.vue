<template>
  <ForwardRender
    :is="ATabs"
    :attrs="tabsAttrs"
    :slots="$slots"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Tabs as ATabs } from 'ant-design-vue'
import { ForwardRender, useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmTabs', inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    activeKey?: string | number
    type?: 'line' | 'card' | 'editable-card'
    tabPosition?: 'top' | 'bottom' | 'left' | 'right'
    size?: 'small' | 'middle' | 'large'
  }>(),
  {
    type: 'line',
    tabPosition: 'top',
    size: 'middle',
  },
)

const emit = defineEmits<{
  'update:modelValue': [key: string | number]
  'update:activeKey': [key: string | number]
  change: [key: string | number]
}>()

const forwardedAttrs = useForwardAttrs()

const mergedActiveKey = computed(() => props.activeKey ?? props.modelValue)

const updateActiveKey = (key: string | number) => {
  emit('update:modelValue', key)
  emit('update:activeKey', key)
}

const handleChange = (key: string | number) => {
  emit('change', key)
}

const tabsAttrs = computed(() => ({
  ...forwardedAttrs.value,
  ...(mergedActiveKey.value === undefined ? {} : { activeKey: mergedActiveKey.value }),
  type: props.type,
  tabPosition: props.tabPosition,
  size: props.size,
  class: 'tm-tabs',
  'onUpdate:activeKey': updateActiveKey,
  onChange: handleChange,
}))
</script>

<style scoped lang="less">
.tm-tabs { border-radius: 6px; }
</style>
