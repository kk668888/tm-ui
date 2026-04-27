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
withDefaults(defineProps<{ locale?: any; theme?: object }>(), { locale: () => zhCN })
const forwardedAttrs = useForwardAttrs()
</script>
