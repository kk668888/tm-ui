import type { Component } from 'vue'
import { Step as AStep } from 'ant-design-vue'
import TmStepsComp from './TmSteps.vue'
import { withInstall } from '@/utils'
import type { SFCWithInstall } from '@/utils'

export const TmSteps = withInstall(TmStepsComp)
export const TmStep: SFCWithInstall<Component> = withInstall(AStep as Component, 'TmStep')

export default TmSteps
