import TmUploadComp from './TmUpload.vue'
import { withInstall } from '@/utils'

export const TmUpload = withInstall(TmUploadComp)
export default TmUpload
export type { TmUploadChangeInfo, TmUploadFile } from './TmUpload.vue'
