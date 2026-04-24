import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'TM-UI',
  description: '基于 ant-design-vue 二次封装的 Vue 3 组件库',
  base: '/',
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '指南', link: '/guide/getting-started' },
      { text: '组件', link: '/components/button' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '快速开始', link: '/guide/getting-started' },
          ],
        },
      ],
      '/components/': [
        {
          text: '基础组件',
          items: [
            { text: 'TmButton 按钮', link: '/components/button' },
            { text: 'TmInput 输入框', link: '/components/input' },
            { text: 'TmSelect 选择器', link: '/components/select' },
            { text: 'TmTable 表格', link: '/components/table' },
            { text: 'TmForm 表单', link: '/components/form' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 TM-UI',
    },
  },
})
