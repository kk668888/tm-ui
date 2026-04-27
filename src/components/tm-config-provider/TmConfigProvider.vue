<template>
  <a-config-provider v-bind="forwardedAttrs" :locale="locale" :theme="theme" class="tm-config-provider">
    <slot />
  </a-config-provider>
</template>
<script setup lang="ts">
import { useForwardAttrs } from '@/utils'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
defineOptions({ name: 'TmConfigProvider', inheritAttrs: false })
withDefaults(defineProps<{ locale?: any; theme?: object }>(), { locale: () => zhCN })
const forwardedAttrs = useForwardAttrs()
</script>
