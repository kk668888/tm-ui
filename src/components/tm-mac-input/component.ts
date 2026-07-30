import TmMacInputComp from './TmMacInput.vue'
import { withInstall } from '@/utils'

export const TmMacInput = withInstall(TmMacInputComp)
export default TmMacInput
export type { TmMacInputParsed, TmMacInputProps, TmMacInputStatus } from './types'
