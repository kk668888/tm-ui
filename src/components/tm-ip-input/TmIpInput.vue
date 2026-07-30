<template>
  <div class="tm-ip-input-wrapper" :class="{ 'tm-ip-input-wrapper-error': showErrorState }">
    <a-input v-bind="inputAttrs">
      <template v-if="$slots.prefix" #prefix>
        <slot name="prefix" />
      </template>
      <template v-if="$slots.suffix" #suffix>
        <slot name="suffix" />
      </template>
      <template v-for="(_, name) in $slots" #[name]="slotProps">
        <slot v-if="name !== 'prefix' && name !== 'suffix'" :name="name" v-bind="slotProps" />
      </template>
    </a-input>
    <div v-if="showFeedback" class="tm-ip-input-error-message">
      {{ feedbackMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs, watch } from 'vue'
import { useForwardAttrs } from '@/utils'
import { getIpInputStatus, parseIpInput } from './parser'
import type { TmIpInputParsed, TmIpInputProps, TmIpInputStatus } from './types'

defineOptions({
  name: 'TmIpInput',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TmIpInputProps>(), {
  modelValue: undefined,
  placeholder: '请输入 IP',
  allowClear: true,
  normalizeOnBlur: true,
  showInvalidStatus: true,
  showInvalidFeedback: true,
  invalidFeedback: 'IP格式错误，请重新输入',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:parsed': [value: TmIpInputParsed]
  'update:status': [value: TmIpInputStatus]
  'update:valid': [value: boolean]
  blur: [event: FocusEvent]
}>()

const attrs = useAttrs()
const forwardedAttrs = useForwardAttrs()
const innerValue = ref(props.modelValue ?? '')
const parsedState = ref<TmIpInputParsed>(parseIpInput(innerValue.value))
const isInvalid = computed(() => getIpInputStatus(parsedState.value) === 'invalid')
const showErrorState = computed(() => props.showInvalidStatus && isInvalid.value)
const inputStatus = computed(() => {
  if (showErrorState.value) {
    return 'error'
  }

  return forwardedAttrs.value.status
})
const showFeedback = computed(() => props.showInvalidFeedback && isInvalid.value)
const feedbackMessage = computed(() => props.invalidFeedback || parsedState.value.error)

watch(
  () => props.modelValue,
  (value) => {
    const nextValue = value ?? ''

    if (nextValue !== innerValue.value) {
      innerValue.value = nextValue
      parsedState.value = parseIpInput(nextValue)
    }
  },
)

const inputAttrs = computed(() => ({
  ...forwardedAttrs.value,
  value: innerValue.value,
  class: ['tm-ip-input', attrs.class],
  allowClear: props.allowClear,
  placeholder: props.placeholder,
  status: inputStatus.value,
  'aria-invalid': inputStatus.value === 'error' ? 'true' : undefined,
  'onUpdate:value': handleInput,
  onBlur: handleBlur,
}))

function handleInput(value: string) {
  innerValue.value = value
  emit('update:modelValue', value)
  emitParseState(parseIpInput(value))
}

function handleBlur(event: FocusEvent) {
  const parsed = parseIpInput(innerValue.value)

  if (props.normalizeOnBlur && parsed.valid && parsed.normalized !== innerValue.value) {
    innerValue.value = parsed.normalized
    emit('update:modelValue', parsed.normalized)
  }

  emitParseState(props.normalizeOnBlur && parsed.valid ? parseIpInput(innerValue.value) : parsed)
  emit('blur', event)
}

function emitParseState(parsed: TmIpInputParsed) {
  parsedState.value = parsed
  emit('update:parsed', parsed)
  emit('update:status', getIpInputStatus(parsed))
  emit('update:valid', parsed.valid)
}
</script>

<style scoped lang="less">
.tm-ip-input-wrapper {
  width: 100%;
}

.tm-ip-input-wrapper-error {
  :deep(.ant-input),
  :deep(.ant-input-affix-wrapper) {
    border-color: #ff4d4f !important;
  }

  :deep(.ant-input:hover),
  :deep(.ant-input-affix-wrapper:hover),
  :deep(.ant-input:focus),
  :deep(.ant-input-affix-wrapper-focused) {
    border-color: #ff4d4f !important;
    box-shadow: 0 0 0 2px rgba(255, 77, 79, 0.1) !important;
  }
}

.tm-ip-input-error-message {
  margin-top: 4px;
  color: #ff4d4f;
  font-size: 14px;
  line-height: 1.5715;
}
</style>
