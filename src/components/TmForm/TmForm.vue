<template>
  <a-form
    v-bind="forwardedAttrs"
    :model="model"
    :rules="computedRules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :layout="layout"
    class="tm-form"
  >
    <!-- 自动生成的表单项 -->
    <template v-if="autoGenerate && schema && schema.length > 0">
      <a-form-item
        v-for="item in schema"
        :key="item.field"
        :label="item.label"
        :name="item.field"
      >
        <!-- Input -->
        <a-input
          v-if="item.type === 'input'"
          v-model:value="model[item.field]"
          :placeholder="item.placeholder || `请输入${item.label}`"
          :disabled="item.disabled"
        />
        <!-- Textarea -->
        <a-textarea
          v-else-if="item.type === 'textarea'"
          v-model:value="model[item.field]"
          :placeholder="item.placeholder || `请输入${item.label}`"
          :disabled="item.disabled"
          :rows="item.rows || 3"
        />
        <!-- Select -->
        <a-select
          v-else-if="item.type === 'select'"
          v-model:value="model[item.field]"
          :placeholder="item.placeholder || `请选择${item.label}`"
          :options="item.options"
          :disabled="item.disabled"
        />
        <!-- Switch -->
        <a-switch
          v-else-if="item.type === 'switch'"
          v-model:checked="model[item.field]"
          :disabled="item.disabled"
        />
        <!-- DatePicker -->
        <a-date-picker
          v-else-if="item.type === 'date'"
          v-model:value="model[item.field]"
          :placeholder="item.placeholder || `请选择${item.label}`"
          :disabled="item.disabled"
        />
        <!-- Default: Input -->
        <a-input
          v-else
          v-model:value="model[item.field]"
          :placeholder="item.placeholder || `请输入${item.label}`"
          :disabled="item.disabled"
        />
      </a-form-item>
    </template>

    <!-- 自定义插槽内容 -->
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </a-form>
</template>

<script setup lang="ts">
/**
 * TmForm - 增强表单组件
 * 支持基于 JSON schema 的表单自动生成，内置常用校验规则
 */
import { computed, useAttrs } from 'vue'
import type { RuleObject } from 'ant-design-vue/es/form'

defineOptions({
  name: 'TmForm',
  inheritAttrs: false,
})

export interface TmFormSchemaItem {
  field: string
  label: string
  type?: 'input' | 'textarea' | 'select' | 'switch' | 'date'
  placeholder?: string
  disabled?: boolean
  rules?: RuleObject[]
  options?: Array<{ label: string; value: any }>
  rows?: number
}

const props = withDefaults(
  defineProps<{
    model: Record<string, any>
    schema?: TmFormSchemaItem[]
    autoGenerate?: boolean
    labelCol?: { span: number }
    wrapperCol?: { span: number }
    layout?: 'horizontal' | 'vertical' | 'inline'
    rules?: Record<string, RuleObject[]>
  }>(),
  {
    schema: () => [],
    autoGenerate: false,
    labelCol: () => ({ span: 4 }),
    wrapperCol: () => ({ span: 20 }),
    layout: 'horizontal',
    rules: () => ({}),
  },
)

defineEmits<{
  'update:model': [value: Record<string, any>]
}>()

const attrs = useAttrs()
const forwardedAttrs = computed(() => {
  const { class: cls, style, ...rest } = attrs
  return rest
})

/**
 * 合并 schema 中定义的 rules 和外部传入的 rules
 */
const computedRules = computed(() => {
  const merged: Record<string, RuleObject[]> = { ...props.rules }
  if (props.schema && props.autoGenerate) {
    for (const item of props.schema) {
      if (item.rules && item.rules.length > 0) {
        merged[item.field] = item.rules
      }
    }
  }
  return merged
})
</script>

<style scoped lang="less">
.tm-form {
  :deep(.ant-form-item-label > label) {
    font-weight: 500;
  }

  :deep(.ant-form-item) {
    margin-bottom: 20px;
  }
}
</style>
