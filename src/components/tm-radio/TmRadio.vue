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

const handleChange = (e: any) => {
  emit('update:modelValue', e.target?.checked ?? e)
}

</script>

<style scoped lang="less">
.tm-radio {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
</style>
