import { defineConfig } from 'vitepress'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  title: 'TM-UI',
  description: '基于 ant-design-vue 二次封装的 Vue 3 组件库',
  base: '/',
  ssr: false,
  vite: {
    resolve: {
      alias: {
        '@': resolve(__dirname, '../../src'),
        'ant-design-vue/es': resolve(__dirname, '../../node_modules/ant-design-vue/lib'),
      },
    },
    build: {
      chunkSizeWarningLimit: 1600,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (
              id.includes('node_modules/vxe-table')
              || id.includes('node_modules/@vxe-ui')
              || id.includes('node_modules/xe-utils')
            ) {
              return 'vendor-vxe'
            }
            if (id.includes('node_modules/ant-design-vue') || id.includes('node_modules/@ant-design')) {
              return 'vendor-antd'
            }
            if (id.includes('/src/components/')) {
              return 'tm-ui-components'
            }
          },
        },
      },
    },
    optimizeDeps: {
      include: ['ant-design-vue', 'vxe-table'],
    },
  },
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
            { text: '发布到 npm', link: '/guide/npm-publish' },
          ],
        },
      ],
      '/components/': [
        {
          text: '基础组件',
          items: [
            { text: 'TmButton 按钮', link: '/components/button' },
            { text: 'TmInput 输入框', link: '/components/input' },
            { text: 'TmIpInput IP 输入框', link: '/components/ip-input' },
            { text: 'TmMacInput MAC 输入框', link: '/components/mac-input' },
            { text: 'TmSelect 选择器', link: '/components/select' },
            { text: 'TmTable 表格', link: '/components/table' },
            { text: 'TmForm 表单', link: '/components/form' },
          ],
        },
        {
          text: '布局组件',
          items: [
            { text: 'TmGrid 栅格', link: '/components/grid' },
            { text: 'TmFlex 弹性布局', link: '/components/flex' },
            { text: 'TmLayout 布局', link: '/components/layout' },
            { text: 'TmSpace 间距', link: '/components/space' },
            { text: 'TmDivider 分割线', link: '/components/divider' },
          ],
        },
        {
          text: '导航组件',
          items: [
            { text: 'TmBreadcrumb 面包屑', link: '/components/breadcrumb' },
            { text: 'TmDropdown 下拉菜单', link: '/components/dropdown' },
            { text: 'TmMenu 导航菜单', link: '/components/menu' },
            { text: 'TmPagination 分页', link: '/components/pagination' },
            { text: 'TmSteps 步骤条', link: '/components/steps' },
            { text: 'TmTabs 标签页', link: '/components/tabs' },
            { text: 'TmAffix 固钉', link: '/components/affix' },
            { text: 'TmAnchor 锚点', link: '/components/anchor' },
            { text: 'TmPageHeader 页头', link: '/components/page-header' },
          ],
        },
        {
          text: '数据录入',
          items: [
            { text: 'TmInput 输入框', link: '/components/input' },
            { text: 'TmIpInput IP 输入框', link: '/components/ip-input' },
            { text: 'TmMacInput MAC 输入框', link: '/components/mac-input' },
            { text: 'TmTextarea 文本域', link: '/components/textarea' },
            { text: 'TmInputNumber 数字输入框', link: '/components/input-number' },
            { text: 'TmInputPassword 密码输入框', link: '/components/input-password' },
            { text: 'TmSelect 选择器', link: '/components/select' },
            { text: 'TmCheckbox 复选框', link: '/components/checkbox' },
            { text: 'TmRadio 单选框', link: '/components/radio' },
            { text: 'TmSwitch 开关', link: '/components/switch' },
            { text: 'TmDatePicker 日期选择器', link: '/components/date-picker' },
            { text: 'TmTimePicker 时间选择器', link: '/components/time-picker' },
            { text: 'TmUpload 上传', link: '/components/upload' },
            { text: 'TmCascader 级联选择器', link: '/components/cascader' },
            { text: 'TmRate 评分', link: '/components/rate' },
            { text: 'TmSlider 滑块', link: '/components/slider' },
            { text: 'TmMentions 提及', link: '/components/mentions' },
            { text: 'TmAutoComplete 自动完成', link: '/components/auto-complete' },
            { text: 'TmSegmented 分段控制器', link: '/components/segmented' },
          ],
        },
        {
          text: '数据展示',
          items: [
            { text: 'TmTable 表格', link: '/components/table' },
            { text: 'TmList 列表', link: '/components/list' },
            { text: 'TmTree 树形控件', link: '/components/tree' },
            { text: 'TmTreeSelect 树选择器', link: '/components/tree-select' },
            { text: 'TmTransfer 穿梭框', link: '/components/transfer' },
            { text: 'TmAvatar 头像', link: '/components/avatar' },
            { text: 'TmBadge 徽标', link: '/components/badge' },
            { text: 'TmCard 卡片', link: '/components/card' },
            { text: 'TmCollapse 折叠面板', link: '/components/collapse' },
            { text: 'TmDescriptions 描述列表', link: '/components/descriptions' },
            { text: 'TmEmpty 空状态', link: '/components/empty' },
            { text: 'TmImage 图片', link: '/components/image' },
            { text: 'TmCalendar 日历', link: '/components/calendar' },
            { text: 'TmTypography 排版', link: '/components/typography' },
            { text: 'TmTag 标签', link: '/components/tag' },
            { text: 'TmTimeline 时间轴', link: '/components/timeline' },
            { text: 'TmSkeleton 骨架屏', link: '/components/skeleton' },
            { text: 'TmStatistic 统计数值', link: '/components/statistic' },
            { text: 'TmCarousel 走马灯', link: '/components/carousel' },
            { text: 'TmComment 评论', link: '/components/comment' },
          ],
        },
        {
          text: '反馈组件',
          items: [
            { text: 'TmAlert 警告提示', link: '/components/alert' },
            { text: 'TmMessage 全局提示', link: '/components/message' },
            { text: 'TmModal 对话框', link: '/components/modal' },
            { text: 'TmNotification 通知提醒框', link: '/components/notification' },
            { text: 'TmPopconfirm 气泡确认框', link: '/components/popconfirm' },
            { text: 'TmProgress 进度条', link: '/components/progress' },
            { text: 'TmResult 结果', link: '/components/result' },
            { text: 'TmSpin 加载中', link: '/components/spin' },
            { text: 'TmDrawer 抽屉', link: '/components/drawer' },
            { text: 'TmTour 漫游式引导', link: '/components/tour' },
          ],
        },
        {
          text: '其他组件',
          items: [
            { text: 'TmPopover 气泡卡片', link: '/components/popover' },
            { text: 'TmTooltip 文字提示', link: '/components/tooltip' },
            { text: 'TmFloatButton 悬浮按钮', link: '/components/float-button' },
            { text: 'TmQRCode 二维码', link: '/components/qr-code' },
            { text: 'TmWatermark 水印', link: '/components/watermark' },
            { text: 'TmConfigProvider 全局化配置', link: '/components/config-provider' },
            { text: 'TmApp 应用', link: '/components/app' },
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
