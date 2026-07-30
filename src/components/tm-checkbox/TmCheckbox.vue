<template>
  <ForwardRender
    :is="ACheckbox"
    :attrs="checkboxAttrs"
    :slots="$slots"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Checkbox as ACheckbox } from 'ant-design-vue'
import { ForwardRender, useForwardAttrs } from '@/utils'
import type { TmCheckedEvent } from '../shared-types'

defineOptions({
  name: 'TmCheckbox',
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
  }>(),
  {},
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const forwardedAttrs = useForwardAttrs()

const checkboxAttrs = computed(() => ({
  ...forwardedAttrs.value,
  ...(props.modelValue !== undefined ? { checked: props.modelValue } : {}),
  class: 'tm-checkbox',
  onChange: handleChange,
}))

// ant-design-vue 的 Checkbox change 事件入参为 { target: { checked } } 形状
// 这里用 TmCheckedEvent 收敛类型，避免使用 any
const handleChange = (e: TmCheckedEvent | boolean) => {
  emit('update:modelValue', typeof e === 'boolean' ? e : (e.target?.checked ?? false))
}

</script>

<style scoped lang="less">
.tm-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
</style>
