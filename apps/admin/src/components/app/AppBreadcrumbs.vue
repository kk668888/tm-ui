<template>
  <tm-breadcrumb :items="breadcrumbs" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { TmBreadcrumbItem } from 'tm-ui'

const route = useRoute()
const { t } = useI18n()

const breadcrumbs = computed<TmBreadcrumbItem[]>(() =>
  route.matched
    .filter((item) => !item.meta.hidden && item.meta.title && item.path !== '/')
    .map((item) => ({ title: t(String(item.meta.title)) })),
)
</script>
