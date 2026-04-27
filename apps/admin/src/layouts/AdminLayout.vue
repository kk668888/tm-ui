<template>
  <div class="min-h-screen p-4">
    <div class="grid gap-4 lg:grid-cols-[280px_1fr]">
      <AppSidebar :collapsed="appStore.sidebarCollapsed" />
      <main class="flex min-h-[calc(100vh-32px)] flex-col gap-4">
        <AppHeader />
        <AppTabs />
        <div class="admin-shell-card min-h-0 flex-1 overflow-auto rounded-[30px] p-5">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@admin/stores/app'
import AppHeader from '@admin/components/app/AppHeader.vue'
import AppSidebar from '@admin/components/app/AppSidebar.vue'
import AppTabs from '@admin/components/app/AppTabs.vue'

const appStore = useAppStore()
</script>
