<template>
  <ForwardRender
    :is="AConfigProvider"
    :attrs="{ ...forwardedAttrs, locale, theme, class: 'tm-config-provider' }"
    :slots="$slots"
  />
</template>
<script setup lang="ts">
import { ConfigProvider as AConfigProvider } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { ForwardRender, useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmConfigProvider', inheritAttrs: false })

const { locale = zhCN, theme } =
  defineProps<{
    // ant-design-vue 的语言包类型；用 typeof zhCN 精确推导，避免引入可能因版本差异失效的类型路径
    locale?: typeof zhCN
    // 主题 token 配置，按 ant-design-vue ConfigProviderTheme 结构收敛，覆盖宽泛的 object
    theme?: { token?: Record<string, unknown>; algorithm?: unknown; components?: Record<string, unknown> }
  }>()

const forwardedAttrs = useForwardAttrs()
</script>
