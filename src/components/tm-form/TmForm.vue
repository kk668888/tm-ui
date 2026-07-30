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
          :value="formModel[item.field]"
          :placeholder="item.placeholder || `请输入${item.label}`"
          :disabled="item.disabled"
          @update:value="(value) => updateField(item.field, value)"
        />
        <!-- Textarea -->
        <a-textarea
          v-else-if="item.type === 'textarea'"
          :value="formModel[item.field]"
          :placeholder="item.placeholder || `请输入${item.label}`"
          :disabled="item.disabled"
          :rows="item.rows || 3"
          @update:value="(value) => updateField(item.field, value)"
        />
        <!-- Select -->
        <a-select
          v-else-if="item.type === 'select'"
          :value="formModel[item.field]"
          :placeholder="item.placeholder || `请选择${item.label}`"
          :options="item.options"
          :disabled="item.disabled"
          @update:value="(value) => updateField(item.field, value)"
        />
        <!-- Switch -->
        <a-switch
          v-else-if="item.type === 'switch'"
          :checked="formModel[item.field]"
          :disabled="item.disabled"
          @update:checked="(value) => updateField(item.field, value)"
        />
        <!-- DatePicker -->
        <a-date-picker
          v-else-if="item.type === 'date'"
          :value="formModel[item.field]"
          :placeholder="item.placeholder || `请选择${item.label}`"
          :disabled="item.disabled"
          @update:value="(value) => updateField(item.field, value)"
        />
        <!-- Default: Input -->
        <a-input
          v-else
          :value="formModel[item.field]"
          :placeholder="item.placeholder || `请输入${item.label}`"
          :disabled="item.disabled"
          @update:value="(value) => updateField(item.field, value)"
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
import { computed } from 'vue'
import { useForwardAttrs } from '@/utils'
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
  // 下拉选项的 value 在 schema 配置阶段无法预先收窄类型，用 unknown 表达"任意表单值"
  options?: Array<{ label: string; value: unknown }>
  rows?: number
}

const props = withDefaults(
  defineProps<{
    model: Record<string, unknown>
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

const emit = defineEmits<{
  'update:model': [value: Record<string, unknown>]
}>()

const forwardedAttrs = useForwardAttrs()
const formModel = computed(() => props.model ?? {})

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

const updateField = (field: string, value: unknown) => {
  emit('update:model', {
    ...formModel.value,
    [field]: value,
  })
}
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
