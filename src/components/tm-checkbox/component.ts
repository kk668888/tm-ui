import type { Component } from 'vue'
import { CheckboxGroup as ACheckboxGroup } from 'ant-design-vue'
import TmCheckboxComp from './TmCheckbox.vue'
import { withInstall } from '@/utils'
import type { SFCWithInstall } from '@/utils'

export const TmCheckbox = withInstall(TmCheckboxComp)
export const TmCheckboxGroup: SFCWithInstall<Component> = withInstall(ACheckboxGroup as Component, 'TmCheckboxGroup')
export default TmCheckbox
