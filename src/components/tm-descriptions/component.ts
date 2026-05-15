import type { Component } from 'vue'
import { DescriptionsItem as ADescriptionsItem } from 'ant-design-vue'
import TmDescriptionsComp from './TmDescriptions.vue'
import { withInstall } from '@/utils'
import type { SFCWithInstall } from '@/utils'
export const TmDescriptions = withInstall(TmDescriptionsComp)
export const TmDescriptionsItem: SFCWithInstall<Component> = withInstall(ADescriptionsItem as Component, 'TmDescriptionsItem')
export default TmDescriptions
