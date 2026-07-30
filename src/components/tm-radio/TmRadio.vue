<template>
  <ForwardRender
    :is="ARadio"
    :attrs="radioAttrs"
    :slots="$slots"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Radio as ARadio } from 'ant-design-vue'
import { ForwardRender, useForwardAttrs } from '@/utils'
import type { TmCheckedEvent } from '../shared-types'

defineOptions({
  name: 'TmRadio',
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

const radioAttrs = computed(() => ({
  ...forwardedAttrs.value,
  ...(props.modelValue !== undefined ? { checked: props.modelValue } : {}),
  class: 'tm-radio',
  onChange: handleChange,
}))

// ant-design-vue 的 Radio change 事件入参为 { target: { checked } } 形状
const handleChange = (e: TmCheckedEvent | boolean) => {
  emit('update:modelValue', typeof e === 'boolean' ? e : (e.target?.checked ?? false))
}

</script>

<style scoped lang="less">
.tm-radio {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
</style>
