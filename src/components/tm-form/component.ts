import type { Component } from 'vue'
import { FormItem as AFormItem } from 'ant-design-vue'
import TmFormComp from './TmForm.vue'
import { withInstall } from '@/utils'
import type { SFCWithInstall } from '@/utils'

export const TmForm = withInstall(TmFormComp)
export const TmFormItem: SFCWithInstall<Component> = withInstall(AFormItem as Component, 'TmFormItem')
export default TmForm
export type { TmFormSchemaItem } from './TmForm.vue'
