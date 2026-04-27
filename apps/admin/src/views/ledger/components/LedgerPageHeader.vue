<template>
  <div class="admin-toolbar">
    <div>
      <h2 class="mb-2 text-2xl font-semibold">台账列表</h2>
    </div>
    <div class="flex items-center gap-3">
      <div class="rounded-full border border-[var(--admin-border)] bg-white px-4 py-1.5 text-sm text-[var(--admin-primary)] shadow-sm">
        共 {{ total }} 项
      </div>
      <PermissionButton permission="system:ledger:import">
        导入
      </PermissionButton>
      <PermissionButton type="primary" permission="system:ledger:create">
        新增台账
      </PermissionButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import PermissionButton from '@admin/components/app/PermissionButton.vue'

defineProps<{
  total: number
}>()
</script>
