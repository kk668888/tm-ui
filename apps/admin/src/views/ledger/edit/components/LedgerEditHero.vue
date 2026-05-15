<template>
  <div class="admin-shell-card ledger-edit-hero">
    <div>
      <h1 class="ledger-edit-title">{{ title }}</h1>
      <p class="ledger-edit-subtitle">{{ subtitle }}</p>
    </div>
    <div class="ledger-edit-badges">
      <tm-tag class="ledger-type-tag">{{ ledgerType }}</tm-tag>
      <tm-tag class="ledger-status-tag">{{ status }}</tm-tag>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
  ledgerType: string
  status: string
}>()
</script>

<style scoped>
.ledger-edit-hero {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 24px;
}

.ledger-edit-title {
  margin: 0;
  font-size: 20px;
  line-height: 30px;
  font-weight: 700;
  color: var(--admin-text-strong);
}

.ledger-edit-subtitle {
  margin: 6px 0 0;
  font-size: 13px;
  color: var(--admin-text-soft);
}

.ledger-edit-badges {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

:deep(.ledger-type-tag.tm-tag) {
  margin-inline-end: 0;
  padding: 3px 12px;
  border-radius: 999px;
  border-color: var(--admin-primary-soft-strong);
  color: var(--admin-primary);
  background: var(--admin-primary-soft);
  font-weight: 600;
}

:deep(.ledger-status-tag.tm-tag) {
  margin-inline-end: 0;
  padding: 3px 12px;
  border-radius: 999px;
  border-color: color-mix(in srgb, var(--admin-success) 18%, transparent);
  color: var(--admin-success);
  background: var(--admin-success-soft);
  font-weight: 600;
}
</style>
