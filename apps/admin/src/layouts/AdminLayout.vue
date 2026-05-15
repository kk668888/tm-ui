<template>
  <div class="admin-app-shell min-h-screen p-4">
    <div class="grid gap-4 xl:grid-cols-[248px_minmax(0,1fr)]">
      <AppSidebar :collapsed="appStore.sidebarCollapsed" />
      <main class="flex min-h-[calc(100vh-32px)] min-w-0 flex-col gap-3">
        <AppHeader />
        <AppTabs />
        <div class="admin-shell-card min-h-0 flex-1 overflow-auto p-5 lg:p-6">
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
