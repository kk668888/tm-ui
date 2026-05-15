import TmLayoutComp from './TmLayout.vue'
import TmLayoutHeaderComp from './TmLayoutHeader.vue'
import TmLayoutSiderComp from './TmLayoutSider.vue'
import TmLayoutContentComp from './TmLayoutContent.vue'
import TmLayoutFooterComp from './TmLayoutFooter.vue'
import { withInstall } from '@/utils'

export const TmLayout = withInstall(TmLayoutComp)
export const TmLayoutHeader = withInstall(TmLayoutHeaderComp)
export const TmLayoutSider = withInstall(TmLayoutSiderComp)
export const TmLayoutContent = withInstall(TmLayoutContentComp)
export const TmLayoutFooter = withInstall(TmLayoutFooterComp)

export default TmLayout
