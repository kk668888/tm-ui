<template>
  <div
    class="tm-mac-input-wrapper"
    :class="{ 'tm-mac-input-wrapper-error': showErrorState }"
  >
    <a-input v-bind="inputAttrs">
      <template v-if="$slots.addonBefore" #addonBefore>
        <slot name="addonBefore" />
      </template>
      <template v-if="$slots.addonAfter" #addonAfter>
        <slot name="addonAfter" />
      </template>
      <template v-if="$slots.prefix" #prefix>
        <slot name="prefix" />
      </template>
      <template v-if="$slots.suffix" #suffix>
        <slot name="suffix" />
      </template>
    </a-input>
    <div v-if="showFeedback" class="tm-mac-input-error-message">
      {{ feedbackMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs, watch } from 'vue'
import { useForwardAttrs } from '@/utils'
import { getMacInputStatus, parseMacInput } from './parser'
import type { TmMacInputParsed, TmMacInputProps, TmMacInputStatus } from './types'

defineOptions({
  name: 'TmMacInput',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TmMacInputProps>(), {
  modelValue: undefined,
  placeholder: '请输入 MAC',
  allowClear: true,
  normalizeOnBlur: true,
  showInvalidStatus: true,
  showInvalidFeedback: true,
  invalidFeedback: 'MAC格式错误，请重新输入',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:parsed': [value: TmMacInputParsed]
  'update:status': [value: TmMacInputStatus]
  'update:valid': [value: boolean]
  blur: [event: FocusEvent]
}>()

const attrs = useAttrs()
const forwardedAttrs = useForwardAttrs()
const innerValue = ref(props.modelValue ?? '')
const parsedState = ref(parseMacInput(innerValue.value))

watch(
  () => props.modelValue,
  (value) => {
    innerValue.value = value ?? ''
    emitParseState(parseMacInput(innerValue.value))
  },
)

const inputStatus = computed(() => getMacInputStatus(parsedState.value))
const isInvalid = computed(() => inputStatus.value === 'invalid')
const showErrorState = computed(() => props.showInvalidStatus && isInvalid.value)
const showFeedback = computed(() => props.showInvalidFeedback && isInvalid.value)
const feedbackMessage = computed(() => props.invalidFeedback || parsedState.value.error)

const inputAttrs = computed(() => ({
  ...forwardedAttrs.value,
  value: innerValue.value,
  class: ['tm-mac-input', attrs.class],
  allowClear: props.allowClear,
  placeholder: props.placeholder,
  status: showErrorState.value ? 'error' : undefined,
  'aria-invalid': showErrorState.value ? 'true' : undefined,
  'onUpdate:value': handleInput,
  onBlur: handleBlur,
}))

function handleInput(value: string) {
  innerValue.value = value
  emit('update:modelValue', value)
  emitParseState(parseMacInput(value))
}

function handleBlur(event: FocusEvent) {
  const parsed = parseMacInput(innerValue.value)
  if (props.normalizeOnBlur && parsed.valid && parsed.normalized !== innerValue.value) {
    innerValue.value = parsed.normalized
    emit('update:modelValue', parsed.normalized)
  }

  emitParseState(parseMacInput(innerValue.value))
  emit('blur', event)
}

function emitParseState(parsed: TmMacInputParsed) {
  parsedState.value = parsed
  emit('update:parsed', parsed)
  emit('update:status', getMacInputStatus(parsed))
  emit('update:valid', parsed.valid)
}
</script>

<style scoped lang="less">
.tm-mac-input-wrapper {
  display: inline-flex;
  width: 100%;
  flex-direction: column;
}

.tm-mac-input-wrapper-error :deep(.ant-input),
.tm-mac-input-wrapper-error :deep(.ant-input-affix-wrapper),
.tm-mac-input-wrapper-error :deep(.ant-input-group-addon),
.tm-mac-input-wrapper-error :deep(.ant-input-group-wrapper .ant-input) {
  border-color: #ff4d4f;
}

.tm-mac-input-wrapper-error :deep(.ant-input:hover),
.tm-mac-input-wrapper-error :deep(.ant-input-affix-wrapper:hover),
.tm-mac-input-wrapper-error :deep(.ant-input-group-wrapper:hover .ant-input) {
  border-color: #ff4d4f;
}

.tm-mac-input-wrapper-error :deep(.ant-input:focus),
.tm-mac-input-wrapper-error :deep(.ant-input-focused),
.tm-mac-input-wrapper-error :deep(.ant-input-affix-wrapper-focused) {
  border-color: #ff4d4f;
  box-shadow: 0 0 0 2px rgb(255 77 79 / 20%);
}

.tm-mac-input-error-message {
  margin-top: 4px;
  color: #ff4d4f;
  font-size: 14px;
  line-height: 1.5715;
}
</style>
