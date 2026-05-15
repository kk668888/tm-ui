import type { Component } from 'vue'
import { RadioGroup as ARadioGroup } from 'ant-design-vue'
import TmRadioComp from './TmRadio.vue'
import { withInstall } from '@/utils'
import type { SFCWithInstall } from '@/utils'

export const TmRadio = withInstall(TmRadioComp)
export const TmRadioGroup: SFCWithInstall<Component> = withInstall(ARadioGroup as Component, 'TmRadioGroup')
export default TmRadio
