import type { Component } from 'vue'
import { CollapsePanel as ACollapsePanel } from 'ant-design-vue'
import TmCollapseComp from './TmCollapse.vue'
import { withInstall } from '@/utils'
import type { SFCWithInstall } from '@/utils'
export const TmCollapse = withInstall(TmCollapseComp)
export const TmCollapsePanel: SFCWithInstall<Component> = withInstall(ACollapsePanel as Component, 'TmCollapsePanel')
export default TmCollapse
