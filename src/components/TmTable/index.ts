import TmTableComp from './TmTable.vue'
import { withInstall } from '../../utils/with-install'

export const TmTable = withInstall(TmTableComp)
export default TmTable
export type { TmColumn, TmPageInfo, TmTableProps, TmTableEmits } from './types'
