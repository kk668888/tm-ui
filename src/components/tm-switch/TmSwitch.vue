<template>
  <a-switch
    v-bind="switchAttrs"
  >
    <template v-if="$slots.checkedChildren" #checkedChildren>
      <slot name="checkedChildren" />
    </template>
    <template v-if="$slots.unCheckedChildren" #unCheckedChildren>
      <slot name="unCheckedChildren" />
    </template>
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot v-if="name !== 'checkedChildren' && name !== 'unCheckedChildren'" :name="name" v-bind="slotProps" />
    </template>
  </a-switch>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardAttrs } from '@/utils'

defineOptions({
  name: 'TmSwitch',
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

const switchAttrs = computed(() => ({
  ...forwardedAttrs.value,
  ...(props.modelValue !== undefined ? { checked: props.modelValue } : {}),
  class: 'tm-switch',
  onChange: handleChange,
}))

const handleChange = (value: boolean) => {
  emit('update:modelValue', value)
}
</script>

<style scoped lang="less">
.tm-switch {
  transition: all 0.2s ease;
}
</style>
