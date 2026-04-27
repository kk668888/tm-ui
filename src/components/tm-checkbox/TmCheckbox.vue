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

const handleChange = (e: any) => {
  emit('update:modelValue', e.target?.checked ?? e)
}

</script>

<style scoped lang="less">
.tm-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
</style>
