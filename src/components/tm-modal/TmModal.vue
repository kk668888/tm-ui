<template>
  <a-modal
    v-bind="forwardedAttrs"
    v-model:open="visible"
    :title="title"
    :width="width"
    :confirm-loading="confirmLoading"
    :ok-text="okText"
    :cancel-text="cancelText"
    :mask-closable="maskClosable"
    :destroy-on-close="destroyOnClose"
    class="tm-modal"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <slot />
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot v-if="name !== 'default'" :name="name" v-bind="slotProps" />
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmModal', inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    title?: string
    width?: number | string
    confirmLoading?: boolean
    okText?: string
    cancelText?: string
    maskClosable?: boolean
    destroyOnClose?: boolean
  }>(),
  {
    modelValue: false,
    width: 520,
    okText: '确定',
    cancelText: '取消',
    maskClosable: true,
    destroyOnClose: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  ok: []
  cancel: []
}>()

const forwardedAttrs = useForwardAttrs()

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const handleOk = () => emit('ok')
const handleCancel = () => emit('cancel')
</script>

<style scoped lang="less">
.tm-modal { border-radius: 8px; }
</style>
