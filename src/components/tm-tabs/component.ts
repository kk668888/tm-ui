import type { Component } from 'vue'
import { TabPane as ATabPane } from 'ant-design-vue'
import TmTabsComp from './TmTabs.vue'
import { withInstall } from '@/utils'
import type { SFCWithInstall } from '@/utils'

export const TmTabs = withInstall(TmTabsComp)
export const TmTabPane: SFCWithInstall<Component> = withInstall(ATabPane as Component, 'TmTabPane')

export default TmTabs
