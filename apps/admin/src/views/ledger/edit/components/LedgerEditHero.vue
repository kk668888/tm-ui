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
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
}

.ledger-edit-title {
  margin: 0;
  font-size: 18px;
  line-height: 30px;
  font-weight: 700;
  color: #0f172a;
}

.ledger-edit-subtitle {
  margin: 6px 0 0;
  font-size: 14px;
  color: #475569;
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
  border-color: #cfd8e6;
  color: #2563eb;
  background: #fff;
  font-weight: 600;
}

:deep(.ledger-status-tag.tm-tag) {
  margin-inline-end: 0;
  padding: 3px 12px;
  border-radius: 999px;
  border-color: #98d278;
  color: #2ca54f;
  background: #f8fff6;
  font-weight: 600;
}
</style>
