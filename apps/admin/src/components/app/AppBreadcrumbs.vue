<template>
  <a-breadcrumb>
    <a-breadcrumb-item
      v-for="item in breadcrumbs"
      :key="item.path"
    >
      {{ t(String(item.meta.title)) }}
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const { t } = useI18n()

const breadcrumbs = computed(() =>
  route.matched.filter((item) => !item.meta.hidden && item.meta.title && item.path !== '/'),
)
</script>
