<template>
  <a-drawer
    v-bind="forwardedAttrs"
    v-model:open="visible"
    :title="title"
    :placement="placement"
    :width="width"
    :closable="closable"
    :mask-closable="maskClosable"
    :destroy-on-close="destroyOnClose"
    class="tm-drawer"
    @close="handleClose"
  >
    <slot />
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot v-if="name !== 'default'" :name="name" v-bind="slotProps" />
    </template>
  </a-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmDrawer', inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    title?: string
    placement?: 'top' | 'bottom' | 'left' | 'right'
    width?: number | string
    closable?: boolean
    maskClosable?: boolean
    destroyOnClose?: boolean
  }>(),
  {
    modelValue: false,
    placement: 'right',
    width: 378,
    closable: true,
    maskClosable: true,
    destroyOnClose: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
}>()

const forwardedAttrs = useForwardAttrs()

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const handleClose = () => emit('close')
</script>

<style scoped lang="less">
.tm-drawer { border-radius: 0; }
</style>
