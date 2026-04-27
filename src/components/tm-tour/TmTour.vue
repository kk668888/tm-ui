<template>
  <ForwardRender
    :is="ATour"
    :attrs="tourAttrs"
    :slots="$slots"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Tour as ATour } from 'ant-design-vue'
import { ForwardRender, useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmTour', inheritAttrs: false })

const props = defineProps<{
  modelValue?: boolean
  open?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'update:open': [value: boolean]
}>()

const forwardedAttrs = useForwardAttrs()

const mergedOpen = computed(() => props.open ?? props.modelValue)

const updateOpen = (value: boolean) => {
  emit('update:modelValue', value)
  emit('update:open', value)
}

const tourAttrs = computed(() => ({
  ...forwardedAttrs.value,
  ...(mergedOpen.value === undefined ? {} : { open: mergedOpen.value }),
  class: 'tm-tour',
  'onUpdate:open': updateOpen,
}))
</script>
