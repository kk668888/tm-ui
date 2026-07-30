import TmIpInputComp from './TmIpInput.vue'
import { withInstall } from '@/utils'

export const TmIpInput = withInstall(TmIpInputComp)
export default TmIpInput
export type {
  TmIpInputCondition,
  TmIpInputConditionMode,
  TmIpInputMode,
  TmIpInputParsed,
  TmIpInputProps,
  TmIpInputStatus,
} from './types'
