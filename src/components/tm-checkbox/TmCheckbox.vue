<template>
  <a-checkbox
    v-bind="forwardedAttrs"
    v-model:checked="checked"
    class="tm-checkbox"
    @change="handleChange"
  >
    <slot />
  </a-checkbox>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardAttrs } from '@/utils'

defineOptions({
  name: 'TmCheckbox',
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
  }>(),
  {
    modelValue: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const forwardedAttrs = useForwardAttrs()

const checked = computed({
  get: () => props.modelValue,
  set: (val: boolean) => emit('update:modelValue', val),
})

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
