<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive :include="cachedViews">
      <component :is="Component" :key="route.fullPath" />
    </keep-alive>
  </router-view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTabsStore } from '@admin/stores/tabs'

const tabsStore = useTabsStore()
const cachedViews = computed(() => tabsStore.cachedViewNames)
</script>
