import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import TmUI from 'tm-ui'
import App from './App.vue'
import { createAdminI18n } from './i18n'
import { registerPermissionDirective } from './directives/permission'
import { router } from './router'
import { pinia } from './stores'
import './styles/index.css'

const app = createApp(App)

app.use(Antd)
app.use(TmUI)
app.use(pinia)
app.use(createAdminI18n())
registerPermissionDirective(app)
app.use(router)

app.mount('#app')
