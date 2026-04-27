import type { Component } from 'vue'
import { BackTop as ABackTop, FloatButtonGroup as AFloatButtonGroup } from 'ant-design-vue'
import TmFloatButtonComp from './TmFloatButton.vue'
import { withInstall } from '@/utils'
import type { SFCWithInstall } from '@/utils'

export const TmFloatButton = withInstall(TmFloatButtonComp)
export const TmFloatButtonGroup: SFCWithInstall<Component> = withInstall(AFloatButtonGroup as Component, 'TmFloatButtonGroup')
export const TmBackTop: SFCWithInstall<Component> = withInstall(ABackTop as Component, 'TmBackTop')

export default TmFloatButton
