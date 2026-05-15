<template>
  <tm-page-header class="admin-page-header-shell" :title="title" :sub-title="description">
    <template #tags>
      <div class="admin-page-meta" v-if="$slots.meta">
        <slot name="meta" />
      </div>
    </template>
    <template #extra>
      <div v-if="$slots.actions" class="admin-page-actions">
        <slot name="actions" />
      </div>
    </template>
  </tm-page-header>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>

<style scoped>
.admin-page-header-shell :deep(.ant-page-header) {
  padding: 0;
}

.admin-page-header-shell :deep(.ant-page-header-heading) {
  align-items: flex-start;
}

.admin-page-header-shell :deep(.ant-page-header-heading-title) {
  color: var(--admin-text-strong);
  font-size: 24px;
  font-weight: 700;
}

.admin-page-header-shell :deep(.ant-page-header-heading-sub-title) {
  color: var(--admin-text-soft);
}
</style>
