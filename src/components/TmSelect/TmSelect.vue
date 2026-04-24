<template>
  <a-select
    v-bind="forwardedAttrs"
    v-model:value="selectValue"
    class="tm-select"
    :placeholder="placeholder"
    :show-search="showSearch"
    :allow-clear="allowClear"
    :filter-option="filterOption"
    :not-found-content="notFoundContent"
    :loading="loading"
    @update:value="handleSelect"
  >
    <template v-if="$slots.prefixIcon" #prefixIcon>
      <slot name="prefixIcon" />
    </template>
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot v-if="name !== 'prefixIcon'" :name="name" v-bind="slotProps" />
    </template>
    <template #notFoundContent>
      <slot name="notFoundContent">
        <a-empty :image="emptyImage" :description="notFoundContent || '暂无数据'" />
      </slot>
    </template>
  </a-select>
</template>

<script setup lang="ts">
/**
 * TmSelect - 增强选择器组件
 * 支持远程搜索默认配置，空状态提示
 */
import { computed, useAttrs } from 'vue'
import { Empty } from 'ant-design-vue'

defineOptions({
  name: 'TmSelect',
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    modelValue?: any
    placeholder?: string
    showSearch?: boolean
    allowClear?: boolean
    filterOption?: ((input: string, option: any) => boolean) | false
    notFoundContent?: string
    loading?: boolean
    emptyImage?: typeof Empty['PRESENTED_IMAGES_SIMPLE']
  }>(),
  {
    modelValue: undefined,
    placeholder: '请选择',
    showSearch: true,
    allowClear: true,
    filterOption: false,
    notFoundContent: undefined,
    loading: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: any]
}>()

const attrs = useAttrs()
const forwardedAttrs = computed(() => {
  const { class: cls, style, ...rest } = attrs
  return rest
})

const selectValue = computed({
  get: () => props.modelValue,
  set: (val: any) => emit('update:modelValue', val),
})

const handleSelect = (value: any) => {
  emit('update:modelValue', value)
}
</script>

<style scoped lang="less">
.tm-select {
  min-width: 200px;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:focus,
  &:hover {
    border-color: var(--ant-color-primary);
  }
}
</style>
