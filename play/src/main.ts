import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import App from './App.vue'
import TmUI from '@/index'

const app = createApp(App)
app.use(Antd)
app.use(TmUI)
app.mount('#app')
