import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import TmUI from '../../../src'

export default {
  extends: DefaultTheme,
  enhanceApp: ({ app }) => {
    app.use(Antd)
    app.use(TmUI)
  },
} satisfies Theme
