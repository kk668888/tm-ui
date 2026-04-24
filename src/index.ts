import type { App, Plugin } from 'vue'
import { TmButton, TmInput, TmSelect, TmTable, TmForm, TmDemo } from './components'
import './styles/tailwind.css'

const components = [TmButton, TmInput, TmSelect, TmTable, TmForm, TmDemo]

const install = (app: App) => {
  components.forEach((comp) => {
    app.use(comp)
  })
}

export default { install } as Plugin

export { TmButton, TmInput, TmSelect, TmTable, TmForm, TmDemo }
export type { TmFormSchemaItem } from './components'
export type { TmColumn, TmPageInfo, TmTableProps, TmTableEmits } from './components'
export { withInstall } from './utils'
export type { SFCWithInstall } from './utils'
