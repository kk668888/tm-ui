<template>
  <tm-modal
    v-model:model-value="appStore.searchOpen"
    :footer="null"
    width="680px"
    @cancel="appStore.searchOpen = false"
  >
    <div class="flex flex-col gap-4 pt-2">
      <tm-input
        v-model="keyword"
        :placeholder="t('common.searchPlaceholder')"
      />
      <div class="max-h-[360px] overflow-y-auto">
        <tm-empty v-if="results.length === 0" :description="t('common.noData')" />
        <tm-list v-else :data-source="results">
          <template #renderItem="{ item }">
            <div class="cursor-pointer rounded-[10px] border border-transparent px-3 py-3 transition hover:border-[var(--admin-border)] hover:bg-[var(--admin-surface-muted)]" @click="openRoute(item.path)">
              <div class="flex w-full items-center justify-between gap-4">
                <div class="font-medium">{{ t(String(item.meta?.title)) }}</div>
                <div class="admin-muted text-xs">{{ item.path }}</div>
              </div>
            </div>
          </template>
        </tm-list>
      </div>
    </div>
  </tm-modal>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@admin/stores/app'
import { usePermissionStore } from '@admin/stores/permission'

const router = useRouter()
const { t } = useI18n()
const appStore = useAppStore()
const permissionStore = usePermissionStore()
const keyword = ref('')

const results = computed(() => {
  const normalized = keyword.value.trim().toLowerCase()
  return permissionStore.menuRoutes.filter((item) => {
    if (!item.name || item.meta?.hidden || item.redirect) {
      return false
    }
    const title = t(String(item.meta?.title ?? '')).toLowerCase()
    return !normalized || title.includes(normalized) || item.path.toLowerCase().includes(normalized)
  })
})

function openRoute(path: string) {
  appStore.searchOpen = false
  keyword.value = ''
  router.push(path)
}
</script>
